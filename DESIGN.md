# DESIGN.md — Portfolio Robertino Barbuto

## Escena física (resuelve theme)

> Un dev senior con dos monitores 4K, late afternoon, oficina con persianas a medio bajar. El portfolio se ve también en el celular de un dueño de PyME en un café de Palermo a la 1 de la tarde con sol entrando de costado.

**Decisión de theme:** **dual auto** — light por default (oficinas, mediodía, screens de PyME), dark cuando el sistema lo pide o el usuario lo elige. **Sin** dark-only "porque es dev".

## Color strategy

**Committed** — un neutral profundamente tintado hacia "ink" (azul-grafito muy desaturado) carga 40–60% de las superficies. **Un solo accent**: oklch electric coastal blue (saturación moderada, no neón). El glass introduce variabilidad de color sin sumar otros tintes.

### Tokens base (OKLCH)

```
/* Light scene */
--ink:               oklch(0.20 0.025 245)   /* primario texto y bordes oscuros */
--ink-soft:          oklch(0.42 0.020 245)   /* secundario texto */
--surface:           oklch(0.985 0.003 245)  /* fondo principal, casi blanco con tint cool */
--surface-elev:      oklch(0.965 0.005 245)  /* cards, secciones elevadas */
--surface-glass:     oklch(0.99 0.003 245 / 0.55)  /* base translúcida para glass */
--accent:            oklch(0.55 0.16 240)    /* electric coastal blue */
--accent-soft:       oklch(0.80 0.06 240)    /* tints suaves del accent */

/* Specular & refraction overlays */
--specular:          oklch(1.00 0 0 / 0.55)
--highlight-cool:    oklch(0.92 0.04 220 / 0.35)
--highlight-warm:    oklch(0.90 0.03 60 / 0.20)

/* Borders */
--border-glass:      oklch(1.00 0 0 / 0.18)
--border-glass-dark: oklch(0.30 0.02 245 / 0.30)
```

### Dark mode

Invertir surface ↔ ink. El accent se mantiene (sólo +5% lightness). Glass aumenta opacidad de specular para mantener legibilidad de bordes.

```
--ink:               oklch(0.96 0.005 245)
--ink-soft:          oklch(0.75 0.010 245)
--surface:           oklch(0.13 0.012 245)
--surface-elev:      oklch(0.18 0.015 245)
--surface-glass:     oklch(0.20 0.015 245 / 0.55)
--accent:            oklch(0.62 0.16 240)
```

## Typography

**Pareja oficial:** Geist (sans display + body) + Geist Mono (badges técnicos, código, GitHub activity, stack chips).

- **Display:** `text-5xl md:text-7xl` `tracking-[-0.04em]` `leading-[0.95]` — para nombre + hero claim.
- **H2 sección:** `text-3xl md:text-5xl` `tracking-[-0.025em]` `leading-[1.1]`.
- **Body:** `text-base md:text-lg` `leading-[1.65]` `max-w-[68ch]`.
- **Mono / chips:** `text-xs` `tracking-[-0.01em]` uppercase para badges, lowercase para identificadores técnicos.

**Reglas:**
- `text-wrap: balance` en h1/h2/h3.
- `text-wrap: pretty` en `<p>`.
- Cap body line length en 68ch (relajación respecto a impeccable 65–75ch).
- Serif **prohibida** para UI (taste rule). Pero permitida en un solo lugar como statement editorial: el manifesto del Marketplace puede usar `Fraunces` para sensación de "newspaper longread", si así lo decidimos en `craft`.

## Liquid Glass system (iOS 26)

El glass es **sistémico**, no decorativo. Tres niveles:

### Nivel 1 — Glass material base

Todo el `surface-glass` se renderiza con:

```css
.glass {
  background: var(--surface-glass);
  backdrop-filter: blur(20px) saturate(180%) brightness(1.05);
  -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(1.05);
  border: 1px solid var(--border-glass);
  box-shadow:
    inset 0 1px 0 var(--specular),       /* specular top edge */
    inset 0 0 0 1px var(--highlight-cool),
    0 10px 40px -20px oklch(0.20 0.025 245 / 0.25);
}
```

### Nivel 2 — Refracción real

