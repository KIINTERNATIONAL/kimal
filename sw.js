// offline cache for 기말고사 필기장
const CACHE = 'kimal-c18bcdebb1';
const FILES = ["./", "index.html", "pages.json", "app.webmanifest", "icon-192.png", "icon-512.png", "pages/hobbyart/001.webp", "pages/hobbyart/002.webp", "pages/hobbyart/003.webp", "pages/hobbyart/004.webp", "pages/hobbyart/005.webp", "pages/hobbyart/006.webp", "pages/hobbyart/007.webp", "pages/hobbyart/008.webp", "pages/hobbyart/009.webp", "pages/kidmedia/001.webp", "pages/kidmedia/002.webp", "pages/kidmedia/003.webp", "pages/kidmedia/004.webp", "pages/kidmedia/005.webp", "pages/kidmedia/006.webp", "pages/kidmedia/007.webp", "pages/kidmedia/008.webp", "pages/kidmedia/009.webp", "pages/persuade/001.webp", "pages/persuade/002.webp", "pages/persuade/003.webp", "pages/persuade/004.webp", "pages/persuade/005.webp", "pages/persuade/006.webp", "pages/persuade/007.webp", "pages/persuade/008.webp", "pages/persuade/009.webp", "pages/persuade/010.webp"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('kimal-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match('index.html'))));
});
