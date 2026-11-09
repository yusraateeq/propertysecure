# Performance and Accessibility

Motion and 3D are optional enhancements. The page must be fast and usable before they load,
and it must remain usable when they fail.

## Budgets

Defaults for a marketing template. Adjust with evidence, not optimism.

| Metric | Budget | Measure |
| --- | --- | --- |
| LCP | < 2.5s | Lighthouse mobile, field data if available |
| INP | < 200ms | Real interaction, not only lab |
| CLS | < 0.1 | Fonts, images, canvas, dynamic imports |
| Initial JS | <= 180KB gzip for marketing | Build output / bundle analyzer |
| 3D chunk | <= 400KB gzip | Bundle analyzer |
| App JS | <= 500KB gzip | Dashboard routes can be larger |
| Triangles | <= 100k hero, <= 250k total | Scene stats |
| Draw calls | <= 50 | Renderer info |
| Textures | <= 2048 hero, <= 1024 secondary | Asset audit |
| DPR | <= 2 desktop, <= 1.5 mobile | Renderer config |
| Canvas count | 1 per page | Code search |
| Render loops | 1 | Code review |
| GLB | <= 2-5MB compressed | Network tab |
| Fonts | <= 2 families + 1 mono | Design system |

These are guardrails, not universal law. A dense dashboard has a different budget from a
campaign page. Write the project budget in the task brief before implementation.

## Measurement

```bash
npm run build
npx lighthouse http://localhost:3000 --preset=desktop --view
npx lighthouse http://localhost:3000 --preset=mobile --view
npm run analyze
```

Add an `analyze` script that enables `@next/bundle-analyzer` in `next.config` for Next.js.
For other frameworks, use the build output or a bundle visualizer. The bundle analyzer does
not need to run on every build.

For a Vite app, use the build output and a bundle visualizer. For all apps, test with:

- production build, not dev server
- throttled CPU 4x and Slow 4G
- mid-range Android
- reduced motion
- no-WebGL
- light and dark themes

Record before/after numbers in `docs/engineering/performance.md` when the project exists.

## Core Web Vitals causes

### LCP

- hero image too large or not prioritized
- hero text hidden until a client animation runs
- render-blocking font or CSS
- 3D chunk in the critical path
- video poster missing
- server response slow or HTML streamed late

Fix: server-render the hero, optimize the image, preload the LCP asset, keep 3D out of the
first paint.

### INP

- long JavaScript tasks on interaction
- heavy scroll handlers
- expensive chart re-render
- large list without virtualization
- GSAP timeline rebuilding on every scroll
- React state updated on every frame

Fix: measure the interaction, break long tasks, use motion values instead of state, defer
non-critical work, virtualize large lists.

### CLS

- font swap without fallback metrics
- image without dimensions
- canvas with no reserved height
- late banner or cookie bar
- dynamic content inserted above the fold

Fix: reserve space, use `next/font` or `size-adjust`, set aspect ratios, render the poster
before the canvas.

## Motion performance

- Animate `transform` and `opacity`.
- Avoid animating `width`, `height`, `top`, `left`, `filter`, `box-shadow`.
- Use `will-change` only around an active animation; remove it after.
- Do not read layout in a loop (`getBoundingClientRect` inside `requestAnimationFrame`).
- Reuse vectors, objects, and arrays in render loops.
- Use `ScrollTrigger.batch` instead of one trigger per row.
- Use CSS containment for heavy sections where appropriate.
- Reduce the number of simultaneously animating elements.
- Test with reduced motion and with a slow CPU.

## 3D performance

- Cap DPR at 2; use 1.5 on mobile and 1 on the low tier.
- Disable antialias or shadows on low-end devices if needed.
- Use `ContactShadows` or a baked shadow instead of real-time shadow maps for a hero.
- Keep draw calls low; merge static geometry and use instancing.
- Compress geometry with Draco or Meshopt.
- Compress textures; prefer KTX2/WebP where supported.
- Avoid postprocessing on mobile unless measured.
- Pause the render loop offscreen and when the tab is hidden.
- Dispose geometry, materials, textures, render targets, and the renderer.
- Do not allocate objects inside `useFrame`.
- Use `frameloop="demand"` for static scenes.
- Load the scene after the poster and only when it is near the viewport.

