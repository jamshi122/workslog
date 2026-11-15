// Works Log offline cache. The page itself is always fetched fresh when online.
const C = "workslog-v5";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(C).then(c => Promise.all(FILES.map(f => c.add(new Request(f, { cache: "reload" }))))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  if (u.pathname.endsWith("activation.json")) return;
  const isPage = r.mode === "navigate" || /\/(index\.html)?$/.test(u.pathname);
  if (isPage) {
    e.respondWith(
      Promise.race([fetch(new Request(r.url, { cache: "no-store" })), new Promise((_, rej) => setTimeout(rej, 4000))])
        .then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(C).then(c => c.put(r, copy)); } return res; })
        .catch(() => caches.match(r).then(m => m || caches.match("index.html") || caches.match("./")))
    );
    return;
  }
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res.ok) caches.open(C).then(c => c.put(r, res.clone())); return res; }).catch(() => hit);
    return hit || net;
  }));
});
