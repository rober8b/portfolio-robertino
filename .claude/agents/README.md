# Agents — portfolio-robertino

Specialized subagents for the portfolio. Use Claude Code's Agent tool with `subagent_type` set to one of:

| Agent | Use when… |
|-------|-----------|
| `liquid-glass-architect` | Designing/refining the iOS 26 Liquid Glass visual system (SVG refraction, backdrop layers, specular drift) |
| `dual-mode-content-writer` | Writing/editing any copy that must exist in both Modo Dev and Modo Cliente |
| `github-integration-engineer` | Building anything that consumes the GitHub API (heatmap, currently-building, repos) |
| `playwright-qa` | Writing/maintaining E2E tests, visual regression, accessibility checks |

## Coordination

- The user owns the **product vision** and final approval on UI/UX.
- `liquid-glass-architect` owns the visual system; defers copy to `dual-mode-content-writer`.
- `dual-mode-content-writer` owns voice; defers visual to `liquid-glass-architect`.
- `github-integration-engineer` owns API + data shapes; UI consuming the data is shared with `liquid-glass-architect`.
- `playwright-qa` is the gate; all four must end green before declaring a feature done.

## Skills available in this repo

- `.claude/skills/impeccable/` — design pipeline (audit, polish, craft, live)
- `.claude/skills/taste-skill/` — taste/criterion (design-taste-frontend)
- `@playwright/test` — testing library
