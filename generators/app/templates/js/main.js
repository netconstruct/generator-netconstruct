import 'babel-polyfill';
import 'loadcss-core';
import 'loadcss-polyfill';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

require.ensure(['./app', '@netc/core/src/js/index'], () => {
  require('./app');
  require('@netc/core/src/js/index');
});
