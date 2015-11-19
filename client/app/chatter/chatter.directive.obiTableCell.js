define(["index.module"],function() {
  'use strict';


  var app = angular.module('bm.platform');



  app.directive('obiTableCell',['$parse', CellDirective]);

  function CellDirective ($parse) {

    var OBITableCellDirectiveController = ['$scope', function ($scope) {

      var vm=this;

      function init() {
          console.log('init cell...')
      }

      init();

      vm.showChatter = function () {

        console.log('Clicked showChatter for '+ vm.elemId);
        //do something
      };
    }];

    return {
      restrict: 'EA', //Default in 1.3+
      scope: {
        elemId:'@id'
      },
      controller: OBITableCellDirectiveController,
      controllerAs: 'cellCtrl',
      bindToController: true,
      compile: function(tElm,tAttrs){
        var exp = $parse('cellCtrl.showChatter()');
        return function (scope,elm){
          elm.bind('dblclick',function(){
            exp(scope);
          });
          //console.log($parse('cellCtrl.elemId')(scope));

        };
      }

    };
  }



});

