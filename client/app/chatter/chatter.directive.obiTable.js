define(["index.module"], function () {
  'use strict';

  angular
    .module('bm.platform')
    .directive("obiTable", ['BIGate','metaDataResponses','$compile', OBITableDirective])


  function OBITableDirectiveController($scope, BIGate, metaDataResponses) {


    var vm = this;
    vm.viewReport={};

    function init() {

      // init controller
      var viewReport = $.grep(metaDataResponses, function(e){ return e.searchId === vm.sid; });
        vm.viewReport=viewReport[0];
        vm.viewReport=viewReport[0];

    }

    init();


    /* $scope.copyToVM=function(){

     console.log('Copying scope to View Model');
     vm.reportSearchId= $scope.reportSearchId;

     //Put a copy of the report Metadata in scope for ease of use when needed
     var viewReport = $.grep(metaDataResponses, function(e){ return e.searchId === $scope.reportSearchId; });

     vm.viewReport=viewReport[0];

     }*/

  }


  function OBITableDirective(BIGate, metaDataResponses,$compile) {
    return {
      restrict: 'A',
      replace: true,
      transclude: false,
      priority:1001, // compiles first
      terminal:true, // prevent lower priority directives to compile after it
      controller: OBITableDirectiveController,
      controllerAs: 'obiTblCtrl',
      scope: {
        sid : '@sid'
      },
      bindToController: true,
      compile: function(tElement, attrs) {
        tElement.removeAttr('obi-table'); // necessary to avoid infinite compile loop

        var viewUniqueId = BIGate.getReportIdFromElement(tElement);

        //Find Report Metadata and put the searchId as an Attribute on the element. This will also be stored on the scope
        var reportRegex = /~r:(.*?)~v:/;
        var reportId = 'r:' + reportRegex.exec(viewUniqueId)[1]
        var viewReport = $.grep(metaDataResponses, function (e) {
          return e.reportId == reportId;
        });
        attrs.$set('sid',viewReport[0].searchId);

        var currentTableCells = tElement.find('td[id^=e_saw]');

        //do nothing and return if already compiled
        if (!(currentTableCells.attr('obi-table-cell') == 'true')){
          //Set child directives before compile
          currentTableCells.attr('obi-table-cell', 'true');
        }

        var fn = $compile(tElement);
        return function(scope){
          fn(scope);
        };
      }
    };
  }


});
