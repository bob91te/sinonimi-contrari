const CACHE='sc-cache-v7-min';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./packs/it_core.json','./packs/en_core.json','./logo.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE?caches.delete(k):Promise.resolve()))))});
self.addEventListener('fetch',e=>{
  e.respondWith((async()=>{
    const r=await caches.match(e.request);
    try{
      const n=await fetch(e.request);
      const c=await caches.open(CACHE); c.put(e.request,n.clone());
      return n;
    }catch(err){
      return r || Response.error();
    }
  })());
});
