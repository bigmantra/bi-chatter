define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterTopicsDirectiveController = (function () {
        function ChatterTopicsDirectiveController(TopicService) {
            var _this = this;
            this.TopicService = TopicService;
            TopicService.getAll().then(function (data) {
                _this.topics = data;
                console.log('logging from topics directive ctrller');
                console.log(Object.prototype.toString.call(data));
                console.log(data);
            });
        }
        ChatterTopicsDirectiveController.$inject = ['TopicService'];
        return ChatterTopicsDirectiveController;
    })();
    var ChatterTopicsDirective = (function () {
        function ChatterTopicsDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            //require = 'ngModel';
            this.controller = ChatterTopicsDirectiveController;
            this.controllerAs = 'chatterTopicsCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-topics.html';
            console.log('in ChatterTopicsDirective ');
        }
        ChatterTopicsDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterTopicsDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterTopicsDirective;
    })();
    bmPlatformApp.directive('chatterTopics', ChatterTopicsDirective.factory());
});
//# sourceMappingURL=chatter.directive.chatter-topics.js.map