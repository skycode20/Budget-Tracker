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

