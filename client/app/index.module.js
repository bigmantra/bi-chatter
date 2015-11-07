
define(['dynamic.modules'], (function (modules) {
  'use strict';

  console.log('defining index.module..');
  angular
    .module('bm.platform', ['ngAnimate','ngCookies', 'ui.router', 'ngSanitize', 'bm.platform.chatter'])


  //Load all modules
  angular.forEach(modules, function (value, key) {
    angular
      .module(value, ['ngAnimate','ngCookies', 'ui.router', 'ngSanitize', 'bm.platform.chatter'])


  });



}));




