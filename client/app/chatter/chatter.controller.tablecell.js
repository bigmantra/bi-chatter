define(["index.module"],function() {
  'use strict';


  angular
    .module('bm.platform')
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

    //TODO

    /*$.each($(BIGate.currentStateXML).find('[folder]'),function(reportIndex,reportItem){


     console.log($(this).attr('folder') + $(this).attr('itemName'));

    })*/


    //This is to allow access to Context on the Cell's postlink function
    $scope.chatterContext = vm.chatterContext;

    vm.animationsEnabled = true;

    vm.checkTopics = function () {

      //var topicsRef = Topics.getTopicsRef((CryptoJS.SHA1(BIGate.currentDashPath).toString()) + '/' + BIGate.getContextHash($scope.elemId).SHA1);


      console.log('get ref for:' + BIGate.getContextHash($scope.elemId).SHA1);

      var topicsRef =  Topics.getTopicsRef(BIGate.getContextHash($scope.elemId).SHA1);


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

      vm.reportId=BIGate.getReportIdFromCell($scope.elemId)

      console.log('ReportId:' + vm.reportId);

      vm.chatterContext.rowContext = BIGate.getContextHash($scope.elemId);


      console.log('vm.chatterContext.rowContext',vm.chatterContext.rowContext)

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


    //at the end destroy
    $scope.$on('$destroy', function(){
      vm = null;
      console.log('scope destroyed');
    });


  }


});
