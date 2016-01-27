define(["require", "exports"], function (require, exports) {
    //Bootstrap Class with static methods - singleton implementation
    var BootstrapService = (function () {
        function BootstrapService() {
        }
        //This is the main method to load all dependencies & start the bootstrap process
        BootstrapService.boot = function (dependencies) {
            if ((!BootstrapService.bmPlatformLoaded) && (!BootstrapService.bmPlatformLoading)) {
                BootstrapService.bmPlatformLoading = true;
                require(dependencies, function () {
                    if ((typeof obips != 'undefined')) {
                        console.log('inside OBI - Manually bootstrapping angular');
                        BootstrapService.initOBIMetadataAndBootstrap();
                    }
                    else {
                        console.log('outside OBI - Manually bootstrapping angular');
                        angular.bootstrap(document, ['bm.platform']);
                    }
                });
            }
            return true;
        };
        //Load OBI report metadata into an angular constant/value and then bootstrap
        BootstrapService.initOBIMetadataAndBootstrap = function () {
            var initInjector = angular.injector(["ng", "bm.platform"]);
            var BIGate = initInjector.get("BIGate");
            BootstrapService.bmPlatformLoading = true;
            var contextCollection = BIGate.getViewDataReferences();
            var allReportsPromises = BIGate.getAllReportsXML();
            allReportsPromises.then(function (responses) {
                var allMetadataPromises = BIGate.getAllReportsMetadata(responses);
                allMetadataPromises.then(function (metaDataResponses) {
                    console.info('Report metadata loaded for ' + metaDataResponses.length + ' Reports.');
                    console.log(metaDataResponses);
                    var mergedCollection = BIGate.getMergedContextCollection(metaDataResponses, contextCollection);
                    //Load metadata and Context Info into an app Constant so it is available as a service throughout
                    angular
                        .module('bm.platform')
                        .constant('metaDataResponses', metaDataResponses);
                    angular
                        .module('bm.platform')
                        .value('contextCollection', mergedCollection);
                    BootstrapService.bmPlatformLoaded = true;
                    BootstrapService.bmPlatformLoading = false;
                    BootstrapService.bootstrapApp();
                    BootstrapService.observeSensitiveDOMChanges();
                });
            });
        };
        BootstrapService.bootstrapApp = function () {
            //Semaphore logic to habdle multiple analysis trying to bootstrap at the same time. One one is allowed to - and that becomes elected as the master analysis.
            if ((!BootstrapService.bmPlatformLoaded) || BootstrapService.bmPlatformLoading || BootstrapService.bmPlatformBooting)
                return;
            BootstrapService.bmPlatformBooting = true;
            BootstrapService.bmPlatformBaseJQElement = $('#PageContentOuterDiv')[0];
            /*var pageContentDiv = BootstrapService.bmPlatformBaseJQElement[0];*/
            //Bootstrap if not already.
            //The First analysis object to set this attribute will have to responsibility of bootstrapping the entire app into context
            if (!(BootstrapService.bmPlatformBaseJQElement.getAttribute('obi-chatter-enable'))) {
                //attach chatter directive - this will make angular loop through table elements and attach further directives
                BootstrapService.bmPlatformBaseJQElement.setAttribute('obi-chatter-enable', 'true');
                BootstrapService.dashboardContentJQElement = $('.DashboardPageContentDiv');
                BootstrapService.dashboardContentJQElement.addClass('md-sidenav-push-in-target');
                //$('.DashboardPageContentDiv').append("<div obi-fab-menu='true'></div>");
                BootstrapService.dashboardContentJQElement.append("<div obi-side-nav-button='true'></div>");
                BootstrapService.dashboardContentJQElement.after("<div obi-side-nav='true'></div>");
                //  pageContentDiv.setAttribute('obi-fab-menu', 'true');
                console.log('New - Attempt to attach angular to page content DIV');
                angular.bootstrap(BootstrapService.bmPlatformBaseJQElement, ['bm.platform']);
                console.log('Angular Bootstraped: ' + 'bm.platform');
            }
            else {
                //Angular is already bootstrapped but the views might have been re-rendered by OBI. This requires a re-compile of the views with the existing scope.
                //This is a more performant alternative to re-bootstrapping the entire App.
                var injector = angular.element(BootstrapService.bmPlatformBaseJQElement).injector();
                var compileService = injector.get('$compile');
                angular.forEach($("[viewtype='tableView']"), function (value, key) {
                    //Return if the directive is already compiled and linked.(if the searchId(sid) is associated to the table then it is already linked)
                    if (value.getAttribute('sid'))
                        return;
                    value.setAttribute('obi-table', 'true');
                    var scope = ((angular.element(value).scope()));
                    var linkFn = compileService(value, scope);
                    console.log('In bootstrapApp(): linking mutated DOM with scope...');
                    linkFn(scope);
                });
            }
            BootstrapService.bmPlatformBooting = false;
        };
        BootstrapService.observeSensitiveDOMChanges = function () {
            if ((!BootstrapService.bmPlatformLoaded) || BootstrapService.bmPlatformLoading || BootstrapService.bmPlatformBooting)
                return;
            BootstrapService.bmPlatformLoading = true;
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            //In Analysis Mode
            var targetViewElementArray = $(document).find('div[id^=tableView]');
            //In Dashboard Mode
            if (targetViewElementArray.length < 1) {
                targetViewElementArray = $('.ViewContainer');
            }
            $.each(targetViewElementArray, function (viewIdx, viewElement) {
                var newScope;
                var observer = new MutationObserver(function (mutations) {
                    console.log(mutations);
                    console.log('mutated ' + viewElement.getAttribute('id'));
                    var table = viewElement;
                    //TODO Fine-tune performance - to handle only specific DOM mutations
                    if (!table.getAttribute('sid') || (!($(viewElement).find('td[id^=e_saw]')[0].getAttribute('obi-table-cell') == 'true'))) {
                        //Recompile to cater to the changes
                        var injector = angular.element(BootstrapService.bmPlatformBaseJQElement).injector();
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
                    childList: true
                });
            });
            BootstrapService.bmPlatformLoading = false;
        };
        //service semaphores to control processing sequence.
        //These are needed because several analysis objects may attempt to bootstrap the app at the same time and one will be allowed
        BootstrapService.bmPlatformLoaded = false;
        BootstrapService.bmPlatformLoading = false;
        BootstrapService.bmPlatformBooting = false;
        return BootstrapService;
    })();
    return BootstrapService;
});
//# sourceMappingURL=BootstrapService.js.map