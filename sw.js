// Service worker za PWA: stranica se uvek uzima sa mreže (da skeneri imaju najnoviju verziju), keš je samo
// rezerva kad mreža zakaže. Google prijava i tabela (accounts.google.com, googleapis.com) se ne diraju.
const KES = 'zahvalnice-v1';
const OSNOVA = ['./', './index.html', './manifest.webmanifest', './ikona-192.png', './ikona-512.png',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(KES).then((c) => c.addAll(OSNOVA)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== KES).map((x) => caches.delete(x))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (/(^|\.)google(apis)?\.com$/.test(url.hostname)) return;
  e.respondWith(
    fetch(e.request).then((odg) => {
      if (odg.ok && (url.origin === location.origin || url.hostname === 'cdn.jsdelivr.net')) {
        const kopija = odg.clone();
        caches.open(KES).then((c) => c.put(e.request, kopija));
      }
      return odg;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
