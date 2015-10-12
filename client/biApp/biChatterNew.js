  //
  //angular
  //  .module('biChatter', [/*'ui.bootstrap.tpls',*/ 'ui.bootstrap', 'ui.router', 'monospaced.elastic', 'ngTagsInput', 'ui.tree', 'firebase'/*,'angularMoment'*/])

  angular
    .module('biChatter', ['ui.bootstrap.tpls', 'ui.bootstrap', 'ui.router','ngSanitize', 'monospaced.elastic', 'ngTagsInput', 'ui.tree', 'firebase'   /*,'angularMoment'*/ ])




  angular
    .module('biChatter')
    .config(config);

  /** @ngInject */
  function config($logProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      'http://localhost:8000/**'
    ]);

    // Enable log
    $logProvider.debugEnabled(true);

    //// Set options third-party lib
    //toastr.options.timeOut = 3000;
    //toastr.options.positionClass = 'toast-top-right';
    //toastr.options.preventDuplicates = true;
    //toastr.options.progressBar = true;
  }






  angular
    .module('biChatter')
    //.constant('malarkey', malarkey)
    //.constant('toastr', toastr)
    //.constant('moment', moment)
    .value('fbURL', 'https://bi-chatter.firebaseio.com/demo/topics/');








  angular
    .module('biChatter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('chatter', {
        url: '/chatter',
        templateUrl: 'app/chatter/chatter.html',
        controller: 'commentsCtrl'})

    $urlRouterProvider.otherwise('/');
  }




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






  angular
    .module('biChatter')
    .controller('commentsCtrl', CommentsController);

  function CommentsController($scope, $log, Topics, fbURL, Users) {

    $scope.info = "";
    $scope.uistatus = {"open": true};
    $scope.editingNewTopic = false;

    var dashboardPath = ($scope.chatterContainer && $scope.chatterContainer.chatterContext.dashboard) || ('/dummyDashboardSHA1');

    $scope.contextId = CryptoJS.SHA1(dashboardPath).toString();
    $scope.rowContext = ($scope.chatterContainer && $scope.chatterContainer.chatterContext.rowContext.SHA1) || 'defaultRowContext';
    $scope.topics = Topics.getTopics($scope.contextId + '/' + $scope.rowContext);

    $scope.newTopicUsers = ['Girish Lakshmanan'];


    $scope.loadUsers = function (query) {
      return Users.getUsers(query);
    };


    $scope.addTopic = function () {

      var topicName = document.getElementById("topicNameTextArea").value;
      if (topicName.length > 0) {

        var currentTime = new Date();
        console.log(currentTime);

        $scope.topics.$add({
          name: topicName,
          type: "topic",
          createdDate: new Date().getTime(),
          contextDashboardPath: dashboardPath,
          taggedUsers: $scope.newTopicUsers,
          comments: [],
          sortOrder: $scope.topics.length,
          context: ($scope.chatterContainer && $scope.chatterContainer.chatterContext) || 'defaultRowContext'

        });
        document.getElementById("topicNameTextArea").value = '';
      }
    };

    $scope.addedTag = function (tag) {

      console.log(tag.text);
      $scope.newTopicUsers.push(tag.text);

    };


    $scope.editTopic = function (topic) {
      topic.editing = true;
    };

    $scope.cancelEditingTopic = function (topic) {
      topic.editing = false;
    };

    $scope.toggleAccordionOpen = function (topic) {
      topic.accordionStatus = !topic.accordionStatus;
    };


    $scope.saveTopic = function (topic) {

      topic.name = topic.newName;
      $scope.topics.$save($scope.topics.$getRecord(topic.$id));
      topic.editing = false;

    };


    $scope.removeTopic = function (topic) {
      if (window.confirm('Are you sure to remove this topic?')) {
        $scope.topics.$remove($scope.topics.$getRecord(topic.$id));
      }
    };

    $scope.saveTopics = function () {
      for (var i = $scope.topics.length - 1; i >= 0; i--) {
        var topic = $scope.topics[i];
        topic.sortOrder = i + 1;
        $scope.topics.$save($scope.topics.$getRecord(topic.$id));
      }
    };

    $scope.addComment = function (topic) {
      if (!topic.newCommentName || topic.newCommentName.length === 0) {
        return;
      }

      var currentTopic = $scope.topics.$getRecord(topic.$id);

      if (!currentTopic.comments) currentTopic.comments = [];//Initialise if its the first comment for the topic.


      angular.forEach(topic.newCommentUsers, function (value, key) {

        //Add if not already in list of tagged users
        if (((currentTopic.taggedUsers.indexOf(topic.newCommentUsers[key].text)) == -1)) {
          $scope.topics.$getRecord(topic.$id).taggedUsers.push(topic.newCommentUsers[key].text);
        }

      });

      //Append new Tags to topic
      //    $scope.topics.$getRecord(topic.$id).taggedUsers.push.apply($scope.topics.$getRecord(topic.$id).taggedUsers, topic.newCommentUsers);

      $scope.topics.$getRecord(topic.$id).comments.push({
        name: topic.newCommentName,
        sortOrder: topic.comments.length,
        createdDate: new Date().getTime(),
        type: "comment"
      });

      delete topic.newCommentName;
      delete topic.newCommentUsers;
      delete topic.newCommentEditable;

      $scope.topics.$save($scope.topics.$getRecord(topic.$id));


    };

    $scope.removeComment = function (topic, comment) {
      if (window.confirm('Are you sure to remove this comment?')) {
        var index = topic.comments.indexOf(comment);
        if (index > -1) {
          topic.comments.splice(index, 1)[0];
        }

        $scope.topics.$save($scope.topics.$getRecord(topic.$id));

      }
    };

    $scope.options = {
      accept: function (sourceNode, destNodes, destIndex) {
        var data = sourceNode.$modelValue;
        var destType = destNodes.$element.attr('data-type');
        return (data.type == destType); // only accept the same type
      },
      dropped: function (event) {
        console.log(event);
        var sourceNode = event.source.nodeScope;
        var destNodes = event.dest.nodesScope;
        // update changes to server
        if (destNodes.isParent(sourceNode)
          && destNodes.$element.attr('data-type') == 'comment') { // If it moves in the same topic, then only update topic
          var topic = destNodes.$nodeScope.$modelValue;
          topic.save();
        } else { // save all
          $scope.saveTopics();
        }
      }
    };


  }






  angular
    .module('biChatter')
    .controller('MainController', MainController);


  function MainController($scope) {

    this.appName = 'BI Chatter';

  }







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
        templateUrl: 'http://localhost:8000/src/app/chatter/commentEditorModal.html',
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

        }, 1000);

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










