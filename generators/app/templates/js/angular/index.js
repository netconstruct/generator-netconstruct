import angular from 'angular';
import 'angular-sanitize';

import deferredBootstrapper from 'angular-deferred-bootstrap';

// IMPORT CUSTOM MODULES HERE

angular
  .module('<%= appnameSlug %>', [
    'ngSanitize',
  ])
  .config(configureModule);

deferredBootstrapper.bootstrap({
  element: document.body,
  module: '<%= appnameSlug %>',
  resolve: {},
});

/**
 * Configure the module.
 * @ngInject
 */
function configureModule($compileProvider, $httpProvider, $locationProvider) {
  $compileProvider.debugInfoEnabled(process.env.NODE_ENV !== 'production');
  $httpProvider.useApplyAsync(true);
  $locationProvider.html5Mode(false).hashPrefix('!');
}
