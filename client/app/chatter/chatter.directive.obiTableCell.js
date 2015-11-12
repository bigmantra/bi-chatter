define(["index.module"], function () {
  'use strict';


  angular
    .module('bm.platform')
    .directive("biChatterTableCell", OBITableCellDirective)

  function OBITableCellDirective(BIGate, Topics) {


    return {

      restrict: 'A',
      replace: true,
      transclude: false,
      link: function (scope, iElement, attrs, $timeout) {

        //var elementPSId = obips.EdgeCoords.findCoords($('#' + (iElement.attr('id'))).children()[0]).getId();


        //Check for comments only for the first time. - then the watch kicks in
        // Ugly hack to workaround delay caused by presentation services XHR
        scope.elemId = iElement.attr('id');
        setTimeout(function () {
          scope.contextData = BIGate.getContextHash(scope.elemId);
          var rowContextSHA1 = scope.contextData.SHA1;
          var topicsRef = Topics.getTopicsRef(rowContextSHA1);
          topicsRef.once('value', function (snapshot) {
            if (snapshot.val() !== null) {
              scope.topicsExist = true
              iElement.append('<i style="margin-left:8px;cursor: default;color: red;" class="fa fa-comments-o"></i>')
            }
          });

        }, 200);

        //Watch for Cell topic existence and set red cell marker if topic exist
        scope.$watch(function () {

          console.log('In cell watch...')

          if (scope.contextData) {
            var topicsRef = Topics.getTopicsRef(scope.contextData.SHA1);
            topicsRef.once('value', function (snapshot) {
              if (snapshot.val() !== null) {
                return true;
              }
            });
          }

          return false;
        }, function (newValue) {
          if (newValue == true) {

            scope.topicsExist = true;
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

});


