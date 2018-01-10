import $ from 'jquery';

import exampleRoutes from './example';

/** Check conditions and return route map for current page. */
const getRouteMap = () => {
  if (elementExists('#example')) {
    return exampleRoutes;
  }

  return null;
};

function elementExists(selector) {
  const $element = $(selector);
  return $element && $element.length;
}

export default getRouteMap;
