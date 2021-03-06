define(["index.module"], function () {
  'use strict';

  angular
    .module('bm.platform')
    .directive("obiTable", ['BIGate', 'metaDataResponses', '$compile','cellContext', OBITableDirective])


  function OBITableDirectiveController($scope, BIGate, metaDataResponses,cellContext) {

    var vm = this;
    vm.viewReport = {};


    function init() {

      // init controller
      var viewReport = $.grep(metaDataResponses, function (e) {
        return e.searchId === vm.sid;
      });
      vm.viewReport = viewReport[0];

      vm.cellContextCollection=cellContext.getContextCollection()

      // TODO discard colmaps as we dont need them. deletion  is causing an issue as the colmaps are refenced in the collection population
      //delete vm.viewReport.colMap;

    }

    init();

    vm.getReportContext = function () {


      return vm.viewReport;


    }

    vm.getCellContextCollection = function () {

      return vm.cellContextCollection;

    }


  }


  function OBITableDirective(BIGate, metaDataResponses, $compile) {
    return {
      restrict: 'A',
      replace: true,
      transclude: false,
      priority: 1001, // compiles first
      terminal: true, // prevent lower priority directives to compile after it
      controller: OBITableDirectiveController,
      controllerAs: 'obiTblCtrl',
      scope: {
        sid: '@sid',
        viewId:'@id'
      },
      bindToController: true,
      compile: function (tElement, attrs) {
        tElement.removeAttr('obi-table'); // necessary to avoid infinite compile loop

        var viewUniqueId = BIGate.getReportIdFromElement(tElement);

        console.log('viewUniqueId:' + viewUniqueId)

        //Find Report Metadata and put the searchId as an Attribute on the element. This will also be stored on the scope
        var reportRegex = /~r:(.*?)~v:/;
        var reportId = 'r:' + reportRegex.exec(viewUniqueId)[1]
        var viewReport = $.grep(metaDataResponses, function (e) {
          return e.reportId == reportId;
        });
        attrs.$set('sid', viewReport[0].searchId);

        var currentTableCells = tElement.find('td[id^=e_saw]');

        //do nothing and return if already compiled
        if (!(currentTableCells.attr('obi-table-cell') == 'true')) {
          //Set child directives before compile
          currentTableCells.attr('obi-table-cell', 'true');
        }

        var fn = $compile(tElement);
        return function (scope) {
          fn(scope);
        };
      }
    };
  }


});
