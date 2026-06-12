# DIAGNOSE.md

Estado del repo `portfolio-robertino` antes del rework. Branch actual: `ascii/v3-bigmoves`. Commit base: `4e766a4`. STEP 0 (grain cleanup) ya aplicado en `d762f83`.

---

## 1) Mapa de componentes (orden de render)

`app/page.tsx` arma la home en este orden:

| # | Sección | Componente | Archivo |
|---|---|---|---|
| 1 | Nav flotante | `FloatingNav` | `components/navigation/floating-nav.tsx` |
| 2 | Hero | `HeroSection` + `LiveRuntimePanel` | `components/sections/hero-section.tsx`, `components/hero/live-runtime-panel.tsx` |
| 3 | Trust strip | `TrustBar` | `components/sections/trust-bar.tsx` |
| 4 | Aurora cream (inline) | `CreamAurora` (función en page.tsx) | `app/page.tsx` líneas 44-66 |
| 5 | Transición | `SectionTransition command="mounting /who.manifesto"` | `components/primitives/section-transition.tsx` |
| 6 | Quién soy | `WhoSection` | `components/sections/who-section.tsx` |
| 7 | Transición | `SectionTransition command="loading projects.featured"` | idem |
| 8 | Casos | `ProjectsSection` (`ComposedFeaturedCase` + `CaseCardGrid`) | `components/sections/projects-section.tsx`, `components/cases/*` |
| 9 | **Proceso de build** (no mencionado en el prompt) | `BuildProcessSection` | `components/sections/build-process-section.tsx` |
| 10 | **Marquee divider** | `MarqueeDivider` | `components/primitives/marquee-divider.tsx` |
| 11 | GitHub | `GithubSection` | `components/sections/github-section.tsx` |
| 12 | Transición | `SectionTransition command="entering experiments.runtime"` | idem |
| 13 | Lab | `ExperimentsSection` | `components/sections/experiments-section.tsx` |
| 14 | Notas (no mencionado en el prompt) | `NotesSection` | `components/sections/notes-section.tsx` |
| 15 | Feedback placeholder | `FeedbackLogSection` | `components/sections/feedback-log-section.tsx` |
| 16 | Contacto | `ContactSection` | `components/sections/contact-section.tsx` |
| 17 | Footer | `SiteFooter` | `components/sections/site-footer.tsx` |

---

## 2) Stack de animación

- **Motion library:** `motion` v12 (Framer Motion sucesor) — usado en TODO el sitio. No hay GSAP.
- **Variants helpers:** `lib/motion/variants.ts` (`easeOutExpo`, `revealUp`, `withReducedMotion`).
- **`prefers-reduced-motion`:** respetado vía `useReducedMotion()` en `ScrambleText`, `AsciiHeading`, `SectionTransition`, `BootSequence`, `BuildProcessSection`.
- **Canvas:** solo `AsciiRain` (`components/experiments/ascii-rain.tsx`) + `IdentityAvatar` chico.
- **SVG filters:** `LiquidRefractFilter` (montado global) y `RefractSandbox` (lab toy) usan `feTurbulence type="fractalNoise"` — **NO es grain**, es la base del Liquid Glass system.
- **CSS animations:** `@keyframes specular-drift`, `chromatic-glitch`, `crt-flicker`, `reveal-up` definidos en `globals.css`.

---

## 3) Modo Cliente / Dev

- **Provider:** `components/mode/mode-provider.tsx` — context + `useMode()` + localStorage key `rober.mode` (NO `portfolio-mode` como dice el prompt en STEP 9). Default: `client`.
- **Toggle:** `components/mode/mode-toggle.tsx` — ya tiene el slide animado con `layoutId="mode-toggle-pill"` (Cliente|Dev, dos labels visibles, indicador sólido naranja).
- **Set `data-mode` on `<html>`:** sí, en efecto del provider.
- **Persistencia:** sí, localStorage.
- **STEP 9 status:** el toggle ya hace básicamente todo lo que el prompt pide. La única diferencia: storage key `rober.mode` vs `portfolio-mode`. Sin transición de 300ms entre vistas — las secciones reaccionan via `key={mode}` en motion ya. **Probable no-op visual; sólo cambiar key si querés.**

---

## 4) Theme / tokens

