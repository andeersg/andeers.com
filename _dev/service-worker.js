const CACHE_NAME = 'cache::v2';
const urlsToCache = [
  '/assets/css/style.css',
  'assets/fonts/libre-franklin-v4-latin-300.woff',
  'assets/fonts/libre-franklin-v4-latin-300.woff2',
  'assets/fonts/libre-franklin-v4-latin-700.woff',
  'assets/fonts/libre-franklin-v4-latin-700.woff2',
  'assets/fonts/libre-franklin-v4-latin-regular.woff',
  'assets/fonts/libre-franklin-v4-latin-regular.woff2',
  '/404.html',
];

/**
 * Install Event.
 */
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * Fetch Event.
 */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
