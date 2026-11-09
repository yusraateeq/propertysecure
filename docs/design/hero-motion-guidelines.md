# Hero Motion Guidelines — homepage revamp (hero section only)

**Recipe:** **MT-01 — "Cinematic SaaS landing"** (`.opencode/skills/motion-template/references/recipes.md:7-34`)
**Stack selector:** `node .opencode/skills/motion-template/scripts/select-stack.mjs --framework nextjs --goal marketing --3d no --scroll cinematic` → recommended core: Next.js, React, Motion, Tailwind, TypeScript, Lucide (+ GSAP/Lenis for cinematic scroll — **declined, see deviation**) · recipes offered: MT-01, MT-09
**Scroll owner:** exactly one — the `Hero` section, via Framer Motion `useScroll({ target: heroRef, offset: ["start start", "end start"] })`. Page never gets a second scroll owner; `html { scroll-behavior: smooth }` stays as-is (app/globals.css:23) and no Lenis is added.
**3D contract:** none used. MT-01 marks R3F/GSAP/Lenis *optional*; per task constraint no new deps, so no canvas → poster / no-WebGL fallbacks are **N/A** by construction (no WebGL anywhere on the page). The MT-01 3D budget line (3D chunk ≤400KB) is satisfied at 0.
**Budgets (from `docs/architecture/homepage-revamp-plan.md`; MT-01 quotes LCP<2.5s / INP<200ms, initial JS ≤180KB gz):**

| Metric | Budget | Hero implication |
| --- | --- | --- |
| LCP | ≤ 2.5s | hero photo stays `priority`/`eager`/`decoding=sync` (Hero.tsx:59-61); all new layers = CSS gradients/text, zero new image requests |
| CLS | 0 | hero keeps fixed `h-[calc(100svh-…)]` with min/max (`Hero.tsx:39`); stats strip + live region live *inside* that box |
| INP | ≤200ms | handlers unchanged: click/keyboard toggles only; scroll work = Motion-transform only (compositor thread) |
| hero chunk | ≤ +4KB gz | no new deps; additions = 1 stats-strip component + tokens + ~40 lines of motion props ≈ +2–3KB gz; verify in `next build` output against pre-revamp baseline |

---

## 1. Motion tokens (reuse, never redefine)

- `EASE = [0.22, 1, 0.36, 1]` — from `lib/motion.ts:3` (identical to Tailwind `ease-premium`, `tailwind.config.ts:36-38`). Every entrance/exit uses it.
- Existing variants `fadeUp/fadeIn/scaleIn/stagger` (`lib/motion.ts`) remain the vocabulary; hero adds only inline `transition` props (current headline pattern, `Hero.tsx:104-141`).
- One animation owner per element: Motion owns photo crossfade/Ken Burns, entrance, blobs, parallax; no GSAP anywhere (declined).

## 2. Entrance choreography (staggered micro-delays)

MT-01 beat: "hero copy: 3-step stagger, 500–700ms total". The current sequence finishes in about 0.72 seconds from the first beat through the stats strip:

| Element | delay | duration | transform |
| --- | --- | --- | --- |
| License chip | 0.02s | 0.34 | y 12→0 |
| H1 | 0.08s | 0.46 | y 22→0 |
| Support line | 0.14s | 0.42 | y 16→0 |
| CTA row | 0.20s | 0.42 | y 16→0 |
| Phone pill | 0.28s | 0.4 | y 12→0 |
| **Stats strip** | **0.32s** | 0.4 | y 12→0, opacity |
| **Kinetic blobs** | 0.0s | 1.2 | opacity 0→1 only (fade behind copy, no y) |

**Pre-JS readability (MT-01 acceptance: "hero readable before JS"):** Next.js SSR renders Framer Motion `initial={{opacity:0}}` inline, so today's hero copy is hidden until hydration. Upgrade for the copy column: server-render visible; run the stagger as a **post-hydration restitution animation** (brief y-offset applied on mount, animate to 0, skip entirely under `useReducedMotion()`). If JS never loads, hero copy is simply visible. Photo/LCP layer untouched by entrance.

## 3. Parallax (scroll-linked handoff)

- Photo+grid stack wrapper: `useTransform(scrollYProgress, [0, 1], [0, 40])` → `translateY` (LB-0063 motion set: `parallax, scroll-scene`). Image is oversized `-inset-[3%]` (already ~3% bleed, `Hero.tsx:54`), so a 40px shift at full scroll-out never reveals edges.
- Copy column: `useTransform(scrollYProgress, [0, 1], [0, -24])` + opacity 1→0.85 — gentle handoff into the Introduction section, no crossfade takeover (scroll owner stays hero-only).
- Stats strip: no parallax (reads as chrome, prevents float-over-controls collisions).
- All transforms are Motion `m` components (existing `m` import), fully `useReducedMotion`-gated (see §5).

## 4. Hover & idle microinteractions

- Kinetic blobs: "single slow float" (MT-01 motion beat) — `y: [-6, 6, -6]`, 18s, `easeInOut`, `repeat: Infinity`, transform only; `whileInView`-gated to stop offscreen (no IntersectionObserver handroll — Motion's own API; if a v12 API mismatch appears, implementer falls back to a `useInView` boolean).
- Photo Ken Burns + crossfade 0.8s (kept, `Hero.tsx:75-81`).
- CTAs: kept `whileHover y:-2 / whileTap scale0.98` (`ButtonLink.tsx:43-47`); arrow `translate-x-1` on hover (kept).
- Phone pill hover: existing `hover:border-gold/60` (kept).
- Slide dots: 300–500ms width/color transitions (kept).

## 5. Reduced-motion fallback (binding spec)

Global kill-switch already exists (`app/globals.css:123-136`: all CSS animation/transition ≈0 under `prefers-reduced-motion: reduce`). JS behavior under `useReducedMotion() === true`:

| Motion | Behavior |
| --- | --- |
| Entrance stagger | skipped — everything renders at final position/opacity |
| Parallax links (`useTransform`) | not created; wrappers at transform 0 |
| Blob float | not started; static gradient |
| Ken Burns | scale pinned 1 (existing `Hero.tsx:79-81`) |
| Autoplay slideshow | disabled (existing `Hero.tsx:28-34`); manual dots/arrows/keyboard still work |
| Crossfade | duration 0 (existing) |
| Scroll cue bounce | static (existing `Hero.tsx:183`) |
| Carousel a11y | unchanged: roles/labels/keyboard/pause fully available (spec §7) |

**Offscreen pause:** autoplay timer is a plain interval (cheap) and stays; blob float is the only continuous JS animation → gate it with Motion `whileInView` (viewport `once: false`), so nothing animates while the hero is scrolled away.

## 6. Checks against MT-01 acceptance

- hero readable before JS — §2 upgrade restores it ✅
- CTA works without motion ✅ (anchors + tel:)
- mobile loads the poster first — photo is the first, only, `eager` media ✅
- budgets — table above; verify hero chunk delta ≤ +4KB gz via build ✅
- no scene without poster/reduced-motion/no-WebGL — **N/A**: no WebGL scene; poster equivalent = the static photo slide itself (already the LCP element); reduced-motion fallback fully specified ✅