//(function() {
//  'use strict';
//
//  angular
//    .module('biChatter')
//
//    .filter('timeago', function () {
//      return function (date) {
//        var moment = require('momentjs');
//        return moment(date).fromNow();
//      }
//    })
//    .filter('calendar', function () {
//      return function (date) {
//        var moment = require('momentjs');
//        return moment(date).calendar();
//      }
//    })
//
//
//})();



  angular
    .module('biChatter')
    .factory('Users', function () {

      var userServiceInstance =
      {
        getUsers: function ($query) {
          return [
            'Girish Lakshmanan'
            , 'Nancy Seaton'
            , 'Darren Breiner'
            , 'Dominic Magner'
            , 'Marc Mcgurk'
          ];
        }
      }
      return userServiceInstance;
    })

    .factory('Topics', function ($firebaseArray, fbURL) {

      var topicsInstance = {
        getTopics: function (contextId) {
          return $firebaseArray(new Firebase(fbURL + contextId))
        },
        getTopicsRef: function (contextId) {
          return new Firebase(fbURL + contextId);
        }
      }
      return topicsInstance; // jshint ignore:line
    })

    .factory('BIGate', function () {
      var gateInstance = {

        sawSessionId: obips_scid,
        currentDashPath: saw.session.SessionInfos().portalPath,
        currentUser: saw.session.SessionInfos().user,
        baseURL: saw.getBaseURL(),

        getContextHash: function (elementID) {

          var contextHash = {};
          var edgeCoords = obips.EdgeCoords.findCoords($('#' + (elementID)).children()[0]);

          var sawViewModelID = edgeCoords.getId();
          var sawColumn = obips.ViewModel.getCurrentColumn(edgeCoords);

          var sawViewModel = obips.ViewModel.getViewModelById(sawViewModelID);
          var columnID = sawColumn.getAttribute('columnID');
          var stateInstance = obips.ReportMetadata.GetInstanceByStatePath(sawViewModel.reportStatePath);
          var numLayers = sawViewModel.getEdgeDefinition(sawViewModelID).getLayerCount(obips.JSDataLayout.ROW_EDGE);

          var currentRowColumns = [];

          //Loop through all columns in the same row as the current Element
          for (var i = 0; i < numLayers; i++) {

            var currentColumnElementId = 'e_' + sawViewModelID + '_1_' + i + '_' + edgeCoords.getSlice();

            var currentColEdgeCoords = obips.EdgeCoords.findCoords($('#' + currentColumnElementId).children()[0]);

            var currentCol = obips.ViewModel.getCurrentColumn(currentColEdgeCoords);

            currentRowColumns.push({
              //Get the Column Formula for the element
              formula: currentCol.querySelector('columnFormula expr').innerHTML,
              //Get the Heading of current element
              heading: ((currentCol.querySelector('columnHeading caption text') && currentCol.querySelector('columnHeading caption text').innerHTML) || (currentCol.querySelector('columnFormula expr').innerHTML)),
              //Get the Column Value of the Current element
              value: currentColEdgeCoords.element.textContent

            })
          }

          contextHash = {

            //isMeasure: stateInstance.getColumnInfoByID(columnID).isMeasure(),
            columnID: columnID,
            //baseFormula: stateInstance.getColumnInfoByID(columnID).getBaseFormula(),
            heading: ((sawColumn.querySelector('columnHeading caption text') && sawColumn.querySelector('columnHeading caption text').innerHTML) || (sawColumn.querySelector('columnFormula expr').innerHTML)),
            currentRowColumns: currentRowColumns,
            value: edgeCoords.element.textContent

          }
          contextHash.SHA1 = CryptoJS.SHA1(JSON.stringify(contextHash)).toString();

          return contextHash
        }//End Function getcontextHash


      };

      return gateInstance;
    })





