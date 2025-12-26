
    const CACHE_NAME = 'lograry-admin-cache-v1';
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
  