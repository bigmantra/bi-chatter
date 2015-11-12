define(["index.module"],function() {
  'use strict';

  console.log('defining index.route..');
  angular
    .module('bm.platform')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('chatter', {
        url: '/chatter',
        templateUrl: 'app/chatter/chatter.html',
        controller: 'ConsoleChatter',
        controllerAs: 'consoleChatter'
      })

    $urlRouterProvider.otherwise('/');
  }

});
