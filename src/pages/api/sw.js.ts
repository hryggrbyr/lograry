import type { APIRoute } from 'astro';

const urlsToCache = [
  './',
  './config.yml',
  './preview.css',
  'https://unpkg.com/@sveltia/cms@latest/dist/sveltia-cms.js'
];

export const GET: APIRoute = async ({ }) => {
  const BASE_URL = import.meta.env.BASE_URL;
  const CACHE_NAME = 'lograry-admin-cache-v1';

  // Construct the full URLs to cache
  const fullUrlsToCache = urlsToCache.map(url => {
    if (url.startsWith('http')) {
      return url;
    }
    // For local assets, prepend the base URL and the admin path
    return `${BASE_URL}admin${url.substring(1)}`;
  });

  const script = `
    const CACHE_NAME = '${CACHE_NAME}';
    const urlsToCache = ${JSON.stringify(fullUrlsToCache)};

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
  `;

  return new Response(script, {
    headers: { 'Content-Type': 'application/javascript' }
  });
};
