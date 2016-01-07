(function () {
  'use strict';

  module.exports = angular
    .module('<%= moduleDashedName %>', [])
    .config(configure)
    .run(run);

  /**
   * Register work which needs to be performed on module loading.
   * @ngInject
   */
  function configure() {}

  /**
   * Register work which should be performed when the injector is done loading all modules.
   * @ngInject
   */
  function run() {}
})();
