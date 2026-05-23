# portfolio-robertino

Portfolio personal de Robertino Barbuto — `rober8b` · Buenos Aires.

> **Tesis:** un único portfolio para devs y clientes no técnicos, con toggle Modo Dev / Modo Cliente, sistema visual Liquid Glass (iOS 26), GitHub activity en vivo y chat IA entrenado en proyectos reales.

## Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **TypeScript** estricto
- **Tailwind CSS v4** con tokens OKLCH en CSS variables
- **shadcn/ui** (`base-nova` style, base color `neutral`)
- **motion** (12.x — la nueva framer-motion)
- **lucide-react** + brand icons SVG locales
- **@vercel/analytics** + **@vercel/speed-insights**
- **Playwright** para visual regression y smoke tests
- **pnpm** 10+ · Node 24+

## Skills locales

Instaladas en `.claude/skills/`:

- **impeccable** — pipeline de diseño frontend (`pbakaus/impeccable`)
- **taste-skill** — criterio UI/UX (`Leonxlnx/taste-skill`)

Documentadas en el vault de Obsidian de Rober: `80-wiki/entities/{impeccable,design-taste-frontend,playwright}.md`.

## Agents

En `.claude/agents/`:

- `liquid-glass-architect` — sistema visual iOS 26 Liquid Glass
- `dual-mode-content-writer` — copy Dev/Cliente
- `github-integration-engineer` — heatmap + commits live
- `playwright-qa` — visual regression + E2E

## Scripts

```bash
pnpm dev              # dev server (Turbopack)
pnpm build            # production build
pnpm start            # serve build
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm format           # Prettier write
pnpm format:check     # Prettier check (CI)
pnpm test             # Playwright tests
pnpm test:ui          # Playwright UI mode
```

## Estructura

```
app/
  layout.tsx          # fonts + providers + Vercel insights
  page.tsx            # home — hero + nav
  globals.css         # design tokens + .glass utilities + animaciones
components/
  glass/              # primitives Liquid Glass (refract filter, etc.)
  mode/               # mode-provider + mode-toggle (Dev / Cliente)
  sections/           # hero-section + future secciones
  icons/              # brand-icons SVG inline
lib/
  utils.ts            # cn() shadcn helper
  site-data.ts        # PROJECTS, EXPERIENCES, EDUCATION, PROFILE
tests/
  smoke.spec.ts       # smoke + mode-toggle + reduced-motion
.claude/
  agents/             # subagentes especializados
  skills/             # impeccable + taste local
PRODUCT.md            # brand, audiencias, principios (impeccable lee)
DESIGN.md             # tokens, glass system, motion (impeccable lee)
```

## Convenciones

- Files in `kebab-case` (`hero-section.tsx`)
- Components in `PascalCase`
- Path alias `@/*` → root
- No emojis in code/copy/alt (taste critical rule)
- `min-h-dvh` siempre, nunca `h-screen` (mobile Safari)
- Tokens OKLCH, nunca `#000` / `#fff`
- Glass solo cuando hay elevación funcional

## Deploy

Vercel zero-config. Linkear repo y push a `main`.

## Tag de migración

`legacy-vite-2026-05-21` — última versión React + Vite antes de la migración.

```bash
git checkout legacy-vite-2026-05-21
```
