var requirejs = {
  baseUrl: 'http://localhost:8000',
  paths: {
    'angular': 'bower_components/angular/angular.min',
    jquery: 'bower_components/jquery/dist/jquery',
    //angularanimate: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.29/angular-animate',
    biChatter: 'biApp/biChatterNew',
    //dialog: 'bower_components/angular-dialog-service/dist/dialogs',
    uiBootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min',
    sanitize: 'bower_components/angular-sanitize/angular-sanitize',
    router:'bower_components/angular-ui-router/release/angular-ui-router.min',
    uiBootstrapTmplts: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',

    //uiBootstrapTmplts:'//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.13.4',

    elastictext: 'bower_components/angular-elastic/elastic',
    //placehold: 'bower_components/jquery-placeholder/jquery.placeholder.min',
    tagsinput: 'bower_components/ng-tags-input/ng-tags-input.min',
    angularmoment:'bower_components/angular-moment/angular-moment.min',
    momentjs: 'bower_components/moment/min/moment.min',
    firebase: 'bower_components/firebase/firebase',
    angularfire: 'bower_components/angularfire/dist/angularfire',
    uitree:'bower_components/angular-ui-tree/dist/angular-ui-tree.min',
    cryptojs:'bower_components/cryptojslib/rollups/sha1',
    css: 'app/components/CSSLoader/dist/css'
  },
  shim: {
    angular: {
      deps: ['jquery']
    },
    //placehold: {
    //  deps: ['jquery']
    //},
    //dialog: {
    //  deps: ['angular']
    //},
    cryptojs: {
      deps: ['angular']
    },
    firebase: {
      deps: ['angular']
    },
    router: {
      deps: ['angular']
    },
    //angularmoment: {
    //  deps: ['angular']
    //},
    uiBootstrap: {
      deps: ['angular']
    },
    uiBootstrapTmplts: {
      deps: ['angular']
    },
    sanitize: {
      deps: ['angular']
    },
    //angularanimate: {
    //  deps: ['angular']
    //},
    elastictext: {
      deps: ['angular']
    },
    tagsinput: {
      deps: ['angular']
    },
    angularfire: {
      deps: ['angular','firebase']
    },
    uitree: {
      deps: ['angular']
    },
    biChatter: {
      deps: ['angular']
    }
  }
};

if (!window.jQuery) { //biChatter Loaded for the first time - Load JS and CSS files


  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added requirejs to head');

  requireJSScriptElement.onload = function () {

    require([
        'jquery',
        //'placehold',
        'angular',
        'biChatter',
        //'dialog',
        'uiBootstrap',
        'uiBootstrapTmplts',
        'sanitize',
        'elastictext',
        'tagsinput',
        //'momentjs',
        'firebase',
        'angularfire',
        'cryptojs',
        'uitree',
        //'angularmoment',
        'router',
        'css!bower_components/components-font-awesome/css/font-awesome.css',
        'css!bower_components/bootstrap/dist/css/bootstrap.css',
        //'css!bower_components/angular-dialog-service/dist/dialogs.css',
        'css!bower_components/ng-tags-input/ng-tags-input.min.css',
        //'css!bower_components/angular-ui-tree/dist/angular-ui-tree.min.css',
        'css!biApp/app.css'
      ], function (ang) {

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

