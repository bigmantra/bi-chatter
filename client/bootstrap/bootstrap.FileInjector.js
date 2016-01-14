var ChatterApp;
(function (ChatterApp) {
    var LoaderService = (function () {
        function LoaderService() {
        }
        LoaderService.loadJS = function (path, callback) {
            var scriptElement = document.createElement("script");
            scriptElement["src"] = path;
            document.getElementsByTagName("head")[0].appendChild(scriptElement);
            console.info('added script to head: ', path);
            scriptElement.onload = function () {
                callback ? callback() : null;
            };
        };
        LoaderService.loadCSS = function (path) {
            var cssElement = document.createElement("link");
            cssElement["href"] = path;
            cssElement["rel"] = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(cssElement);
            console.info('added css to head: ', path);
        };
        return LoaderService;
    })();
    ChatterApp.LoaderService = LoaderService;
})(ChatterApp || (ChatterApp = {}));
ChatterApp.LoaderService.loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons");
ChatterApp.LoaderService.loadJS("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js", function () {
    requirejs.config('PLACEHOLDER_CONF');
    require(["BootstrapService"], function (BootstrapService) {
        ChatterApp.BootstrapService = BootstrapService;
        BootstrapService.boot(['PLACEHOLDER_LOAD']);
        console.info('Finished Bootstrap');
    });
});
//# sourceMappingURL=bootstrap.FileInjector.js.map