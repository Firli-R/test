const CACHE_NAME = "firstpwa-v1.5";
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/push.js",
  "/SoccerNews/pages/home.html",
  "/SoccerNews/pages/about.html",
  "/SoccerNews/pages/saved.html",
  "/SoccerNews/css/materialize.min.css",
  "/SoccerNews/css/style.css",
  "/SoccerNews/js/materialize.min.js",
  "/SoccerNews/js/nav.js",
  "/SoccerNews/js/main.js",
  "/SoccerNews/js/api.js",
  "/SoccerNews/js/db.js",
  "/SoccerNews/js/idb.js",
  "/SoccerNews/js/script.js",
  "/images/home.png",
  "/images/icons/icon-512x512.png",
  "/images/icons/icon-192x192.png",
  "/images/icon.png",
  "/images/facebook1.png",
  "/images/instagram1.png",
  "/images/save.png",
  "/manifest.json"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {'ignoreSearch': true}).then(function(response) { 
        return response || fetch (event.request);
      })
    )
  }
});


self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: "haloo",
    icon: '../images/icon.png',
		badge: '../images/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('SoccerNews Notification', options)
  );
});