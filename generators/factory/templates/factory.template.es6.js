/**
 * <%= factoryName %> factory.
 * @description The <%= factoryName %> factory
 */
const <%= factoryCamelCaseName %>Factory = /* @ngInject */ () => {
  const self = {
    getAll,
    getItem,
  };

  return self;

  /** Get all. */
  function getAll() {
    // body...
  }

  /** Get item. */
  function getItem() {
    // body...
  }
};

export default <%= factoryCamelCaseName %>Factory;
