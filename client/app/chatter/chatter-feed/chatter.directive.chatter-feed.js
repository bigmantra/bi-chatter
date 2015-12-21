define(["require", "exports", 'index.module'], function (require, exports, bmPlatformApp) {
    var ChatterFeedDirectiveController = (function () {
        function ChatterFeedDirectiveController(TopicService) {
            //TODO Add init code
            this.TopicService = TopicService;
        }
        ChatterFeedDirectiveController.prototype.addTopic = function () {
            return { name: 'newly added topic' }; // return newly added topic
        };
        ChatterFeedDirectiveController.$inject = ['TopicService'];
        return ChatterFeedDirectiveController;
    })();
    var ChatterFeedDirective = (function () {
        function ChatterFeedDirective(TopicService) {
            this.TopicService = TopicService;
            this.restrict = 'E';
            //require = 'ngModel';
            this.controller = ChatterFeedDirectiveController;
            this.controllerAs = 'chatterFeedCtrl';
            this.templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed.html';
        }
        /*  link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
        
            this.TopicService.getAll().then(function(data:any){
              //scope.topics=data;
              console.log(data);
            });
        
          };*/
        ChatterFeedDirective.factory = function () {
            var directive = function (TopicService) { return new ChatterFeedDirective(TopicService); };
            directive.$inject = ['TopicService'];
            return directive;
        };
        return ChatterFeedDirective;
    })();
    bmPlatformApp.directive('chatterFeed', ChatterFeedDirective.factory());
});
/*

bmPlatformApp.directive("chatterTopics", ChatterTopicsDirective);

function ChatterTopicsDirective() {
  return {
    restrict: 'E',
    link:function(){
      console.log('Linked chatter-topics');
    }
  };
}



bmPlatformApp.directive("chatterNewTopic", ChatterNewTopicDirective);

function ChatterNewTopicDirective() {
  return {
    restrict: 'E',
    link:function(){
      console.log('Linked chatter-new-topic');
    }
  };
}



bmPlatformApp.directive("chatterTopic", ChatterTopicDirective);

function ChatterTopicDirective() {
  return {
    restrict: 'E',
    link:function(){
      console.log('Linked chatter-topic');
    }
  };
}



bmPlatformApp.directive("chatterComments", ChatterCommentsDirective);

function ChatterCommentsDirective() {
  return {
    restrict: 'E',
    link:function(){
      console.log('Linked chatter-comments');
    }
  };
}



bmPlatformApp.directive("chatterComment", ChatterCommentDirective);

function ChatterCommentDirective() {
  return {
    restrict: 'E',
    link:function(){
      console.log('Linked chatter-comment');
    }
  };
}


bmPlatformApp.directive("chatterNewComment", ChatterNewCommentDirective);

function ChatterNewCommentDirective() {
  return {
    restrict: 'E',
    link:function(){
      console.log('Linked chatter-new-comment');
    }
  };
}


 */
//# sourceMappingURL=chatter.directive.chatter-feed.js.map