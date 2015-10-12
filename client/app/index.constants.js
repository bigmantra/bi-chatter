/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('biChatter')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .value('fbURL', 'https://bi-chatter.firebaseio.com/demo/topics/');

})();
