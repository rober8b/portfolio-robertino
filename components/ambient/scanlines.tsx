type ScanlinesProps = {
  opacity?: number;
  spacing?: number;
  blend?: "overlay" | "soft-light" | "multiply" | "normal";
  className?: string;
};

export function Scanlines({
  opacity = 0.06,
  spacing = 3,
  blend = "overlay",
  className,
}: ScanlinesProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, oklch(0 0 0 / ${opacity}) 0 1px, transparent 1px ${spacing}px)`,
        mixBlendMode: blend,
        zIndex: 1,
      }}
    />
  );
}
