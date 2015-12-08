(function() {
  'use strict';

  angular
    .module('bm.platform')
    .directive('paletteBackground', paletteBackground);

  /* @ngInject */
  function paletteBackground(triTheming) {
    // Usage:
    // ```html
    // <div palette-background="green:500">Coloured content</div>
    // ```
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
      link: link,
      restrict: 'A'
    };
    return directive;

    function link($scope, $element, attrs) {
      console.log('linking palette Background directive');

      var splitColor = attrs.paletteBackground.split(':');
      var color = triTheming.getPaletteColor(splitColor[0], splitColor[1]);

      if(angular.isDefined(color)) {
        $element.css({
          'background-color': triTheming.rgba(color.value),
          'border-color': triTheming.rgba(color.value),
          'color': triTheming.rgba(color.contrast)
        });
      }
    }
  }
})();
