//Angular Loader to ensure modules can be loaded in any order. Taken from the Angular seed application on github
/*
'use strict';
(function (i) {
  function d(c, a, e) {
    return c[a] || (c[a] = e())
  }

  return d(d(i, "angular", Object), "module", function () {
    var c = {};
    return function (a, e, f) {
      e && c.hasOwnProperty(a) && (c[a] = null);
      return d(c, a, function () {
        function b(a, b, d) {
          return function () {
            c[d || "push"]([a, b, arguments]);
            return g
          }
        }

        if (!e)throw Error("No module: " + a);
        var c = [], d = [], h = b("$injector", "invoke"), g = {
          _invokeQueue: c,
          _runBlocks: d,
          requires: e,
          name: a,
          provider: b("$provide", "provider"),
          factory: b("$provide", "factory"),
          service: b("$provide", "service"),
          value: b("$provide", "value"),
          constant: b("$provide", "constant", "unshift"),
          filter: b("$filterProvider", "register"),
          directive: b("$compileProvider", "directive"),
          config: h,
          run: function (a) {
            d.push(a);
            return this
          }
        };
        f && h(f);
        return g
      })
    }
  })
})(window);
*/


var requirejs = {"baseUrl":"http://localhost:3000","paths":{"angular":"bower_components/angular/angular","angular-animate":"bower_components/angular-animate/angular-animate","angular-cookies":"bower_components/angular-cookies/angular-cookies","angular-sanitize":"bower_components/angular-sanitize/angular-sanitize","jquery":"bower_components/jquery/dist/jquery","angular-ui-router":"bower_components/angular-ui-router/release/angular-ui-router","angular-bootstrap":"bower_components/angular-bootstrap/ui-bootstrap-tpls","malarkey":"bower_components/malarkey/dist/malarkey.min","toastr":"bower_components/toastr/toastr","moment":"bower_components/moment/moment","angular-elastic":"bower_components/angular-elastic/elastic","ng-tags-input":"bower_components/ng-tags-input/ng-tags-input.min","angular-ui-tree":"bower_components/angular-ui-tree/dist/angular-ui-tree","firebase":"bower_components/firebase/firebase","angularfire":"bower_components/angularfire/dist/angularfire","cryptojslib":"bower_components/cryptojslib/rollups/sha1",/*BEGIN_APPDEPS*/ "index.config":  "app/index.config", "index.constants":  "app/index.constants", "index.module":  "app/index.module", "index.route":  "app/index.route", "index.run":  "app/index.run", "chatter.controller.comments":  "app/chatter/chatter.controller.comments", "chatter.controller.maincontroller":  "app/chatter/chatter.controller.maincontroller", "chatter.controller.modalinstance":  "app/chatter/chatter.controller.modalinstance", "chatter.controller.tablecell":  "app/chatter/chatter.controller.tablecell", "chatter.directives":  "app/chatter/chatter.directives", "chatter.filters":  "app/chatter/chatter.filters", "chatter.services":  "app/chatter/chatter.services", "manual.bootstrap":  "app/chatter/manual.bootstrap", "main.controller":  "app/main/main.controller", "main.controller.spec":  "app/main/main.controller.spec", "githubContributor.service":  "app/components/githubContributor/githubContributor.service", "sha1":  "app/components/cryptojs/sha1", "navbar.directive":  "app/components/navbar/navbar.directive", "malarkey.directive":  "app/components/malarkey/malarkey.directive", "webDevTec.service":  "app/components/webDevTec/webDevTec.service", "css":  "app/components/CSSLoader/dist/css" /*END_APPDEPS*/},"shim":{"angular":{"deps":["jquery"]},"angular-animate":{"deps":["angular"]},"angular-cookies":{"deps":["angular"]},"angular-sanitize":{"deps":["angular"]},"jquery":{"deps":[]},"angular-ui-router":{"deps":["angular"]},"bootstrap-sass-official":{"deps":["jquery"]},"angular-bootstrap":{"deps":["angular"]},"malarkey":{"deps":[]},"toastr":{"deps":["jquery"]},"moment":{"deps":[]},"animate.css":{"deps":[]},"angular-elastic":{"deps":["angular"]},"ng-tags-input":{"deps":["angular"]},"angular-ui-tree":{"deps":["angular"]},"firebase":{"deps":[]},"angularfire":{"deps":["angular","firebase"]},"components-font-awesome":{"deps":[]},"bootstrap":{"deps":["jquery"]},"cryptojslib":{"deps":[]},/*BEGIN_APPSHIM*/ "index.config": {"deps": ["angular"]}, "index.constants": {"deps": ["angular"]}, "index.module": {"deps": ["angular"]}, "index.route": {"deps": ["angular"]}, "index.run": {"deps": ["angular"]}, "chatter.controller.comments": {"deps": ["angular"]}, "chatter.controller.maincontroller": {"deps": ["angular"]}, "chatter.controller.modalinstance": {"deps": ["angular"]}, "chatter.controller.tablecell": {"deps": ["angular"]}, "chatter.directives": {"deps": ["angular"]}, "chatter.filters": {"deps": ["angular"]}, "chatter.services": {"deps": ["angular"]}, "manual.bootstrap": {"deps": ["angular"]}, "main.controller": {"deps": ["angular"]}, "main.controller.spec": {"deps": ["angular"]}, "githubContributor.service": {"deps": ["angular"]}, "sha1": {"deps": ["angular"]}, "navbar.directive": {"deps": ["angular"]}, "malarkey.directive": {"deps": ["angular"]}, "webDevTec.service": {"deps": ["angular"]}, "css": {"deps": ["angular"]} /*END_APPSHIM*/}}

if (!window.jQuery) { //biChatter Loaded for the first time - Load JS and CSS files


  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added requirejs to head');

  requireJSScriptElement.onload = function () {

    require(['angular','angular-animate','angular-cookies','angular-sanitize','jquery','angular-ui-router','angular-bootstrap','malarkey','toastr','moment','css!bower_components/animate.css/animate.css','angular-elastic','ng-tags-input','css!bower_components/ng-tags-input/ng-tags-input.min.css','angular-ui-tree','firebase','angularfire','css!bower_components/components-font-awesome/css/font-awesome.css','css!bower_components/bootstrap/dist/css/bootstrap.css','cryptojslib' ,/*BEGIN_APPARRDEPS*/ "index.config", "index.constants", "index.module", "index.route", "index.run", "chatter.controller.comments", "chatter.controller.maincontroller", "chatter.controller.modalinstance", "chatter.controller.tablecell", "chatter.directives", "chatter.filters", "chatter.services", "manual.bootstrap", "main.controller", "main.controller.spec", "githubContributor.service", "sha1", "navbar.directive", "malarkey.directive", "webDevTec.service", "css", "css!app/app.css" /*END_APPARRDEPS*/], function (ang) {
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