## Asset performance

- Serve responsive images with AVIF/WebP.
- Use explicit dimensions or aspect ratios.
- Lazy-load below-the-fold media.
- Preload only the hero font and hero image.
- Subset fonts; avoid five weights for one family.
- Compress video; provide a poster; do not autoplay sound.
- Version large assets for cache busting.
- Keep the 3D model and textures out of the initial JS bundle.

## Accessibility

### Motion

- Respect `prefers-reduced-motion`.
- Remove non-essential loops, parallax, and pinned scenes for reduced motion.
- Keep content visible before the animation runs.
- Provide pause controls for motion longer than five seconds.
- Do not flash more than three times per second.
- Do not animate focus outlines away.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
"use client";

import { useReducedMotion } from "motion/react";

export function useSceneMotion() {
  const reduce = useReducedMotion();
  return {
    enabled: !reduce,
    parallax: reduce ? 0 : 1,
    autoplay: !reduce
  };
}
```

### Keyboard

- Every interactive element is reachable by Tab.
- Focus order follows visual order.
- Focus is visible on every background.
- Escape closes modals, drawers, and menus.
- Focus returns to the trigger.
- Carousels have previous/next buttons and arrow-key support.
- Command menus trap focus and announce results.

### Canvas and 3D

- Decorative canvas: `aria-hidden="true"` plus nearby text.
- Meaningful canvas: `role="img"`, `aria-label`, and a text equivalent.
- No essential information only in WebGL.
- Provide a pause control for looping scenes.
- Provide a static poster for reduced motion and no-WebGL.
- Interactive 3D needs keyboard controls, reset, and instructions.
- Audio needs captions/transcripts.

### Scroll

- No scroll hijacking.
- PageDown, Space, Home, End, and arrow keys work.
- Anchor links land correctly under sticky headers.
- Browser find can reach content.
- Scrollbar remains visible or a clear position indicator exists.
- Lenis must not break keyboard or screen-reader navigation.

### Forms

- Labels are visible and associated.
- Errors are announced and tied to fields.
- Success is announced.
- Do not rely on placeholder text as a label.
- Do not rely on color alone for errors.
- Validate on the server as well as the client.

### Video and animation

- Background video is muted and has a poster.
- Autoplay is not required to understand the page.
- Provide pause/play where motion is continuous.
- Captions for speech; transcripts for meaningful audio.
- Respect data-saver and reduced-motion preferences.

## Manual test matrix

| Test | Desktop | Mobile | Reduced motion | No WebGL | Keyboard | Screen reader |
| --- | --- | --- | --- | --- | --- | --- |
| Hero content visible | yes | yes | yes | yes | yes | yes |
| CTA works | yes | yes | yes | yes | yes | yes |
| 3D poster | yes | yes | yes | yes | n/a | yes |
| Scroll story | yes | fallback | static | static | yes | yes |
| Carousel | yes | yes | yes | yes | yes | yes |
| Modal/drawer | yes | yes | yes | yes | yes | yes |
| Form errors | yes | yes | yes | yes | yes | yes |
| Light/dark contrast | yes | yes | yes | yes | yes | yes |

## Pause hook

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function usePageVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return visible;
}
```

Use it to pause a canvas render loop, a video, or a looping GSAP timeline. Do not leave a
tab running a full GPU scene in the background.

## No-WebGL message

Show the poster and a short line, not an error stack:

```tsx
export function SceneFallback() {
  return (
    <figure>
      <img src="/posters/product.jpg" alt="Product shown on a neutral background" />
      <figcaption className="sr-only">
        Interactive 3D view is unavailable; the product image is shown instead.
      </figcaption>
    </figure>
  );
}
```

## Release rule

Do not ship because the animation looks good on a fast desktop. Ship when:

- the static page is complete
- reduced motion is complete
- no-WebGL is complete
- mobile performance is measured
- keyboard and screen-reader paths are tested
- the 3D scene has a pause and a poster
- the bundle is within budget or the exception is documented
