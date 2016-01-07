(function () {
  'use strict';

  /**
   * <%= factoryName %> factory.
   * @ngInject
   */
  function <%= factoryCamelCaseName %>() {
    var self = {
      getAll: getAll,
      getItem: getItem
    };

    return self;

    /** Get all. */
    function getAll () {
      // body...
    }

    /** Get item. */
    function getItem () {
      // body...
    }
  }

  module.exports = <%= factoryCamelCaseName %>;
})();
