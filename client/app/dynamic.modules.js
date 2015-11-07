define([], (function () {
  'use strict';

  console.log('defining dynamic modules');

  var bicModules = [];

  angular.forEach($("[vid*='tableView']"), function (value, key) {
    bicModules.push(value.getAttribute('vid'))
  });

  return bicModules;
}));





