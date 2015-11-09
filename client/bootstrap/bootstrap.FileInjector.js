var requirejs = 'PLACEHOLDER_CONF'


//These variables are used as semaphores to ensure that only one view can load and bootstrap the app
var bmPlatformLoaded;
var bmPlatformLoading;

if ((typeof angular == 'undefined') && (!bmPlatformLoading)) { //bm.platform Loaded for the first time - Load JS and CSS files


  bmPlatformLoading=true;

  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added Requirejs to head');

  var materialIconsElement = document.createElement("link");

  materialIconsElement["href"] = "https://fonts.googleapis.com/icon?family=Material+Icons";
  materialIconsElement["rel"] = "stylesheet";

  document.getElementsByTagName("head")[0].appendChild(materialIconsElement);
  console.log('added material icons to head');


  //
  //
  //<script async src="//d1ks1friyst4m3.cloudfront.net/toolbar/prod/td.js" data-trackduck-id="563f8dfb3af4b747301d2f16"></script>
  //

  requireJSScriptElement.onload = function () {

    console.log('calling requireJS Load...');
    require(['PLACEHOLDER_LOAD'], function (ang) {
        if ((typeof obips != 'undefined')) {
          console.log('Context inside OBI - Manually bootstrapping angular')
          bmPlatformLoaded=true;
          bmPlatformLoading=false;
          bootstrapChatterApp();
          observeChatterSensitiveDOMChanges();

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
    bootstrapChatterApp();
    observeChatterSensitiveDOMChanges();
  } else {
    angular.bootstrap(document, ['bm.platform']);
  }

}





function bootstrapChatterApp() {



  if((typeof bmPlatformLoaded == 'undefined') || (!bmPlatformLoaded) || bmPlatformLoading) return;


  bmPlatformLoading=true;
  console.log('In Bootstrap!');


  var pageContentDiv=$('#PageContentOuterDiv')[0];

  //Bootstrap if not already.
  //The First view to set this attribute will have to responsibility of bootstrapping the entire app into context
  if (!(pageContentDiv.getAttribute('obi-chatter-enable'))) {

    //attach chatter directive - this will make angular loop through table elements and attach further directives
    pageContentDiv.setAttribute('obi-chatter-enable', 'true');


    $('.DashboardPageContentDiv').append( "<div obi-fab-menu='true'>Test</div>" );

      //  pageContentDiv.setAttribute('obi-fab-menu', 'true');

    console.log('New - Attempt to attach angular to page content DIV');

    angular.bootstrap(pageContentDiv, ['bm.platform']);
    console.log('Angular Bootstraped: ' + 'bm.platform');

  }else{

    //Angular is already bootstrapped but the views might have been re-rendered by OBI. This requires a re-compile of the views with the existing scope.
    //This is a more performant alternative to re-bootstrapping the entire App.
    var injector=angular.element($('#PageContentOuterDiv')[0]).injector()
    var compileService=injector.get('$compile');
    angular.forEach($('.PTChildPivotTable'), function (value, key) {

      //Return if the directive is already attached to the view
      if(value.getAttribute('obi-table')=='true') return;

      value.setAttribute('obi-table', 'true')
      var scope=((angular.element(value).scope()));
      var linkFn=compileService(value,scope);
      console.log('linking mutated DOM with scope...');
      var content = linkFn(scope);

    });



  }


  bmPlatformLoading=false;

}


function observeChatterSensitiveDOMChanges() {

  if((typeof bmPlatformLoaded == 'undefined') || (!bmPlatformLoaded) || bmPlatformLoading) return;

  bmPlatformLoading=true;

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

  $.each(targetViewElementArray,function(viewIdx,viewElement){


    var observer = new MutationObserver(function (mutations) {
      /*    mutations.forEach(function(mutation) {
       console.log(mutation.type);
       });*/


      console.log('mutated ' + viewElement.getAttribute('id'));


      var pivotTables=$(viewElement).find('.PTChildPivotTable');

      //TODO Fine-tune performance - to handle only specific DOM mutations
      if (!pivotTables.attr('obi-table'))  {

        console.log('Re-linking from mutation observer')

       // bootstrapChatterApp();

        var injector = angular.element($('#PageContentOuterDiv')[0]).injector()
        var compileService = injector.get('$compile');

        pivotTables.attr('obi-table', 'true')
        var scope = ((angular.element(pivotTables).scope()));
        var linkFn = compileService(pivotTables, scope);
        console.log('linking mutated DOM with scope...');
        var content = linkFn(scope);

      }

    });

    observer.observe(viewElement, {
      //attributes: true,
      childList: true
      //characterData: true,
      //subtree: true
    });


  })

  bmPlatformLoading=false;

}


//Todo Wrap it in a function to avoid polluting global namespace

