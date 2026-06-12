import type { NoteBlock } from "@/lib/notes/data";

export function NoteBody({ blocks }: { blocks: NoteBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-[var(--ink-soft)]">
      {blocks.map((block, i) => {
        if (block.kind === "p") {
          return (
            <p key={i} className="max-w-[65ch]">
              {block.text}
            </p>
          );
        }
        if (block.kind === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 max-w-[65ch] pt-2 font-display text-xl font-semibold text-[var(--ink)] sm:text-2xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.kind === "code") {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-md border border-[var(--border-glass)] bg-[var(--surface-elev)] px-4 py-3 font-mono text-[0.78rem] leading-relaxed text-[var(--ink)]"
            >
              {block.body}
            </pre>
          );
        }
        if (block.kind === "list") {
          return (
            <ul key={i} className="max-w-[65ch] space-y-2 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3">
                  <span aria-hidden className="mt-1.5 inline-block h-1 w-1 bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.kind === "quote") {
          return (
            <blockquote
              key={i}
              className="max-w-[60ch] border-l-2 border-[var(--accent)] pl-4 font-display text-lg italic text-[var(--ink)]"
            >
              {block.text}
            </blockquote>
          );
        }
        return null;
      })}
    </div>
  );
}
