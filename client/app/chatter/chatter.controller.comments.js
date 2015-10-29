(function () {
  'use strict';


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
        console.log('In Add topic...');


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

})();
