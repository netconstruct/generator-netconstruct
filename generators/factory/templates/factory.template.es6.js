/**
 * <%= factoryName %> factory.
 * @description The <%= factoryName %> factory
 */
const <%= factoryCamelCaseName %>Factory = /*@ngInject*/ () => {
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

export { <%= factoryCamelCaseName %> };
