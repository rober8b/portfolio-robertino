"use client";

import type { FeatureExtractionPipeline } from "@huggingface/transformers";

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

let pipelinePromise: Promise<FeatureExtractionPipeline> | null = null;

export type ModelLoadStatus =
  | { phase: "idle" }
  | { phase: "downloading"; progress: number; file?: string }
  | { phase: "ready" }
  | { phase: "error"; message: string };

type Listener = (status: ModelLoadStatus) => void;
const listeners = new Set<Listener>();
let currentStatus: ModelLoadStatus = { phase: "idle" };

export function subscribeModelStatus(fn: Listener): () => void {
  listeners.add(fn);
  fn(currentStatus);
  return () => listeners.delete(fn);
}

function setStatus(next: ModelLoadStatus) {
  currentStatus = next;
  listeners.forEach((l) => l(next));
}

export function getModelStatus(): ModelLoadStatus {
  return currentStatus;
}

export function preloadEmbedder() {
  if (typeof window !== "undefined") {
    getEmbedder().catch(() => {});
  }
}

export async function getEmbedder(): Promise<FeatureExtractionPipeline> {
  if (typeof window === "undefined") {
    throw new Error("getEmbedder must be called in the browser");
  }
  if (!pipelinePromise) {
    pipelinePromise = (async () => {
      try {
        setStatus({ phase: "downloading", progress: 0 });
        const { pipeline, env } = await import("@huggingface/transformers");
        env.allowLocalModels = false;
        env.useBrowserCache = true;
        const instance = await pipeline("feature-extraction", MODEL_ID, {
          dtype: "q8",
          progress_callback: (data: { status?: string; progress?: number; file?: string }) => {
            if (data?.status === "progress" && typeof data.progress === "number") {
              setStatus({
                phase: "downloading",
                progress: Math.min(99, Math.round(data.progress)),
                file: data.file,
              });
            }
          },
        });
        setStatus({ phase: "ready" });
        return instance;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Error desconocido";
        setStatus({ phase: "error", message });
        pipelinePromise = null;
        throw err;
      }
    })();
  }
  return pipelinePromise;
}

export async function embedQuery(text: string): Promise<number[]> {
  const embedder = await getEmbedder();
  const tensor = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(tensor.data as Float32Array);
}
