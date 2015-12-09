var requirejs = {"baseUrl":"http://localhost:3000","paths":{"angular":"bower_components/angular/angular","angular-animate":"bower_components/angular-animate/angular-animate","angular-cookies":"bower_components/angular-cookies/angular-cookies","angular-sanitize":"bower_components/angular-sanitize/angular-sanitize","jquery":"bower_components/jquery/dist/jquery","angular-ui-router":"bower_components/angular-ui-router/release/angular-ui-router","angular-bootstrap":"bower_components/angular-bootstrap/ui-bootstrap-tpls","malarkey":"bower_components/malarkey/dist/malarkey.min","toastr":"bower_components/toastr/toastr","angular-elastic":"bower_components/angular-elastic/elastic","ng-tags-input":"bower_components/ng-tags-input/ng-tags-input.min","angular-ui-tree":"bower_components/angular-ui-tree/dist/angular-ui-tree","firebase":"bower_components/firebase/firebase","angularfire":"bower_components/angularfire/dist/angularfire","cryptojslib":"bower_components/cryptojslib/rollups/sha1","moment":"bower_components/moment/moment","angular-moment":"bower_components/angular-moment/angular-moment","angular-aria":"bower_components/angular-aria/angular-aria","angular-material":"bower_components/angular-material/angular-material","angular-material-icons":"bower_components/angular-material-icons/angular-material-icons.min",/*BEGIN_APPDEPS*/ "dynamic.modules":  "app/dynamic.modules", "index.config":  "app/index.config", "index.constants":  "app/index.constants", "index.module":  "app/index.module", "index.route":  "app/index.route", "index.run":  "app/index.run", "chatter.Bootstrap":  "app/chatter/chatter.Bootstrap", "chatter.controller.consoleChatter":  "app/chatter/chatter.controller.consoleChatter", "chatter.controller.modalInstance":  "app/chatter/chatter.controller.modalInstance", "chatter.controller.tablecell":  "app/chatter/chatter.controller.tablecell", "chatter.directive.focusMe":  "app/chatter/chatter.directive.focusMe", "chatter.directive.morphInput":  "app/chatter/chatter.directive.morphInput", "chatter.directive.obiChatterEnable":  "app/chatter/chatter.directive.obiChatterEnable", "chatter.directive.obiTable":  "app/chatter/chatter.directive.obiTable", "chatter.directive.obiTableCell":  "app/chatter/chatter.directive.obiTableCell", "chatter.directive.topic":  "app/chatter/chatter.directive.topic", "chatter.filters":  "app/chatter/chatter.filters", "chatter.module":  "app/chatter/chatter.module", "chatter.service.state":  "app/chatter/chatter.service.state", "chatter.services":  "app/chatter/chatter.services", "common.directive.paletteBackground":  "app/common/common.directive.paletteBackground", "main.controller":  "app/main/main.controller", "main.controller.spec":  "app/main/main.controller.spec", "chatter.controller.contextChatterDialog":  "app/chatter/contextChatterDialog/chatter.controller.contextChatterDialog", "chatter.directive.obiSideNavButton":  "app/chatter/sideNav/chatter.directive.obiSideNavButton", "chatter.directive.sideNav":  "app/chatter/sideNav/chatter.directive.sideNav", "sha1":  "app/components/cryptojs/sha1", "githubContributor.service":  "app/components/githubContributor/githubContributor.service", "malarkey.directive":  "app/components/malarkey/malarkey.directive", "navbar.directive":  "app/components/navbar/navbar.directive", "webDevTec.service":  "app/components/webDevTec/webDevTec.service", "css":  "app/components/CSSLoader/dist/css" /*END_APPDEPS*/},"shim":{"angular":{"deps":["jquery"],"exports":"angular"},"angular-animate":{"deps":["angular"]},"angular-cookies":{"deps":["angular"]},"angular-sanitize":{"deps":["angular"]},"jquery":{"deps":[]},"angular-ui-router":{"deps":["angular"]},"angular-bootstrap":{"deps":["angular"]},"malarkey":{"deps":[]},"toastr":{"deps":["jquery"]},"animate.css":{"deps":[]},"angular-elastic":{"deps":["angular"]},"ng-tags-input":{"deps":["angular"]},"angular-ui-tree":{"deps":["angular"]},"firebase":{"deps":[]},"angularfire":{"deps":["angular","firebase"]},"components-font-awesome":{"deps":[]},"cryptojslib":{"deps":[]},"moment":{"deps":[]},"angular-moment":{"deps":["angular","moment"]},"angular-aria":{"deps":["angular"]},"angular-material":{"deps":["angular","angular-animate","angular-aria"]},"angular-material-icons":{"deps":["angular"]},"salesforce-lightning-design-system":{"deps":[]},/*BEGIN_APPSHIM*/ "dynamic.modules": {"deps": ["angular"]}, "index.config": {"deps": ["angular"]}, "index.constants": {"deps": ["angular"]}, "index.module": {"deps": ["angular"]}, "index.route": {"deps": ["angular"]}, "index.run": {"deps": ["angular"]}, "chatter.Bootstrap": {"deps": ["angular"]}, "chatter.controller.consoleChatter": {"deps": ["angular"]}, "chatter.controller.modalInstance": {"deps": ["angular"]}, "chatter.controller.tablecell": {"deps": ["angular"]}, "chatter.directive.focusMe": {"deps": ["angular"]}, "chatter.directive.morphInput": {"deps": ["angular"]}, "chatter.directive.obiChatterEnable": {"deps": ["angular"]}, "chatter.directive.obiTable": {"deps": ["angular"]}, "chatter.directive.obiTableCell": {"deps": ["angular"]}, "chatter.directive.topic": {"deps": ["angular"]}, "chatter.filters": {"deps": ["angular"]}, "chatter.module": {"deps": ["angular"]}, "chatter.service.state": {"deps": ["angular"]}, "chatter.services": {"deps": ["angular"]}, "common.directive.paletteBackground": {"deps": ["angular"]}, "main.controller": {"deps": ["angular"]}, "main.controller.spec": {"deps": ["angular"]}, "chatter.controller.contextChatterDialog": {"deps": ["angular"]}, "chatter.directive.obiSideNavButton": {"deps": ["angular"]}, "chatter.directive.sideNav": {"deps": ["angular"]}, "sha1": {"deps": ["angular"]}, "githubContributor.service": {"deps": ["angular"]}, "malarkey.directive": {"deps": ["angular"]}, "navbar.directive": {"deps": ["angular"]}, "webDevTec.service": {"deps": ["angular"]}, "css": {"deps": ["angular"]} /*END_APPSHIM*/}}


