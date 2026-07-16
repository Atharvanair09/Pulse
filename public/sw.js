self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  // Claim clients so the SW takes control immediately
});

self.addEventListener("fetch", () => {
  // Let the browser handle everything normally
});
