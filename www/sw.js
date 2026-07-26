const CACHE = 'novamarket-v2';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    if (e.request.url.includes('firebaseio.com') || e.request.url.includes('googleapis.com') || e.request.url.includes('gstatic.com')) return;
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
self.addEventListener('push', e => {
    if (!e.data) return;
    try {
        const d = e.data.json();
        e.waitUntil(self.registration.showNotification(d.title || 'NovaMarket', { body: d.body || '', tag: 'novamarket' }));
    } catch(err) {}
});
