const C='kou4-cache-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  e.respondWith(
    fetch(req).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(req,cp));return r;})
    .catch(()=>caches.match(req).then(m=>m||caches.match('./index.html')))
  );
});
