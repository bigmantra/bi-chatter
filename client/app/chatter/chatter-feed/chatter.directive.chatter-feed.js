//<chatter-feed resource="/api/feeds/1">
//  <chatter-topics>
//    <chatter-new-topic></chatter-new-topic>
//    <chatter-topic>
//      <chatter-comments>
//        <chatter-comment></chatter-comment>
//      </chatter-comments>
//      <chatter-new-comment></chatter-new-comment>
//    </chatter-topic>
//  </chatter-topics>
//</chatter-feed>



define(["index.module"],function() {
  'use strict';

  angular
    .module('bm.platform')
    .directive("chatterFeed", ['Topic',ChatterFeedDirective]);

  function ChatterFeedDirective(Topic) {
    return {
      restrict: 'E',
      link:function(){
        console.log('Linked chatter-feed');
        console.log(Topic.getAll());


      }
    };
  }



  angular
    .module('bm.platform')
    .directive("chatterTopics", ChatterTopicsDirective);

  function ChatterTopicsDirective() {
    return {
      restrict: 'E',
      link:function(){
        console.log('Linked chatter-topics');
      }
    };
  }



  angular
    .module('bm.platform')
    .directive("chatterNewTopic", ChatterNewTopicDirective);

  function ChatterNewTopicDirective() {
    return {
      restrict: 'E',
      link:function(){
        console.log('Linked chatter-new-topic');
      }
    };
  }



  angular
    .module('bm.platform')
    .directive("chatterTopic", ChatterTopicDirective);

  function ChatterTopicDirective() {
    return {
      restrict: 'E',
      link:function(){
        console.log('Linked chatter-topic');
      }
    };
  }



  angular
    .module('bm.platform')
    .directive("chatterComments", ChatterCommentsDirective);

  function ChatterCommentsDirective() {
    return {
      restrict: 'E',
      link:function(){
        console.log('Linked chatter-comments');
      }
    };
  }



  angular
    .module('bm.platform')
    .directive("chatterComment", ChatterCommentDirective);

  function ChatterCommentDirective() {
    return {
      restrict: 'E',
      link:function(){
        console.log('Linked chatter-comment');
      }
    };
  }


  angular
    .module('bm.platform')
    .directive("chatterNewComment", ChatterNewCommentDirective);

  function ChatterNewCommentDirective() {
    return {
      restrict: 'E',
      link:function(){
        console.log('Linked chatter-new-comment');
      }
    };
  }







});






