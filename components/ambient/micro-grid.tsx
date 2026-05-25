type MicroGridProps = {
  size?: number;
  opacity?: number;
  color?: string;
  className?: string;
};

export function MicroGrid({
  size = 16,
  opacity = 0.04,
  color = "currentColor",
  className,
}: MicroGridProps) {
  const stroke = encodeURIComponent(color);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><path d='M ${size} 0 L 0 0 0 ${size}' fill='none' stroke='${stroke}' stroke-width='0.5'/></svg>`;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}
