/**
 * <%= controllerName %> controller.
 * @description The <%= controllerName %> controller
 */
class <%= directiveClassName %>Controller {
  /* @ngInject */
  constructor($element) {
    this.$element = $element;
  }
}

/**
 * <%= directiveName %> directive.
 * @description The <%= directiveName %> directive
 */
const <%= directivePrefix %><%= directiveClassName %> = /* @ngInject */ () => {
  return {
    bindToController: true,
    controller: <%= directiveClassName %>Controller,
    controllerAs: 'vm',
    link,
    replace: true,
    restrict: 'AE',
    scope: {},
  };

  /** Initialise directive. */
  function link($scope, $element, $attrs, $ctrl) {
    // handle dom interactions
  }
};

export default <%= directivePrefix %><%= directiveClassName %>;
