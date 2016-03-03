(function () {
  'use strict';

  /**
   * <%= filterName %> filter.
   * @ngInject
   */
  function <%= filterCamelCaseName %>() {
    return function (input) {
      return input;
    }
  }

  module.exports = <%= filterCamelCaseName %>;
})();
