const CACHE_PREFIX = "technology-learning-hub-";
const CACHE = `${CACHE_PREFIX}v0.4.0-${new URL(self.registration.scope).pathname}`;
const scopedUrl = (path) => new URL(path, self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll([
    scopedUrl("index.html"),
    scopedUrl("offline-guide.html"),
    scopedUrl("modules/scientific-report-writing/index.html"),
    scopedUrl("modules/data-spreadsheets/index.html"),
    scopedUrl("modules/data-spreadsheets/printable-fallback.html")
  ])));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map((key) => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, copy)));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    if (event.request.mode === "navigate") return caches.match(scopedUrl("offline-guide.html"));
    return Response.error();
  }));
});
