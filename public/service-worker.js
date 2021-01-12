const CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
    //add files to cache
    "./db.js",
    "./index.html",
    "./styles.css",
    "./index.js",
    "./icons/icon-192x192.png",
    "./icons/icon-512x512.png",
];

//service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    );
});

//clean up old caches
self.addEventListener(`activate`, event => {
    const currentCaches = [CACHE_NAME, DATA_CACHE_NAME];
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                // return array of cache names that are old to delete
                cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
            )
            .then(cachesToDelete =>
                Promise.all(
                    cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete))
                )
            )
            .then(() => self.clients.claim())
    );
});