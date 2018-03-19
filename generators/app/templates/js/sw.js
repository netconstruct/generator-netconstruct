/* eslint-disable no-underscore-dangle, no-restricted-globals */
/* global self:false workbox:false */

// Ensure service worker is updated immediately.
workbox.skipWaiting();
workbox.clientsClaim();

// Ensure webpack assets are precached and handled by service worker.
workbox.precaching.precacheAndRoute(self.__precacheManifest);
