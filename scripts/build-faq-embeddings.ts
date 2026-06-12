/**
 * Reads content/portfolio-faq.md, generates embeddings for every question
 * and every variant, and writes:
 * 1. public/faq-text-index.json (lightweight metadata index)
 * 2. public/faq-embeddings-index.json (vector index only)
 *
 * Run with: pnpm build:faq
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline, env } from "@huggingface/transformers";
import { parseFaq } from "../lib/ask/parse-faq.ts";

env.allowLocalModels = false;
env.useBrowserCache = false;

// Model selected: Xenova/paraphrase-multilingual-MiniLM-L12-v2
// Justification: The portfolio FAQ is in Spanish. The original Xenova/all-MiniLM-L6-v2 is English-only.
// Xenova/paraphrase-multilingual-MiniLM-L12-v2 provides highly accurate multilingual embeddings suitable for Spanish question-matching,
// with a 384-dimensional vector output, ensuring zero compatibility issues with our existing cosine similarity rank logic.
const MODEL_ID = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "content/portfolio-faq.md");
const TEXT_OUTPUT = resolve(ROOT, "public/faq-text-index.json");
const EMBEDDINGS_OUTPUT = resolve(ROOT, "public/faq-embeddings-index.json");

async function main() {
  console.log(`> Reading ${SOURCE}`);
  const markdown = readFileSync(SOURCE, "utf8");
  const entries = parseFaq(markdown);

  if (entries.length === 0) {
    console.warn("! No FAQ entries found. Did you replace the placeholders?");
    mkdirSync(dirname(TEXT_OUTPUT), { recursive: true });
    writeFileSync(TEXT_OUTPUT, JSON.stringify([]));
    writeFileSync(EMBEDDINGS_OUTPUT, JSON.stringify([]));
    return;
  }

  console.log(`> Loading model ${MODEL_ID}`);
  const embedder = await pipeline("feature-extraction", MODEL_ID, { dtype: "q8" });

  console.log(`> Embedding ${entries.length} entries`);
  
  const textIndex: any[] = [];
  const embeddingsIndex: any[] = [];

  for (const entry of entries) {
    console.log(`  · [${entry.category}] Processing: ${entry.questions[0]} (${entry.questions.length} variants)`);
    for (const question of entry.questions) {
      const tensor = await embedder(question, { pooling: "mean", normalize: true });
      const embedding = Array.from(tensor.data as Float32Array);
      
      textIndex.push({
        id: entry.id,
        category: entry.category,
        question,
        answer: entry.answers,
        tags: entry.tags,
      });

      embeddingsIndex.push({
        id: entry.id,
        embedding,
      });
    }
  }

  mkdirSync(dirname(TEXT_OUTPUT), { recursive: true });
  writeFileSync(TEXT_OUTPUT, JSON.stringify(textIndex, null, 2));
  console.log(`> Wrote ${TEXT_OUTPUT} (${textIndex.length} entries)`);

  mkdirSync(dirname(EMBEDDINGS_OUTPUT), { recursive: true });
  writeFileSync(EMBEDDINGS_OUTPUT, JSON.stringify(embeddingsIndex));
  console.log(`> Wrote ${EMBEDDINGS_OUTPUT} (${embeddingsIndex.length} entries)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
