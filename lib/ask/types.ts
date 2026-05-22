export type Mode = "dev" | "client";

export type FaqEntry = {
  id: string;
  category: string;
  questions: string[];
  tags: string[];
  answers: Record<Mode, string>;
};

export type FaqIndexEntry = FaqEntry & {
  embeddings: number[][];
};

export type FaqIndex = {
  version: number;
  model: string;
  dim: number;
  generatedAt: string;
  entries: FaqIndexEntry[];
};

export type AskMatch = {
  entry: FaqIndexEntry;
  score: number;
  matchedQuestion: string;
};
