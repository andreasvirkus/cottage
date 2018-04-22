'use strict'

const version = 'v1::'
const offlineFundamentals = [
  '/assets/css/variables.css',
  '/assets/css/global.css',
  '/assets/css/header.css',
  '/assets/css/menu.css',
  '/assets/css/typography.css',
  '/assets/css/utility.css',
  '/assets/css/footer.css',
  '/assets/css/social.css',
  '/assets/js/script.min.js',
  '/index.html',
  '/about/index.html',
  '/thoughts/index.html',
  '/contact/index.html'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(version + 'fundamentals')
      .then(function(cache) {
        return cache.addAll(offlineFundamentals);
      })
      .then(function() {
        console.log('worker::installed');
      })
  );
});

self.addEventListener('fetch', function(event) {
  const ignoreSearch = event.request.url.indexOf('?') != -1
  console.log('worker::fetching');

  if (event.request.method !== 'GET') {
    console.log('worker::fetch ignored |', event.request.method, event.request.url);
    return;
  }

  event.respondWith(
    caches
      .match(event.request, { ignoreSearch })
      .then(function(cached) {
        var networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);

        return cached || networked;

        function fetchedFromNetwork(response) {
          var cacheCopy = response.clone();

          caches.open(version + 'pages')
            .then(function add(cache) {
              cache.put(event.request, cacheCopy);
            })
            .then(function() {
              console.log('worker::fetch cached |', event.request.url);
            });

          return response;
        }

        function unableToResolve () {
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !key.startsWith(version);
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.log('worker::activated');
      })
  );
});