Para componentes destacados (Dynamic Island navbar, hero card, project cards al hover) — usar SVG `feTurbulence` + `feDisplacementMap` aplicado como filtro CSS sobre el contenido detrás:

```svg
<filter id="liquid-refract">
  <feTurbulence baseFrequency="0.012 0.018" numOctaves="2" seed="3" />
  <feDisplacementMap in="SourceGraphic" scale="6" />
</filter>
```

`filter: url(#liquid-refract)` aplicado sobre la imagen del fondo recortada por el shape del glass. Solo en componentes hero, no globalmente.

### Nivel 3 — Specular highlights animados

Highlight superior que se desplaza levemente al mover el cursor sobre el componente (mouse-tracking en JS, transform `translate3d` para GPU). Usa `prefers-reduced-motion` para desactivar.

## Layout system

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. **No** wrapear todo en container — secciones full-bleed cuando aportan.
- **Grid sobre flex-math siempre** (taste rule).
- **Hero:** `min-h-[100dvh]` — nunca `h-screen` (taste critical rule).
- **Asymmetric splits:** los splits 50/50 simétricos están vetados. Mínimo 38/62 o golden 38.2/61.8.
- **Section rhythm:** `py-24 md:py-32` para secciones principales; `py-16 md:py-20` para secciones intercaladas. Mismo padding everywhere = monotonía.

## Cards

**Política:** card solo cuando hay elevación funcional (cards de proyectos, glass de manifesto). **Listas** no llevan cards. **Stack chips** no llevan cards.

- Sombras tintadas hacia el ink (no `rgba(0,0,0,...)`).
- Border de 1px con `border-glass`.
- Radius default: `--radius: 1.25rem` (más generoso que shadcn default por el aire iOS).

## Motion

- **Ease-out-expo** o **ease-out-quart** para todo. No bounce, no elastic.
- **Reveal-up** en scroll (24px translate, 600ms, threshold 0.15).
- **Specular drift** en glass cards al hover (8px max, 500ms).
- **Dynamic Island morph** entre estados (shared layout via motion `layoutId`).
- **No animar layout properties** — solo transform, opacity, filter.
- **`prefers-reduced-motion`** desactiva todo lo no esencial.

## Iconography

- **Lucide** (ya instalado y en `components.json`).
- `strokeWidth={1.5}` globalmente.
- **No emojis** en código/copy/alt — taste critical rule.

## Componentes signature

1. **Dynamic Island Nav** — barra flotante centrada arriba, glass nivel 2, se morphea al hacer hover en una sección (preview), al abrir command palette, al ejecutar "Ask my portfolio".
2. **Hero Glass Card** — el nombre + claim en un card glass de pantalla grande, con specular drift al hover.
3. **Project Card** — glass nivel 1, con badge de estado (Live / Building / Prototype) y stack chips mono.
4. **GitHub Heatmap** — grid de 53×7, cells con OKLCH chroma escalado por commits, glass overlay al hover de cell.
5. **Manifesto card (Marketplace)** — editorial, texto largo, glass nivel 2, drop cap.
6. **Mode Toggle (Dev/Cliente)** — pill con dos opciones, slider que se mueve con motion, copy del sitio se transiciona suavemente.

## Spacing scale

Tailwind default pero con énfasis en variar:
- Tight: `space-y-2 / gap-2` para chips y dense info.
- Default: `space-y-6 / gap-6`.
- Section: `space-y-16 md:space-y-24 / gap-16`.

## Accessibility

- Contraste WCAG AA mínimo. AAA para body sobre surface.
- Focus rings visibles (no `outline-none` sin reemplazo).
- Glass cards mantienen border de 1px para no perder edge en backgrounds claros.
- `prefers-reduced-motion: reduce` desactiva specular drift, marquees, parallax.

## AI-slop avoidance

- **Primer orden:** "dev portfolio → dark blue terminal" → vetado. Default light, accent blue pero no terminal aesthetic.
- **Segundo orden:** "dev que no es terminal → editorial-monospace" → no nos vamos al extremo opuesto. Estamos en glass-iOS, una familia distinta.
- **Test final:** si alguien dice "esto lo hizo AI", fallamos. Verificación humana antes de cada commit visual.