- **Sistema:** Tailwind v4 + CSS custom properties (no `tailwind.config.ts`).
- **Archivo:** `app/globals.css`.
- **Brand color:** `--accent: oklch(0.66 0.25 33)` (light) / `oklch(0.74 0.25 33)` (dark) ≈ `#ff4000`. **Ya canonical.** No hay restos de Sunset Persimmon.
- **Drench palette:** `--drench-bg: oklch(0.64 0.25 33)` aplicada vía `.zone-drench` en hero + footer.
- **Heatmap GitHub:** verdes canon en `--gh-0` a `--gh-4`. El prompt STEP 6 pide recolorear a familia naranja — pendiente para ese step.
- **Theme toggle (light/dark):** `components/mode/theme-toggle.tsx`, key `rober.theme`. Separado del Cliente/Dev mode.
- **CRT toggle:** `components/mode/crt-toggle.tsx` — toggles `data-crt="on"` en html (scanlines globales + phosphor + chromatic split). Storage key `rober8b.crt-mode`.

---

## 5) Primitivas ASCII compartidas (NUEVA REGLA DEL PROMPT — reusar siempre)

Catálogo completo de lo mergeado en v1/v2/v3. **No duplicar funcionalidad.**

### `components/primitives/`

| Primitiva | Props clave | Uso actual |
|---|---|---|
| `ScrambleText` | `text`, `trigger: "mount"\|"inView"\|"hover"`, `glyphs`, `delay` | hero eyebrow, footer email, contact channels, ascii-heading eyebrow/command |
| `AsciiFrame` | `corners: round\|square\|heavy\|double`, `tone: ink\|accent\|amber`, `style: solid\|dashed\|double\|heavy`, `label`, `headerSlot` | who-section principles, contact business card, feedback-log placeholder |
| `AsciiHeading` | `eyebrow`, `command`, `title`, `description`, `frame`, `align` | who, projects, build-process, github (vía wrapper), lab, notes, feedback, contact |
| `SectionTransition` | `command`, `divider: dots\|dashes\|none`, `charDelay` | 3 transiciones inline en page.tsx |
| `RuntimeBadge` | `label`, `tone: ok\|muted\|warn\|accent`, `pulse` | hero badge, footer LiveDataStrip, who-section labels |
| `AsciiSignature` | `variant: big\|small` | **footer big** = el ASCII gigante de "rober8b" que STEP 8 elimina |
| `ConsoleGreeting` | (auto en layout) | console.log estilizado de bienvenida |
| `CustomCursor` | data attrs `data-cursor` | cursor global pixel-block |
| `CountUp` | `to`, `duration` | métricas con animación numérica |
| `MarqueeDivider` | — | divider entre BuildProcess y GitHub |

### `components/ambient/`

| Primitiva | Uso |
|---|---|
| `AsciiParticles` | site-wide en layout (post-cleanup de grain queda como única capa ambient) |
| `BootSequence` | one-shot per session (`sessionStorage["rober8b.booted"]`), montado en hero |
| `MicroGrid` | background pattern usado en `DrenchAmbient` del hero |
| `Scanlines` | overlay reutilizado en runtime panel, case cards, lab cards |

---

## 6) Assets actuales (`public/`)

- **Avatars:** `rober8b.jpeg`, `rober8b-photo.png`.
- **Cases (estructura nueva):** `public/cases/<slug>/hero.jpg|png` + algunos `mobile.jpg`. 9 carpetas: aredes-asociados, dental-app, equitas-abogados, leiza-page, marketplace, nebula, nomos, pizza-block, xplora.
- **Cases (legacy duplicada):** `public/projects/*.jpg|png` — versiones planas, ya no usadas por `site-data.ts` salvo el campo deprecado `image`.
- **Faltan los halftones que vas a proveer:** `public/ascii/cases/case-{nomos,aredes,xplora,consultorio,posta,pizzablock}.png` — directorio `public/ascii/` no existe todavía. STEP 3 los necesita.
- **Posta:** mencionado en el prompt (STEP 3, caso 5) **pero no existe en `PROJECTS`** de `site-data.ts`. La memoria `feedback_sensitive_clients` decía "Posta caído" — confirmá si vuelve o lo dejamos fuera.

---

## 7) Estado responsive

