"use client";

import type { FeatureExtractionPipeline } from "@huggingface/transformers";

const MODEL_ID = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

let pipelinePromise: Promise<FeatureExtractionPipeline> | null = null;

export async function getEmbedder(): Promise<FeatureExtractionPipeline> {
  if (typeof window === "undefined") {
    throw new Error("getEmbedder must be called in the browser");
  }
  if (!pipelinePromise) {
    pipelinePromise = (async () => {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      env.useBrowserCache = true;
      return pipeline("feature-extraction", MODEL_ID, { dtype: "q8" });
    })();
  }
  return pipelinePromise;
}

export async function embedQuery(text: string): Promise<number[]> {
  const embedder = await getEmbedder();
  const tensor = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(tensor.data as Float32Array);
}
