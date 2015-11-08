var requirejs = 'PLACEHOLDER_CONF'
var bmPlatformLoaded;


if ((typeof angular == 'undefined') && (!bmPlatformLoading)) { //bm.platform Loaded for the first time - Load JS and CSS files


  var bmPlatformLoading=true;

  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added Requirejs to head');


  requireJSScriptElement.onload = function () {

    console.log('calling requireJS Load...');
    require(['PLACEHOLDER_LOAD'], function (ang) {
        if ((typeof obips != 'undefined')) {
          console.log('Context inside OBI - Manually bootstrapping angular')
          bmPlatformLoaded=true;
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

  if((typeof bmPlatformLoaded == 'undefined') || (!bmPlatformLoaded)) return;

  console.log('In Bootstrap!');


  var pageContentDiv=$('#PageContentOuterDiv')[0];

  //Bootstrap if not already.
  //The First view to set this attribute will have to responsibility of bootstrapping the entire app into context
  if (!(pageContentDiv.getAttribute('obi-chatter-enable'))) {

    //attach chatter directive - this will make angular loop through table elements and attach further directives
    pageContentDiv.setAttribute('obi-chatter-enable', 'true');

    console.log('New - Attempt to attach angular to page content DIV');

    angular.bootstrap(pageContentDiv, ['bm.platform']);
    console.log('Angular Bootstraped for View ' + 'bm.platform');

  }else{

    //Angular is already bootstrapped but the views might have been re-rendered by OBI. This requires a re-compile of the views with the existing scope.
    //This is a more performant alternative to re-bootstrapping the entire App.
    var injector=angular.element($('#PageContentOuterDiv')[0]).injector()
    var compileService=injector.get('$compile');
    angular.forEach($('.PTChildPivotTable'), function (value, key) {
      value.setAttribute('obi-table', 'true')
      var scope=((angular.element(value).scope()));
      var linkFn=compileService(value,scope);
      console.log('linking mutated DOM with scope...');
      var content = linkFn(scope);

    });



  }


  /*

  $.each($("[vid*='tableView']"),function(index,tableParentElement){
    //var tableParentElement = $('.PTChildPivotTable');

    console.log(tableParentElement)

    //Bootstrap if not already
    if (!(tableParentElement.getAttribute('obi-table'))) {

      console.log('New - Attempt to attach angular to View');
      //var tableParentElement = $('.PTChildPivotTable');
      //tableParentElement.setAttribute('ng-controller', 'MainController as chatter');
      //attach chatter directive - this will make angular loop through table child elements and attach further directives before compile
      tableParentElement.setAttribute('obi-table', 'true');
      angular.bootstrap(tableParentElement, [tableParentElement.getAttribute('vid')]);
      console.log('Angular Bootstraped for View ' + tableParentElement.getAttribute('vid'));

    }

  })
  */



}


function observeChatterSensitiveDOMChanges() {

  if((typeof bmPlatformLoaded == 'undefined') || (!bmPlatformLoaded)) return;

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



      //TODO Finetune performance - to handle only specific DOM mutations
      if (($(viewElement).find('.PTChildPivotTable').length>0)  && ((typeof angular == 'undefined') || !(($(viewElement).find('.PTChildPivotTable').attr('obi-table'))=='true')) ) {

        console.log('Re-bootstrapping from mutation observer')

        bootstrapChatterApp();
      }

    });

    observer.observe(viewElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });


  })



}


//Todo Wrap it in a function to avoid polluting global namespace

