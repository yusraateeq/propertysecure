# Stack Decision Matrix

Choose in this order: **content → motion purpose → interaction → library**. Starting from a
library is how templates become demos instead of products.

## 1. Framework decision

| Target | Choose when | Avoid when | Client boundary |
| --- | --- | --- | --- |
| Next.js App Router | SEO, SSR, CMS, marketing plus app routes | A tiny static page with no routing | Smallest component that uses Motion, `window`, or WebGL |
| Vite React | Internal tools, dashboards, SPA, no SEO requirement | Public content that needs SSR or fast first paint | Route root or component |
| Astro | Editorial, docs, marketing sites, mostly static | Highly interactive app screens | React island only for interactive widgets |
| Nuxt | Vue team, SSR content, app routes | The team is React-only | Component or plugin |
| SvelteKit | Svelte team, SSR content, small runtime | The team cannot maintain Svelte | Component or `onMount` |

If the prompt does not name a framework, default to Next.js for marketing and Astro for
content-heavy sites. Confirm before adding a framework to an existing project.

## 2. Animation library decision

| Need | Use | Do not use |
| --- | --- | --- |
| Hover, focus, simple state | CSS transitions | A motion library |
| Simple JS-triggered state | Web Animations API or CSS | GSAP for one fade |
| React enter/exit, presence, layout, gestures | Motion (`motion/react`) | GSAP for React state transitions |
| Complex timeline, pin, scrub, sequence | GSAP + ScrollTrigger | Motion for a 5-step pinned story |
| Spring physics, interruptible drag | React Spring or Motion springs | GSAP for physics |
| Vanilla timeline | GSAP or Anime.js | React-only packages |
| List reorder | Motion `layout` / `Reorder`, AutoAnimate | A custom FLIP implementation |
| SVG line drawing | GSAP DrawSVG or CSS `stroke-dashoffset` | Three.js |
| Text splitting | SplitType + GSAP/Motion | Manual per-character spans without cleanup |

### Motion vs GSAP

Use Motion when the animation is tied to React state, presence, layout, or gestures.
Use GSAP when the animation is a timeline that must be scrubbed, pinned, or coordinated
across many elements. They can coexist, but each element has one owner.

### Motion package names

- New projects: `npm i motion`, import from `motion/react`.
- Existing projects: `framer-motion` still works. Do not install both unless you are
  migrating; use one import path consistently.
- `LazyMotion` + `m` reduces the initial Motion bundle. Use it when the full API is not
  needed.

## 3. Scroll decision

| Need | Owner | Notes |
| --- | --- | --- |
| Native scroll | Browser | Default. Best accessibility and performance. |
| One progress bar or parallax layer | Motion `useScroll` | Keep the target local to the section. |
| Reveal on enter | CSS, Motion `whileInView`, or GSAP batch | Prefer `once: true`. |
| Pinned story | GSAP ScrollTrigger | One pinned section per page. |
| Horizontal gallery | GSAP ScrollTrigger | Provide a vertical fallback on mobile. |
| Smooth scroll as design | Lenis | Integrate with GSAP ticker; never with CSS smooth scroll. |
| Scroll-driven CSS animation | CSS `animation-timeline` | Check browser support; provide a static fallback. |

### Scroll ownership rules

1. The browser owns scroll unless the design explicitly needs smoothing.
2. Lenis is the only smooth-scroll library in the project.
3. GSAP ScrollTrigger drives the timeline; Lenis only updates scroll position.
4. Motion `useScroll` is not combined with GSAP on the same element.
5. Never set `scroll-behavior: smooth` globally when Lenis is active.
6. Test keyboard scrolling, anchor links, browser find, and the scrollbar.

## 4. 3D decision

| Need | Use | Notes |
| --- | --- | --- |
| A subtle tilt or card depth | CSS 3D | Cheapest; no WebGL. |
| A product model, camera move, shader, particles | Three.js | Dynamic import and dispose. |
| React scene with helpers | R3F + Drei | Client-only. |
| Vue scene | TresJS | Vue equivalent of R3F. |
| Svelte scene | Threlte | Svelte equivalent of R3F. |
| Physics interaction | Rapier (3D) or Matter.js (2D) | Only when the interaction needs it. |
| Postprocessing | `@react-three/postprocessing` | Desktop-first; define a mobile tier. |
| Static image or video is enough | Do not use 3D | Restraint is a quality signal. |

