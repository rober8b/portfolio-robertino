# REWORK NOTES — branch `ascii/v3-bigmoves`

24 commits, base `4e766a4` → head `a45708d`. Migración del portfolio del lenguaje visual "ASCII v1/v2 con drench naranja + gradientes glass" al lenguaje "ASCII halftone editorial — dark CaseCard dominante, naranja YC `#ff4000` literal, blur/glass eliminados".

## Decisiones de identidad

- **Paleta canonical:** `#ff4000` (YC orange) lockeado como literal en accents — botones primary, hovers, glitch del centerpiece, headers ASCII, status indicators. Reemplaza `var(--accent)` en zonas donde el token podía mover entre light/dark theme y romper la lectura editorial. Reemplaza la efímera Sunset Persimmon de la iteración previa.
- **Fondo dominante post-hero:** `#0a0a0a`. Las cards (Casos, Lab, GitHub, Contact, Testimonios, Footer, /marketplace entero) usan ese mismo background con border-thin `var(--border-glass)` + hover border `#ff4000`. Llamado a esto "estética CaseCard" durante el rework.
- **Heatmap de GitHub Activity:** los cuadrados conservan los verdes canon (`--gh-0..--gh-4`) por legitimidad visual; todo el resto de la sección naranja. Decisión documentada en memoria `project-portfolio-heatmap-hybrid`.
- **Cream tibio:** sobrevive sólo en zonas específicas que ROMPEN el dark dominante a propósito (ProjectsSection wrapper, contraste editorial — decisión explícita en STEP 3 round con el user).

## Cambios arquitectónicos

- **Server vs Client components:** `GithubSection` y `SiteFooter` migrados a Server Components puros. Eliminó double-fetch de `activity` (ahora `page.tsx` la fetchea una vez y la pasa como prop). Removidos `motion`/`AnimatePresence` del footer (sober editorial, sin animación de scroll).
- **Build metadata en el footer:** `next.config.ts` ahora inyecta `NEXT_PUBLIC_BUILD_TIMESTAMP=new Date().toISOString()` por build. El footer combina ese timestamp con `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0,7)` (auto-expuesto por Vercel) para mostrar `v<sha> · last deploy YYYY-MM-DD`.
- **GraphQL GitHub query** extendida con `restrictedContributionsCount`, `totalCommitContributions`, `totalPullRequestContributions`, `totalIssueContributions`. Nuevo sub-tipo `ContributionBreakdown` en `lib/github/types.ts`. Filtros de repos privados/archived/test sin tocar.
- **Halftones de casos:** `Project` type ganó dos campos: `expectedHalftone: string` (canónico, alimenta el placeholder mostrando la path esperada) y `asciiHalftone?: string` (opcional, se setea cuando el PNG real existe en `/public/ascii/cases/`). El render dispara automático al setear el segundo campo. Mapping de filenames canónico en `lib/site-data.ts`, no en el componente.

## Componentes nuevos

- `components/hero/ascii-torus.tsx` — torus 3D ASCII halftone animado en DOM puro (80×40 spans desktop / 60×26 mobile con mutación in-place via refs, ramp `.,-~:;=!*#$@`, glitch programado cada 8-15s + glitch random al hover, mouse distortion radio 150px). Pause via IntersectionObserver, fallback estático para `prefers-reduced-motion` y `hardwareConcurrency<4`. Sin librerías nuevas, ~290 LOC.
- `components/experiments/hermes-agent.tsx` — demo del agente personal de Rober. Loop infinito de 5 comandos (ingest/summarize/recall/draft/status) con typewriter 18ms/char, pausa 2.2s entre comandos, click avanza al siguiente. useReducer + setTimeout recursivo.
- `components/experiments/second-brain-graph.tsx` — graph view tipo Obsidian. 12 nodos + 15 aristas (grafo conexo). Force simulation a mano (repulsion 1/d² + spring k=0.025 + centering + damping 0.85), sleep mode cuando max|v|<0.05 × 30 frames. Render SVG. Drag completo desktop, tap-to-highlight mobile (via `pointer: coarse` detection + `touchAction` correcto en container y nodos).
- `components/cases/case-card.tsx` — card vertical aspect 4:5 con halftone arriba + meta+title+tags+CTA abajo. Hover asimétrico 200ms enter / 350ms exit, filter `saturate(1.15) brightness(1.05)` sobre el halftone, border → `#ff4000`, ScrambleText sobre `<h3>`.
- `components/sections/testimonials-section.tsx` — 4 testimonios reales (Carolina/Francisco/Lucas/Martín), grid 2×2 desktop / 1 col mobile, stagger 60ms.
- `components/testimonials/ascii-avatar.tsx` — generador procedural de avatars por hash FNV-1a del nombre. Grid 6×6 con mirror horizontal (identicon-style), ramp de 8 niveles, naranja sobre negro. Sin librerías.

## Componentes eliminados

- `components/ambient/ascii-grain.tsx` (grain effect site-wide).
- `components/mode/crt-toggle.tsx` (botón ░/▓ que activaba scanlines globales + phosphor + chromatic split).
- `components/cases/composed-featured-case.tsx` y `components/cases/case-card-grid.tsx` (reemplazados por `CaseCard`).
- `components/sections/feedback-log-section.tsx` (placeholder con TODOs).
- `components/primitives/ascii-signature.tsx` (signature gigante "rober8b" del footer viejo).
- CSS: `@keyframes grain-breathe`, `@keyframes crt-flicker`, todas las reglas `html[data-crt="on"]`.

## Componentes restilizados (estética CaseCard dark)

