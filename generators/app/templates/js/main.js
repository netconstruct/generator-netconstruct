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
  .config(configureModule)
  .run(runModule);

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

/**
 * Run the module.
 * @ngInject
 */
function runModule($rootScope) {
  // eslint-disable-next-line max-len
  if (process.env.NODE_ENV === 'development') {
    // Prevent errors being swallowed by ui-router in dev environments.
    $rootScope.$on('$stateChangeError',
      (event, toState, toParams, fromState, fromParams, error) => {
        console.error('$stateChangeError', error); // eslint-disable-line no-console
      },
    );
  }
}
