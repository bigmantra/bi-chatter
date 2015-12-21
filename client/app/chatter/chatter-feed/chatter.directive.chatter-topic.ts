import bmPlatformApp=require('index.module');


interface IChatterTopicDirectiveController {
  // specify exposed controller methods and properties here

/*  deleteTopic():boolean;*/

}


class ChatterTopicDirectiveController implements IChatterTopicDirectiveController {

  topicData:any;

  static $inject = ['TopicService'];

  constructor(private TopicService:any) {

    //TODO Do nothing at the moment. Will add more to this


  }

/*
  deleteTopic = ()=> {
    this.topicData.remove();
    return true;
  };
*/

}


class ChatterTopicDirective implements ng.IDirective {
  restrict = 'E';
  controller = ChatterTopicDirectiveController;
  controllerAs = 'chatterTopicCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-topic.html';
  scope = {
    topicData: '='
  };
  bindToController = true;

  constructor(private TopicService:any) {

    console.log('in ChatterTopicDirective ')

  }

  static factory():ng.IDirectiveFactory {
    const directive = (TopicService:any) => new ChatterTopicDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


bmPlatformApp.directive('chatterTopic', ChatterTopicDirective.factory());

