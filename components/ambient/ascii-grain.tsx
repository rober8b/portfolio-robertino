const GLYPHS = [".", ".", ".", "·", "·", "+", "/", "\\", " ", " ", " ", " "];

function generateGrain(width: number, height: number, seed: number): string {
  const lines: string[] = [];
  let s = seed >>> 0;
  for (let y = 0; y < height; y++) {
    let line = "";
    for (let x = 0; x < width; x++) {
      s = (s * 1664525 + 1013904223) >>> 0;
      line += GLYPHS[s % GLYPHS.length];
    }
    lines.push(line);
  }
  return lines.join("\n");
}

type AsciiGrainProps = {
  width?: number;
  height?: number;
  opacity?: number;
  seed?: number;
  className?: string;
};

export function AsciiGrain({
  width = 120,
  height = 40,
  opacity = 0.05,
  seed = 8181,
  className,
}: AsciiGrainProps) {
  const text = generateGrain(width, height, seed);
  return (
    <pre
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden font-mono leading-tight tracking-tighter ${className ?? ""}`}
      style={{
        fontSize: "10px",
        color: "currentColor",
        opacity,
        whiteSpace: "pre",
        userSelect: "none",
      }}
    >
      {text}
    </pre>
  );
}
