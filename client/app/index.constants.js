/* global malarkey:false, toastr:false, moment:false */

define(["index.module"],function() {
  'use strict';

  angular
    .module('biChatter')
    .constant('malarkey', malarkey)
    .constant('fbURL', 'https://bi-chatter.firebaseio.com/demo/topics/');


    //.constant('moment', moment);

  //.constant('toastr', toastr)

});