- Tailwind breakpoints estándar (sm/md/lg).
- Hero: grid 1 col mobile → `lg:grid-cols-[1.2fr_1fr]` desktop.
- Projects featured: grid `lg:grid-cols-[1.1fr_1fr]` (Story | Scene flippable por index).
- Projects bento (otros trabajos): `sm:grid-cols-2 lg:grid-cols-12` con spans 7/5/5/7.
- Lab: `lg:grid-cols-3`.
- Notes: lista mobile con divider rows + file tree desktop.
- Footer: 3 columnas `sm:grid-cols-3`.
- **No detecté regresiones mobile graves.** El test suite de Playwright cubre algunos casos en `tests/`.

---

## 8) Deuda técnica detectada

1. **`BuildProcessSection` no está en el prompt.** Sigue en page.tsx. ¿Se queda? ¿Se elimina? ¿Se restiliza? — pendiente decisión.
2. **`NotesSection` no está en el prompt.** El prompt menciona "Blog" en footer pero no instruye qué hacer con la sección. ¿Se queda como está?
3. **`TrustBar` no está en el prompt.** Pequeño strip entre hero y who.
4. **`CreamAurora` (inline en page.tsx)** usa `blur-3xl` — viola "NO blur de fondo" del prompt. Mismo problema en `DrenchAmbient` (hero), `FooterAmbient` (footer), `BottomGradient` (hero bottom).
5. **`HeroGlassCard`** todavía existe como fallback del `LiveRuntimePanel` (cuando `activity` es null). Se llama desde `HeroSection`. Es el "BUSINESS CARD" que el prompt menciona "se mantiene pero restilizado".
6. **`AsciiParticles`** sigue site-wide en layout. Después del grain cleanup, es la única capa ambient global. **No mencionado en el prompt — ¿se queda?**
7. **`site-data.ts`** tiene proyectos en este orden: marketplace, xplora, aredes-asociados, leiza-page, nebula, equitas-abogados, nomos, dental-app, pizza-block. El prompt STEP 3 pide otro orden + 6 casos con halftones (incluye Posta inexistente y omite leiza-page/nebula/equitas/nomos). **Conflicto a resolver.**
8. **`CrtToggle` y `ThemeToggle`** existen en el header pero el prompt no los menciona. ¿Se quedan? Coherente con la línea "no toques routing/auth/infra no mencionada".
9. **GraphQL query actual no pide `restrictedContributionsCount`** ni totales adicionales. STEP 6 los va a requerir.

---

## 9) Restos de "rojo viejo" (paleta anterior)

Grep de tonos rojo dominante fuera del sistema `--accent`:

- `app/globals.css` línea 526: `oklch(0.66 0.25 33 / 0.05)` (CRT mode gradient) — está en el sistema, OK.
- `app/globals.css` líneas 444-453: `oklch(0.66 0.25 33 / 0.9)` y `oklch(0.72 0.2 220 / 0.7)` (chromatic glitch keyframe) — el segundo es azul, parte del efecto glitch RGB. OK.
- `components/cases/case-card-grid.tsx` línea 36-38: hardcoded `oklch(0.7 0.2 30)`, `oklch(0.85 0.18 85)`, `oklch(0.78 0.15 140)` — semáforo del browser-frame (rojo/amarillo/verde). Cosmético, OK.
- `components/sections/hero-section.tsx` línea 235: `oklch(0.78 0.18 50)` (warm sun-flare) y línea 242: `oklch(0.18 0.07 30)` (burnt umber depth) — radiales del hero. **Estos sí van a salir cuando STEP 2 elimine `DrenchAmbient`.**
- `components/sections/hero-section.tsx` línea 259: `oklch(0.55 0.22 32)` en `BottomGradient` — viene a fundirse al cream. **Si hero pasa a fondo negro, este gradient pierde sentido.**
- `components/sections/site-footer.tsx` líneas 211-220: gradientes naranjas del `FooterAmbient`. **STEP 8 los elimina con el footer rojo.**

**Conclusión:** no quedan tonos rojo "viejos" anteriores a YC orange. Lo único a limpiar son los gradientes calientes del hero y footer cuando esos steps pasen.

---

## 10) Mapa por sección — QUÉ PASA EN EL REWORK

Por cada sección que toca el prompt: qué se conserva, qué se restiliza, qué se elimina, qué primitivas ASCII aplican.

---

### HERO (STEP 2)

**Conserva (tal cual):**
- `BootSequence` (ambient, one-shot per session).
- `MicroGrid` si el nuevo hero quiere mantener una textura sutil de fondo.
- `RuntimeBadge` (`./rober8b · connected`) si encaja en el nuevo layout.
- Sistema de copy modal `COPY[mode]` (Cliente vs Dev).
- `useAskPalette()` integration (botón Ask Claude).

