(function () {
  'use strict';

  /**
   * <%= serviceName %> service.
   * @ngInject
   */
  function <%= serviceClassName %>Service() {
    var self = this;

    self.getAll = getAll;
    self.getItem = getItem;

    /** Get all. */
    function getAll () {
      // body...
    }

    /** Get item. */
    function getItem () {
      // body...
    }

    return self;
  }

  module.exports = <%= serviceClassName %>;
})();
