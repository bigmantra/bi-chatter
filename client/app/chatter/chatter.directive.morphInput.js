define(["index.module"],function() {
  'use strict';

  /**
   * This directive is used to switch focus from Input to Textarea upon ckicking into the Input
   *
   */

  angular
    .module('bm.platform')
    .directive("morphInput", MorphInputDirective)


  function MorphInputDirective() {
    var linkFunction = function (scope, element, attributes) {

      var input = element;
      $(input).on('focusin', function () {
        scope.itemEditable = true;
        scope.$apply();
        element.parent().find('textarea')[0].focus();

      });
    };

    return {
      restrict: "A",
      link: linkFunction,
      scope: {
        itemEditable: "=morphInput"
      }
    };
  };




});
