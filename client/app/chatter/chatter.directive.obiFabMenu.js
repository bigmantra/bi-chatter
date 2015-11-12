define(["index.module"],function() {
  'use strict';


  var app = angular.module('bm.platform');

  app.directive('obiFabMenu', function () {

    var controller = ['$scope', function ($scope) {


        this.topDirections = ['left', 'up'];
        this.bottomDirections = ['down', 'right'];
        this.isOpen = false;
        this.availableModes = ['md-fling', 'md-scale'];
        this.selectedMode = 'md-fling';
        this.availableDirections = ['up', 'down', 'left', 'right'];
        this.selectedDirection = 'up';

        function init() {
          //$scope.items = angular.copy($scope.datasource);
        }

        init();

        $scope.someFunction = function () {
          //do something
        };
      }],

      templateUrl = 'http://localhost:3000/app/chatter/chatter.fabMenu.html';

    return {
      restrict: 'EA', //Default in 1.3+
      scope: {

      },
      controller: controller,
      controllerAs: 'ctrl',
      templateUrl: templateUrl
    };
  });

});

