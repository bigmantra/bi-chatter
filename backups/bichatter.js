(function () {
  'use strict';

  angular
    .module('biChatter', ['ui.bootstrap.tpls', 'ui.bootstrap', 'dialogs.main', 'monospaced.elastic', 'ngTagsInput', 'ui.tree', 'firebase'])

    //Configure chatter as a whitelisted URL
    .config(function ($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        'http://localhost:3000/**'
      ]);

    })

    .value('fbURL', 'https://bi-chatter.firebaseio.com/demo/topics/')

    //Controllers
    .controller('MainController', MainController)

    .controller('ChatterTableCellController', ChatterTableCellController)
    .controller('ModalInstanceCtrl', DialogInstanceController)
    .controller('commentsCtrl', CommentsController)

    //Directives
    .directive("biChatterTable", ChatterTableDirective)
    .directive("biChatterTableCell", ChatterTableCellDirective)
    .directive('focusMe', ['$timeout', FocusDirective])


    //App Services

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
          // var elementID = element.attr('id');
          var edgeCoords = obips.EdgeCoords.findCoords($('#' + (elementID)).children()[0]);
          console.log(elementID);

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


            console.log('In For loop');

            console.log(currentColumnElementId);

            var currentColEdgeCoords = obips.EdgeCoords.findCoords($('#' + currentColumnElementId).children()[0]);

            console.log(currentColEdgeCoords);

            var currentCol = obips.ViewModel.getCurrentColumn(currentColEdgeCoords);

            console.log(currentCol);

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

    .filter('timeago', function () {
      return function (date) {
        var moment = require('momentjs');
        return moment(date).fromNow();
      }
    })
    .filter('calendar', function () {
      return function (date) {
        var moment = require('momentjs');
        return moment(date).calendar();
      }
    })


    .run(['$templateCache', function ($templateCache) {

      $templateCache.put('/people-mentions.tpl', '<ul class="list-group user-search">  <li mentio-menu-item="person" ng-repeat="person in items" class="list-group-item">    <img ng-src="{{person.imageUrl}}" class="user-photo">    <span class="text-primary" ng-bind-html="person.name | mentioHighlight:commentEditor.typedTerm:\'menu-highlighted\' | unsafe"></span>    <em class="text-muted" ng-bind="person.bio | words:5"></em>  </li></ul>');
      $templateCache.put("template/accordion/accordion-group.html",
        "<div class=\"topic\">\n" +
        "  <div class=\"panel-heading\">\n" +
        "    <h4 class=\"panel-title\">\n" +
        "      <span href class=\"accordion-toggle\" accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}:Heading</span></a>\n" +
        " <a href='' class='btn btn-primary btn-xs pull-right'                             ng-click='toggleOpen()'><i                            class='fa fa-plus-square-o'></i></a>" +
        "    </h4>\n" +
        "  </div>\n" +
        "  <div class=\"panel-collapse\" collapse=\"!isOpen\">\n" +
        "	  <div class=\"panel-body\" ng-transclude></div>\n" +
        "  </div>\n" +
        "</div>\n" +
        "");


    }]);


  function CommentsController($scope, $log, Topics, $firebaseArray, fbURL) {

    $scope.info = "";
    $scope.uistatus = {"open": true};
    $scope.contextId = CryptoJS.SHA1($scope.chatterContainer.chatterContext.dashboard).toString();
    $scope.rowContext = $scope.chatterContainer.chatterContext.rowContext.SHA1;
    $scope.topics = Topics.getTopics($scope.contextId + '/' + $scope.rowContext);

    $scope.addTopic = function () {
      if ($scope.topics.length > 10) {
        window.alert('You can\'t add more than 10 topics!');
        return;
      }
      var topicName = document.getElementById("topicName").value;
      if (topicName.length > 0) {
        $scope.topics.$add({
          name: topicName,
          type: "topic",
          contextDashboardPath: $scope.chatterContainer.chatterContext.dashboard,
          comments: [],
          sortOrder: $scope.topics.length,
          context: $scope.chatterContainer.chatterContext

        });
        document.getElementById("topicName").value = '';
      }
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

      $scope.topics.$save($scope.topics.$getRecord(topic.$id));

    };

    $scope.removeTopic = function (topic) {
      if (window.confirm('Are you sure to remove this topic?')) {
        //topic.destroy();
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

      if (!$scope.topics.$getRecord(topic.$id).comments)  $scope.topics.$getRecord(topic.$id).comments = [];//Initialise if its the first comment for the topic.

      $scope.topics.$getRecord(topic.$id).comments.push({
        name: topic.newCommentName,
        sortOrder: topic.comments.length,
        type: "comment"
      });

      delete topic.newCommentName;
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

  function MainController($scope) {

    this.appName = 'BI Chatter';

  }


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
  }


  function CommentEditorController($http, $q, $sce, $scope, $filter) {


  }


  function ChatterTableCellController(dialogs, $scope, $modal, $log, BIGate, Topics) {

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
        templateUrl: '//localhost:3000/src/app/templates/commenteditormodal.html',
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


  //Filter #words in the input
  function WordsFilter() {
    return function (input, words) {
      if (isNaN(words)) {
        return input;
      }
      if (words <= 0) {
        return '';
      }
      if (input) {
        var inputWords = input.split(/\s+/);
        if (inputWords.length > words) {
          input = inputWords.slice(0, words).join(' ') + '\u2026';
        }
      }
      return input;
    };
  }

})();


var boostrapChatterApp = function () {

  var tableParentElement = $('.PTChildPivotTable');

  //Bootstrap if not already
  if (!(tableParentElement.attr('bi-chatter-table'))) {

    console.log('New - Attempt to attach angular to View');

    var tableParentElement = $('.PTChildPivotTable');
    tableParentElement.attr('ng-controller', 'MainController as chatter');
    //attach chatter directive - this will make angular loop through table child elements and attach further directives before compile
    tableParentElement.attr('bi-chatter-table', 'true');
    angular.bootstrap($('.PTChildPivotTable')[0], ['biChatter']);
    console.log('Angular Bootstraped!!!');


  }

}


//Todo Wrap it in a function to avoid polluting global namespace

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//In Analysis Mode
var targetElementArray = $(document).find('div[id^=tableView]');

//In Dashboard Mode
if (targetElementArray.length < 1) {
  targetElementArray = $(document).find('td[id*=tableView]');
}

//TODO Fix this to handle all tables
var list = targetElementArray[0];

console.log(list);

var observer = new MutationObserver(function (mutations) {
  //mutations.forEach(function(mutation) {
  //  console.log(mutation.type);
  //});

  //TODO Finetune performance - to handle only specific DOM mutations
  if (!(angular.element($('.PTChildPivotTable')).scope())) {
    boostrapChatterApp();

  }

});

observer.observe(list, {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true
});

