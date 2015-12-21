import bmPlatformApp=require('index.module');


interface IChatterCommentDirectiveController {
  // specify exposed controller methods and properties here

  deleteComment():boolean;
  commentData:any;

}


class ChatterCommentDirectiveController implements IChatterCommentDirectiveController {

  commentData:any;
  topicService:any;

  static $inject = ['TopicService'];

  constructor(private TopicService:any) {

    //TODO Do nothing at the moment. Will add more to this
    this.topicService=TopicService;

  };

   deleteComment = ()=> {
     this.topicService.removeComment(this.commentData.id);
     return true;
   };


}


class ChatterCommentDirective implements ng.IDirective {
  restrict = 'E';
  controller = ChatterCommentDirectiveController;
  controllerAs = 'chatterCommentCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-comment.html';
  scope = {
    commentData: '='
  };
  bindToController = true;

  constructor(private TopicService:any) {

    console.log('in ChatterCommentDirective ')

  }

  static factory():ng.IDirectiveFactory {
    const directive = (TopicService:any) => new ChatterCommentDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


bmPlatformApp.directive('chatterComment', ChatterCommentDirective.factory());

