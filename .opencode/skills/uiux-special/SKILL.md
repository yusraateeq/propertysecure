---
name: UI/UX Special
description: Prompt-driven UI/UX decision system with 1,959 real Google Fonts, 360 font pairings, 1,200 layout blueprints across 40 page types, 1,200 WCAG-validated light and dark theme pairs, plus Three.js and GSAP motion recipes. Use for any website or web app design task to select and implement typography, layout, color, and motion.
---

# UI/UX Special

A design decision system for the UI/UX team. It does not impose one style. It reads the
prompt, pulls only the relevant options from the datasets, compares them, records the
decision, and then implements.

For production implementation of motion and 3D, pair this skill with **motion-template**
(`.opencode/skills/motion-template/SKILL.md`). This skill chooses the design direction;
`motion-template` selects the stack, recipe, scene contract, and fallbacks.

## What is inside

| Asset | Count | File |
| --- | --- | --- |
| Real Google Fonts | 1,959 (1,838 Latin, 565 variable) | `data/fonts.json` |
| Curated font pairings | 360 | `data/font-pairings.json` |
| Layout blueprints | 1,200 across 40 page types, 12 families, 12 hero patterns (6 families × 5 heroes per page) | `data/layouts.json` |
| Theme pairs | 1,200 (each with light + dark = 2,400 mode variants) | `data/themes.json` |
| Motion recipes | 10 GSAP + 10 Three.js + integration patterns | `references/motion-3d.md` |

Only **light and dark** modes exist. Every theme pair is WCAG-checked: body text >= 7:1,
muted text >= 4.5:1, accent text >= 4.5:1.

## Non-negotiables

1. Only light and dark. Never invent a third mode.
2. All colors come from the selected theme's semantic tokens. No raw hex in components.
3. Maximum two text families, plus one mono if the product has code or tabular data.
4. One primary accent. Secondary accent is for charts, tags, and highlights only.
5. Body text >= 7:1, large text >= 4.5:1, UI boundaries and focus rings >= 3:1.
6. Every interactive element has states: default, hover, focus-visible, active, disabled,
   loading, error, empty.
7. Every animation has a `prefers-reduced-motion` fallback.
8. Query the datasets. Do not paste whole JSON files into context.

## Tooling

Run from the repository root:

```bash
node .opencode/skills/uiux-special/scripts/query.mjs stats
node .opencode/skills/uiux-special/scripts/query.mjs fonts --category "Sans Serif" --tag ui --limit 10
node .opencode/skills/uiux-special/scripts/query.mjs pairings --mood premium --limit 10
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page saas-landing --fit 4 --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for saas --mode dark-first --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs theme TH-0546
node .opencode/skills/uiux-special/scripts/query.mjs layout LB-0009
node .opencode/skills/uiux-special/scripts/query.mjs font inter
```

## Selection protocol (prompt-driven)

### Step 0 - Read the prompt

Extract, in writing:

- audience and industry
- 3-5 mood words
- page types in scope (use the 40 `page` values)
- content density (airy / comfortable / compact / dense)
- conversion goal and primary CTA
- brand constraints (existing logo, colors, type, legal)
- accessibility and performance constraints

Do not choose anything until this brief is written.

### Step 1 - Choose typography

1. Query 2-3 candidate headings and 2-3 body faces using `--category`, `--tag`, `--search`.
2. Compare them with the table in `references/fonts.md` (voice, weights, variable, Latin
   coverage, pairing role, performance).
3. Pick one heading + one body, or a ready pairing from `font-pairings.json`.
4. Add one mono only if the product has code, IDs, or dense tables.

Search cues: luxury/editorial -> serif + neutral sans; SaaS/technical -> grotesk + neutral
sans; creative/agency -> display + grotesk; friendly/consumer -> rounded sans + humanist
sans; docs/data -> grotesk + mono.

### Step 2 - Choose layout

1. Query by page: `layouts --page <type> --fit 4 --limit 8`.
2. Prefer `fit: 5`. Keep one primary and one alternate blueprint.
3. Choose density by product: marketing `airy`, content `comfortable/editorial`, app
   `compact/dense`.
4. Copy the blueprint's `sections`, `grid`, `container`, `responsive`, and `motion`
   into the Design Decision Record.

Never invent a new page structure when a fit-5 blueprint exists.

### Step 3 - Choose theme

1. Query by industry and mood:
   `themes --best-for <industry> --mood <mood> --limit 10`.
2. Keep one primary and two alternates. Prefer pairs whose `recommendedMode` matches the
   product (dark-first for dashboards and developer tools, light-first for content and
   commerce).
