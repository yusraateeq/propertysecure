# Library Catalog

A professional template uses **6-10 packages**, not the whole ecosystem. This catalog
explains the role of each library, the default choice, and the trap to avoid. The
machine-readable version is [`data/libraries.json`](../data/libraries.json); the schema is
documented in [`data/README.md`](../data/README.md).

Status legend:

- **core** - default for the matching framework or goal
- **recommended** - strong default when the feature is in scope
- **optional** - add only for a named requirement
- **legacy** - migrate away; documented so existing code is not left unexplained

## Default stack

For a Next.js marketing or product template:

```text
Next.js + React + TypeScript + Tailwind CSS
Motion (motion/react)
Lucide React + clsx + tailwind-merge + class-variance-authority
Embla (only for carousels)
Sonner (only for toasts)
Playwright + Vitest + axe-playwright
```

Add only when the recipe needs them:

```text
GSAP + Lenis .......... cinematic scroll, pinning, scrubbing
Three.js + R3F + Drei . real 3D scene
NumberFlow ............ animated metrics/prices
React Hook Form + Zod . validated forms
Recharts .............. dashboard charts
```

## Frameworks and language

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `next` | React framework | SEO, SSR, CMS, routing | Keep client boundaries small. |
| `react` | Component runtime | Interactive templates | Check peer ranges for R3F/Motion. |
| `vue` | Vue runtime | Vue/Nuxt templates | Use Vue adapters, not React packages. |
| `svelte` | Svelte runtime | SvelteKit templates | Built-in motion stores first. |
| `astro` | Content-first framework | Editorial, docs, marketing | React packages need an island. |
| `vite` | SPA build tool | Dashboards, internal apps | No SSR by default. |
| `nuxt` | Vue framework | SSR Vue apps | Use motion-v and TresJS. |
| `@sveltejs/kit` | Svelte framework | SSR Svelte apps | Use svelte/motion and Threlte. |
| `typescript` | Type system | Every template | Strict mode; no `any` without reason. |

## Styling, UI, and theming

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `tailwindcss` | Utility CSS and tokens | Almost every template | v4 uses CSS-first config. |
| `clsx` | Conditional classes | Always | Pair with tailwind-merge. |
| `tailwind-merge` | Resolve class conflicts | Always | Customize for custom scales. |
| `class-variance-authority` | Typed variants | Buttons, badges, cards | Do not create a variant for every color. |
| `lucide-react` | Icons | React templates | Import individually. |
| `lucide-vue-next` | Icons | Vue templates | Import individually. |
| `lucide-svelte` | Icons | Svelte templates | Import individually. |
| `next-themes` | Light/dark switching | Next.js templates | Only light and dark. |

## Animation and text

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `motion` | React UI, layout, gesture, scroll | React templates | Import from `motion/react`; client-only. |
| `framer-motion` | Compatibility package | Existing code | Prefer `motion` for new work. |
| `gsap` | Timelines, ScrollTrigger, sequences | Pinned/scrubbed stories | One context per component; check license terms. |
| `@gsap/react` | `useGSAP` cleanup hook | React + GSAP | Register once. |
| `@react-spring/web` | Spring physics | Interruptible physical motion | Not a timeline tool. |
| `animejs` | Vanilla timeline/SVG | Non-React templates | Check v4 API. |
| `@formkit/auto-animate` | One-line list transitions | Simple insert/remove | Not for choreography. |
| `split-type` | Split text | Headline reveals | Revert on cleanup. |
| `react-wrap-balancer` | Balanced headings | Short React headings | Not body copy. |
| `@number-flow/react` | Animated numbers | Metrics, prices | Provide static fallback. |
| `@number-flow/vue` | Animated numbers | Vue metrics | Provide static fallback. |
| `@number-flow/svelte` | Animated numbers | Svelte metrics | Provide static fallback. |

## Scroll

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `lenis` | Smooth scrolling | Smooth scroll is part of the design | One scroll library only. |
| `@studio-freight/lenis` | Deprecated name | Migration only | Replace with `lenis`. |
| `locomotive-scroll` | Legacy smooth scroll | Existing code only | Prefer Lenis + GSAP. |

## 3D, physics, and effects

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `three` | WebGL renderer | Any real 3D | Dynamic import and dispose. |
| `@react-three/fiber` | React renderer | React 3D | Client-only. |
| `@react-three/drei` | Helpers | React 3D | Import only what you use. |
| `@react-three/postprocessing` | Effects | Bloom/DOF/noise | Desktop-first. |
| `postprocessing` | Effect composer | Peer of R3F effects | Measure GPU cost. |
| `@react-three/rapier` | 3D physics | Real interaction | Heavy; justify it. |
| `three-stdlib` | Three examples | Specific utilities | Avoid whole-bundle imports. |
| `@gltf-transform/core` | Asset optimization | Build pipeline | Build-time, not browser. |
| `draco3d` | Geometry compression | Large GLB | Decode cost on load. |
| `meshoptimizer` | Mesh optimization | Large GLB | Verify loader support. |
| `matter-js` | 2D physics | 2D play interactions | Not a 3D engine. |
| `@tsparticles/react` | Particle backgrounds | Ambient effect | Easy to overuse; cap count. |

