(function () {
  'use strict';

  /**
   * <%= controllerName %> controller.
   * @ngInject
   */
  function <%= controllerClassName %>Controller() {
    var vm = this;

    vm.value = 'some value';

    activate();

    /** Activate the controller. */
    function activate() {}
  }

  module.exports = <%= controllerClassName %>Controller;
})();
