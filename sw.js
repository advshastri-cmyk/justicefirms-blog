/* =========================================================
   JusticeFirms Journal – Ultra Premium Service Worker
   Platform: GitHub Pages (Static)
   Behaviour:
   - ONLINE  → always show live website
   - OFFLINE → show ONLY offline.html
   - Assets cached for performance
   Version: v1 (initial)
========================================================= */

const CACHE_NAME = 'justicefirms-journal-v1';

/* Only assets that MUST work offline */
const OFFLINE_ASSETS = [
  '/offline.html',
  '/manifest.json'
];

/* =========================
   INSTALL
========================= */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_ASSETS);
    })
  );
  self.skipWaiting();
});

/* =========================
   ACTIVATE
========================= */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

/* =========================
   FETCH
========================= */
self.addEventListener('fetch', (event) => {

  /* Only handle GET requests */
  if (event.request.method !== 'GET') return;

  /* Ignore third-party requests */
  if (!event.request.url.startsWith(self.location.origin)) return;

  /* ---------- PAGE NAVIGATION ---------- */
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response;        // ONLINE → real page
        })
        .catch(() => {
          return caches.match('/offline.html'); // OFFLINE → only offline page
        })
    );
    return;
  }

  /* ---------- STATIC ASSETS ---------- */
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          /* Silent fail – no UI confusion */
        });
    })
  );
});
