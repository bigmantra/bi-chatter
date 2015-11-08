

define(["index.module"],function() {
  'use strict';

  angular
    .module('bm.platform')
    .directive("obiTable", OBITableDirective)

  function OBITableDirective() {
    return {
      restrict: 'A',
      replace: true,
      transclude: false,
      compile: function (tElement, attrs) {
        console.log('Compiling BI Chatter Table directive!')


        var currentTableCells=tElement.find('td[id^=e_saw]');

        //do nothing if already compiled
        console.log(currentTableCells.attr('bi-chatter-table-cell'));
        if(currentTableCells.attr('bi-chatter-table-cell')=='true') return;

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

        currentTableCells.append('<a ng-show="!chatterCell.commentExists && !chatterCell.hover"></a>')


        //currentTableCells.append('<span>Name: {{chatterCell.name}}</span>')


      }
    };
  }


});
