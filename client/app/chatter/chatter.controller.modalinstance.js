define(["index.module"],function() {
    'use strict';


    angular
      .module('biChatter')
      .controller('ModalInstanceCtrl', DialogInstanceController);

    function DialogInstanceController($scope, $modalInstance, items, chatterContext) {

      this.items = items;

      this.chatterContext = chatterContext;

      this.selected = {
        item: this.items[0]
      };

      this.ok = function () {
        $modalInstance.close(this.selected.item);
      };

      this.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }




  });
