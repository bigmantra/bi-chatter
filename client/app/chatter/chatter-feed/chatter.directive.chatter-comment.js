define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterCommentDirectiveController = (function () {
        function ChatterCommentDirectiveController(TopicService) {
            //TODO do nothing
            var _this = this;
            this.TopicService = TopicService;
            this.deleteComment = function () {
                _this.TopicService.removeComment(_this.commentData.id);
                return true;
            };
        }
        ;
        ChatterCommentDirectiveController.$inject = ['TopicService'];
        return ChatterCommentDirectiveController;
    })();
    var ChatterCommentDirective = (function () {
        function ChatterCommentDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            this.controller = ChatterCommentDirectiveController;
            this.controllerAs = 'chatterCommentCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-comment.html';
            this.scope = {
                commentData: '='
            };
            this.bindToController = true;
            console.log('in ChatterCommentDirective ');
        }
        ChatterCommentDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterCommentDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterCommentDirective;
    })();
    bmPlatformApp.directive('chatterComment', ChatterCommentDirective.factory());
});
//# sourceMappingURL=chatter.directive.chatter-comment.js.map