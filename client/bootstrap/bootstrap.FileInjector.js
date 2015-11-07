var requirejs = 'PLACEHOLDER_CONF'

if ((typeof angular == 'undefined')) { //bm.platform Loaded for the first time - Load JS and CSS files



  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added Requirejs to head');


  requireJSScriptElement.onload = function () {

    console.log('calling requireJS Load...');
    require(['PLACEHOLDER_LOAD'], function (ang) {
        if ((typeof obips != 'undefined')) {
          console.log('Context inside OBI - Manually bootstrapping angular')
          boostrapChatterApp();
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
    boostrapChatterApp();
    observeChatterSensitiveDOMChanges();
  } else {
    angular.bootstrap(document, ['bm.platform']);
  }

}


function boostrapChatterApp() {


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






}


function observeChatterSensitiveDOMChanges() {


  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//In Analysis Mode
  var targetElementArray = $(document).find('div[id^=tableView]');

//In Dashboard Mode
  if (targetElementArray.length < 1) {
    targetElementArray = $(document).find('td[id*=tableView]');
  }

  if (targetElementArray.length < 1) {
    targetElementArray = $('.ViewContainer');
  }

//TODO Fix this to handle all tables
  var list = targetElementArray[0];

  console.log(list);

  var observer = new MutationObserver(function (mutations) {
    //mutations.forEach(function(mutation) {
    //  console.log(mutation.type);
    //});

    //TODO Finetune performance - to handle only specific DOM mutations
    if (!(angular.element($('.PTChildPivotTable')).scope())) {
      boostrapChatterApp();

    }

  });

  observer.observe(list, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });

}


//Todo Wrap it in a function to avoid polluting global namespace

