import type { AskMatch, FaqIndex } from "@/lib/ask/types";

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

export function rankFaq(
  query: number[],
  index: FaqIndex,
  { topK = 4 }: { topK?: number } = {},
): AskMatch[] {
  if (index.entries.length === 0) return [];

  const scored: AskMatch[] = [];
  for (const entry of index.entries) {
    let bestScore = -Infinity;
    let bestQ = entry.questions[0] ?? "";
    for (let i = 0; i < entry.embeddings.length; i++) {
      const score = cosineSimilarity(query, entry.embeddings[i]);
      if (score > bestScore) {
        bestScore = score;
        bestQ = entry.questions[i] ?? bestQ;
      }
    }
    scored.push({ entry, score: bestScore, matchedQuestion: bestQ });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}
