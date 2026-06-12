/**
 * Web Worker for Ask AI Embeddings Extraction
 * Runs Hugging Face Transformers.js on a background thread to prevent UI freezing.
 */

let pipelinePromise: any = null;
const MODEL = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

self.addEventListener("message", async (event: MessageEvent) => {
  const { type, query, requestId } = event.data;

  if (type === "init") {
    try {
      if (!pipelinePromise) {
        pipelinePromise = (async () => {
          // Dynamic import of transformers inside the worker
          const { pipeline, env } = await import("@huggingface/transformers");
          env.allowLocalModels = false;
          env.useBrowserCache = true;
          return pipeline("feature-extraction", MODEL, {
            dtype: "q8",
            progress_callback: (data: any) => {
              if (data?.status === "progress" && typeof data.progress === "number") {
                self.postMessage({
                  type: "progress",
                  progress: Math.min(99, Math.round(data.progress)),
                  file: data.file,
                });
              }
            },
          });
        })();
      }
      await pipelinePromise;
      self.postMessage({ type: "ready" });
    } catch (err: any) {
      self.postMessage({ type: "error", message: err?.message || String(err) });
    }
  } else if (type === "embed") {
    try {
      if (!pipelinePromise) {
        throw new Error("Model not initialized. Call init first.");
      }
      const embedder = await pipelinePromise;
      const tensor = await embedder(query, { pooling: "mean", normalize: true });
      const embedding = Array.from(tensor.data as Float32Array);
      self.postMessage({ type: "result", requestId, embedding });
    } catch (err: any) {
      self.postMessage({ type: "error", message: err?.message || String(err), requestId });
    }
  }
});
