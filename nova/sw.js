// Stari service worker (skener je preseljen na ulaz/): briše svoj keš i odjavljuje se, pa ne ostaje na telefonima.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(caches.delete('zahvalnice-nova-v3').then(() => self.registration.unregister())));
