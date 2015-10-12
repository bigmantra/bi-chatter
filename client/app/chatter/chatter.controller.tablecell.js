(function () {
  'use strict';


  angular
    .module('biChatter')
    .controller('ChatterTableCellController', ChatterTableCellController);

  function ChatterTableCellController($scope, $modal, $log, BIGate, Topics) {

    this.hover = false;
    this.commentExists = false;
    var vm = this;

//TODO REMOVE
    vm.items = [];
    vm.contextId = "";
    vm.topicsExist = false;

    vm.chatterContext = {
      sessionId: BIGate.sawSessionId,
      dashboard: BIGate.currentDashPath,
      contextId: CryptoJS.SHA1(BIGate.currentDashPath).toString()
    };

    //This is to allow access to Context on the Cell's postlink function
    $scope.chatterContext = vm.chatterContext;

    vm.animationsEnabled = true;

    vm.checkTopics = function () {
      var topicsRef = Topics.getTopicsRef((CryptoJS.SHA1(BIGate.currentDashPath).toString()) + '/' + BIGate.getContextHash($scope.elemId).SHA1);
      topicsRef.once('value', function (snapshot) {
        if (snapshot.val() !== null) {
          vm.topicsExist = true;
          $scope.topicsExist = vm.topicsExist;
        }
        else {
          vm.topicsExist = false;
          $scope.topicsExist = vm.topicsExist;

        }
      });
    }


    this.clickToOpen = function (size) {

      console.log('Opening Modal for elem ' + $scope.elemId)

      vm.chatterContext.rowContext = BIGate.getContextHash($scope.elemId);

      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'http://localhost:3000/app/chatter/commentEditorModal.html',
        controller: 'ModalInstanceCtrl as chatterContainer',
        size: 'lg',
        keyboard: true, // close with esc key
        resolve: {
          items: function () {
            return vm.items;
          },
          chatterContext: function () {
            return vm.chatterContext;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
        vm.checkTopics();
      }, function () {
        vm.checkTopics();
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.toggleAnimation = function () {
      vm.animationsEnabled = !vm.animationsEnabled;
    };


  }




})();
