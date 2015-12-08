define(["index.module"], function () {
  'use strict';


  var app = angular.module('bm.platform');

  app.directive('obiSideNavButton', ['State',function (State) {

    var controller = ['$scope', 'State', function ($scope, State) {


        var vm = this;


        function init() {
          //$scope.items = angular.copy($scope.datasource);
        }

        init();

        vm.openSideNav = function () {
          //do something
          State.sideNavOpened = true;

        };
      }],

      templateUrl = 'http://localhost:3000/app/chatter/sideNav/chatter.sideNavButton.html';

    return {
      restrict: 'EA', //Default in 1.3+
      scope: {},
      controller: controller,
      controllerAs: 'sideNavButtonCtrl',
      templateUrl: templateUrl,
      link:function(scope, element, attrs){

        scope.$watch(function () {
          return State.sideNavOpened;
        },function(newval,oldval){

          if(newval==true){
            element.css({display:'none'});
          }
          else{
            element.css({display:'block'});
          }


          console.log(newval);


        });


      }
    };
  }]);

});

