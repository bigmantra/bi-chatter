(function() {
  'use strict';

  angular
    .module('biChatter')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$templateCache) {

    $log.debug('runBlock end');


//To remove later
    $templateCache.put("template/accordion/accordion-group.html",
      "<div class=\"topic\">\n" +
      "  <div class=\"panel-heading\">\n" +
      "    <h4 class=\"panel-title\">\n" +
      "      <span href class=\"accordion-toggle\" accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}:Heading</span></a>\n" +
      //" <a href='' class='btn btn-primary btn-xs pull-right'                             ng-click='toggleOpen()'><i                            class='fa fa-plus-square-o'></i></a>" +
      "    </h4>\n" +
      "  </div>\n" +
      "  <div class=\"panel-collapse\" collapse=\"!isOpen\">\n" +
      "	  <div class=\"panel-body\" ng-transclude></div>\n" +
      "  </div>\n" +
      "</div>\n" +
      "");

  }

})();