- `LiveRuntimePanel` — ahora vive como "card sobre mí" en la sección GitHub, con bio incluida + `SystemMetrics` reescrito (grid 2/4 cols con `min-w-0 + truncate` para valores largos).
- `CurrentlyBuildingCard`, `CommitLogStrip` (conservó semáforo Mac), `HeatmapToggle` (reemplaza `AsciiFrame` por wrapper plain dark + override local de tokens para que labels del heatmap sigan legibles), `ContactSection` channels card (eliminó corner brackets `⌜⌝`), `StartSessionPrompt` terminal, lab cards (Terminal Toy, Hermes, Second Brain — header con semáforo Mac agregado).
- `mode-toggle`: pill pasa de `bg-[var(--ink)]` (negro/cream según theme) a `bg-[#ff4000]` literal con texto `white`. Spring afinada `stiffness 320 damping 34` (menos bounce).

## Cross-fade Cliente/Dev

Patrón uniforme `motion.div key={mode} initial opacity:0 → 1, transition 250ms easeOutExpo` aplicado en 8 secciones (TrustBar, Who, Projects, BuildProcess, Experiments, Notes, Testimonials, Contact). HeroSection ya tenía el patrón en su text block.

## Reorganización de page.tsx

Orden final: Hero → TrustBar → Aurora → Who → Projects → **Testimonios** (movido de su slot original entre Notes y Contact al post-Projects, flow "qué construí → qué dicen → cómo trabajo") → BuildProcess → MarqueeDivider → GitHub (con LiveRuntimePanel adentro) → Lab → Notes → Contact → Footer.

## Footer

3 cols desktop / stack mobile. Identidad + RuntimeBadge "available · connected" / Navegación (minúsculas, hover naranja) / Contacto (github · x · linkedin · email, solo texto sin íconos). Bottom strip: `© año · v<sha> · last deploy YYYY-MM-DD`. Server Component, sin motion, sin glass.

## Página `/marketplace`

Reescritura visual completa. Eliminado `.zone-drench` (Hero/Defensibility/FinalCta), `HeroAmbient` con 3 radial blurs naranja, dot grids, `glass` wrappers en cards (Thesis/Squads/Team), tokens drench en CTAs. `main bg-[#0a0a0a]`, secciones separadas por border-top sutil, cards en estética CaseCard, naranja `#ff4000` sólo en accents (eyebrows, outcome metric stat, primary CTAs). Lógica intacta.

## Libraries

**Cero librerías nuevas en todo el rework.** Todo en `motion` (ya estaba), CSS variables, DOM puro, SVG nativo. El budget original era "máximo 2" — no se usaron.

## Pendientes y flags

- **Mobile verification real:** torus stack, second-brain touch, lab cards stacking. No verificado por mí (sin device físico).
- **Halftones de casos:** dropear los 9 PNGs en `public/ascii/cases/` (paths exactas en `expectedHalftone` por proyecto en `lib/site-data.ts`). Después setear `asciiHalftone` cuando estén listos.
- **Playwright tests:** los snapshots están desactualizados (visual regression romperá). Re-correr y actualizar antes del merge.
- **/work/[slug] detail pages:** mantenidas en lenguaje visual viejo (DeviceFrame + scene 3D). Migrar al lenguaje nuevo es un step futuro fuera del scope del rework. Al hacerlo, los 4 componentes `device-frame`, `build-note-tile`, `metric-tile`, `terminal-overlay` entran al borrado.
- **Assets huérfanos:** `/public/projects/*.{jpg,png}` y `/public/cases/<slug>/*.{jpg,png}` siguen vivos porque `case-study.tsx` los lee. Cleanup diferido al step de detail pages.
- **Bug `--surface-elevated` heredado:** resuelto en cleanup post-rework (sustituido por `--surface-elev` real).
- **String "sunset persimmon":** resuelto en cleanup (terminal-toy + ascii-rain).
- **Storage key `rober8b.crt-mode` huérfana:** sigue en localStorage de usuarios que activaron CRT alguna vez. Sin attribute `data-crt` en el DOM no surte efecto.
- **`BootSequence` overlay en hero:** `bg-[var(--drench-bg)]/85` aplica sobre el hero negro durante ~1s en primera visita. Cosmético, brief, one-shot per session. Diferible.

## Cómo probar local

1. `pnpm install` (sin deps nuevas, debería ser no-op).
2. `pnpm dev` → home en `localhost:3000`. Probar:
   - Torus animando infinitamente en el hero, hover dispara glitch.
   - Toggle Cliente/Dev en el nav: pill naranja, copy hace crossfade en cada sección.
   - Card "sobre mí" en GitHub: dark con bio + métricas alineadas.
   - Casos con placeholders `?` naranja + nombre del archivo esperado.
   - Lab cards con semáforo Mac.
   - Testimonios después de casos.
   - Footer minimalista 3-col, bottom strip con `vdev · last deploy <today>`.
   - `/marketplace`: fondo dark, sin gradientes naranja masivos.
3. `pnpm typecheck` → exit 0.
4. `pnpm build` → verificar que `NEXT_PUBLIC_BUILD_TIMESTAMP` se inyecta.

## Env vars

- `GITHUB_TOKEN` (Production + Development en Vercel, válido hasta `2026-06-21`).
- `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` (auto-expuesta por Vercel en deployments).
- `NEXT_PUBLIC_BUILD_TIMESTAMP` (inyectada por `next.config.ts` en cada build).
- `ENABLE_EXPERIMENTAL_COREPACK=1` (Vercel pnpm setup heredado, NO tocar).