**Restiliza:**
- `LiveRuntimePanel` y/o `HeroGlassCard` — el "BUSINESS CARD" del prompt — coherente con cards de casos (negro + naranja, no rojo).
- CTAs primario/secundario — el prompt pide "pills outlined naranja, hover sólido naranja con texto negro".
- Eyebrow + título — más sobrios, no titánicos.

**Elimina:**
- `DrenchAmbient` (gradientes naranja-blur del fondo) — viola "NO blur" y el fondo dominante pasa a negro.
- `BottomGradient` — no tiene sentido si no funde al cream.
- `.zone-drench` clase aplicada a `<section>` del hero — el fondo dominante pasa a negro.
- `SpecularDrift` interno del `HeroGlassCard` — si el card pasa a negro, no hay specular que driftear.

**Primitivas ASCII a reusar:**
- `ScrambleText` (ya está, para eyebrow + opcional título).
- `RuntimeBadge` (para "./rober8b · connected" y/o status strip).
- `BootSequence` (ya está).
- Nuevo centerpiece ASCII → **componente nuevo si las primitivas existentes no alcanzan**. Las primitivas actuales no resuelven ASCII halftone animado de gran escala. Si necesito crear `<AsciiHalftone>`, **te pregunto antes** (regla nueva).

**3 OPCIONES DE LAYOUT (elegís vos):**

#### Opción A — coexistencia (recomendado para preservar trabajo)
- ASCII centerpiece (~40% viewport, derecha) + `LiveRuntimePanel` reposicionado abajo o al lado, restilizado.
- **Pros:** preserva el panel terminal-live que ya es identidad del sitio. Mantiene la métrica "system running" que da credibilidad.
- **Cons:** el hero queda denso. Centerpiece más chico que el "50% del viewport" que pide el prompt.
- **Above the fold desktop:** badge + eyebrow + título + tagline + CTAs + Ask Claude prompt + centerpiece + panel inicio.
- **Above the fold mobile:** badge + título + un CTA + el centerpiece chico o panel; el otro se va abajo.
- **Toggle/Ask Claude:** quedan en `FloatingNav` como hoy.

#### Opción B — centerpiece full + panel reubicado
- ASCII centerpiece ocupa 50% del viewport (derecha), `LiveRuntimePanel` se reubica a `WhoSection` o aparece como widget en GitHub section.
- **Pros:** el hero respira; el centerpiece tiene presencia editorial real; el panel sigue vivo en el sitio.
- **Cons:** romper el binding hero↔panel implica perder la lectura "esto es un sistema vivo, no una landing estática" desde el primer scroll.
- **Reubicación sugerida:** dentro de `WhoSection`, como artefacto en el `WORKSHOP_ARTIFACTS` carousel o columna nueva. Encaja con "como pienso, como construyo".
- **Above the fold desktop:** badge + título + CTAs + centerpiece grande.
- **Above the fold mobile:** badge + título + CTA + centerpiece reducido al 60% de su altura desktop.
- **Toggle/Ask Claude:** quedan en `FloatingNav`.

#### Opción C — full centerpiece, panel eliminado
- ASCII centerpiece full-width 50%+. `LiveRuntimePanel` se elimina del hero (y del sitio si no se reubica).
- **Pros:** la imagen del prompt es exactamente esto. Hero limpio, editorial, hits hard.
- **Cons:** se tira a la basura trabajo reciente. El "live runtime" que daba diferenciación se pierde — y no es trivial reconstruirlo si después lo querés de vuelta.
- **Above the fold desktop:** badge + título + CTAs + centerpiece.
- **Above the fold mobile:** badge + título + CTA + centerpiece a aspect-square.
- **Toggle/Ask Claude:** quedan en `FloatingNav`.

---

### CASOS (STEP 3 + STEP 4 consolidación)

**Conserva:**
- `PROJECTS` array en `site-data.ts` como single source of truth.
- `useMode()` para statusLabel/tagline/description por modo.
- Datos por proyecto: name, stack, year, industry, links, highlights.

**Restiliza:**
- Todas las cards a formato vertical 4:5 con halftone arriba (top 60-70%) + texto abajo.
- Featured vs others se unifica en una grid 3 cols desktop / 2 tablet / 1 mobile. Botón "ver todos" si pasan de 6.

