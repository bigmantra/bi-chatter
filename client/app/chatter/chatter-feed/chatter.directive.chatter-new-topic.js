define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterNewTopicDirectiveController = (function () {
        function ChatterNewTopicDirectiveController(TopicService) {
            //TODO Do nothing at the moment. Will add more to this
            var _this = this;
            this.TopicService = TopicService;
            this.createTopic = function (text) {
                var newTopic = _this.TopicService.create({ "text": text });
                _this.topicText = '';
                _this.isActive = false;
                _this.hasFocus = false;
                return newTopic;
            };
            this.isActive = false;
            this.hasFocus = false;
        }
        ChatterNewTopicDirectiveController.$inject = ['TopicService'];
        return ChatterNewTopicDirectiveController;
    })();
    var ChatterNewTopicDirective = (function () {
        function ChatterNewTopicDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            this.controller = ChatterNewTopicDirectiveController;
            this.controllerAs = 'chatterNewTopicCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-new-topic.html';
            this.link = function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    return ctrl.topicText;
                }, function (oldvalue, newvalue) {
                    if (oldvalue != newvalue) {
                        if (ctrl.topicText) {
                            element.find('button[disabled]').eq(0).removeAttr('disabled');
                        }
                        else {
                            element.find('button.slds-button--brand').attr('disabled', '');
                        }
                    }
                });
            };
            console.log('in ChatterNewTopicDirective ');
        }
        ChatterNewTopicDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterNewTopicDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterNewTopicDirective;
    })();
    bmPlatformApp.directive('chatterNewTopic', ChatterNewTopicDirective.factory());
});
//# sourceMappingURL=chatter.directive.chatter-new-topic.js.map