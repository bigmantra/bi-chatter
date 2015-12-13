define(["index.module"], function () {
  'use strict';


  angular
    .module('bm.platform')
    .factory('Topic', ['$rootScope', '$q', 'TopicApi', 'Socket','lodash', function ($rootScope, $q, TopicApi, Socket,lodash) {
      // here we use a simple in memory cache in order to keep actual data
      // you can make it in any other way
      var cache = {};

      var initObject = function (data) {

        console.log(data);

        if (cache[data.id]) {
          // only extend existed object!!! in order to keep bindings
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
        return TopicApi.getOne(id).then(function (Topic) {
          return initObject(Topic);
        });
      };


      Topic.create = function (data) {
        return TopicApi.create(data).then(function (Topic) {
          return initObject(Topic);
        });
      };


      Topic.prototype.remove = function () {
        var self = this;
        TopicApi.remove(self.id).then(function () {
          delete cache[self.id];
        });
      };


      // include SocketIO notifications service that will fire all the listeners on specified evnts
      // register listener for NewTopic event
      Socket.on('NewTopic', function (newTopic) {
        // as we already have new Topic we just add it to cache with
        // initObject call
        initObject(newTopic);
      });


      Socket.on('UpdateTopic', function (updatedTopic) {
        // as we already have new Topic we just add it to cache with
        // initObject call
        initObject(updatedTopic);
      });


      Socket.on('DeleteTopic', function (id) {
        // here we can find the Topic in the cache by its ID and remove it
        // this code is good for cache in object
        delete cache[id];
        // if we cache in array we should do something like
        var index = _.findIndex(cache, {id: id});
        cache.splice(index, 1);
      });


      return Topic;
    }]);


});


