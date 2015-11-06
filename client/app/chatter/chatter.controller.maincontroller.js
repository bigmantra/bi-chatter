define(["index.module"],function() {
  'use strict';


  angular
    .module('biChatter')
    .controller('MainController', MainController);


  function MainController($scope) {

    this.appName = 'BI Chatter';

  }

});
