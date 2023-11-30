const CACHE_NAME = 'v1'; // Erhöhe diese Nummer bei jeder Änderung am Service Worker oder am Cache-Inhalt
const urlsToCache = [
  '/',
  '/index.html',
  // Füge hier weitere URLs hinzu, die du cachen möchtest
];

// Installations-Event
self.addEventListener('install', event => {
  console.log('Service Worker installing. Version:', CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivierungs-Event
self.addEventListener('activate', event => {
  console.log('Service Worker activating. Version:', CACHE_NAME);

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch-Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