### 3D gate

Answer all five before adding a canvas:

1. What does the 3D explain that a still image cannot?
2. What is the poster/fallback?
3. What is the triangle, draw-call, texture, and DPR budget?
4. How does it pause offscreen and for reduced motion?
5. What happens with no WebGL or a slow device?

If any answer is missing, ship the static version.

## 5. Goal default stacks

| Goal | Core | Optional | Avoid by default |
| --- | --- | --- | --- |
| SaaS marketing | Next, React, Motion, Tailwind, Lucide | R3F/Drei, GSAP/Lenis, SplitType | Heavy carousel, particles |
| Agency portfolio | Next, Motion, GSAP, Lenis, SplitType | R3F, Embla | Multiple scroll libraries |
| Property showcase | Next, Motion, Embla, NumberFlow | Lenis, R3F, GSAP | A 3D scene with no property value |
| Ecommerce | Next, Motion, Embla, Zod | NumberFlow, Sonner, Vaul | Cinematic scroll on checkout |
| Editorial | Astro/Next, SplitType, GSAP | Lenis, no 3D | 3D hero, scroll hijacking |
| Dashboard | Next/Vite, Motion, Recharts, Query | NumberFlow, cmdk | Pinned scenes, 3D hero |
| Event | Next, Motion, Embla | R3F, GSAP/Lenis, NumberFlow | Long unskippable intro |
| Waitlist | Next, Motion, RHF, Zod | R3F gradient, Sonner | Complex navigation |
| Docs | Astro/Next, minimal Motion | cmdk, SplitType | 3D, smooth-scroll hijacking |
| Hospitality | Next, Motion, Embla | Lenis, GSAP, NumberFlow | Autoplay video with sound |
| Marketplace | Next, Motion, Embla, filters | Query, NumberFlow, Sonner | 3D on every card |

## 6. Install examples

Next.js React stack:

```bash
npm i motion lucide-react clsx tailwind-merge class-variance-authority
npm i gsap lenis @gsap/react
npm i three @react-three/fiber @react-three/drei
npm i embla-carousel-react sonner @number-flow/react
npm i zod react-hook-form @hookform/resolvers
npm i -D @playwright/test vitest @axe-core/playwright @next/bundle-analyzer
```

Astro content stack:

```bash
npm i gsap lenis split-type
npm i three
npm i -D @playwright/test vitest @axe-core/playwright
```

Nuxt stack:

```bash
npm i motion-v @vueuse/motion gsap lenis
npm i three @tresjs/core @tresjs/nuxt
npm i embla-carousel-vue vue-sonner @number-flow/vue
```

SvelteKit stack:

```bash
npm i gsap lenis
npm i three @threlte/core
npm i embla-carousel-svelte svelte-sonner @number-flow/svelte
```

These are starting points. Remove what the recipe does not need and pin compatible
versions in `package.json`.

## 7. Anti-patterns

- Installing Motion, GSAP, Anime.js, and React Spring for one landing page.
- Using Lenis and CSS `scroll-behavior: smooth` together.
- Two components animating the same scroll progress.
- A 3D canvas with no poster, no pause, and no fallback.
- Shipping `@theatre/studio` or `leva` in production.
- Using Swiper's heavy effects when a CSS scroll-snap list is enough.
- Putting `"use client"` on the whole page when one button needs a gesture.
- Animating `height`, `width`, `top`, or `left` in a loop.
- Adding a scroll library before the static page is readable.
- Choosing 3D before writing the content and conversion path.

## 8. Selector output

The selector returns:

- `core` - start here
- `optional` - add only for a named requirement
- `avoid` - project-specific traps
- `recipes` - matching blueprints
- `notes` - integration constraints

Run it with `--json` when passing the result to another agent or saving it in a task brief.
