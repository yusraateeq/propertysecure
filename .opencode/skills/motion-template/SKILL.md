---
name: Professional Motion Templates
description: Production playbook for building professional web templates with Framer Motion (Motion), GSAP, Three.js, React Three Fiber, Drei, Lenis, and supporting libraries. Use for cinematic landing pages, 3D product scenes, scroll storytelling, page transitions, microinteractions, and template architecture with performance, accessibility, and launch checks.
---

# Professional Motion Templates

This skill is the **implementation companion** to `uiux-special`.

- `uiux-special` chooses the design: fonts, layout blueprint, light/dark theme, motion
  direction, and scene concept.
- `motion-template` turns that decision into a production template: stack selection,
  component architecture, motion tokens, scroll ownership, 3D scene contract, fallbacks,
  performance budgets, and verification.

Do not use this skill to invent a new palette or layout. If a design decision is missing,
go back to `uiux-special` and record it in the Design Decision Record first.

## What is inside

| Asset | File | Use |
| --- | --- | --- |
| Stack decision matrix | `references/stack-matrix.md` | Pick the right framework, animation, scroll, and 3D tools. |
| Framer Motion / Motion guide | `references/framer-motion.md` | React motion patterns, lifecycle, reduced motion, performance. |
| Three.js and R3F guide | `references/threejs-r3f.md` | Scenes, loaders, camera, postprocessing, disposal, fallbacks. |
| GSAP and Lenis guide | `references/gsap-lenis.md` | Timelines, ScrollTrigger, smooth scroll, cleanup. |
| Template architecture | `references/template-architecture.md` | Folders, providers, content model, assets, SEO, testing. |
| Library catalog | `references/library-catalog.md` | What each library is for and when to avoid it. |
| 12 template recipes | `references/recipes.md` | End-to-end blueprints by page type. |
| Performance and accessibility | `references/performance-a11y.md` | Budgets, measurement, fallbacks, manual test matrix. |
| Launch checklist | `references/checklist.md` | Definition of done. |
| Library data | `data/libraries.json` | 80+ curated packages with status and caveats. |
| Stack selector | `scripts/select-stack.mjs` | Prompt-driven core/optional/avoid output. |
| Skill checker | `scripts/check-skill.mjs` | Frontmatter, links, fences, catalog, and recipe validation. |

## Non-negotiables

1. **Static-first.** Content, navigation, and conversion actions work without JavaScript,
   WebGL, or motion.
2. **One animation owner per element.** Motion for React UI state; GSAP for scroll
   timelines; CSS for simple hover and focus. Never animate the same property twice.
3. **One scroll owner.** Native scroll, Motion `useScroll`, or GSAP ScrollTrigger. Lenis is
   a transport layer, not a second scroll system.
4. **No scroll hijacking.** Keyboard, trackpad, scrollbar, anchor links, and browser find
   must keep working.
5. **3D must earn its place.** It explains the product or creates a specific feeling. It is
   never a background because the page felt empty.
6. **Every 3D scene has a poster, a no-WebGL fallback, and a reduced-motion fallback.**
7. **Every animation has a `prefers-reduced-motion` path.** Motion is optional; content is not.
8. **Animate transform and opacity** unless a measured layout animation is the only correct
   option.
9. **No essential information only inside a canvas, video, or hover state.**
10. **Client boundaries are explicit.** Next.js server components do not import Motion,
    `window`, or WebGL.
11. **Budget before adding.** A professional template uses a small core set, not the whole
    catalog.
12. **Verify with evidence.** Build, typecheck, lint, tests, Lighthouse, keyboard,
    reduced motion, no-WebGL, and a mid-range mobile device.

## Workflow

### Step 0 - Read the brief and the Design Decision Record

Extract in writing:

- audience, industry, and conversion goal
- page types and sections in scope
- chosen font, layout, theme, and motion direction from `uiux-special`
- whether 3D is justified, and which scene concept was chosen
- content source (static, CMS, API)
- performance and accessibility constraints
- target browsers and devices

If the brief does not answer these, ask or return to the design phase. Do not guess.

### Step 1 - Choose a template recipe

