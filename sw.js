// Stari service worker (skener je preseljen na ulaz/): briše svoj keš i odjavljuje se, pa ne ostaje na telefonima.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(caches.delete('zahvalnice-v1').then(() => self.registration.unregister())));
