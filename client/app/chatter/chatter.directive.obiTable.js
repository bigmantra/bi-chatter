define(["index.module"], function () {
  'use strict';

  angular
    .module('bm.platform')
    .directive("obiTable", ['BIGate','$timeout','$http','metaDataResponses', OBITableDirective])


  function OBITableDirectiveController($scope, BIGate,metaDataResponses) {


    var vm = this;

    function init() {

      // init controller
    }

    init();


    $scope.copyToVM=function(){

      console.log('Copying scope to View Model');
      vm.reportSearchId= $scope.reportSearchId;

      //Put a copy of the report Metadata in scope for ease of use when needed
      var viewReport = $.grep(metaDataResponses, function(e){ return e.searchId === $scope.reportSearchId; });

      vm.viewReport=viewReport[0];

    }

  }


  function OBITableDirective(BIGate,$timeout,$http,metaDataResponses) {
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


        var viewUniqueId = BIGate.getReportIdFromElement(tElement);

        console.log(tElement);

      //Find Report Metadata and put the searchId as an Attribute on the element. This will also be stored on the scope
        var reportRegex = /~r:(.*?)~v:/;
        var reportId = 'r:' + reportRegex.exec(viewUniqueId)[1]
        var viewReport = $.grep(metaDataResponses, function(e){ return e.reportId == reportId; });


        tElement.attr('sid',viewReport[0].searchId)

        console.log(viewReport[0].searchId);



        /*
                //Get Report State Path
                var reportStatePathRegex = /(.*?)~v:/;
                var reportStatePath= reportStatePathRegex.exec(viewUniqueId)[1];


                //Get View Id

                var viewIdRegex = /.*?~v:(.*)/;
                var viewId = viewIdRegex.exec(viewUniqueId)[1];
        */





/*        //Loop through State XML and get the analysisPath and viewPath. These are then set as attributes on the table element which are subsequently set on the scope
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


        });*/



        var currentTableCells = tElement.find('td[id^=e_saw]');

        //do nothing if already compiled
        if (currentTableCells.attr('bi-chatter-table-cell') == 'true') return;


        currentTableCells.attr('bi-chatter-table-cell', 'true');

     /*   currentTableCells.attr('ng-controller', 'ChatterTableCellController as chatterCell');
        currentTableCells.attr('bi-chatter-table-cell', 'true');
        currentTableCells.attr('style', 'cursor: default');
        currentTableCells.attr('ng-dblclick', 'chatterCell.clickToOpen()');*/


        //currentTableCells.attr('ng-class',"{'bg-success': chatterCell.hover}");
        //currentTableCells.append('<i ng-click="chatterCell.clickToOpen()" ng-show="chatterCell.hover && !chatterCell.commentExists" style="margin-left:8px;cursor: pointer" class="fa fa-comment"></i>')
        //currentTableCells.append('<button type="button" class="btn btn-success btn-mini" ng-click="chatterCell.clickToOpen()" ng-show="chatterCell.hover && !chatterCell.commentExists" style="margin-left:8px;"><i class="fa fa-pencil-square-o"></i></button>');
        //currentTableCells.attr('ng-mouseenter', "chatterCell.hover = true");
        //currentTableCells.attr('ng-mouseleave', "chatterCell.hover = false");
        //currentTableCells.attr('popover-placement','right');
        //currentTableCells.attr('popover','On the top!');
        //currentTableCells.attr('popover-append-to-body','true');



        /*currentTableCells.append('<a ng-show="!chatterCell.commentExists && !chatterCell.hover"></a>');
        currentTableCells.append('<p>Test: {{obiTblCtrl.test}}</p>')*/
        //currentTableCells.append(BIGate.getContextHash(currentTableCells.attr('id')));




        //currentTableCells.append('<span>Name: {{chatterCell.name}}</span>')


        //Return Link functions
        //The post-link function sets the analysis and view paths on the scope for subsequent use.
        return {
          pre: function (scope, iElem, iAttrs) {
            console.log('pre link - Do Nothing');
          },
          post: function (scope, iElem, iAttrs) {
            console.log('post link - Copy attrs to VM');
            scope.reportSearchId=iElem.attr('sid');


            console.log($(iElem).find('td[id^=e_saw]')[0]);

            scope.copyToVM();

          }
        }


      }
    };
  }


});
