import 'angular';

const <%= moduleClassName %>Module = angular
  .module('<%= appnameSlug %>.<%= moduleDashedName %>', [])
  .config(configure)
  .run(run);

/**
 * Register work which needs to be performed on module loading.
 * @ngInject
 */
function configure() {

}

/**
 * Register work which should be performed when the injector is done loading all modules.
 * @ngInject
 */
function run() {

}

export default <%= moduleClassName %>Module;
