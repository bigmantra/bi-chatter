define(["index.module"], function () {
  'use strict';

  angular
    .module('bm.platform')
    .directive("obiTable", ['BIGate','$timeout','$http', OBITableDirective])


  function OBITableDirectiveController($scope, BIGate) {


    var vm = this;

    function init() {

      // init controller
    }

    init();


    $scope.copyToVM=function(){


      console.log('Copying scope to View Model');
      vm.analysisPath= $scope.analysisPath;
      vm.viewpath=$scope.viewPath;

    }


  }


  function OBITableDirective(BIGate,$timeout,$http) {
    return {
      restrict: 'A',
      replace: true,
      transclude: false,
      controller: OBITableDirectiveController,
      controllerAs: 'obiTblCtrl',
      scope:{

      },
      compile: function (tElement, attrs) {


        console.log('Compiling BI Chatter Table directive!')


        var analysisPath,viewIdFromFullViewId;

        //Loop through State XML and get the analysisPath and viewPath. These are then set as attributes on the table element which are subsequently set on the scope
        $.each($(BIGate.currentStateXML).find('[folder]'), function (reportIndex, reportItem) {


          var reportIdFromStateXML = $(this).attr('cid');

          var viewUniqueId = BIGate.getReportIdFromElement(tElement);

          var reportRegex = /(.*?)~v:/;

          var reportStatePath= reportRegex.exec(viewUniqueId)[1];

          console.log('reportStatePath: ',reportStatePath);

          reportRegex = /~r:(.*?)~v:/;
          var reportIdfromFullViewId = 'r:' + reportRegex.exec(viewUniqueId)[1]

          if (reportIdFromStateXML == reportIdfromFullViewId) {

            var analysisPath = $(this).attr('folder') + '/' + $(this).attr('itemName');
            reportRegex = /.*?~v:(.*)/;
            var viewIdFromFullViewId = reportRegex.exec(viewUniqueId)[1];

            tElement.attr('analysis',analysisPath)
            tElement.attr('view',viewIdFromFullViewId)

            console.log('printing XMLs....')
            console.log(BIGate.reportXMLs);

          }


        });


        //var reportRegex=/phrase=(.*)/;
        //reportRegex.exec(phrase);


        var currentTableCells = tElement.find('td[id^=e_saw]');

        //do nothing if already compiled
        if (currentTableCells.attr('bi-chatter-table-cell') == 'true') return;

        currentTableCells.attr('ng-controller', 'ChatterTableCellController as chatterCell');
        currentTableCells.attr('bi-chatter-table-cell', 'true');
        currentTableCells.attr('style', 'cursor: default');
        currentTableCells.attr('ng-dblclick', 'chatterCell.clickToOpen()');
        //currentTableCells.attr('ng-class',"{'bg-success': chatterCell.hover}");
        //currentTableCells.append('<i ng-click="chatterCell.clickToOpen()" ng-show="chatterCell.hover && !chatterCell.commentExists" style="margin-left:8px;cursor: pointer" class="fa fa-comment"></i>')
        //currentTableCells.append('<button type="button" class="btn btn-success btn-mini" ng-click="chatterCell.clickToOpen()" ng-show="chatterCell.hover && !chatterCell.commentExists" style="margin-left:8px;"><i class="fa fa-pencil-square-o"></i></button>');

        //currentTableCells.attr('ng-mouseenter', "chatterCell.hover = true");
        //currentTableCells.attr('ng-mouseleave', "chatterCell.hover = false");

        //currentTableCells.attr('popover-placement','right');
        //currentTableCells.attr('popover','On the top!');
        //currentTableCells.attr('popover-append-to-body','true');

        currentTableCells.append('<a ng-show="!chatterCell.commentExists && !chatterCell.hover"></a>');

        currentTableCells.append('<p>Test: {{obiTblCtrl.test}}</p>')

        //currentTableCells.append(BIGate.getContextHash(currentTableCells.attr('id')));




        //currentTableCells.append('<span>Name: {{chatterCell.name}}</span>')


        //Return Link functions
        //The post-link function sets the analysis and view paths on the scope for subsequent use.
        return {
          pre: function (scope, iElem, iAttrs) {
            console.log(name + ': pre link');
          },
          post: function (scope, iElem, iAttrs) {
            console.log(name + ': post link');

            scope.analysisPath=iElem.attr('analysis');
            scope.viewPath=iElem.attr('view');

            scope.copyToVM();

          }
        }


      }
    };
  }


});
