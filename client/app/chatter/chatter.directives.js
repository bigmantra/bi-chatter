(function () {
  'use strict';


  angular
    .module('biChatter')
    .directive("morphInput", MorphInputDirective)
    .directive("biChatterTable", ChatterTableDirective)
    .directive("biChatterTableCell", ChatterTableCellDirective)
    .directive('focusMe', ['$timeout', FocusDirective]);


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


  function ChatterTableCellDirective(BIGate, Topics) {


    return {

      restrict: 'A',
      replace: true,
      transclude: false,
      link: function (scope, iElement, attrs, $timeout) {

        //var elementPSId = obips.EdgeCoords.findCoords($('#' + (iElement.attr('id'))).children()[0]).getId();


        //Check for comments only for the first time. - then the watch kicks in
        // Ugly hack to workaround delay caused by presentation services XHR
        setTimeout(function () {
          scope.elemId = iElement.attr('id');
          var rowContextSHA1 = BIGate.getContextHash(scope.elemId).SHA1;
          var topicsRef = Topics.getTopicsRef((CryptoJS.SHA1(BIGate.currentDashPath).toString()) + '/' + rowContextSHA1);
          topicsRef.once('value', function (snapshot) {
            if (snapshot.val() !== null) {
              scope.topicsExist == true
              iElement.append('<i style="margin-left:8px;cursor: default;color: red;" class="fa fa-comments-o"></i>')
            }
          });

        }, 200);

        //Watch for Cell topic existence and set red cell marker if topic exist
        scope.$watch(function () {
          return scope.topicsExist;
        }, function (newValue) {
          if (scope.topicsExist == true) {

            if (iElement.find('.fa-comments-o').length < 1) {
              iElement.append('<i style="margin-left:8px;cursor: default;color: red;" class="fa fa-comments-o"></i>')
            }
          }
          else {
            iElement.find('.fa-comments-o').remove();
          }

        });


      }


    }


  }



  function ChatterTableDirective() {
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
        tElement.find('td[id^=e_saw]').append('<button type="button" class="btn btn-success btn-mini" ng-click="chatterCell.clickToOpen()" ng-show="chatterCell.hover && !chatterCell.commentExists" style="margin-left:8px;"><i class="fa fa-pencil-square-o"></i></button>');

        tElement.find('td[id^=e_saw]').attr('ng-mouseenter', "chatterCell.hover = true");
        tElement.find('td[id^=e_saw]').attr('ng-mouseleave', "chatterCell.hover = false");

        //tElement.find('td[id^=e_saw]').attr('popover-placement','right');
        //tElement.find('td[id^=e_saw]').attr('popover','On the top!');
        //tElement.find('td[id^=e_saw]').attr('popover-append-to-body','true');

        tElement.find('td[id^=e_saw]').append('<a ng-show="!chatterCell.commentExists && !chatterCell.hover" style="margin-left:20px;"></a>')


        //tElement.find('td[id^=e_saw]').append('<span>Name: {{chatterCell.name}}</span>')


      }/*,
       link: function ($scope, element, attrs, controller) {

       element.find('td[id^=e_saw]').append('<i class="fa fa-commenting-o"></i>')

       angular.forEach(element.find('td[id^=e_saw]'), function (value, key) {

       console.log(key + ':' + value)

       });

       }*/
    };
  }


})();
