"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register the service worker
      navigator.serviceWorker
        .register("/sw-ask-ai.js")
        .then((registration) => {
          console.log("Ask AI Service Worker registered successfully:", registration.scope);
        })
        .catch((error) => {
          console.error("Ask AI Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
