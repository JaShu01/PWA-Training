const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];

self.addEventListener("install", installEvent => {
  console.log(installEvent);
  installEvent.waitUntil(
    caches
      .open(staticDevCoffee)
      .then(cache => {
        cache.addAll(assets);
      })
      .catch(console.log)
  );
});

self.addEventListener("fetch", event => {
  // console.log(event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(res => {
        return res || fetch(event.request);
      })
      .catch(console.log)
  );
});
