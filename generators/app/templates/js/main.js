import 'babel-polyfill';
import 'whatwg-fetch';
import 'loadcss-core';
import 'loadcss-polyfill';

import $ from 'jquery';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sitefiles/dist/sw.js', { scope: '/' })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('Could not register service worker:', err);
    });
}

import(/* webpackChunkName: "netc-core" */ '@netc/core/src/js/index');
import(/* webpackChunkName: "components" */ './components');

// Load react only if we have components on the page.
const $components = $('[data-component]');

if ($components.length) {
  import(/* webpackChunkName: "app" */ './react');
}