## Carousels and feedback

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `embla-carousel-react` | Accessible carousel | React sliders | Preferred default. |
| `embla-carousel-vue` | Vue carousel | Vue sliders | Same primitives. |
| `embla-carousel-svelte` | Svelte carousel | Svelte sliders | Same primitives. |
| `swiper` | Feature-rich slider | You need Swiper effects | Bundle can grow. |
| `keen-slider` | Small slider | Simple touch slider | Fewer features than Swiper. |
| `sonner` | Toasts | React feedback | Polite announcements. |
| `vue-sonner` | Toasts | Vue feedback | Polite announcements. |
| `svelte-sonner` | Toasts | Svelte feedback | Polite announcements. |
| `vaul` | Drawer/bottom sheet | React mobile UI | Focus management required. |
| `cmdk` | Command menu | Docs/dashboard search | Keyboard and focus trap. |

## Data, forms, and charts

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `@tanstack/react-query` | Server state | App dashboards | Not for static marketing. |
| `zustand` | Client state | Small UI store | Do not duplicate server state. |
| `zod` | Schema validation | Forms and APIs | Validate at boundaries. |
| `react-hook-form` | Form state | React forms | Pair with Zod. |
| `@hookform/resolvers` | Schema resolvers | RHF + Zod | Only with a resolver. |
| `recharts` | React charts | Dashboards | Theme the chart tokens. |
| `@visx/shape` | Low-level charts | Custom visualization | Import only needed packages. |
| `d3` | Data utilities | Custom charts | Prefer submodules if large. |

## Media and authoring

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `sharp` | Image processing | Build pipeline | Generate AVIF/WebP. |
| `plaiceholder` | Blur placeholders | Image-heavy sites | Cache at build time. |
| `blurhash` | Compact placeholders | CMS images | Decode small strings. |
| `@rive-app/react-canvas` | Interactive vector | Character/product animation | Small `.riv`, reduced-motion fallback. |
| `lottie-react` | Lottie player | After Effects animation | Avoid large JSON. |
| `@theatre/core` | Keyframe authoring runtime | Designer timeline | Advanced; large. |
| `@theatre/studio` | Visual editor | Development only | Never ship. |
| `leva` | Debug controls | Development only | Strip from production. |

## Testing and performance

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `@playwright/test` | E2E and visual tests | Every production template | Test reduced motion and no-WebGL. |
| `vitest` | Unit/component tests | Logic and helpers | Use jsdom/happy-dom. |
| `@axe-core/playwright` | Automated a11y | CI checks | Not a replacement for manual testing. |
| `@next/bundle-analyzer` | Bundle analysis | Next.js | Run before/after adding motion/3D. |

## Framework adapters

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `motion-v` | Motion for Vue | Vue/Nuxt UI motion | Use instead of React Motion. |
| `@vueuse/motion` | Vue composable motion | Simple enter/leave | Complements motion-v. |
| `@tresjs/core` | Vue Three.js renderer | Vue 3D | Client-only. |
| `@tresjs/nuxt` | Nuxt TresJS module | Nuxt 3D | Auto-imports. |
| `@threlte/core` | Svelte Three.js renderer | Svelte 3D | Client-only. |
| `@astrojs/react` | React islands in Astro | Motion/R3F in Astro | Required for React packages. |

## Multi-page transitions

| Package | Role | Use when | Caveat |
| --- | --- | --- | --- |
| `@barba/core` | Page transitions | Server-rendered multi-page sites | Re-init scripts and ScrollTrigger. |
| `swup` | Page transitions/fragments | Static sites | Test re-initialization. |

## Selection rules

1. **Prefer the platform.** CSS transitions, `svelte/motion`, Astro view transitions, and
   the browser's scroll behavior are free.
2. **Prefer the framework default.** Motion for React UI, GSAP for scroll timelines,
   R3F for React 3D, TresJS/Threlte for Vue/Svelte.
3. **One library per job.** One carousel, one toast, one chart, one scroll library.
4. **One owner per property.** Do not animate the same element with Motion and GSAP.
5. **Add only for a named requirement.** "It might be useful" is not a requirement.
6. **Check the bundle.** A library that adds 80 KB for one hover is not a default.
7. **Check the license.** GSAP has its own no-charge license; other packages vary.
8. **Check peer dependencies.** R3F, Drei, and Three versions move together.
9. **Remove dev tools.** Theatre Studio and Leva do not ship.
10. **Document the exception.** If you add a non-default library, record why in the task
    brief and final report.

## Common bad stacks

| Bad stack | Problem | Replace with |
| --- | --- | --- |
| Motion + GSAP + Anime.js + React Spring | Four animation systems | Motion for UI; GSAP only for scroll timeline. |
| Lenis + Locomotive + CSS smooth scroll | Three scroll owners | Lenis only, or native scroll. |
| Swiper + Embla + Keen | Three carousels | One carousel, usually Embla. |
| Three.js + R3F in the same scene | Two renderers | Choose one. |
| Recharts + Visx + D3 for one chart | Three chart stacks | Recharts or one Visx primitive. |
| Theatre Studio + Leva in production | Debug bundles | Dev-only dynamic import. |
| Framer Motion + Motion in one app | Duplicate context | One package and import path. |

## Version policy

Versions are intentionally omitted. Pin compatible versions in the project lockfile and
check peer ranges when adding R3F, Drei, Three, Motion, or GSAP. The catalog was verified
against npm on **2026-11-09**; re-check before a major upgrade.
