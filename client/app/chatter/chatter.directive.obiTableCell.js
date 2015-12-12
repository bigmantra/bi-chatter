define(["index.module"], function () {
  'use strict';


  var app = angular.module('bm.platform');


  app.directive('obiTableCell', ['$parse', CellDirective]);

  function CellDirective($parse) {

    var OBITableCellDirectiveController = ['$scope', '$mdDialog', '$mdMedia', ChatterCellController];

    return {
      restrict: 'EA', //Default in 1.3+
      scope: {
        elemId: '@id'
      },
      controller: OBITableCellDirectiveController,
      require: ['^obiTable', 'obiTableCell'],
      controllerAs: 'cellCtrl',
      bindToController: true,
      compile: function (tElm, tAttrs) {
        var exp = $parse('cellCtrl.showChatterDialog($event)');
        return function (scope, elm, attr, controllers) {

          var tableController = controllers[0];
          var cellController = controllers[1];

          var contextCollection = tableController.getCellContextCollection();

          //Copy viewId over to the cell
          cellController.viewId=tableController.viewId;

          elm.bind('dblclick', function () {
            exp(scope);
          });

          var context = $.grep(contextCollection, function (e) {
            return e.element == elm.attr('Id');
          });

          if (context && context.length > 0) {
            cellController.setContext(context[0]);
            cellController.setCellType('Measure');

            //Check if Topics exist and place cell Marker;
            elm.css({backgroundColor: 'red'});

          } else {
            cellController.setCellType('Dimension');
          }

          cellController.setReportContext(tableController.getReportContext());
          //console.log($parse('cellCtrl.elemId')(scope));

        };
      }
    };
  }


  function ChatterCellController($scope, $mdDialog, $mdMedia) {

    var vm = this;

    $scope.dialogStatus = '  ';
    $scope.dialogCustomFullscreen = $mdMedia('sm');

    vm.setContext = function (context) {
      vm.cellContextInfo = context;
    };

    vm.setReportContext = function (reportContext) {
      vm.reportContextInfo = reportContext;
    }

    vm.setCellType = function (type) {
      vm.cellType = type;
    }

    function init() {
      //Do any init activities - if any


    }

    init();



    vm.showChatterDialog = function (ev) {
      $mdDialog.show({
          controller: 'chatterDialogController',
          templateUrl: 'http://localhost:3000/app/chatter/contextChatterDialog/chatter-dialog.html',
          /*parent: angular.element(angular.element(document.getElementById('d:dashboard~p:2i41s4pgps2jop6q~r:gvf5n0lc1ns2vva2~v:compoundView!1ViewContainer'))),*/
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $mdMedia('sm') && $scope.dialogCustomFullscreen,
        })
        .then(function (answer) {
          $scope.dialogStatus = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.dialogStatus = 'You cancelled the dialog.';
        });
      $scope.$watch(function () {
        return $mdMedia('sm');
      }, function (sm) {
        $scope.dialogCustomFullscreen = (sm === true);
      });
    };
  }

});

