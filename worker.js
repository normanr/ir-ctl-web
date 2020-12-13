self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetched resource ' + event.request.url);
  // event.respondWith(fetch(event.request));
});