Open `references/recipes.md` and pick the closest blueprint:

- `MT-01` cinematic SaaS landing
- `MT-02` agency portfolio
- `MT-03` property showcase
- `MT-04` product launch
- `MT-05` ecommerce product page
- `MT-06` editorial story
- `MT-07` dashboard app
- `MT-08` conference / event
- `MT-09` waitlist / coming soon
- `MT-10` developer docs landing
- `MT-11` hospitality / restaurant
- `MT-12` listing / marketplace

Record the recipe ID, then adapt it to the chosen design. Do not copy a recipe that fights
the design decision.

### Step 2 - Select the stack

Run the selector:

```bash
node .opencode/skills/motion-template/scripts/select-stack.mjs \
  --framework nextjs \
  --goal marketing \
  --3d yes \
  --scroll cinematic
```

Useful combinations:

```bash
node .opencode/skills/motion-template/scripts/select-stack.mjs --framework astro --goal editorial --scroll cinematic
node .opencode/skills/motion-template/scripts/select-stack.mjs --framework nextjs --goal dashboard --charts yes
node .opencode/skills/motion-template/scripts/select-stack.mjs --framework nuxt --goal property --3d yes --json
```

Treat the output as a starting point, not a mandate. Add a library only when the recipe or
a measured requirement needs it.

### Step 3 - Define motion tokens and scroll ownership

Create one shared token file (CSS variables plus a TypeScript object). Align it with the
motion direction from `uiux-special`; do not create a second motion language.

| Token | Duration | Easing | Use |
| --- | --- | --- | --- |
| `instant` | 80-120ms | linear | press, toggle, checkbox |
| `fast` | 150-200ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` | hover, focus, tooltip |
| `base` | 240-320ms | `cubic-bezier(0.22, 1, 0.36, 1)` | enter/exit, panel |
| `slow` | 400-600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | hero reveal, page transition |
| `scene` | 800-1600ms | custom | scroll-driven storytelling |

Scroll ownership rules:

| Need | Owner |
| --- | --- |
| Simple reveal on enter | Motion `whileInView`, CSS, or GSAP `ScrollTrigger.batch` |
| One scroll-linked progress bar or parallax element | Motion `useScroll` |
| Pinned story, horizontal gallery, scrubbed camera, multi-step timeline | GSAP ScrollTrigger |
| Smooth scrolling as part of the design | Lenis, integrated with the GSAP ticker |

Do not use Lenis with CSS `scroll-behavior: smooth`. Do not run Motion `useScroll` and
GSAP on the same element.

### Step 4 - Build the static version first

Before adding motion:

- semantic HTML and heading order
- responsive layout at mobile, tablet, and desktop
- real content and real images
- keyboard path and visible focus
- light and dark tokens applied
- all CTAs and forms functional
- no layout shift from fonts or media

This is the version that reduced-motion users, crawlers, and slow devices will experience.

### Step 5 - Add UI motion

Use Motion for React state, gestures, layout, and presence. Use CSS for simple hover and
focus. Use GSAP only when a timeline or ScrollTrigger is actually needed.

Rules:

- entrance motion under 600ms unless it is a deliberate scene
- stagger 40-80ms; group more than eight items
- never block input while an entrance plays
- `viewport={{ once: true }}` for reveal animations
- prefer `transform` and `opacity`
- clean up timelines, observers, and event listeners

### Step 6 - Add the 3D scene

Use `references/threejs-r3f.md`. A scene ships with:

- a purpose statement and a reference image or poster
- a client-only, lazy-loaded canvas
- a static poster shown before load and in fallback
- DPR cap, triangle budget, draw-call budget, texture budget
- offscreen pause and `visibilitychange` pause
- reduced-motion static state
- a no-WebGL message or poster
- disposal of geometries, materials, textures, and renderer
- no essential content inside the canvas

### Step 7 - Optimize and verify

Run the narrowest checks that prove the template works:

```bash
npm run typecheck
npm run lint
npm run build
npm test
npx playwright test
node .opencode/skills/motion-template/scripts/check-skill.mjs
```

Then verify manually:

- `prefers-reduced-motion: reduce` changes the experience, not just the CSS
- keyboard-only navigation and visible focus
- no-WebGL and blocked-WebGL states
- mid-range Android, not only a desktop GPU
- Lighthouse mobile and desktop
- light and dark themes
- slow 4G: content appears before the 3D chunk

### Step 8 - Hand off

Report:

- recipe ID and selected stack
- motion tokens and scroll owner
- scene contract and fallback
- files changed
- commands run and results
- measurements before/after
- unverified items and known risks

## Stack decision quick table

| Target | UI motion | Scroll | 3D | Notes |
| --- | --- | --- | --- | --- |
| Next.js App Router | Motion (`motion/react`) | Motion `useScroll` or GSAP + Lenis | R3F + Drei | Smallest possible client boundaries. |
| Vite React SPA | Motion | GSAP + Lenis if cinematic | R3F + Drei | No SSR; still optimize initial bundle. |
| Astro | GSAP, CSS, or View Transitions | GSAP + Lenis | Vanilla Three.js or React island | React packages require `@astrojs/react`. |
| Nuxt | motion-v / VueUse Motion | GSAP + Lenis | TresJS | Do not mix React packages. |
| SvelteKit | `svelte/motion` | GSAP + Lenis | Threlte | Avoid a library for what the framework ships. |

Full decision matrix: `references/stack-matrix.md`.

## Template architecture

```text
src/
  app/ or pages/              route entry points
  components/
    layout/                   header, footer, shell
    sections/                 hero, features, gallery, pricing, cta
    motion/                   reveal, stagger, page transition, providers
    three/                    canvas, scenes, models, shaders, fallbacks
    ui/                       button, card, input, dialog, badge
  content/                    typed site copy and section order
  lib/
    motion/tokens.ts          durations, easing, distances, stagger
    motion/useReducedMotion.ts
    three/useScene.ts         quality tiers, DPR, pause, capability checks
    gsap/register.ts          one-time plugin registration
    utils/cn.ts               clsx + tailwind-merge
  public/
    models/                   compressed GLB
    textures/                 compressed textures
    posters/                  static fallback images
    fonts/                    self-hosted or next/font output
