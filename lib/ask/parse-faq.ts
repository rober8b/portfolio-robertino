import type { FaqEntry } from "@/lib/ask/types";

const QUESTION_LINE = /^### Q:\s*(.+)$/;
const CATEGORY_LINE = /^##\s+(?!#)(.+)$/;
const TAGS_LINE = /^Tags:\s*(.+)$/i;
const VARIANTS_LINE = /^Variants:\s*$/i;
const DEV_HEADER = /^####\s+dev\s*$/i;
const CLIENT_HEADER = /^####\s+client\s*$/i;
const PLACEHOLDER = /^<.*>$/;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}

export function parseFaq(markdown: string): FaqEntry[] {
  const lines = markdown.split(/\r?\n/);
  const entries: FaqEntry[] = [];
  let category = "general";
  let current: FaqEntry | null = null;
  let mode: "dev" | "client" | null = null;
  let collecting: "answer" | "variants" | null = null;
  let answerBuffer: string[] = [];

  function flushAnswer() {
    if (current && mode && answerBuffer.length > 0) {
      current.answers[mode] = answerBuffer.join("\n").trim();
    }
    answerBuffer = [];
  }

  function flushEntry() {
    flushAnswer();
    if (
      current &&
      current.questions[0] &&
      !PLACEHOLDER.test(current.questions[0]) &&
      current.answers.dev &&
      current.answers.client &&
      !PLACEHOLDER.test(current.answers.dev) &&
      !PLACEHOLDER.test(current.answers.client)
    ) {
      entries.push(current);
    }
    current = null;
    mode = null;
    collecting = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (line.startsWith("```")) {
      // Skip fenced block contents — find the closing fence
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith("```")) j++;
      i = j;
      continue;
    }

    const categoryMatch = line.match(CATEGORY_LINE);
    if (categoryMatch && !line.startsWith("### ")) {
      flushEntry();
      category = categoryMatch[1].trim().toLowerCase();
      continue;
    }

    const questionMatch = line.match(QUESTION_LINE);
    if (questionMatch) {
      flushEntry();
      const question = questionMatch[1].trim();
      current = {
        id: slugify(`${category}-${question}`) || `entry-${entries.length}`,
        category,
        questions: [question],
        tags: [],
        answers: { dev: "", client: "" },
      };
      mode = null;
      collecting = null;
      continue;
    }

    if (!current) continue;

    const tagsMatch = line.match(TAGS_LINE);
    if (tagsMatch) {
      current.tags = tagsMatch[1]
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      continue;
    }

    if (VARIANTS_LINE.test(line)) {
      flushAnswer();
      collecting = "variants";
      mode = null;
      continue;
    }

    if (DEV_HEADER.test(line)) {
      flushAnswer();
      mode = "dev";
      collecting = "answer";
      continue;
    }

    if (CLIENT_HEADER.test(line)) {
      flushAnswer();
      mode = "client";
      collecting = "answer";
      continue;
    }

    if (collecting === "variants") {
      const bullet = line.match(/^[-*]\s+(.+)$/);
      if (bullet) {
        const variant = bullet[1].trim();
        if (variant && !PLACEHOLDER.test(variant)) {
          current.questions.push(variant);
        }
      }
      continue;
    }

    if (collecting === "answer" && mode) {
      answerBuffer.push(line);
      continue;
    }
  }

  flushEntry();
  return entries;
}
