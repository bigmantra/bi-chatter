define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterFeedDirectiveController = (function () {
        function ChatterFeedDirectiveController(TopicService) {
            this.TopicService = TopicService;
            //apply a sha1 hash to all contexts
            this.feedContext.level1ContextHash = this.feedContext.level1Context ? CryptoJS.SHA1(JSON.stringify(this.feedContext.level1Context)).toString() : this.feedContext.level1Context;
            this.feedContext.level2ContextHash = this.feedContext.level2Context ? CryptoJS.SHA1(JSON.stringify(this.feedContext.level2Context)).toString() : this.feedContext.level2Context;
            this.feedContext.level3ContextHash = this.feedContext.level3Context ? CryptoJS.SHA1(JSON.stringify(this.feedContext.level3Context)).toString() : this.feedContext.level3Context;
        }
        ChatterFeedDirectiveController.$inject = ['TopicService'];
        return ChatterFeedDirectiveController;
    })();
    var ChatterFeedDirective = (function () {
        function ChatterFeedDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            this.controller = ChatterFeedDirectiveController;
            this.controllerAs = 'chatterFeedCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed.html';
            this.scope = {
                feedContext: '='
            };
            this.bindToController = true;
        }
        ChatterFeedDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterFeedDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterFeedDirective;
    })();
    bmPlatformApp.directive('chatterFeed', ChatterFeedDirective.factory());
});
//# sourceMappingURL=chatter.directive.chatter-feed.js.map