```

Next.js App Router:

```text
app/layout.tsx                providers and metadata
app/page.tsx                  server component
app/(marketing)/page.tsx      route group
app/template.tsx              enter transition for route changes
components/**/                mostly server, client only where needed
```

Full architecture, content model, SEO, and testing: `references/template-architecture.md`.

## Motion token starter

```ts
// lib/motion/tokens.ts
export const motion = {
  duration: {
    instant: 0.1,
    fast: 0.18,
    base: 0.28,
    slow: 0.52,
    scene: 1.2
  },
  ease: {
    out: [0.22, 1, 0.36, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const
  },
  distance: { sm: 8, md: 16, lg: 32 },
  stagger: 0.06
} as const;
```

```css
:root {
  --motion-instant: 100ms;
  --motion-fast: 180ms;
  --motion-base: 280ms;
  --motion-slow: 520ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

## Starter code

### Motion provider

```tsx
"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
```

`strict` requires `m.*` components instead of `motion.*`. If the team prefers the full
`motion` API, remove `strict` and keep `MotionConfig`.

### Reduced-motion-aware reveal

```tsx
"use client";

import { m, useReducedMotion } from "motion/react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
```

### Scroll progress

```tsx
"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3
  });

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
```

### Lenis with GSAP ScrollTrigger

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false });
    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

### R3F canvas with a poster

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ContactShadows, Environment } from "@react-three/drei";
import { ProductModel } from "./ProductModel";

