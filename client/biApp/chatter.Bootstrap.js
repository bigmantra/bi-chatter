var requirejs = {
  "baseUrl": "http://localhost:3000",
  "paths": {
    "angular": "bower_components/angular/angular",
    "angular-animate": "bower_components/angular-animate/angular-animate",
    "angular-cookies": "bower_components/angular-cookies/angular-cookies",
    "angular-sanitize": "bower_components/angular-sanitize/angular-sanitize",
    "angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router",
    "angular-bootstrap": "bower_components/angular-bootstrap/ui-bootstrap-tpls",
    "malarkey": "bower_components/malarkey/dist/malarkey.min",
    "toastr": "bower_components/toastr/toastr",
    "moment": "bower_components/moment/moment",
    "angular-elastic": "bower_components/angular-elastic/elastic",
    "ng-tags-input": "bower_components/ng-tags-input/ng-tags-input.min",
    "angular-ui-tree": "bower_components/angular-ui-tree/dist/angular-ui-tree",
    "firebase": "bower_components/firebase/firebase",
    "angularfire": "bower_components/angularfire/dist/angularfire",
    "angular-moment": "bower_components/angular-moment/angular-moment",
    "cryptojslib": "bower_components/cryptojslib/rollups/sha1", /*BEGIN_APPDEPS*/
    "appDep0": "app/index.config",
    "appDep1": "app/index.constants",
    "appDep2": "app/index.module",
    "appDep3": "app/index.route",
    "appDep4": "app/index.run",
    "appDep5": "app/chatter/chatter.controller.comments",
    "appDep6": "app/chatter/chatter.controller.maincontroller",
    "appDep7": "app/chatter/chatter.controller.modalinstance",
    "appDep8": "app/chatter/chatter.controller.tablecell",
    "appDep9": "app/chatter/chatter.directives",
    "appDep10": "app/chatter/chatter.filters",
    "appDep11": "app/chatter/chatter.services",
    "appDep12": "app/main/main.controller",
    "appDep13": "app/main/main.controller.spec",
    "appDep14": "app/components/githubContributor/githubContributor.service",
    "appDep15": "app/components/malarkey/malarkey.directive",
    "appDep16": "app/components/cryptojs/sha1",
    "appDep17": "app/components/navbar/navbar.directive",
    "appDep18": "app/components/webDevTec/webDevTec.service",
    "appDep19": "app/components/CSSLoader/dist/css" /*END_APPDEPS*/
  },
  "shim": {
    "angular": {"deps": ["jquery"]},
    "angular-animate": {"deps": ["angular"]},
    "angular-cookies": {"deps": ["angular"]},
    "angular-sanitize": {"deps": ["angular"]},
    "jquery": {"deps": []},
    "angular-ui-router": {"deps": ["angular"]},
    "bootstrap-sass-official": {"deps": ["jquery"]},
    "angular-bootstrap": {"deps": ["angular"]},
    "malarkey": {"deps": []},
    "toastr": {"deps": ["jquery"]},
    "moment": {"deps": []},
    "animate.css": {"deps": []},
    "angular-elastic": {"deps": ["angular"]},
    "ng-tags-input": {"deps": ["angular"]},
    "angular-ui-tree": {"deps": ["angular"]},
    "firebase": {"deps": []},
    "angularfire": {"deps": ["angular", "firebase"]},
    "angular-moment": {"deps": ["angular", "moment"]},
    "components-font-awesome": {"deps": []},
    "bootstrap": {"deps": ["jquery"]},
    "cryptojslib": {"deps": []}, /*BEGIN_APPSHIM*/
    "appDep0": {"deps": ["angular"]},
    "appDep1": {"deps": ["angular"]},
    "appDep2": {"deps": ["angular"]},
    "appDep3": {"deps": ["angular"]},
    "appDep4": {"deps": ["angular"]},
    "appDep5": {"deps": ["angular"]},
    "appDep6": {"deps": ["angular"]},
    "appDep7": {"deps": ["angular"]},
    "appDep8": {"deps": ["angular"]},
    "appDep9": {"deps": ["angular"]},
    "appDep10": {"deps": ["angular"]},
    "appDep11": {"deps": ["angular"]},
    "appDep12": {"deps": ["angular"]},
    "appDep13": {"deps": ["angular"]},
    "appDep14": {"deps": ["angular"]},
    "appDep15": {"deps": ["angular"]},
    "appDep16": {"deps": ["angular"]},
    "appDep17": {"deps": ["angular"]},
    "appDep18": {"deps": ["angular"]},
    "appDep19": {"deps": ["angular"]} /*END_APPSHIM*/
  }
}

if (!window.jQuery) { //biChatter Loaded for the first time - Load JS and CSS files


  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added requirejs to head');

  requireJSScriptElement.onload = function () {

    require(['angular', 'angular-animate', 'angular-cookies', 'angular-sanitize', 'angular-ui-router', 'angular-bootstrap', 'malarkey', 'toastr', 'moment', 'css!bower_components/animate.css/animate.css', 'angular-elastic', 'ng-tags-input', 'css!bower_components/ng-tags-input/ng-tags-input.min.css', 'angular-ui-tree', 'firebase', 'angularfire', 'angular-moment', 'css!bower_components/components-font-awesome/css/font-awesome.css', 'css!bower_components/bootstrap/dist/css/bootstrap.css', 'cryptojslib', /*BEGIN_APPARRDEPS*/ "appDep0", "appDep1", "appDep2", "appDep3", "appDep4", "appDep5", "appDep6", "appDep7", "appDep8", "appDep9", "appDep10", "appDep11", "appDep12", "appDep13", "appDep14", "appDep15", "appDep16", "appDep17", "appDep18", "appDep19", "css!app/app.css" /*END_APPARRDEPS*/], function (ang) {
        boostrapChatterApp();
        observeChatterSensitiveDOMChanges();
      }
    );
  }
}
else {
  console.log('Everything already loaded');
  boostrapChatterApp();
  observeChatterSensitiveDOMChanges();

}


var boostrapChatterApp = function () {

  var tableParentElement = $('.PTChildPivotTable');

  //Bootstrap if not already
  if (!(tableParentElement.attr('bi-chatter-table'))) {

    console.log('New - Attempt to attach angular to View');
    var tableParentElement = $('.PTChildPivotTable');
    tableParentElement.attr('ng-controller', 'MainController as chatter');
    //attach chatter directive - this will make angular loop through table child elements and attach further directives before compile
    tableParentElement.attr('bi-chatter-table', 'true');
    angular.bootstrap($('.PTChildPivotTable')[0], ['biChatter']);

    console.log('Angular Bootstraped!!!');


  }


  document.onload = function () {
    console.log("Document Loaded!!!");
  };

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

