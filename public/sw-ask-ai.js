/**
 * Custom Service Worker for Ask AI
 * Implements Cache-First caching strategy for large, immutable AI models and vectors,
 * and Stale-While-Revalidate for the FAQ text index.
 */
const CACHE_NAME = 'ask-ai-v1';

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Strategy Cache-First for:
  // - Hugging Face CDN assets (*.onnx, tokenizer*, config* from huggingface.co or cdns)
  // - public/faq-embeddings-index.json (large vector file)
  const isHuggingFaceCDN = url.hostname.includes('huggingface.co');
  const isEmbeddingsIndex = url.pathname.endsWith('/faq-embeddings-index.json');

  if (isHuggingFaceCDN || isEmbeddingsIndex) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            // Cache a copy of the fetched resource and return it
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Strategy Stale-While-Revalidate for:
  // - public/faq-text-index.json (needs to update if modified, but instantly loads from cache)
  const isTextIndex = url.pathname.endsWith('/faq-text-index.json');
  if (isTextIndex) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }
});
