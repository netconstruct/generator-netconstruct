import 'babel-polyfill';

import 'angular';
import 'angular-animate';
import 'angular-loading-bar';
import 'angular-sanitize';
import 'angular-ui-router';
import 'jquery';

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
