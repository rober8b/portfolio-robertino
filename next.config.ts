import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Inyectado en cada build — usado por el footer para mostrar "last deploy"
    // junto al short-SHA. En Vercel, NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA queda
    // disponible automáticamente; este timestamp lo complementa.
    NEXT_PUBLIC_BUILD_TIMESTAMP: new Date().toISOString(),
  },
  serverExternalPackages: ["@huggingface/transformers"],
};

export default nextConfig;
