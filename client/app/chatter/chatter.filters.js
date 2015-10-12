(function() {
  'use strict';

  angular
    .module('biChatter')

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


})();
