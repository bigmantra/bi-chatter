define(["index.module"],function() {
  'use strict';


  console.log('defining index.config..');


  angular
    .module('bm.platform')
    .config(config);


  /** @ngInject */
  function config($logProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      'http://localhost:3000/**'
    ]);

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
/*    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;*/
  }

});
