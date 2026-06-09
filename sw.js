const CACHE_NAME = 'pwa-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/images/hero-home.png' // Aquí agregas las fotos que quieres que carguen sin internet
];

// Instalar el Service Worker y guardar en caché
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

// Hacer que la web funcione offline
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