3. Read the full entry with `query.mjs theme <id>` and confirm both `wcag` blocks.
4. Record the token map for light and dark.

Color cues: real estate/hospitality -> warm neutral, deep green/navy accent; SaaS/fintech
-> cool neutral, indigo/emerald accent; health/wellness -> tinted fresh teal; agency/
creative -> high-contrast vivid accent; editorial -> warm paper light + near-black dark
with one restrained accent.

### Step 4 - Choose motion

Pick from `references/motion-3d.md`:

- one entrance system (fade-up or stagger)
- one feedback system (hover/press/loading)
- at most one scroll-driven or 3D scene on a page
- a reduced-motion fallback for each

3D is allowed only when it supports the product story and has a static fallback.

Then load the **motion-template** skill, choose a recipe (`MT-01` ... `MT-12`), and record
the recipe ID, stack, scroll owner, and scene contract in the Design Decision Record.

### Step 5 - Write the Design Decision Record

Create `.opencode/work/<task-slug>/design-ddr.md`:

```md
# Design Decision Record

## Brief
Audience, industry, mood, pages, density, conversion goal, constraints.

## Typography
- Heading: <family> (<font id>) - why
- Body: <family> (<font id>) - why
- Mono: <family or none>
- Pairing: <FP id or custom> - contrast logic
- Rejected: <families> - why

## Layout
- Primary: <LB id> - page, family, hero, fit
- Alternate: <LB id> - when to use
- Sections: <ordered list>
- Responsive: desktop / tablet / mobile

## Theme
- Primary: <TH id> - strategy, accent relation, mood
- Light tokens: bg, surface, text, accent, onAccent
- Dark tokens: bg, surface, text, accent, onAccent
- Contrast: textBg, mutedBg, onAccent (both modes)
- Rejected: <theme ids> - why

## Motion / 3D
- Entrance:
- Feedback:
- Scene (optional):
- Reduced-motion fallback:

## Implementation
- Recipe: <MT-xx from motion-template> - why
- Stack: <framework, motion, scroll, 3D>
- Scroll owner:
- Scene contract / fallback:
- Token names, component states, assets, risks.
```

### Step 6 - Implement and verify

1. Build tokens first, then primitives, then pages.
2. Run the checklist in `references/professional-checklist.md`.
3. Verify both light and dark: contrast, focus visibility, keyboard path, responsive
   breakpoints, reduced motion, no layout shift.
4. Report blueprint, theme, and pairing IDs in the final message so the decision is
   traceable.

## Prompt cue matrix

| Prompt says | Typography | Layout | Theme | Motion |
| --- | --- | --- | --- | --- |
| premium, luxury, real estate | serif heading + neutral sans | `full-bleed-immersive`, `split-asymmetric` | warm neutral, deep accent | slow reveal, parallax |
| SaaS, dashboard, B2B | grotesk + neutral sans | `dashboard-grid`, `sidebar-app` | cool neutral, dark-first | subtle fade, count-up |
| startup, launch, waitlist | geometric sans + sans | `centered-minimal`, `split-asymmetric` | high-contrast, vivid accent | stagger, product demo |
| ecommerce, product | neutral sans + sans | `card-stack`, `editorial-grid` | light-first, high-contrast CTA | hover zoom, quick feedback |
| editorial, blog, magazine | serif + humanist sans | `magazine`, `editorial-grid` | warm paper, muted accent | reveal-mask, reading progress |
| agency, portfolio, creative | display + grotesk | `bento`, `full-bleed-immersive` | high-contrast vivid | scroll scene, 3D hero |
| health, education, nonprofit | humanist sans + sans | `classic-single-column`, `card-stack` | tinted fresh, calm | gentle fade, no spectacle |
| technical docs, developer | grotesk + mono | `sidebar-app`, `data-dense-table` | dark-first, cool neutral | minimal, instant |

If the prompt conflicts with itself (for example "playful luxury"), pick the dominant
business goal and note the tension in the DDR.

## Reference files

- `references/uiux-principles.md` - hierarchy, spacing, typography, forms, states, a11y.
- `references/fonts.md` - comparison method, shortlists, pairing rules, implementation.
- `references/layouts.md` - 40 page types, 12 families, 12 heroes, selection rules.
- `references/themes.md` - token contract, color theory, light/dark rules, examples.
- `references/motion-3d.md` - GSAP and Three.js scenes with code skeletons.
- `references/selection-recipes.md` - industry-by-industry starting points.
- `references/professional-checklist.md` - definition of done.
- `data/README.md` - dataset schemas and regeneration commands.
- For implementation, load the **motion-template** skill; choose a recipe and run its
  stack selector before coding.
