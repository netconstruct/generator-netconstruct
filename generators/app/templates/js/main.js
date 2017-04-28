import 'babel-polyfill';
import 'loadcss-core';
import 'loadcss-polyfill';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

require.ensure(['./app'], () => {
  require('./app');
});
