define(["index.module"],function() {
  'use strict';


  var app = angular.module('bm.platform');



  app.directive('sidenavPushIn', function () {
    return {
      restrict: 'A',
      require: '^mdSidenav',
      link: function ($scope, element, attr, sidenavCtrl) {
        var body = angular.element(document.body);
        body.addClass('md-sidenav-push-in');
        var cssClass = (element.hasClass('md-sidenav-left') ? 'md-sidenav-left' : 'md-sidenav-right') + '-open';
        var stateChanged = function (state) {
          body[state ? 'addClass' : 'removeClass'](cssClass);
        };
        // overvwrite default functions and forward current state to custom function
        angular.forEach(['open', 'close', 'toggle'], function (fn) {
          var org = sidenavCtrl[fn];
          sidenavCtrl[fn] = function () {
            var res = org.apply(sidenavCtrl, arguments);
            stateChanged(sidenavCtrl.isOpen());
            return res;
          };
        });
      }
    };
  });


  app.directive('obiSideNav', function () {

    var controller = ['$scope', '$timeout', '$mdSidenav', '$log','State', function ($scope, $timeout, $mdSidenav, $log,State) {


        var vm=this;

        vm.toggleLeft = buildDelayedToggler('left');
        vm.toggleRight = buildToggler('right');

        vm.close = function () {
          $mdSidenav('right').close()
            .then(function () {
              $log.debug("close RIGHT is done");
            });
        };

        vm.isOpenRight = function(){
          return $mdSidenav('right').isOpen();
        };


      vm.shouldLockOpen=true;


        $scope.$watch(function () {
          return State.sideNavOpened;
        },function(){

          vm.toggleRight();
          console.log('open the sidenav');


        });



        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
          var timer;
          return function debounced() {
            var context = vm,
              args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
              timer = undefined;
              func.apply(context, args);
            }, wait || 10);
          };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
          return debounce(function() {
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          }, 200);
        }
        function buildToggler(navID) {
          return function() {
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          }
        }



      }],

      templateUrl = 'http://localhost:3000/app/chatter/chatter.sideNav.html';

    return {
      restrict: 'EA', //Default in 1.3+
      scope: {

      },
      controller: controller,
      controllerAs: 'sideNavCtrl',
      templateUrl: templateUrl
    };
  });

});
