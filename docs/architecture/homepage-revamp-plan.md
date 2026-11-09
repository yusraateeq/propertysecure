# Homepage/Hero Revamp — Architecture Plan

**Phase:** Development — Architecture sub-phase (read-only analysis; no source code was modified).
**Date:** 2026-11-09
**Scope:** Homepage (`app/page.tsx`) and especially the Hero (`components/sections/Hero.tsx`). P0 findings elsewhere (mailto-only quote form, wrong phone/email on other pages) are **out of scope** per Phase 1 (`docs/product/prd-recommendations.md` §6).
**Inputs:** User directive — "improve homepage vs old WordPress site (propertysecurity.org); use Framer Motion; make the hero better."
**Motion governance:** This plan follows the **motion-template** skill. Recipe selected below (§4–§5). No 3D is proposed (Rule 5: 3D must earn its place — none does here).

---

## 1. Constraints (binding)

1. **No new dependencies.** `package.json:14–21` fixes the runtime set: `framer-motion@^12.23.24`, `lucide-react`, `next@^16.4.5`, `react@19.1.1`, `sharp`. Any proposal stays within Framer Motion + Tailwind + existing files.
2. **No removal of existing a11y capability.** The Hero carousel's roles, labels, keyboard pairing, pause-on-hover/focus, and play/pause toggle (cited in §2, Hero) must be **preserved or improved, never removed** in any option.
3. **Image assets must already exist** in `public/images`. Verified presence is recorded in §3 (hero-guards.jpg, hero-security.jpg, security-guard.png, etc.). No third hero photo exists — noted where true.
4. **Reduced-motion respect** per motion-template Rule 7 and `app/globals.css:123–129` (global media query already kills transitions).
5. **One animation owner per element; one scroll owner per page** (motion-template Rules 2–3). The Header already owns a `window` scroll listener for its own state (`components/layout/Header.tsx:26–31`); any hero scroll-link must use Motion's `useScroll` scoped to the hero element, not a second window listener.

---

## 2. Current homepage architecture (evidence: every file read this phase)

`app/page.tsx` (28 lines, server) renders, in order (`app/page.tsx:19–25`):

| # | Component | File | Type | Lines | framer-motion APIs used (with line cites) |
|---|---|---|---|---|---|
| 1 | Hero | `components/sections/Hero.tsx` | `'use client'` (L1) | 192 | `AnimatePresence, m, useReducedMotion` (L3); timer state L19–21, 7s auto-advance interval L27–34; carousel semantics L40–46; priority LCP image L54–66; Ken Burns cross-fade L67–95 (`initial opacity 0` L72, 0.8s L75, scale 1.025→1.095 over 10s linear L79–81); gradient + `dark-grid` overlays L96–98; staggered entrance delays 0.15→0.62s L102–149; dot controls + prev/play/next L155–178; looping scroll-chevron L183 (`y: [0,5,0]`, repeat Infinity) |
| 2 | Introduction | `components/sections/Introduction.tsx` | server (no directive) | 39 | none directly — uses client `Reveal` (L15, L23); stat values hardcoded L3–8 |
| 3 | Services | `components/sections/Services.tsx` | `'use client'` (L1) | 72 | `m, useReducedMotion` (L3); `whileInView` grid L26–31 (`stagger`, `viewport` L8); per-card `whileHover={{ y: -7 }}` L40 |
| 4 | SplitServices | `components/sections/SplitServices.tsx` | server | 43 | none directly — client `Reveal` with `slideLeft`/`slideRight` (L13) |
| 5 | AboutStatement | `components/sections/AboutStatement.tsx` | server | 23 | none directly — client `Reveal` (L8) |
| 6 | WhyChooseUs | `components/sections/WhyChooseUs.tsx` | `'use client'` (L1) | 79 | `m, useReducedMotion` (L3); stagger grid L27–32; per-item `fadeUp` L35–38; animated SVG checkmark `pathLength` 0→1 L42–53; CTA row `fadeUp` L59–65; `EASE` import L10; renders client `VideoModal` (L76, `components/ui/VideoModal.tsx`) |
| 7 | Testimonials | `components/sections/Testimonials.tsx` | `'use client'` (L1) | 129 | `AnimatePresence, m, useReducedMotion` (L3); directional variants L44–48; 6.5s auto-advance L37–41; `mode="wait"` crossfade L75–83; drag-to-paginate L84–90; carousel roles/keyboard L56–69; dot/pause controls L110–118 |

