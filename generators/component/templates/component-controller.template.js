(function () {
  'use strict';

  /**
   * <%= componentName %> controller.
   * @ngInject
   */
  function <%= componentClassName %>Controller() {
    var vm = this;

    vm.value = 'some value';

    activate();

    /** Activate the controller. */
    function activate() {}
  }

  module.exports = <%= componentClassName %>Controller;
})();
