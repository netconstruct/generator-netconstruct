/*
  global
  importScripts:false
  WorkboxSW:false
*/
importScripts('/sitefiles/dist/workbox-sw.js');

const workboxSW = new WorkboxSW({ clientsClaim: true, skipWaiting: true });
workboxSW.precache([]);

const apiCacheStrategy = workboxSW.strategies.staleWhileRevalidate({
  cacheableResponse: {
    statuses: [0, 200],
  },
});

workboxSW.router.registerRoute(
  /\/api.+$/,
  apiCacheStrategy,
);
