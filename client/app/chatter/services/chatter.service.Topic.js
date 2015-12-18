define(["index.module"], function () {
  'use strict';


  angular
    .module('bm.platform')
    .factory('Topic', ['$rootScope', '$q', 'TopicApi','CommentApi', 'Socket','lodash', function ($rootScope, $q, TopicApi,CommentApi, Socket,lodash) {
      // here we use a simple in memory cache in order to keep actual data
      var cache = {};

      var initObject = function (data) {

        if (cache[data.id]) {
          // only extend objects that already exist!!! in order to keep bindings
          angular.extend(cache[data.id], new Topic(data));
        } else {
          cache[data.id] = new Topic(data);
        }
        return cache[data.id];
      };


      var Topic = function (data) {
        angular.extend(this, data);
      };


      Topic.getAll = function (options) {
        var apiResult = TopicApi.query(options).$promise.then(function (Topics) {
          angular.copy({}, cache);
          lodash.map(Topics, function (Topic) {
            return initObject(Topic);
          });
          return cache;
        });

        if (lodash.isEmpty(cache)) {
          return apiResult;
        } else {
          return $q.when(cache);
        }
      };


      Topic.getOne = function (id) {

        var apiResult=TopicApi.get({id:id}).$promise.then(
          function(topic) {

            return initObject(topic);

        });

        if (lodash.isEmpty(cache[id])) {
          return apiResult;
        } else {
          return $q.when(cache[id]);
        }


      };


      Topic.create = function (data) {

        var apiResult=TopicApi.save(data).$promise.then(
          function(topic) {
            return initObject(topic);
          });

        if (lodash.isEmpty(cache[data.id])) {
          return apiResult;
        } else {
          return $q.when(cache[data.id]);
        }

/*        return TopicApi.create(data).then(function (Topic) {
          return initObject(Topic);
        });
*/
      };


      Topic.prototype.remove = function () {
        var self = this;

        var apiResult=TopicApi.remove({id:self.id}).$promise.then(
          function() {
            delete cache[self.id];
            console.log('deleted ',self.id);
          });

      /*  TopicApi.remove(self.id).then(function () {
          delete cache[self.id];
        });*/


      };

      Topic.prototype.removeComment = function (commentId) {
        var self = this;
        CommentApi.remove({commentId:commentId});
        console.log('comment removed...');

      };


      // include SocketIO notifications service that will fire all the listeners on specified evnts
      // register listener for NewTopic event
      Socket.on('Topic.Create', function (newTopic) {
        // as we already have new Topic we just add it to cache with
        // initObject call
        console.log(newTopic);
        initObject(newTopic);
      });


      Socket.on('Comment.Create', function (topicId,newComment) {
        // as we should already have the Topic we just add the comment to cache ...
        console.log('new comment received for topic:',topicId);
        console.log(newComment);
        var index = lodash.findIndex(cache, {id: topicId});
        if(index>0){
          cache[topicId].comments.push(newComment)
          console.log('added comment into topic');
        }
        else console.log('cannot find topic in local memory cache so cant add comment into cache...');

      });



      Socket.on('Topic.Patch', function (updatedTopic) {
        // as we already have new Topic we just add it to cache with
        // initObject call
        initObject(updatedTopic);
      });



      Socket.on('Topic.Delete', function (id) {
        // here we can find the Topic in the cache by its ID and remove it
        delete cache[id];

      });

      Socket.on('Comment.Delete', function (commentId) {

        console.log('comment to be deleted:',commentId);

        lodash.forEach(cache, function(topic) {
          lodash.remove(cache[topic.id].comments, function(currentObject) {
            return currentObject.id == commentId;
          });

        });



      });


      return Topic;
    }]);


});


