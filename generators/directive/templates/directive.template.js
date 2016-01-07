(function () {
  'use strict';

  /**
   * <%= directiveName %> directive.
   * @ngInject
   */
  function <%= directivePrefix %><%= directiveClassName %>() {
    return {
      bindToController: true,
      controller: <%= directiveClassName %>Controller,
      controllerAs: 'vm',
      link: link,
      replace: true,
      restrict: 'AE',
      scope: {}
    };

    /** Initialise directive. */
    function link(scope, element, attrs, ctrl) {}
  }

  /**
   * <%= directiveName %> controller.
   * @ngInject
   */
  function <%= directiveClassName %>Controller() {
    var vm = this;

    vm.value = 'some value';

    activate();

    /** Activate the controller. */
    function activate() {}
  }

  module.exports = <%= directivePrefix %><%= directiveClassName %>;
})();