**Elimina:**
- `ComposedFeaturedCase` (el componente del scene-3D con DeviceFrame + mobile crop + BuildNoteTile). Reemplazado por la card vertical nueva.
- `CaseCardGrid` (la card actual con browser frame top + bento footer 2-cell). Reemplazado.
- `DeviceFrame` (`components/cases/device-frame.tsx`), `BuildNoteTile`, `MetricTile`, `TerminalOverlay` — todos asociados al composed featured. **Confirmar antes de borrar:** ¿se usan en otro lado? (un grep rápido lo confirma en el step de implementación, no ahora).
- Screenshots `public/projects/*.jpg|png` ya no se referencian → candidatos a borrar; los `public/cases/<slug>/hero.{jpg,png}` también pierden uso → idem.

**Primitivas ASCII a reusar:**
- `AsciiFrame` para el borde de la card (con `tone="ink"` default, hover a `tone="accent"`).
- `ScrambleText` opcional para el título de la card al hover.
- `RuntimeBadge` para el status label ("en construcción", "live").
- `Scanlines` opcional sobre el halftone para textura.
- Si necesito un componente `<AsciiHalftoneImage>` que renderice el halftone PNG con efecto hover-glitch + halftone shift, **te pregunto antes** (regla nueva). Posible que se pueda hacer todo con CSS + `mix-blend-mode` + `filter` sobre el PNG provisto, sin componente nuevo.

**Conflictos con el prompt:**
- **Orden de casos:** prompt pide 1) Marketplace 2) Aredes 3) Xplora 4) Consultorio P&P (dental-app) 5) **Posta** 6) Pizza Block. **Posta no existe** en `PROJECTS`. Faltan en el prompt: leiza-page, nebula, equitas-abogados, nomos.
- **Decisión pendiente:** ¿usamos los 6 que pide el prompt (creando Posta o eliminándolo) o los 9 actuales? ¿En qué orden?

---

### "PEQUEÑAS COSAS" / LAB (STEP 5)

**Conserva:**
- `terminal-toy` (`components/experiments/terminal-toy.tsx`) — explicitado en el prompt.
- `Scanlines` ambient sobre cada card.
- Estructura `AsciiHeading` para el header de la sección.

**Restiliza:**
- Las 3 cards mantienen el formato actual (`glass-strong` + header con `$ command` + footer con descripción).
- El nombre técnico del experimento ("ascii.rain v0.1") se actualiza para los dos nuevos.

**Elimina:**
- `refract-sandbox` de la grid de lab (su componente queda en `components/experiments/refract-sandbox.tsx` por si lo querés reusar, pero **avisame antes de borrarlo del repo**).
- `ascii-rain` se saca del lab pero **el componente se conserva** (per prompt) en `components/experiments/ascii-rain.tsx` para reusarlo en otra parte. Entrada en `EXPERIMENTS` se elimina.

**Agrega:**
- `hermes-agent.tsx` (nuevo componente) — simulación terminal con 4-5 comandos en loop. **Pregunto antes de crearlo** (regla nueva).
- `second-brain-graph.tsx` (nuevo componente) — graph force-directed canvas o SVG. **Pregunto antes de crearlo** (regla nueva).
- Entradas en `EXPERIMENTS` para ambos.

**Primitivas ASCII a reusar:**
- `AsciiHeading` (header de sección).
- `Scanlines` (overlay).
- `ScrambleText` opcional para el typewriter del Hermes.
- `RuntimeBadge` opcional para status del Hermes.

**Reubicación de `ascii-rain`:** el prompt lo sugiere como "background sutil en testimonios o transición entre secciones". En STEP 5 sólo lo sacamos del lab; la reubicación específica viene cuando lleguemos a esa sección.

---

### GITHUB ACTIVITY (STEP 6)

**Conserva:**
- `lib/github/client.ts` — endpoint GraphQL ya funciona con `GITHUB_TOKEN`. **STEP 6 está ~70% hecho.**
- `lib/github/types.ts`, `lib/github/transformers.ts`.
- Cache de 1h con tag `github:user:rober8b`.
- Filtros de repos privados/archived/test.
- `GithubSectionHeader`, `GithubStat`, `CurrentlyBuildingCard`, `CommitLogStrip`, `GithubSetupNeeded`.
- Heatmap toggle (`HeatmapToggle` switcheable entre `ContributionHeatmap` y `ContributionHeatmapAscii`).

