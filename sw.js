var cacheName = 'hello-pwa';
var filesToCache = ['/', '/index.html', '/css/style.css', '/js/main.js'];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll(filesToCache);
  };
  e.waitUntil(preCache());
});

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  e.respondWith(async function () {
    const cachedResponse = await caches.match(e.request);
    if (cachedResponse) return cachedResponse;
    return fetch(e.request);
  });
});
