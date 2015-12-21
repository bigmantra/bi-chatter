define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterTopicDirectiveController = (function () {
        function ChatterTopicDirectiveController(TopicService) {
            //TODO Do nothing at the moment. Will add more to this
            this.TopicService = TopicService;
        }
        ChatterTopicDirectiveController.$inject = ['TopicService'];
        return ChatterTopicDirectiveController;
    })();
    var ChatterTopicDirective = (function () {
        function ChatterTopicDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            this.controller = ChatterTopicDirectiveController;
            this.controllerAs = 'chatterTopicCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-topic.html';
            this.scope = {
                topicData: '='
            };
            this.bindToController = true;
            console.log('in ChatterTopicDirective ');
        }
        ChatterTopicDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterTopicDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterTopicDirective;
    })();
    bmPlatformApp.directive('chatterTopic', ChatterTopicDirective.factory());
});
//# sourceMappingURL=chatter.directive.chatter-topic.js.map