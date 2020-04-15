const cacheName = 'CACHE::V1'


const urlsToCache = [
  '/assets/fonts/libre-franklin-v4-latin-300.woff',
  '/assets/fonts/libre-franklin-v4-latin-300.woff2',
  '/assets/fonts/libre-franklin-v4-latin-700.woff',
  '/assets/fonts/libre-franklin-v4-latin-700.woff2',
  '/assets/fonts/libre-franklin-v4-latin-regular.woff',
  '/assets/fonts/libre-franklin-v4-latin-regular.woff2',
  '/assets/anders2.webp',
];


const deleteOldCachesAndClaim = () => {
  return caches.keys().then(function(names) {
    return Promise.all(
      names.map(function(name) {
        if (name !== cacheName) {
          return caches.delete(name);
        }
      })
    );
  }).then(function() {
    return self.clients.claim();
  });
};

const preCache = async () => {
  const cache = await caches.open(cacheName);
  return cache.addAll(urlsToCache);
};

/**
 * Install Event.
 */
self.addEventListener('install', function(event) {
  self.skipWaiting();

  // Perform install steps
  event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCachesAndClaim());
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
