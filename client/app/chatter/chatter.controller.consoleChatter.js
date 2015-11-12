define(["index.module"],function() {
  'use strict';

  angular
    .module('bm.platform')
    .controller('ConsoleChatter', ConsoleChatter);

  /** @ngInject */
  function ConsoleChatter($scope) {
    var vm = this;


    init();


    function init() {

      vm.chatterContext = {
        sessionId: 'externalSessionId',
        dashboard: 'nonDashboard',
        contextId: 'nonDashboard',
        rowContext:{
          columnID: '',
          heading: '',
          currentRowColumns: '',
          value: '',
          SHA1:'defaultSHA1'
        }
      };


    }


  }
});
