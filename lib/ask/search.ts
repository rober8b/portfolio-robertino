import Fuse from "fuse.js";

export type SearchResult = {
  id: string;
  question: string;
  answer: string;
  score: number;
  source: "fuse" | "semantic";
  category?: string;
  tags?: string[];
};

export type ModelLoadStatus =
  | { phase: "idle" }
  | { phase: "downloading"; progress: number; file?: string }
  | { phase: "ready" }
  | { phase: "error"; message: string };

let worker: Worker | null = null;
let workerReady = false;
let currentStatus: ModelLoadStatus = { phase: "idle" };
const statusListeners = new Set<(status: ModelLoadStatus) => void>();

const pendingEmbedPromises = new Map<
  number,
  { resolve: (val: number[]) => void; reject: (err: any) => void }
>();
let currentRequestId = 0;
let latestSearchRequestId = 0;

let cachedTextIndex: any[] | null = null;
let cachedEmbeddingsIndex: any[] | null = null;

// Cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

export function isSemanticReady(): boolean {
  return workerReady;
}

export function subscribeModelStatus(fn: (status: ModelLoadStatus) => void): () => void {
  statusListeners.add(fn);
  fn(currentStatus);
  return () => statusListeners.delete(fn);
}

export function getModelStatus(): ModelLoadStatus {
  return currentStatus;
}

function setStatus(next: ModelLoadStatus) {
  currentStatus = next;
  statusListeners.forEach((l) => l(next));
}

// Prefetch semantic model (idempotent)
export function prefetchSemanticModel(): void {
  if (typeof window === "undefined") return;
  if (worker) return;

  setStatus({ phase: "downloading", progress: 0 });

  // Instantiate worker using Next.js worker syntax
  worker = new Worker(new URL("./embed.worker.ts", import.meta.url));

  worker.addEventListener("message", (event: MessageEvent) => {
    const { type, ready, requestId, embedding, message, progress, file } = event.data;

    if (type === "ready") {
      workerReady = true;
      setStatus({ phase: "ready" });
    } else if (type === "progress") {
      setStatus({ phase: "downloading", progress, file });
    } else if (type === "result") {
      const pending = pendingEmbedPromises.get(requestId);
      if (pending) {
        pending.resolve(embedding);
        pendingEmbedPromises.delete(requestId);
      }
    } else if (type === "error") {
      console.error("Ask AI Worker error:", message);
      if (requestId !== undefined) {
        const pending = pendingEmbedPromises.get(requestId);
        if (pending) {
          pending.reject(new Error(message));
          pendingEmbedPromises.delete(requestId);
        }
      }
      setStatus({ phase: "error", message });
    }
  });

  // Start model weights prefetching & initializing
  worker.postMessage({ type: "init" });
}

// Coordinate Fuse.js + Web Worker semantic search
export async function search(query: string, mode?: "dev" | "client"): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) {
    return [];
  }

  // Resolve the active mode from parameter or localStorage fallback
  let activeMode: "dev" | "client" = mode || "client";
  if (!mode && typeof window !== "undefined") {
    const stored = window.localStorage.getItem("rober.mode");
    if (stored === "dev" || stored === "client") {
      activeMode = stored;
    }
  }

  // 1. Lazy-load faq-text-index.json (cachear en memoria tras primer fetch)
  if (!cachedTextIndex) {
    const res = await fetch("/faq-text-index.json");
    cachedTextIndex = await res.json();
  }

  // 2. Mapear items de Fuse al modo activo e Inicializar Fuse con keys ['question', 'tags', 'answer']
  const fuseItems = cachedTextIndex!.map((item) => ({
    id: item.id,
    category: item.category,
    question: item.question,
    answer: item.answer[activeMode] || "",
    tags: item.tags || [],
  }));

  const fuse = new Fuse(fuseItems, {
    keys: ["question", "tags", "answer"],
    includeScore: true,
    threshold: 0.5,
  });

  const fuseResults = fuse.search(trimmed);
  const formattedFuseResults: SearchResult[] = fuseResults.map((r) => ({
    id: r.item.id,
    question: r.item.question,
    answer: r.item.answer,
    score: 1.0 - (r.score ?? 1.0), // Map Fuse distance score to similarity [0, 1]
    source: "fuse",
    category: r.item.category,
    tags: r.item.tags,
  }));

  // 3. Correr Fuse. Si top score < 0.35 (es decir, distancia < 0.35, lo cual es muy confiable) -> return inmediatamente.
  // Note: fuseResults[0].score is distance. If distance < 0.35, we have a high-confidence match!
  const topFuseDistance = fuseResults[0]?.score ?? 1.0;
  if (topFuseDistance < 0.35 && formattedFuseResults.length > 0) {
    return formattedFuseResults.slice(0, 4);
  }

  // 4. Si el worker está ready -> await embedding semántico, return top-K por cosine similarity.
  if (workerReady) {
    try {
      if (!cachedEmbeddingsIndex) {
        const res = await fetch("/faq-embeddings-index.json");
        cachedEmbeddingsIndex = await res.json();
      }

      // Generate requestId and send to worker
      const requestId = ++currentRequestId;
      latestSearchRequestId = requestId;

      const embeddingPromise = new Promise<number[]>((resolve, reject) => {
        pendingEmbedPromises.set(requestId, { resolve, reject });
      });

      worker!.postMessage({ type: "embed", query: trimmed, requestId });

      const queryEmbedding = await embeddingPromise;

      // Check if this request is still the latest one (race condition cancellation)
      if (requestId !== latestSearchRequestId) {
        throw new Error("SearchCancelled");
      }

      // Group by id to get the highest similarity score (each entry can have multiple variants)
      const similarityMap = new Map<string, { score: number; matchedQuestion: string }>();

      for (const entry of cachedEmbeddingsIndex!) {
        const score = cosineSimilarity(queryEmbedding, entry.embedding);
        const existing = similarityMap.get(entry.id);
        if (!existing || score > existing.score) {
          // Find matched question text in the text index
          const textEntry = cachedTextIndex!.find(
            (t) => t.id === entry.id && t.question
          );
          const matchedQuestion = textEntry ? textEntry.question : "";
          similarityMap.set(entry.id, { score, matchedQuestion });
        }
      }

      // Format semantic results, sorting descending by similarity score
      const semanticResults = Array.from(similarityMap.entries())
        .map(([id, data]) => {
          const textItem = cachedTextIndex!.find((t) => t.id === id);
          return {
            id,
            question: data.matchedQuestion || (textItem ? textItem.question : ""),
            answer: textItem ? (textItem.answer[activeMode] || "") : "",
            score: data.score, // Cosine similarity
            source: "semantic" as const,
            category: textItem?.category,
            tags: textItem?.tags,
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // Return top 5

      return semanticResults;
    } catch (err: any) {
      if (err?.message === "SearchCancelled") {
        throw err; // Propagate cancellation to UI
      }
      console.error("Semantic search failed, falling back to Fuse.js:", err);
      return formattedFuseResults.slice(0, 4);
    }
  }

  // 5. Si el worker NO está ready -> return Fuse igual + dispara prefetch del modelo en background (sin await).
  prefetchSemanticModel();
  return formattedFuseResults.slice(0, 4);
}
