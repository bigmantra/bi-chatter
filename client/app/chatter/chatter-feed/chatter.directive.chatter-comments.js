define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterCommentsDirectiveController = (function () {
        function ChatterCommentsDirectiveController(TopicService) {
            this.TopicService = TopicService;
        }
        ChatterCommentsDirectiveController.$inject = ['TopicService'];
        return ChatterCommentsDirectiveController;
    })();
    var ChatterCommentsDirective = (function () {
        function ChatterCommentsDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            //require = 'ngModel';
            this.controller = ChatterCommentsDirectiveController;
            this.controllerAs = 'chatterCommentsCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-Comments.html';
            this.scope = {
                comments: '='
            };
            this.bindToController = true;
            console.log('in ChatterCommentsDirective ');
        }
        ChatterCommentsDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterCommentsDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterCommentsDirective;
    })();
    bmPlatformApp.directive('chatterComments', ChatterCommentsDirective.factory());
});
//# sourceMappingURL=chatter.directive.chatter-comments.js.map