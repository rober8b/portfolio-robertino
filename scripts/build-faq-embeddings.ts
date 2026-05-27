/**
 * Reads content/portfolio-faq.md, generates embeddings for every question
 * and every variant, writes lib/ask/faq-index.json.
 *
 * Run with: pnpm build:faq
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline, env } from "@huggingface/transformers";
import { parseFaq } from "../lib/ask/parse-faq.ts";
import type { FaqIndex, FaqIndexEntry } from "../lib/ask/types.ts";

env.allowLocalModels = false;
env.useBrowserCache = false;

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "content/portfolio-faq.md");
const OUTPUT = resolve(ROOT, "lib/ask/faq-index.json");

async function main() {
  console.log(`> Reading ${SOURCE}`);
  const markdown = readFileSync(SOURCE, "utf8");
  const entries = parseFaq(markdown);

  if (entries.length === 0) {
    console.warn("! No FAQ entries found. Did you replace the placeholders?");
    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(
      OUTPUT,
      JSON.stringify(
        {
          version: 1,
          model: MODEL_ID,
          dim: 384,
          generatedAt: new Date().toISOString(),
          entries: [],
        } satisfies FaqIndex,
        null,
        2,
      ),
    );
    return;
  }

  console.log(`> Loading model ${MODEL_ID}`);
  const embedder = await pipeline("feature-extraction", MODEL_ID, { dtype: "q8" });

  console.log(`> Embedding ${entries.length} entries`);
  const indexEntries: FaqIndexEntry[] = [];
  for (const entry of entries) {
    const embeddings: number[][] = [];
    for (const question of entry.questions) {
      const tensor = await embedder(question, { pooling: "mean", normalize: true });
      embeddings.push(Array.from(tensor.data as Float32Array));
    }
    indexEntries.push({ ...entry, embeddings });
    console.log(`  · [${entry.category}] ${entry.questions[0]} (${embeddings.length} variants)`);
  }

  const dim = indexEntries[0]?.embeddings[0]?.length ?? 384;

  const index: FaqIndex = {
    version: 1,
    model: MODEL_ID,
    dim,
    generatedAt: new Date().toISOString(),
    entries: indexEntries,
  };

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(index));
  console.log(`> Wrote ${OUTPUT} (${entries.length} entries, dim=${dim})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
