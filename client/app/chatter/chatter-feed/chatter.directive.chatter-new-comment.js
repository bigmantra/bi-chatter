define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterNewCommentDirectiveController = (function () {
        function ChatterNewCommentDirectiveController(TopicService) {
            //TODO Do nothing at the moment. Will add more to this
            var _this = this;
            this.TopicService = TopicService;
            this.createComment = function (topicId, text) {
                var newComment = _this.TopicService.createComment({ topicId: topicId }, { "text": text });
                _this.commentText = '';
                _this.isActive = false;
                _this.hasFocus = false;
                return newComment;
            };
            this.isActive = false;
            this.hasFocus = false;
        }
        ChatterNewCommentDirectiveController.$inject = ['TopicService'];
        return ChatterNewCommentDirectiveController;
    })();
    var ChatterNewCommentDirective = (function () {
        function ChatterNewCommentDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            this.controller = ChatterNewCommentDirectiveController;
            this.controllerAs = 'chatterNewCommentCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-new-comment.html';
            this.link = function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    return ctrl.commentText;
                }, function (oldvalue, newvalue) {
                    if (oldvalue != newvalue) {
                        if (ctrl.commentText) {
                            element.find('button[disabled]').eq(0).removeAttr('disabled');
                        }
                        else {
                            element.find('button.slds-button--brand').attr('disabled', '');
                        }
                    }
                });
            };
            console.log('in ChatterNewCommentDirective ');
        }
        ChatterNewCommentDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterNewCommentDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterNewCommentDirective;
    })();
    bmPlatformApp.directive('chatterNewComment', ChatterNewCommentDirective.factory());
});
//# sourceMappingURL=chatter.directive.chatter-new-comment.js.map