**Shared infrastructure:**

| Piece | File | Facts |
|---|---|---|
| Motion provider | `components/providers/MotionProvider.tsx` (8 lines) | `LazyMotion` with **`domMax` + `strict`** (L3, L7). Consequence: `useScroll`/`useSpring`/drag are already available — scroll-linked motion needs **no feature upgrade and no bundle growth**. All components correctly use `m.*`, not `motion.*`. |
| Motion tokens | `lib/motion.ts` (57 lines) | `EASE = [0.22, 1, 0.36, 1]` (L3); `viewport` (L4); variants `fadeUp` (L6), `fadeIn` (L15), `stagger` (L20), `scaleIn` (L27), `slideLeft` (L36), `slideRight` (L45), `reducedFade` (L54). `Reveal` (`components/ui/Reveal.tsx`, 40 lines, `'use client'`) wraps them with a reduced-motion swap (L25–26). |
| Business data | `lib/site.ts` (106 lines) | `business` L3–13 (phone `(844) 488-1032` L7–8, license L5); `services` L34–56; `splitServices` L58–75; `whyChooseUs` L77–85; `testimonials` L87–106 |
| Buttons | `components/ui/ButtonLink.tsx` (69 lines, `'use client'`) | `motion.create(Link)` L8; `whileHover y:-2` / `whileTap scale:0.98`, reduced-motion-gated L41–47 |
| Hero sizing | Hero L39 | `h-[calc(100svh-112px)] min-h-[740px] max-h-[840px] sm:h-[calc(100svh-124px)] sm:min-h-[680px]` — offset = TopBar `min-h-10` 40px (`components/layout/TopBar.tsx:8`) + Header `h-[72px]/sm:h-[84px]` (`components/layout/Header.tsx:82`) = 112/124px. Any new hero layout must preserve this contract. |

**CSS utilities available** (`app/globals.css`): `.site-container` L80, `.section-space` L84, `.eyebrow` L88, `.subtle-grid` L100–104, `.dark-grid` L106–110, reduced-motion block L123+.

---

## 3. Asset verification (actual `public/images/` contents, with sizes)

| Asset | Present | Size | Current use |
|---|---|---|---|
| `hero-guards.jpg` | ✅ yes | 426.7 KB | Hero slide 1 (Hero L13); OG/Twitter image (layout L42, L48); LocalBusiness schema (L65) |
| `hero-security.jpg` | ✅ yes | 373.5 KB | Hero slide 2 (Hero L14) |
| `security-guard.png` | ✅ yes | 107.3 KB | — (unused on home) — candidate foreground layer |
| `about-protection.jpg` | ✅ yes | 100.8 KB | About page |
| `about-communication.jpg` | ✅ yes | 112.2 KB | About page |
| `employment-office.jpg` | ✅ yes | 543.1 KB | Employment page |
| `construction-proof.png` | ✅ yes | 66.8 KB | Construction proof |
| `logo-shield.png` | ✅ yes | 340.1 KB | Header/Footer |
| `footer-radial.png` | ✅ yes | 44 KB | Footer |
| `testimonial-avatar.png` | ✅ yes | 19.1 KB | Testimonials |

**Absence note (true):** only **two** hero photographs exist. There is **no third hero image** and no dedicated stats/texture assets. `security-guard.png` (107.3 KB) must be inspected visually in the implementation phase before being used as a foreground layer; if it is not a clean cutout, Option B runs on two depth layers only (grid plane + vignette).

