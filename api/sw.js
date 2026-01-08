
    const CACHE_NAME = 'lograry-admin-cache-v2';
    const urlsToCache = ["/lograry/admin/","/lograry/admin/config.yml","/lograry/admin/preview.css","https://unpkg.com/@sveltia/cms@latest/dist/sveltia-cms.js"];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });

    self.addEventListener('activate', event => {
      event.waitUntil(
        caches.keys().then(keys =>
          Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        )
      );
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(event.request);
          })
      );
    });
  