

define(["index.module"],function() {
  'use strict';

  angular
    .module('bm.platform')
    .directive("obiChatterEnable", obiChatterEnableDirective)

  function obiChatterEnableDirective() {
    return {
      restrict: 'A',
      replace: true,
      transclude: false,
      compile: function (tElement, attrs) {
        console.log('Compiling BI Chatter Enabler directive!')

        angular.forEach($("[viewtype='tableView']"), function (tableParentElement, key) {

          tableParentElement.setAttribute('obi-table', 'true');


        });


      }
    };
  }


});
