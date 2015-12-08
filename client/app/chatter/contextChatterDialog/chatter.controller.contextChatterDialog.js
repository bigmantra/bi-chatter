define(["index.module"], function () {
  'use strict';


  var app = angular.module('bm.platform');


  app.controller('chatterDialogController', ['$scope', '$mdDialog', ChatterDialogController]);


  function ChatterDialogController($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };


    $scope.userColor='cyan';
    $scope.conversation = [{
      name: 'Morris Onions',
      image: 'assets/images/avatars/avatar-6.png',
      messages: ['Hi there how are you?', 'Hello?']
    },{
      name: 'Danny Ings',
      image: 'assets/images/avatars/avatar-3.png',
      messages: ['Howsitgowin?']
    },{
      name: 'Morris Onions',
      image: 'assets/images/avatars/avatar-6.png',
      messages: ['We need those images ASAP!', 'Client asked about them.']
    },{
      name: 'Danny Ings',
      image: 'assets/images/avatars/avatar-3.png',
      messages: ['OK, will send them over']
    }];

    $scope.userClass = function($even) {
      return $even ? 'user-left' : 'user-right';
    };


  }

})
