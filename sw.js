const CACHE_NAME = 'vozpatrones-musicala-v3';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo-musicala.svg',
  './assets/logo.png',
  './assets/favicon.svg',
  './css/01-tokens.css',
  './css/02-reset-base.css',
  './css/03-layout.css',
  './css/04-components.css',
  './css/05-animations.css',
  './js/app.js',
  './js/audio/AudioEngine.js',
  './js/controllers/UIController.js',
  './js/data/patrones.js',
  './js/data/generadorExhaustivo.js',
  './js/state/store.js',
  './js/ui/controls.js',
  './js/ui/patternLibrary.js',
  './js/ui/exhaustiveLibrary.js',
  './js/ui/toast.js',
  './js/ui/visualizer.js',
  './js/utils/dom.js',
  './js/utils/music.js',
  './js/utils/timing.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return networkResponse;
      });
    })
  );
});