//These variables are used as semaphores to ensure that only one view can load and bootstrap the app
var bmPlatformLoaded = false;
var bmPlatformLoading = false;
var bmPlatformBooting = false;

if (((typeof angular == 'undefined') || (typeof $ == 'undefined')  ) && (!bmPlatformLoading)) { //bm.platform Loaded for the first time - Load JS and CSS files


  bmPlatformLoading = true;

  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);

  console.log('added Requirejs to head');


  var svgJSScriptElement = document.createElement("script");

  svgJSScriptElement["src"] = "https://jonathantneal.github.io/svg4everybody/svg4everybody.min.js";
  document.getElementsByTagName("head")[0].appendChild(svgJSScriptElement);
  console.log('added svg polyfill to head');


  var materialIconsElement = document.createElement("link");

  materialIconsElement["href"] = "https://fonts.googleapis.com/icon?family=Material+Icons";
  materialIconsElement["rel"] = "stylesheet";

  document.getElementsByTagName("head")[0].appendChild(materialIconsElement);
  console.log('added material icons to head');



  //run svg polyfill
  svgJSScriptElement.onload = function () {
    svg4everybody();
    console.log('svg polyfill loaded');

  }

  requireJSScriptElement.onload = function () {

    console.log('calling requireJS Load...');
    require(['angular','angular-animate','angular-cookies','angular-sanitize','jquery','angular-ui-router','angular-bootstrap','malarkey','toastr','css!bower_components/animate.css/animate.css','angular-elastic','ng-tags-input','css!bower_components/ng-tags-input/ng-tags-input.min.css','angular-ui-tree','firebase','angularfire','css!bower_components/components-font-awesome/css/font-awesome.css','cryptojslib','moment','angular-moment','angular-aria','angular-material','css!bower_components/angular-material/angular-material.css','angular-material-icons','css!bower_components/angular-material-icons/angular-material-icons.css','css!bower_components/salesforce-lightning-design-system/assets/styles/salesforce-lightning-design-system-ltng.css','css!app/app.css' ,/*BEGIN_APPARRDEPS*/ "dynamic.modules", "index.config", "index.constants", "index.module", "index.route", "index.run", "chatter.controller.consoleChatter", "chatter.controller.modalInstance", "chatter.controller.tablecell", "chatter.directive.focusMe", "chatter.directive.morphInput", "chatter.directive.obiChatterEnable", "chatter.directive.obiTable", "chatter.directive.obiTableCell", "chatter.directive.topic", "chatter.filters", "chatter.module", "chatter.service.state", "chatter.services", "common.directive.paletteBackground", "main.controller", "main.controller.spec", "chatter.controller.contextChatterDialog", "chatter.directive.obiSideNavButton", "chatter.directive.sideNav", "sha1", "githubContributor.service", "malarkey.directive", "navbar.directive", "webDevTec.service", "css" /*END_APPARRDEPS*/], function (ang) {
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
    bmPlatformLoaded = true;
    bmPlatformLoading = false;
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

  var contextCollection = BIGate.getViewDataReferences();

  console.log(contextCollection);

  var allReportsPromises = BIGate.getAllReportsXML();

  allReportsPromises.then(function (responses) {

    var allMetadataPromises = BIGate.getAllReportsMetadata(responses);

    allMetadataPromises.then(function (metaDataResponses) {

      console.info('Report metadata loaded for ' + metaDataResponses.length + ' Reports.');
      console.log(metaDataResponses);

      var mergedCollection = BIGate.getMergedContextCollection(metaDataResponses, contextCollection)

      console.log('Merged:')
      console.log(mergedCollection);

      //Load metadata and Context Info into an app Constant so it is available as a service throughout
      angular
        .module('bm.platform')
        .constant('metaDataResponses', metaDataResponses);
      angular
        .module('bm.platform')
        .value('contextCollection', mergedCollection);


      bmPlatformLoaded = true;
      bmPlatformLoading = false;
      bootstrapChatterApp();
      observeChatterSensitiveDOMChanges();

    })

  });

}


function bootstrapChatterApp() {


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

    $('.DashboardPageContentDiv').addClass('md-sidenav-push-in-target');

//    $('.DashboardPageContentDiv').append("<div obi-fab-menu='true'></div>");

    $('.DashboardPageContentDiv').append("<div obi-side-nav-button='true'></div>");

    $('.DashboardPageContentDiv').after("<div obi-side-nav='true'></div>");


    //  pageContentDiv.setAttribute('obi-fab-menu', 'true');

    console.log('New - Attempt to attach angular to page content DIV');

    angular.bootstrap(pageContentDiv, ['bm.platform']);
    console.log('Angular Bootstraped: ' + 'bm.platform');

  } else {

    //Angular is already bootstrapped but the views might have been re-rendered by OBI. This requires a re-compile of the views with the existing scope.
    //This is a more performant alternative to re-bootstrapping the entire App.
    var injector = angular.element($('#PageContentOuterDiv')[0]).injector()
    var compileService = injector.get('$compile');
    angular.forEach($("[viewtype='tableView']"), function (value, key) {

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

      var table = viewElement;

      //TODO Fine-tune performance - to handle only specific DOM mutations
      if (!table.getAttribute('sid') || (!($(viewElement).find('td[id^=e_saw]')[0].getAttribute('obi-table-cell') == 'true'))) {

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