var boostrapChatterApp = function () {

  var tableParentElement = $('.PTChildPivotTable');

  //Bootstrap if not already
  if (!(tableParentElement.attr('bi-chatter-table'))) {

    console.log('New - Attempt to attach angular to View');
    var tableParentElement = $('.PTChildPivotTable');
    tableParentElement.attr('ng-controller', 'MainController as chatter');
    //attach chatter directive - this will make angular loop through table child elements and attach further directives before compile
    tableParentElement.attr('bi-chatter-table', 'true');
    //angular.bootstrap($('.PTChildPivotTable')[0], ['biChatter']);
    angular.bootstrap($('.PortalBody')[0], ['biChatter']);

    console.log('Angular Bootstraped!!!');


  }


  document.onload = function() {
    console.log("Document Loaded!!!");
  };

}



function observeChatterSensitiveDOMChanges(){


  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//In Analysis Mode
  var targetElementArray = $(document).find('div[id^=tableView]');

//In Dashboard Mode
  if (targetElementArray.length < 1) {
    targetElementArray = $(document).find('td[id*=tableView]');
  }

  if (targetElementArray.length < 1) {
    targetElementArray = $(document);
  }

//TODO Fix this to handle all tables
  var list = targetElementArray[0];

  console.log(list);

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation.type);
    });

    //TODO Finetune performance - to handle only specific DOM mutations
    //if (!(angular.element($('.PTChildPivotTable')).scope())) {
    //  boostrapChatterApp();
    //
    //}

  });

  observer.observe(list, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });



}


//Todo Wrap it in a function to avoid polluting global namespace


