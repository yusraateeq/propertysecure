# Project Instructions

## Agent working agreement

Default loop for every task:

1. **Understand** — restate the goal in one or two lines. List unknowns. Ask only when the answer changes the approach.
2. **Explore** — read the relevant files before proposing changes. Never guess file contents, APIs, or command names.
3. **Plan** — for anything bigger than a single-file edit, write a short plan first: files to touch, ordered steps, risks. Use `/plan`.
4. **Implement** — make the smallest change that fully solves the problem. Match the existing structure, naming, and style.
5. **Verify** — run the narrowest check that proves the change works (typecheck, lint, tests, build). Use `/verify`.
6. **Report** — say what changed, why, and what was verified. Call out anything that was not verified.

## AI team

Master orchestrator: run `/team <task>` or select the `orchestrator` agent. It runs
Discovery → Architecture → Design → Development → Validation → Launch.

| Department | Head | Specialists |
| --- | --- | --- |
| Product & Project | `heads/product-manager` | `product/business-analyst`, `product/project-manager`, `product/product-owner`, `product/technical-architect` |
| UI/UX & Design | `heads/design-director` | `design/ux-researcher`, `design/ui-designer`, `design/design-system-engineer`, `design/motion-designer` |
| Engineering | `heads/engineering-lead` | `engineering/frontend-engineer`, `engineering/backend-engineer`, `engineering/database-engineer`, `engineering/authentication-engineer`, `engineering/integration-engineer`, `engineering/performance-engineer` |
| Testing & Security | `heads/qa-lead` | `qa/functional-qa-engineer`, `qa/automation-test-engineer`, `qa/security-auditor`, `qa/accessibility-auditor` |
| DevOps & Delivery | `heads/devops-lead` | `devops/cicd-engineer`, `devops/cloud-engineer`, `devops/release-engineer` |
| Growth & SEO | `heads/growth-lead` | `growth/technical-seo-specialist`, `growth/content-strategist`, `growth/analytics-specialist` |

Delegation depth is 2: orchestrator → head → specialist. Specialists must not spawn
further agents. Department heads review deliverables and send defects back to the
owning specialist.

## Task briefs

Every agent writes its own task-specific brief before starting:
`.opencode/work/<task-slug>/<role>.md`, following the **task-brief** skill. It records
objective, inputs, steps, deliverables, and acceptance checks, and the agent follows
it. Reusable procedures may later be promoted to `.opencode/skills/`.

## Design system skill

The UI/UX department uses **uiux-special** (`.opencode/skills/uiux-special/SKILL.md`):
1,959 real Google Fonts + 360 pairings, 1,200 layout blueprints across 40 page types,
and 1,200 WCAG-validated light/dark theme pairs, plus Three.js/GSAP scene recipes.

The UI designer queries the datasets with
`node .opencode/skills/uiux-special/scripts/query.mjs ...`, compares candidates, and
records a Design Decision Record at `.opencode/work/<task-slug>/design-ddr.md`. The spec,
design system, and motion guidelines must cite the chosen font, pairing, layout, and
theme IDs. Only light and dark modes are allowed. Run
`node .opencode/skills/uiux-special/scripts/validate.mjs` after changing the datasets.

## Motion template skill

Design and engineering use **motion-template**
(`.opencode/skills/motion-template/SKILL.md`) to build professional templates with Framer
Motion/Motion, GSAP, Three.js, React Three Fiber, Drei, Lenis, and supporting libraries.
`uiux-special` chooses the design; `motion-template` chooses the implementation stack,
recipe, scene contract, budgets, and fallbacks.

- Select a recipe from `references/recipes.md` (`MT-01` ... `MT-12`).
- Run `node .opencode/skills/motion-template/scripts/select-stack.mjs ...` for the core and
  optional packages.
- Record the recipe ID, stack, scroll owner, 3D contract, and budgets in the motion
  guidelines or task brief.
- Run `node .opencode/skills/motion-template/scripts/check-skill.mjs` after changing the
  skill data or docs.

A 3D scene needs a poster, reduced-motion fallback, offscreen pause, and no-WebGL fallback.
One animation owner per element; one scroll owner per page.

## Deliverable paths

- `docs/product/` — requirements, PRD, task plan
- `docs/architecture/` — architecture, API contracts, implementation notes
- `docs/design/` — UX research, design spec, design system, motion guidelines, and the cited design decisions
- `docs/qa/` — test plan and report, security audit, accessibility report
- `docs/devops/` — infrastructure, deployment, release plan
- `docs/growth/` — SEO plan, content map, analytics plan
- `.opencode/work/` — scratch briefs and phase artifacts (git-ignored)

## Rules

- Do not delete, move, or overwrite unfamiliar files without asking.
- Do not add dependencies or change tooling without approval.
- No secrets in code or config. Use environment variables and `{env:NAME}` in OpenCode config.
- Prefer dedicated tools over shell; never chain noisy shell separators.
- Keep diffs focused. No drive-by reformatting or unrelated refactors.
- Design work must use the **uiux-special** datasets; do not invent palettes, type pairings, or layouts when fit options exist.
- Motion and 3D implementation must use the **motion-template** recipe and stack selector; no scene without a poster, reduced-motion fallback, and no-WebGL fallback.
- Update this file (and docs) when commands, architecture, or conventions change.
- Treat a failing check as unfinished work, not a note in the summary.

## Repository map

- Status: starter project, stack not chosen yet.
- When the project exists, fill in:
  - Install:
  - Dev:
  - Test:
  - Lint / typecheck:
  - Build:
  - Key directories:

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
