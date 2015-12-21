import bmPlatformApp=require('index.module');


interface IChatterFeedDirectiveController {
  // specify exposed controller methods and properties here
  addTopic(): any;
}

class ChatterFeedDirectiveController implements IChatterFeedDirectiveController {

  topics:any;
  static $inject = ['TopicService'];
  constructor(private TopicService: any) {

/*
    TopicService.getAll().then((data:any)=>{
      this.topics=data;
      console.log(data);
      console.log('logging from ctrller');
    });
*/

  }

  addTopic(): any {
    return {name:'newly added topic'}; // return newly added topic
  }
}


class ChatterFeedDirective implements ng.IDirective {
  restrict = 'E';
  //require = 'ngModel';
  controller=ChatterFeedDirectiveController;
  controllerAs='chatterFeedCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed.html';


  constructor(private TopicService: any) {
  }

/*  link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {

    this.TopicService.getAll().then(function(data:any){
      //scope.topics=data;
      console.log(data);
    });

  };*/


  static factory(): ng.IDirectiveFactory {
    const directive = (TopicService: any) => new ChatterFeedDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


bmPlatformApp.directive('chatterFeed', ChatterFeedDirective.factory());



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






