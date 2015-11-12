define(["index.module"],function() {
  'use strict';


  angular.module('bm.platform')
    .directive('chatterTopic',['Topics','fbURL', 'Users',ChatterTopicDirective] );


  function ChatterTopicDirective(Topics,fbURL, Users) {

    var controller = function ($scope) {

      var vm=this;


      function init() {
        //$scope.items = angular.copy($scope.datasource);

        vm.info = "";
        vm.uistatus = {"open": true};
        vm.editingNewTopic = false;

        vm.chatterContext=$scope.chatterContext;

        console.log('vm.chatterContext',vm.chatterContext)

        //    vm.chatterContainer.chatterContext.dashboard=vm.chatterContainer.chatterContext && vm.chatterContainer.chatterContext.dashboard || ('/dummyDashboardSHA1');

        vm.dashboardPath = (vm.chatterContext && vm.chatterContext.dashboard || ('/dummyDashboardSHA1'));


        //vm.contextId = CryptoJS.SHA1(dashboardPath).toString();
        vm.rowContext = (vm.chatterContext && vm.chatterContext.rowContext.SHA1) || 'defaultRowContext';
        //vm.topics = Topics.getTopics(vm.contextId + '/' + vm.rowContext);

        console.log('Rowcontext : ' + vm.rowContext);

        vm.topics = Topics.getTopics(vm.rowContext);
        vm.newTopicUsers = ['Girish Lakshmanan'];


        vm.options = {
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
              vm.saveTopics();
            }
          }
        };


      }

      init();

      vm.loadUsers = function (query) {
        return Users.getUsers(query);
      };


      vm.addTopic = function () {

        var topicName = document.getElementById("topicNameTextArea").value;

        console.log('topic:' + topicName);

        if (topicName.length > 0) {

          var currentTime = new Date();
          console.log(currentTime);

          vm.topics.$add({
            name: topicName,
            type: "topic",
            createdDate: new Date().getTime(),
            contextDashboardPath: vm.dashboardPath,
            taggedUsers: vm.newTopicUsers,
            comments: [],
            sortOrder: vm.topics.length,
            context: (vm.chatterContainer && vm.chatterContainer.chatterContext) || 'defaultRowContext'

          });
          console.log('In Add topic...');


          document.getElementById("topicNameTextArea").value = '';
        }
      };

      vm.addedTag = function (tag) {

        console.log(tag.text);
        vm.newTopicUsers.push(tag.text);

      };


      vm.editTopic = function (topic) {
        topic.editing = true;
      };

      vm.cancelEditingTopic = function (topic) {
        topic.editing = false;
      };

      vm.toggleAccordionOpen = function (topic) {
        topic.accordionStatus = !topic.accordionStatus;
      };


      vm.saveTopic = function (topic) {

        topic.name = topic.newName;
        vm.topics.$save(vm.topics.$getRecord(topic.$id));


        topic.editing = false;

      };




      vm.removeTopic = function (topic) {
        if (window.confirm('Are you sure to remove this topic?')) {
          vm.topics.$remove(vm.topics.$getRecord(topic.$id));
        }
      };

      vm.saveTopics = function () {
        for (var i = vm.topics.length - 1; i >= 0; i--) {
          var topic = vm.topics[i];
          topic.sortOrder = i + 1;
          vm.topics.$save(vm.topics.$getRecord(topic.$id));
        }
      };

      vm.addComment = function (topic) {
        if (!topic.newCommentName || topic.newCommentName.length === 0) {
          return;
        }

        var currentTopic = vm.topics.$getRecord(topic.$id);

        if (!currentTopic.comments) currentTopic.comments = [];//Initialise if its the first comment for the topic.


        angular.forEach(topic.newCommentUsers, function (value, key) {

          //Add if not already in list of tagged users
          if (((currentTopic.taggedUsers.indexOf(topic.newCommentUsers[key].text)) == -1)) {
            vm.topics.$getRecord(topic.$id).taggedUsers.push(topic.newCommentUsers[key].text);
          }

        });

        //Append new Tags to topic
        //    vm.topics.$getRecord(topic.$id).taggedUsers.push.apply(vm.topics.$getRecord(topic.$id).taggedUsers, topic.newCommentUsers);

        vm.topics.$getRecord(topic.$id).comments.push({
          name: topic.newCommentName,
          sortOrder: topic.comments.length,
          createdDate: new Date().getTime(),
          type: "comment"
        });

        delete topic.newCommentName;
        delete topic.newCommentUsers;
        delete topic.newCommentEditable;

        vm.topics.$save(vm.topics.$getRecord(topic.$id));


      };

      vm.removeComment = function (topic, comment) {
        if (window.confirm('Are you sure to remove this comment?')) {
          var index = topic.comments.indexOf(comment);
          if (index > -1) {
            topic.comments.splice(index, 1)[0];
          }

          vm.topics.$save(vm.topics.$getRecord(topic.$id));

        }
      };


      //at the end destroy
      $scope.$on('$destroy', function(){
        vm = null;
        console.log('Topic directive scope destroyed');
      });

    };

    return {
      restrict: 'E', //Default in 1.3+
      scope: {
        chatterContext:'=context'
      },
      controller: ['$scope',controller],
      controllerAs: 'comCtrl',
      templateUrl: 'http://localhost:3000/app/chatter/chatterTopic.html'
    };
  }  ;




});


