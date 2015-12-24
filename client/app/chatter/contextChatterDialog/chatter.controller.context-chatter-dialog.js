define(["index.module"], function () {
  'use strict';


  var app = angular.module('bm.platform');


  app.controller('chatterDialogController', ['$mdDialog', 'context', ChatterDialogController]);


  function ChatterDialogController($mdDialog, context) {

    var vm = this;


    vm.feedContext = {
      level1Context: context.report.currentDashboard,
      level2Context: context.report.analysisPath,
      level3Context: {dimRefs: context.cell.dimRefs, baseFormula: context.cell.columnDetails.baseFormula},
      contextDisplayData: context.cell.refs
    }


    vm.hide = function () {
      $mdDialog.hide();
    };
    vm.cancel = function () {
      $mdDialog.cancel();
    };
    vm.answer = function (answer) {
      $mdDialog.hide(answer);
    };


  }

})
