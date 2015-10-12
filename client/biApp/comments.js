(function() {
  'use strict';

  angular.module('topicsApp', ['ui.tree', 'firebase'])
    .value('fbURL', 'https://bi-chatter.firebaseio.com/demo/topics/')
    .factory('Topics', function($firebase, fbURL) {
      return $firebase(new Firebase(fbURL)); // jshint ignore:line
    })
    .controller('commentsCtrl', function($scope, $log, Topics, $firebase, fbURL) {

      $scope.info = "";
      $scope.topics = [];
      $scope.$watch(function () {
          return Topics.$getIndex();
        },
        function() {
          $scope.topics = [];
          var index = Topics.$getIndex();
          if (index.length > 0) {
            for (var i = 0; i < index.length; i++) {
              var topic = Topics[index[i]];
              if (topic) {
                topic.id = index[i];
                topic.editing = false;
                if (!topic.comments) {
                  topic.comments = [];
                }
                topic.$firebase = $firebase(new Firebase(fbURL + topic.id)); // jshint ignore:line
                topic.destroy = function() {
                  this.$firebase.$remove();
                };
                topic.save = function() {
                  this.$firebase.name = this.name;
                  this.$firebase.sortOrder = this.sortOrder;
                  this.$firebase.comments = this.comments;
                  this.$firebase.$save();
                  this.editing = false;
                };
                $scope.topics.push(topic);
              }
            }
            $scope.topics.sort(function(topic1, topic2) {
              return topic1.sortOrder - topic2.sortOrder;
            });
          }
        }, true);

      $scope.addTopic = function() {
        if ($scope.topics.length > 10) {
          window.alert('You can\'t add more than 10 topics!');
          return;
        }
        var topicName = document.getElementById("topicName").value;
        if (topicName.length > 0) {
          Topics.$add({
            name: topicName,
            type: "topic",
            comments: [],
            sortOrder: $scope.topics.length
          });
          document.getElementById("topicName").value = '';
        }
      };

      $scope.editTopic = function(topic) {
        topic.editing = true;
      };

      $scope.cancelEditingTopic = function(topic) {
        topic.editing = false;
      };

      $scope.saveTopic = function(topic) {
        topic.save();
      };

      $scope.removeTopic = function(topic) {
        if (window.confirm('Are you sure to remove this topic?')) {
          topic.destroy();
        }
      };

      $scope.saveTopics = function() {
        for (var i = $scope.topics.length - 1; i >= 0; i--) {
          var topic = $scope.topics[i];
          topic.sortOrder = i + 1;
          topic.save();
        }
      };

      $scope.addCategory = function(topic) {
        if (!topic.newCategoryName || topic.newCategoryName.length === 0) {
          return;
        }
        topic.comments.push({
          name: topic.newCategoryName,
          sortOrder: topic.comments.length,
          type: "comment"
        });
        topic.newCategoryName = '';
        topic.save();
      };

      $scope.removeCategory = function(topic, comment) {
        if (window.confirm('Are you sure to remove this comment?')) {
          var index = topic.comments.indexOf(comment);
          if (index > -1) {
            topic.comments.splice(index, 1)[0];
          }
          topic.save();
        }
      };

      $scope.options = {
        accept: function(sourceNode, destNodes, destIndex) {
          var data = sourceNode.$modelValue;
          var destType = destNodes.$element.attr('data-type');
          return (data.type == destType); // only accept the same type
        },
        dropped: function(event) {
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


    });

})();
