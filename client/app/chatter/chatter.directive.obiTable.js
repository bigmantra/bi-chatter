

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
        console.log('Compiling BI Chatter directive!')
        tElement.find('td[id^=e_saw]').attr('ng-controller', 'ChatterTableCellController as chatterCell');
        tElement.find('td[id^=e_saw]').attr('bi-chatter-table-cell', 'true');
        tElement.find('td[id^=e_saw]').attr('style', 'cursor: default');
        tElement.find('td[id^=e_saw]').attr('ng-dblclick', 'chatterCell.clickToOpen()');
        //tElement.find('td[id^=e_saw]').attr('ng-class',"{'bg-success': chatterCell.hover}");
        //tElement.find('td[id^=e_saw]').append('<i ng-click="chatterCell.clickToOpen()" ng-show="chatterCell.hover && !chatterCell.commentExists" style="margin-left:8px;cursor: pointer" class="fa fa-comment"></i>')
        //tElement.find('td[id^=e_saw]').append('<button type="button" class="btn btn-success btn-mini" ng-click="chatterCell.clickToOpen()" ng-show="chatterCell.hover && !chatterCell.commentExists" style="margin-left:8px;"><i class="fa fa-pencil-square-o"></i></button>');

        tElement.find('td[id^=e_saw]').attr('ng-mouseenter', "chatterCell.hover = true");
        tElement.find('td[id^=e_saw]').attr('ng-mouseleave', "chatterCell.hover = false");

        //tElement.find('td[id^=e_saw]').attr('popover-placement','right');
        //tElement.find('td[id^=e_saw]').attr('popover','On the top!');
        //tElement.find('td[id^=e_saw]').attr('popover-append-to-body','true');

        tElement.find('td[id^=e_saw]').append('<a ng-show="!chatterCell.commentExists && !chatterCell.hover"></a>')


        //tElement.find('td[id^=e_saw]').append('<span>Name: {{chatterCell.name}}</span>')


      }
    };
  }


});
