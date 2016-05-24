require('angular');
require('angular-animate');
require('angular-loading-bar');
require('angular-sanitize');
require('angular-ui-router');
require('jquery');

angular
  .module('<%= appnameSlug %>', [
    'ngAnimate',
    'ngSanitize',
    'angular-loading-bar',
    'ui.router',
  ])
  .config(configureModule);

const deferredBootstrapper = require('angular-deferred-bootstrap');

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
  $compileProvider.debugInfoEnabled(DEBUG);
  $httpProvider.useApplyAsync(true);
  $locationProvider.html5Mode(false).hashPrefix('!');
}
