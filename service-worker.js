const CACHE_NAME = "soccernews-v1.5";
let urlsToCache = [
  "test/nav.html",
  "test/index.html",
  "test/team.html",
  "test/push.js",
  "test/SoccerNews/pages/home.html",
  "test/SoccerNews/pages/about.html",
  "test/SoccerNews/pages/saved.html",
  "test/SoccerNews/css/materialize.min.css",
  "test/SoccerNews/css/style.css",
  "test/SoccerNews/js/materialize.min.js",
  "test/SoccerNews/js/nav.js",
  "test/SoccerNews/js/main.js",
  "test/SoccerNews/js/api.js",
  "test/SoccerNews/js/db.js",
  "test/SoccerNews/js/idb.js",
  "test/SoccerNews/js/script.js",
  "test/images/home.png",
  "test/images/icons/icon-512x512.png",
  "test/images/icons/icon-192x192.png",
  "test/images/icon.png",
  "test/images/facebook1.png",
  "test/images/instagram1.png",
  "test/images/save.png",
  "test/manifest.json"
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
    icon: 'images/icon.png',
		badge: 'images/icon.png',
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
