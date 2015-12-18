

define(["index.module"],function() {
  'use strict';

  angular
    .module('bm.platform')
    .factory('CommentApi', function($resource) {
      return $resource('http://localhost:8000/api/comments/:commentId',{commentId:'@id'})
    });


});
