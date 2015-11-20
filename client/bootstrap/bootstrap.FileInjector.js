var requirejs = 'PLACEHOLDER_CONF'


//These variables are used as semaphores to ensure that only one view can load and bootstrap the app
var bmPlatformLoaded=false;
var bmPlatformLoading=false;
var bmPlatformBooting=false;

if (((typeof angular == 'undefined') || (typeof $ == 'undefined')  ) && (!bmPlatformLoading)) { //bm.platform Loaded for the first time - Load JS and CSS files


  bmPlatformLoading = true;

  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added Requirejs to head');

  var materialIconsElement = document.createElement("link");

  materialIconsElement["href"] = "https://fonts.googleapis.com/icon?family=Material+Icons";
  materialIconsElement["rel"] = "stylesheet";

  document.getElementsByTagName("head")[0].appendChild(materialIconsElement);
  console.log('added material icons to head');

  requireJSScriptElement.onload = function () {

    console.log('calling requireJS Load...');
    require(['PLACEHOLDER_LOAD'], function (ang) {
        if ((typeof obips != 'undefined')) {
          console.log('Context inside OBI - Manually bootstrapping angular')

          //Load OBI report metadata into an angular constant and then bootstrap
          initOBIMetadataAndBootstrap();

        } else {

          console.log('Context outside OBI - Manually bootstrapping angular')
          angular.bootstrap(document, ['bm.platform']);
        }

      }
    );
  }
}
else {
  console.log('Everything already loaded...just Rebootstrapping');
  if ((typeof obips != 'undefined')) {
    bmPlatformLoaded=true;
    bmPlatformLoading=false;
    bootstrapChatterApp();
    observeChatterSensitiveDOMChanges();
  } else {
    angular.bootstrap(document, ['bm.platform']);
  }

}



function initOBIMetadataAndBootstrap() {

  var initInjector = angular.injector(["ng", "bm.platform"]);
  var BIGate = initInjector.get("BIGate");

  bmPlatformLoading = true;

   var contextCollection=BIGate.getViewDataReferences();

  console.log(contextCollection);

  var allReportsPromises = BIGate.getAllReportsXML();

  allReportsPromises.then(function (responses) {

    var allMetadataPromises = BIGate.getAllReportsMetadata(responses);

    allMetadataPromises.then(function (metaDataResponses) {

      console.info('Report metadata loaded for ' + metaDataResponses.length + ' Reports.');
      console.log(metaDataResponses);

      var mergedCollection=BIGate.getMergedContextCollection(metaDataResponses,contextCollection)

      console.log('Merged:')
      console.log(mergedCollection);

      //Load metadata and Context Info into an app Constant so it is available as a service throughout
      angular
        .module('bm.platform')
        .constant('metaDataResponses', metaDataResponses);
      angular
        .module('bm.platform')
        .value('contextCollection', mergedCollection);


      bmPlatformLoaded=true;
      bmPlatformLoading=false;
      bootstrapChatterApp();
      observeChatterSensitiveDOMChanges();

    })

  });

}


function bootstrapChatterApp() {


  console.log(bmPlatformLoaded);

  //Semaphore logic to habdle multiple analysis trying to bootstrap at the same time. One one is allowed to - and that becomes elected as the master analysis.
  if ((!bmPlatformLoaded) || bmPlatformLoading || bmPlatformBooting) return;


  bmPlatformBooting = true;

  console.log('In Bootstrap!');

  var pageContentDiv = $('#PageContentOuterDiv')[0];

  //Bootstrap if not already.
  //The First view to set this attribute will have to responsibility of bootstrapping the entire app into context
  if (!(pageContentDiv.getAttribute('obi-chatter-enable'))) {

    //attach chatter directive - this will make angular loop through table elements and attach further directives
    pageContentDiv.setAttribute('obi-chatter-enable', 'true');

    $('.DashboardPageContentDiv').append("<div obi-fab-menu='true'></div>");

    //  pageContentDiv.setAttribute('obi-fab-menu', 'true');

    console.log('New - Attempt to attach angular to page content DIV');

    angular.bootstrap(pageContentDiv, ['bm.platform']);
    console.log('Angular Bootstraped: ' + 'bm.platform');

  } else {

    //Angular is already bootstrapped but the views might have been re-rendered by OBI. This requires a re-compile of the views with the existing scope.
    //This is a more performant alternative to re-bootstrapping the entire App.
    var injector = angular.element($('#PageContentOuterDiv')[0]).injector()
    var compileService = injector.get('$compile');
    angular.forEach($("[viewtype='tableView']" ), function (value, key) {

      //Return if the directive is already compiled and linked.(if the searchId(sid) is associated to the table then it is already linked)
      if (value.getAttribute('sid')) return;

      value.setAttribute('obi-table', 'true')

      var scope = ((angular.element(value).scope()));
      var linkFn = compileService(value, scope);
      console.log('In bootstrapChatterApp(): linking mutated DOM with scope...');
      linkFn(scope);


    });

  }

  bmPlatformBooting = false;

}


function observeChatterSensitiveDOMChanges() {

  if ((!bmPlatformLoaded) || bmPlatformLoading || bmPlatformBooting) return;

  bmPlatformLoading = true;

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//In Analysis Mode
  var targetViewElementArray = $(document).find('div[id^=tableView]');

//In Dashboard Mode
  if (targetViewElementArray.length < 1) {
    targetViewElementArray = $(document).find('td[id*=tableView]');
  }

  if (targetViewElementArray.length < 1) {
    targetViewElementArray = $('.ViewContainer');
  }

  $.each(targetViewElementArray, function (viewIdx, viewElement) {

    var newScope;

    var observer = new MutationObserver(function (mutations) {

      /*    mutations.forEach(function(mutation) {
       console.log(mutation.type);
       });*/

      console.log('mutated ' + viewElement.getAttribute('id'));


    //  var pivotTables = $(viewElement).find('.PTChildPivotTable');

      //var tables = $(viewElement).find("[viewtype='tableView']");

      var table=viewElement;



      console.log(($(viewElement).find('td[id^=e_saw]')[0].getAttribute('obi-table-cell')));

      //TODO Fine-tune performance - to handle only specific DOM mutations
      if (!table.getAttribute('sid') || (!($(viewElement).find('td[id^=e_saw]')[0].getAttribute('obi-table-cell')=='true'))) {

        console.log('Re-linking from mutation observer')

        // bootstrapChatterApp();


        //Recompile to cater to the changes
        var injector = angular.element($('#PageContentOuterDiv')[0]).injector()
        var compileService = injector.get('$compile');

        table.setAttribute('obi-table', 'true');

        if (newScope) {
          newScope.$destroy();
        }
        var scope = ((angular.element(table).scope()));
        newScope = scope.$new();
        var linkFn = compileService(table, newScope);
        console.log('linking mutated DOM with scope...');
        linkFn(newScope);

      }

    });

    observer.observe(viewElement, {
      //attributes: true,
      childList: true
      //characterData: true,
      //subtree: true
    });


  })

  bmPlatformLoading = false;

}


//Todo Wrap it in a function to avoid polluting global namespace

