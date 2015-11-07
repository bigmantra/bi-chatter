define(["index.module"],function() {
  'use strict';


  angular
    .module('bm.platform')
    .directive('focusMe', ['$timeout', FocusDirective]);

  function FocusDirective($timeout) {

    return {
      scope: {trigger: '@focusMe'},
      link: function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (value === "true") {
            $timeout(function () {
              element[0].focus();
            });
          }
        });
      }
    };
  };


});