**Restiliza:**
- Heatmap colors: recolorear `--gh-0` a `--gh-4` a familia naranja per prompt. **Esto afecta el branding del heatmap** — el prompt da escala (`#1a1a1a`, `#3a1a08`, `#7a2a10`, `#cc3a18`, `#ff4000`). La memoria `project_portfolio_color_decision` decía explícitamente "los colores del GitHub heatmap deben permanecer canon verde para credibilidad". **Conflicto a confirmar antes de aplicar.**
- Mostrar también: total contribs (ya), current streak (ya), longest streak (ya), top language (ya). **No falta nada.**

**Elimina:**
- Nada, salvo si confirmás los colores naranja: borrar referencias verdes residuales.

**Agrega:**
- Extender query GraphQL con `restrictedContributionsCount`, `totalPullRequestContributions`, `totalIssueContributions`, `totalCommitContributions` per prompt.
- Texto explicativo: "Incluye actividad en repos privados."

**Primitivas ASCII a reusar:**
- `AsciiHeading` o `GithubSectionHeader` actual.
- `RuntimeBadge` para stats.
- `AsciiFrame` opcional alrededor del heatmap.

**Env vars:** `GITHUB_TOKEN` ya seteado en Vercel Production + Development. Falta Preview (no crítico).

**Status del PAT:** memoria `project_github_token_expiration` indica que expira `2026-06-21` con `/schedule` programado para `2026-06-15`. Validar que sigue válido al ejecutar STEP 6.

---

### TESTIMONIOS (STEP 7)

**Conserva:**
- Nada estructural del `FeedbackLogSection`. Es placeholder.

**Restiliza:**
- N/A — la sección se reemplaza entera.

**Elimina:**
- `FeedbackLogSection` (`components/sections/feedback-log-section.tsx`) — confirmado por vos en este turno.
- Entrada en `app/page.tsx` línea 11 + línea 37.

**Agrega:**
- Nuevo componente `components/sections/testimonials-section.tsx` con 4 cards 2x2 desktop / 1 col mobile.
- 4 testimonios reales (Carolina, Francisco, Lucas, Martín) — copy exacto del prompt.
- Avatar ASCII procedural por nombre: implementar generador inline a partir de hash del string → patrón 8x8 o 10x10 monoespaciado. **Sin librería nueva** — confirmo si va a ser componente nuevo `<AsciiAvatar>` cuando llegue el step (regla nueva).

**Primitivas ASCII a reusar:**
- `AsciiFrame` para borde de cada card (thin gris oscuro, sin hover excesivo).
- `AsciiHeading` para header de sección.
- Posiblemente `ScrambleText` en el nombre al hover (opcional).

**Memoria actualizada en este turno:** `project_portfolio_testimonials.md` documenta que son reales y la regla "no marcar como mock".

---

### FOOTER (STEP 8)

**Conserva:**
- `CONTACTS` y `PROFILE` data en `site-data.ts`.
- `LiveDataStrip` (uptime/last deploy/region/build) — opcional, encaja con el "bottom strip" del prompt.
- `RuntimeBadge` para indicators.
- `ScrambleEmail` (el wrapper con scramble on hover sobre el mail).

**Restiliza:**
- 3 columnas nuevas per prompt: Identidad / Links rápidos / Contacto directo.
- Tipografía mono pequeña, gris.
- Bottom strip con copyright + versión + last deploy timestamp.

**Elimina:**
- `.zone-drench` aplicado al `<footer>`.
- `FooterAmbient` (gradientes blur naranja).
- `AsciiSignature` variant "big" — el ASCII gigante del nombre que el prompt elimina explícitamente.
- `PixelAvatar` chico al lado del signature — fuera del nuevo layout.

**Agrega:**
- Pull de `process.env.VERCEL_GIT_COMMIT_SHA` para el sha corto, build timestamp para deploy.
- `[available · CONNECTED indicator]` chip en col 1.

**Primitivas ASCII a reusar:**
- `RuntimeBadge` para available/connected.
- `ScrambleText` para hover sobre email.

**Conflicto a notar:** la versión SITE_VERSION hardcodeada en `site-footer.tsx` queda obsoleta. Reemplazar por env-var.

---

### TOGGLE CLIENTE/DEV (STEP 9)

