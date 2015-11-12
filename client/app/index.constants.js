/* global malarkey:false, toastr:false, moment:false */

define(["index.module"], function () {
  'use strict';

  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');

  console.log('defining index.constants..');
  angular
    .module('bm.platform')
    .constant('malarkey', malarkey)
    .constant('fbURL', 'https://bi-chatter.firebaseio.com/demo/topics/')
    .constant('moment',(typeof global !== 'undefined' ? global : window).moment);



});