---

## 4. Hero upgrade options

Common ground (all options): Framer Motion only (`m`/`AnimatePresence`/`useScroll`/`useSpring`), scoped `useScroll` on the hero section as the page's single scroll owner, Tailwind overlay work (no new planes/fonts/images needed), full preservation of the carousel a11y contract (§1 item 2), `useReducedMotion` gates on every new motion.

### Option A — Kinetic gradient + stats strip (no new layers)

Keep the 2-slide carousel exactly as-is; upgrade the treatment: energize the gradient stack (radial gold glow behind the CTAs, slow-breathing opacity/position loop on an `aria-hidden` layer), add a compact **stats strip** (33+ years / PPO Lic # 119841 / 24/7 dispatch `tel:`) docked above the controls bar, refine slide orchestration (directional-drift cross-fade instead of pure opacity) and a progress bar mirroring the 7s timer.

- **LCP:** 5/5 — LCP image untouched (still priority/eager first slide, Hero L54–66); zero scroll transforms.
- **Bundle:** 5/5 — no APIs beyond the already-loaded `domMax`; ≤ +2 KB.
- **A11y:** 5/5 — nothing removed; stats strip is a plain `dl`.
- **Complexity:** 5/5 (low — mainly one file).
- **Wow vs old WordPress site:** 3/5 — solid, but today's hero already beats the old static banner; the visible delta is modest.

### Option B — Cinematic multi-layer scene + scroll-linked hero (RECOMMENDED)

Everything in Option A **plus** two Framer-Motion-only depth additions:

1. **Layered parallax entrance:** the existing Ken Burns layer (Hero L77–92) gains a sibling layer stack — the existing `dark-grid` CSS plane (L98) with a slow positional drift, a radial vignette, and an optional foreground `security-guard.png` layer with a staggered rise-and-settle entrance on `EASE` — each on its own `aria-hidden` div.
2. **Scroll-linked hero handoff:** `useScroll({ target: heroRef, offset: ['start start','end start'] })` (+ `useSpring`) drives a subtle image translateY/scale and content fade as the user scrolls past the hero — the cinematic handoff into Introduction. Reduced-motion users get identity styles (static).

- **LCP:** 4/5 — LCP element unchanged; scroll transforms apply only post-hydration and are identity at scrollY = 0 (no visible shift at rest) → no LCP delay, no CLS.
- **Bundle:** 4/5 — APIs already baked into `domMax`; +3–4 KB gz at most.
- **A11y:** 5/5 — purely additive; parallax layers decorative + `aria-hidden`; carousel contract untouched.
- **Complexity:** 4/5 (medium — Hero.tsx rewrite in place + one small stats subcomponent; careful reduced-motion branches).
- **Wow vs old WordPress site:** 5/5 — the "cinematic" treatment the directive calls for.

### Option C — Typographic static hero with animated counters (carousel demoted)

Replace slides with one hero image; big kinetic type (per-line mask reveal), animated stat counters (33+ → count-up), minimal controls.

- **LCP:** 4/5 — fine, but drops a working two-slide asset pipeline.
- **Bundle:** 4/5 — similar.
- **A11y:** 2/5 — **would delete the existing carousel roles/keyboard/labels — violates constraint §1.2** unless the carousel is merely hidden, which is pointless. Counters also need state/`aria-live` hygiene not currently established.
- **Complexity:** 2/5 (high — full rewrite, counters, new state).
- **Wow:** 4/5 — but at a11y and asset cost.

### Rating summary

| Criterion | A | B | C |
|---|---|---|---|
| LCP impact | 5/5 | 4/5 | 4/5 |
| Bundle growth | 5/5 | 4/5 | 4/5 |
| Accessibility (WCAG) | 5/5 | 5/5 | 2/5 |
| Complexity (higher = better) | 5/5 (low) | 4/5 (medium) | 2/5 (high) |
| Wow vs old WordPress | 3/5 | 5/5 | 4/5 |

---

## 5. Recommendation — **Option B (scoped hybrid absorbing Option A)**

The directive asks for a hero clearly better than the old site using Framer Motion; Option B delivers that while keeping every existing a11y guarantee and loading zero new dependencies or images.

### Motion-template record

- **Recipe:** `MT-01` (cinematic SaaS landing) — hero treatment only; the rest of the page keeps today's `whileInView` reveals. No 3D scene (Rule 5: not justified → no WebGL contract needed; only reduced-motion and no-JS fallbacks, which the static markup already satisfies).
- **Stack (unchanged):** Next.js App Router + Framer Motion (`domMax`) + Tailwind. **Scroll owner:** exactly one new `useScroll` instance scoped to the hero `<section>`; no second window listener (Header already has one for its own nav state, Header L26–31 — separate concern, not an animation).
- **Scene contract:** no WebGL/canvas; all layers are DOM. Fallbacks: reduced-motion static state; fully server-markup content for no-JS.

### Implementation contract

**Files to touch (implementation phase):**

| File | Change |
|---|---|
| `components/sections/Hero.tsx` | Rewrite in place: parallax layer stack, stats strip, scroll-linked exit; keep every existing a11y attribute and control |
| `components/sections/hero/HeroStats.tsx` (new, ≤60 lines) | Stats strip (dl: 33+ Years, PPO Lic # 119841, 24/7 dispatch tel link) as a child of the client Hero |
| `lib/motion.ts` | Add a `heroScene` token block (slow 0.52–0.6s, drift 10s linear as today, stagger 0.06) — extends, never alters, existing tokens |
| `app/page.tsx`, `app/layout.tsx`, `globals.css` | **No changes** (at most a radial-glow utility in globals.css) |

**State model (Hero):** keep `current`, `paused`, `hasTransitioned` (L19–21). Add `direction: -1 | 1` for directional cross-fade and an `interactionDone` flag that stops the CTA attention loop after first pointer/keyboard use. Auto-advance stays 7s but switches from `setInterval` to a reset-on-select `setTimeout` so manual navigation re-arms the clock (same pattern as Testimonials L37–41).

**Motion tokens reused:** `EASE` (L3), `stagger` (L20), `reducedFade` (L54), `viewport` (L4), plus the existing in-file entrance delays. New tokens go in `lib/motion.ts` only — one motion language, no second token file.

**A11y contract (must hold):**
- `<section aria-roledescription="carousel" aria-label="Property Security Services highlights" tabIndex={0}>` + ArrowLeft/ArrowRight pairing (Hero L40–46) — preserved verbatim.
- Dots `role="group" aria-label="Choose hero slide"` with per-dot `aria-label="Show slide N of M"` + `aria-current`, and prev / pause(with `aria-pressed`) / next buttons (L155–178) — preserved; any added progress bar is `aria-hidden` (timer status is already conveyed by the pause control).
- Pause-on-hover **and** pause-on-focus (L47–52) extended to the stats strip (it sits inside the same section, so focus capture covers it).
- Stats strip: real `<dl><dt/><dd/></dl>` semantics; phone entry is a `tel:` link with a full `aria-label` (pattern already used at Hero L142). No icon-only controls without labels.
- Visible focus rings: `:focus-visible` outline already global (globals.css L74–77).
- Contrast: text stays on the same overlay opacity stack (L96–97), so measured contrast is unchanged; verify with axe via `scripts/accessibility-check.mjs`.

**Reduced-motion fallback:** every new motion branch keys off the existing `reduceMotion` flag (pattern at L18): parallax layers render static, scroll-linked styles return identity, entrance choreography collapses to `reducedFade`-equivalent; Ken Burns already collapses to the static first image (L79–81). The global CSS kill-switch (globals.css L123–129) is the backstop.

**Scroll-link safety (LCP/CLS):** transforms bound only to the hero's own scroll range; at scrollY = 0 all values equal their static computed forms (identity) → zero CLS at rest; only `transform`/`opacity` animate (Rule 8). The LCP image keeps `priority` + `loading="eager"` + `sizes="100vw"` (L59–62).

**Budget targets (mobile, mid-range device, throttled 4G):**

| Metric | Budget | Risk |
|---|---|---|
| LCP | ≤ 2.5s (hero image stays priority/eager; ~37–43 KB optimized AVIF/WebP) | low |
| CLS | 0 in hero (fixed svh/max-h box L39; no layout-affecting new elements) | low |
| INP | ≤ 200ms (no long tasks; effects rAF-driven) | low |
| Hero client chunk | ≤ +4 KB gz vs today (no new deps, no lazy heavy features) | low |
| Network | exactly the same 2 optimized hero images per session | unchanged |

**Verification plan (commands from `package.json:6–12`):** `npm run typecheck` → `npm run lint` → `npm run build` → `node scripts/visual-check.mjs` → `node scripts/accessibility-check.mjs`; manual: keyboard-only hero pass (tab → dots/prev/pause/next, arrows), `prefers-reduced-motion: reduce` pass, visual pass at 375/768/1440px.

---

## 6. Optional stretch items (same pass, flagged — NOT committed)

For the implementation engineer to pick up **only** if the hero lands on budget and schedule. Each is small and reuses existing tokens.

1. **S1 — Introduction stat source:** `Introduction.tsx:3–8` hardcodes stats that duplicate `lib/site.ts`; single-sourcing is ~10 lines, **but the "24/7" label touches the P0-3 hours conflict — defer until the P0-3 decision, otherwise skip this pass.**
2. **S2 — Services hover cleanup:** Services L40 animates `whileHover y` while L42 transitions `border-color,box-shadow` — no double-animation today, but aligning durations to one token is 1-line polish; do only if S1 was skipped.
3. **S3 — Testimonials mobile min-height:** `min-h-[405px]` (Testimonials L74) prevents crossfade CLS on mobile; a smaller auto-min layout needs visual regression checks — medium risk, skip by default.
4. **S4 — Scroll progress hairline** under the sticky header (motion-template starter pattern): new global chrome; only with orchestrator approval.

Explicitly **not** in scope: new sections, case studies, FAQ (P1 items), quote-form work (P0-1), contact-data changes (P0-2).

---

## 7. Self-verification record (2026-11-09)

- All seven section files + `app/page.tsx`, `app/layout.tsx`, `Reveal.tsx`, `ButtonLink.tsx`, `MotionProvider.tsx`, `Header.tsx`, `TopBar.tsx`, `globals.css` (excerpt), `lib/site.ts`, `lib/motion.ts`, `package.json`: read this phase; every path cited above exists (UI components verified by glob: `VideoModal`, `SectionHeading`, `ActionButton`, `SocialLinks`, `ContentBlocks` all present in `components/ui/`).
- Hero line citations re-checked against the 192-line file: imports L3–4; slides L12–15; state L19–21; 7s interval L27–34; carousel a11y L40–52; LCP image L54–66 (`priority` L59, `eager` L60, `decoding="sync"` L61); AnimatePresence L68; crossfade L69–94 (0.8s L75); Ken Burns L77–92 (1.025→1.095, 10s, linear L79–81); gradients L96–97; grid L98; badge L102–110; h1 L111–118; tagline L119–126; CTAs L127–135 (quote L133, services L134); phone chip L136–149 (aria-label L142); controls L153–189 (dots L155–168, prev L170, pause/play L173–175, next L176, scroll-down L181–188, chevron loop L183).
- `domMax` + `strict` confirmed at `providers/MotionProvider.tsx:3,7` → `useScroll`/`useSpring` included; no feature upgrade needed.
- Header/TopBar height math for the hero `calc()` verified (Header L82 `h-[72px]/sm:h-[84px]`; TopBar L8 `min-h-10` 40px).
- Image sizes measured from disk (`Get-ChildItem public/images`).
- No TODOs; no source code modified in this phase.