**Conserva:** todo lo funcional.

**Restiliza:** posiblemente nada — ya tiene slide animado, dos labels visibles, indicador naranja, persistencia localStorage, default `client`. Probable **no-op**.

**Diferencias con el prompt:**
- Storage key actual: `rober.mode`. Prompt sugiere `portfolio-mode`. Cambio cosmético si lo querés migrar (rompe preferencia ya guardada de usuarios actuales).
- Transición de 300ms entre vistas: las secciones usan `key={mode}` en `motion.div` que da fade-on-mount. Si querés un crossfade específico hay que diseñarlo.

---

## 11) Solapamientos con ASCII v1/v2/v3 no cubiertos arriba

Cosas extra que noté que el prompt no menciona pero podrían romperse:

1. **`BuildProcessSection`** (rail de 5 pasos). No está en el prompt. Probable se mantiene tal cual.
2. **`NotesSection`** (lista de notas/blog tipo Obsidian). No está en el prompt. Probable se mantiene tal cual.
3. **`TrustBar`** entre hero y who. No está en el prompt.
4. **`MarqueeDivider`** entre BuildProcess y GitHub. No está en el prompt.
5. **`SectionTransition` lines** en page.tsx (3 instancias). Son parte del ASCII v1 — se conservan. Si reorganizamos secciones, hay que actualizar los `command=` strings.
6. **`AsciiParticles` site-wide** en layout (post grain cleanup). Es una capa ambient sutil. **No mencionada en el prompt** — ¿se queda? Yo diría sí (es ASCII v1, no es grain).
7. **`AsciiHeading.glitch-in`** chromatic shift en h2 enter — usa colores OKLCH hardcoded (orange 33 + cool 220). Después de la transición a fondo negro dominante puede leerse distinto. Posible ajuste cosmético.
8. **`ConsoleGreeting`** — auto-monta en layout. Saluda en consola del browser. Inofensivo, no se toca.
9. **`CustomCursor`** — pixel block + reticule, color `var(--accent)`. Se mantiene per memoria deploy. Sigue compatible con fondo negro.
10. **`AskPalette`** + `AskButton` — buscador con HF transformers in-browser. Sobrevive sin cambios per "no toques routing/auth/infra no mencionada".
11. **`LiquidRefractFilter`** — SVG filter mount global usado por `RefractSandbox` y por `.glass-strong` class. Si STEP 5 elimina el sandbox del lab, el filter sigue siendo necesario para el resto del sitio.
12. **Routes `/lab/<slug>` y `/work/<slug>` y `/marketplace`** — páginas standalone que linkean desde las cards. Si las cards cambian, asegurarse que `detailHref` sigue resolviendo (`project.links.manifesto ?? "/work/${slug}"`).

---

## 12) Pendientes que requieren tu decisión

Antes de avanzar a STEP 2 necesito tu input en:

1. **Hero — opción A / B / C** (sección 10, HERO).
2. **Casos — qué hacemos con Posta** (sección 10, CASOS): ¿lo creamos, lo dropeamos, lo dejamos para más tarde? Y ¿qué pasa con leiza-page/nebula/equitas-abogados/nomos que están en el sitio pero no en el orden del prompt?
3. **GitHub heatmap colors** (sección 10, GITHUB): naranja per prompt vs verde canon per memoria — el prompt es más reciente y mandata, pero confirmo porque memoria fue explícita en lo contrario.
4. **`AsciiParticles` site-wide:** ¿se queda?
5. **`BuildProcessSection`, `NotesSection`, `TrustBar`, `MarqueeDivider`:** ¿se conservan tal cual?
6. **Toggle Cliente/Dev:** ¿cambio storage key a `portfolio-mode` o me quedo con `rober.mode` (rompe menos cosas)?

---

## 13) Reglas a leer antes de cada step

- Stack que NO se toca: `LiquidRefractFilter`, `CustomCursor`, `ConsoleGreeting`, `AskPalette`, `ModeProvider`, theme tokens base (`--accent` y derivados), heatmap GitHub data layer.
- **Regla nueva del prompt:** reusar primitivas ASCII existentes. Si necesito crear una nueva → parar y preguntar antes.
- Máximo 2 librerías nuevas en todo el rework.
- Un commit por cambio lógico.
- No avanzar al siguiente step sin OK explícito.

---

**Listo para STEP 2 cuando me bajes decisiones en sección 12.**
