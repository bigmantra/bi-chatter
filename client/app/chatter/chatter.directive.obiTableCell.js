define(["index.module"],function() {
  'use strict';


  var app = angular.module('bm.platform');



  app.directive('obiTableCell',['$parse','cellContext', CellDirective]);

  function CellDirective ($parse,cellContext) {

    var OBITableCellDirectiveController = ['$scope', function ($scope) {

      var vm=this;


      vm.setContext=function(context){

        vm.cellContextInfo=context;


      };

      vm.setReportContext=function(reportContext){

        vm.reportContextInfo=reportContext;

      }


      vm.setCellType=function(type){

        vm.cellType=type;

      }

      function init() {
          console.log('init cell...')

        console.log(cellContext.getContextCollection());


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
      require:['^obiTable','obiTableCell'],
      controllerAs: 'cellCtrl',
      bindToController: true,
      compile: function(tElm,tAttrs){
        var exp = $parse('cellCtrl.showChatter()');
        return function (scope,elm,attr, controllers){

          var tableController=controllers[0];
          var cellController=controllers[1];

          var contextCollection=cellContext.getContextCollection()

          elm.bind('dblclick',function(){
            exp(scope);
          });

          var context = $.grep(contextCollection, function (e) {
            return e.element == elm.attr('Id');

          });

          console.log('in link...');
          console.log(contextCollection);

          if(context && context.length>0){

            cellController.setContext(context[0]);
            cellController.setCellType('Measure');
            elm.css({backgroundColor:'red'});

          }else{

            cellController.setCellType('Dimension');

          }




          cellController.setReportContext(tableController.getReportContext());
          //console.log($parse('cellCtrl.elemId')(scope));

        };
      }

    };
  }



});

