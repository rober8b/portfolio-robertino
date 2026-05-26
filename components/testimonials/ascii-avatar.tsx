type AsciiAvatarProps = {
  seed: string;
  size?: number;
  className?: string;
};

const HALF_COLS = 3;
const ROWS = 6;
const RAMP = [" ", " ", ".", "·", "+", "*", "#", "@"];

function hash32(input: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

function buildGrid(seed: string): string[] {
  const lines: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    const halfChars: string[] = [];
    for (let c = 0; c < HALF_COLS; c++) {
      const h = hash32(`${seed}|${r}|${c}`);
      const idx = h % RAMP.length;
      halfChars.push(RAMP[idx]);
    }
    const line = [...halfChars, ...halfChars.slice().reverse()].join("");
    lines.push(line);
  }
  return lines;
}

export function AsciiAvatar({ seed, size = 56, className }: AsciiAvatarProps) {
  const lines = buildGrid(seed);
  const cellSize = size / (HALF_COLS * 2);

  return (
    <pre
      aria-hidden
      role="img"
      className={`m-0 inline-block select-none font-mono leading-none tracking-tighter ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        fontSize: cellSize,
        lineHeight: `${cellSize}px`,
        color: "#ff4000",
        background: "#0a0a0a",
        padding: 0,
        whiteSpace: "pre",
        fontVariantLigatures: "none",
        fontFeatureSettings: '"liga" 0, "calt" 0',
      }}
    >
      {lines.join("\n")}
    </pre>
  );
}
