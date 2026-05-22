export function LiquidRefractFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <defs>
        <filter
          id="liquid-refract"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="2"
            seed="3"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="0.6" result="softTurbulence" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softTurbulence"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id="liquid-refract-strong"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.024"
            numOctaves="2"
            seed="7"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
