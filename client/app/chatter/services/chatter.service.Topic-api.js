

define(["index.module"],function() {
  'use strict';

  angular
    .module('bm.platform')
    .factory('TopicApi', function($resource) {
      return $resource('http://localhost:8000/api/topics/:id'); // Note the full endpoint address
    });


});
