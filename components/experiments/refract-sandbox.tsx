"use client";

import { useId, useState } from "react";

type RefractSandboxProps = {
  src?: string;
  alt?: string;
  height?: number;
};

export function RefractSandbox({
  src = "/cases/marketplace/hero.png",
  alt = "Marketplace UI bajo el filtro de refracción",
  height = 200,
}: RefractSandboxProps) {
  const [scale, setScale] = useState(8);
  const filterId = useId().replace(/:/g, "");

  return (
    <div className="flex h-full flex-col">
      <div
        className="relative flex-1 overflow-hidden bg-[var(--surface)]"
        style={{ minHeight: height }}
      >
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.014 0.02"
                numOctaves="2"
                seed="5"
                result="t"
              />
              <feGaussianBlur in="t" stdDeviation="0.5" result="tb" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="tb"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          style={{ filter: `url(#${filterId})` }}
          draggable={false}
        />
      </div>
      <div className="flex items-center gap-3 border-t border-[var(--border-glass)] bg-[var(--surface-elevated)] px-4 py-3 font-mono text-[0.65rem] tracking-tight">
        <label htmlFor={`${filterId}-slider`} className="text-[var(--ink-soft)] opacity-70">
          displacement
        </label>
        <input
          id={`${filterId}-slider`}
          type="range"
          min={0}
          max={30}
          step={1}
          value={scale}
          onChange={(e) => setScale(Number(e.currentTarget.value))}
          className="h-1 flex-1 accent-[var(--accent)]"
        />
        <span className="nums-tabular w-8 text-right text-[var(--ink)]">{scale}</span>
      </div>
    </div>
  );
}
