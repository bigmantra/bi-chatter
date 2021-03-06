import bmPlatformApp=require('index.module');


interface IChatterCommentsDirectiveController {
  // specify exposed controller methods and properties here

}


class ChatterCommentsDirectiveController implements IChatterCommentsDirectiveController {

  comments:any;
  static $inject = ['TopicService'];

  constructor(private TopicService: any) {



  }

}



class ChatterCommentsDirective implements ng.IDirective {
  restrict = 'E';
  //require = 'ngModel';
  controller=ChatterCommentsDirectiveController;
  controllerAs='chatterCommentsCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-Comments.html';
  scope = {
    comments: '=',
    topicId:'='
  };
  bindToController = true;



  constructor(private TopicService: any) {

    console.log('in ChatterCommentsDirective ')

  }

  static factory(): ng.IDirectiveFactory {
    const directive = (TopicService: any) => new ChatterCommentsDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


bmPlatformApp.directive('chatterComments', ChatterCommentsDirective.factory());