export function ProductScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <Suspense fallback={null}>
        <ProductModel />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.35} blur={2.5} />
      </Suspense>
    </Canvas>
  );
}
```

Wrap it with a capability gate, lazy import, and error boundary:

```tsx
const ProductScene = dynamic(
  () => import("@/components/three/ProductScene").then((mod) => mod.ProductScene),
  { ssr: false, loading: () => <ScenePoster /> }
);
```

Never render `<Canvas>` directly in a server component, and never ship it without
`ScenePoster`, reduced-motion handling, and offscreen pause.

## Library policy

- Start with 6-10 packages. Add only for a named requirement.
- Use the framework's built-in motion first (CSS, Svelte stores, View Transitions).
- Use `motion` for new React work; keep `framer-motion` only for existing code.
- Use GSAP only when a timeline, pin, scrub, or complex sequence is required.
- Use Lenis only when smooth scroll is part of the design.
- Use R3F/Drei for React 3D; use vanilla Three.js for Astro/static; use TresJS for Vue and
  Threlte for Svelte.
- Prefer Embla over Swiper unless you need Swiper-specific effects.
- Use one carousel library, one toast library, one chart library.
- Never ship Theatre.js Studio or Leva to production.
- Check peer dependencies and licenses before adding a package.

Full catalog: `references/library-catalog.md`. Machine-readable data:
`data/libraries.json`.

## Recipe selection

| Prompt | Recipe | Default stack |
| --- | --- | --- |
| Premium SaaS launch | `MT-01` | Next + Motion + R3F + optional GSAP/Lenis |
| Creative agency portfolio | `MT-02` | Next + GSAP + Lenis + R3F + SplitType |
| Property management showcase | `MT-03` | Next + Motion + Lenis + optional R3F + Embla |
| Product launch / waitlist | `MT-04`, `MT-09` | Next + Motion + R3F + RHF/Zod |
| Ecommerce product page | `MT-05` | Next + Motion + Embla + NumberFlow |
| Editorial story | `MT-06` | Astro/Next + GSAP + SplitType, no 3D |
| Dashboard | `MT-07` | Next/Vite + Motion + Recharts + TanStack Query |
| Conference / event | `MT-08` | Next + Motion + R3F + Embla |
| Developer docs | `MT-10` | Astro/Next + minimal motion + cmdk |
| Hospitality / restaurant | `MT-11` | Next + Motion + GSAP/Lenis + Embla |
| Listing / marketplace | `MT-12` | Next + Motion + Embla + filters |

Full blueprints: `references/recipes.md`.

## Verification checklist

- [ ] The static version works without JavaScript, WebGL, or animation.
- [ ] `prefers-reduced-motion: reduce` removes non-essential motion and freezes scenes.
- [ ] Keyboard path, focus visibility, and focus order are correct.
- [ ] No scroll hijacking; anchor links, PageDown, Space, and scrollbar work.
- [ ] Canvas has a poster, text alternative, pause control, and no-WebGL fallback.
- [ ] 3D pauses offscreen and when the tab is hidden.
- [ ] No memory leak after route change or component unmount.
- [ ] Light and dark themes both pass contrast.
- [ ] LCP, INP, and CLS are measured on mobile.
- [ ] Initial JS and 3D chunk are within budget.
- [ ] Playwright covers reduced motion and no-WebGL.
- [ ] No studio/debug libraries in the production bundle.
- [ ] Report includes recipe ID, stack, measurements, and unverified items.

Full checklist: `references/checklist.md`.

## Reference files

- `references/stack-matrix.md` - framework, animation, scroll, and 3D decisions.
- `references/framer-motion.md` - Motion patterns, App Router, reduced motion, performance.
- `references/threejs-r3f.md` - R3F, Drei, shaders, loaders, scene recipes, disposal.
- `references/gsap-lenis.md` - timelines, ScrollTrigger, Lenis, React cleanup.
- `references/template-architecture.md` - folders, providers, content, assets, SEO, testing.
- `references/library-catalog.md` - 80+ libraries with roles and caveats.
- `references/recipes.md` - 12 end-to-end template blueprints.
- `references/performance-a11y.md` - budgets, measurement, fallbacks, manual matrix.
- `references/checklist.md` - launch definition of done.
- `data/README.md` - catalog schema and update protocol.

## Handoff contract

When this skill is used by `design/motion-designer`, `engineering/frontend-engineer`, or
`engineering/performance-engineer`, the final message must include:

1. recipe ID and the design IDs it implements
2. stack chosen and why
3. motion tokens and scroll owner
4. 3D scene contract, if any
5. performance budgets and measured results
6. accessibility and fallback verification
7. files changed and commands run
8. unverified items and open risks
