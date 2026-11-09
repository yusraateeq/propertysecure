# GSAP and Lenis Guide

Use GSAP when the motion is a **timeline**: pinned sections, scrubbed camera moves,
horizontal galleries, coordinated sequences. Do not use it for a single fade that Motion or
CSS can do.

GSAP uses its standard no-charge license. Confirm the current terms and plugin coverage
before shipping; plugin licensing has changed over time.

## Setup

Install:

```bash
npm i gsap lenis
```

React:

```bash
npm i @gsap/react
```

Register plugins once in a client module:

```ts
// lib/gsap/register.ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
```

Import that module from the components that use GSAP. Do not register plugins in every
component.

## React lifecycle with useGSAP

`useGSAP` scopes selectors and reverts animations on unmount.

```tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FeatureReveal() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal]", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            once: true
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root}>
      <h2 data-reveal>Features</h2>
      <p data-reveal>Content is visible without motion.</p>
    </section>
  );
}
```

If you are not using `@gsap/react`, use `gsap.context()` and `ctx.revert()` in a
`useEffect` cleanup.

## Timeline basics

```js
const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } });

tl.from("[data-title]", { y: 32, opacity: 0 })
  .from("[data-subtitle]", { y: 20, opacity: 0 }, "-=0.35")
  .from("[data-cta]", { y: 12, opacity: 0 }, "-=0.3");
```

- Use one timeline for a coordinated sequence.
- Use labels for readable offsets: `tl.addLabel("cta").to(..., { ... }, "cta")`.
- Avoid adding dozens of independent tweens that all start on scroll.
- Keep default durations close to the design tokens.

## ScrollTrigger patterns

### 1. Batch reveals

```js
ScrollTrigger.batch("[data-reveal]", {
  start: "top 85%",
  once: true,
  onEnter: (batch) =>
    gsap.to(batch, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.06,
      overwrite: true
    })
});
```

Use `gsap.set` for the initial state, and keep the base CSS visible. Never leave content
hidden in CSS waiting for GSAP to reveal it; if the script fails, the content must remain
readable.

### 2. Pinned story

```js
const section = document.querySelector("[data-story]");
const panels = gsap.utils.toArray("[data-panel]");

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: () => `+=${panels.length * 100}%`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    anticipatePin: 1
  }
});

timeline.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none"
});
```

Rules:

- One pinned scene per page unless the story truly needs more.
- Give the pinned section a stable height.
- Test mobile browser chrome changes; `ScrollTrigger.config({ ignoreMobileResize: true })`
  can prevent unnecessary refreshes.
- Provide a vertical fallback for narrow screens when horizontal reading is awkward.

### 3. Horizontal gallery

```js
const track = document.querySelector("[data-track]");
const distance = () => track.scrollWidth - window.innerWidth;

gsap.to(track, {
  x: () => -distance(),
  ease: "none",
  scrollTrigger: {
    trigger: track,
    start: "top top",
    end: () => `+=${distance()}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true
  }
});
```

`invalidateOnRefresh: true` recalculates the distance after resize or font load.

### 4. Scroll progress

```js
gsap.to("[data-progress]", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});
```

Set `transform-origin: left center` and animate `scaleX`, not `width`.

### 5. Scrubbed camera or uniform

```js
const state = { progress: 0 };

gsap.to(state, {
  progress: 1,
  ease: "none",
  scrollTrigger: {
    trigger: "[data-scene]",
    start: "top top",
    end: "+=300%",
    scrub: 1,
    pin: true
  },
  onUpdate: () => {
    camera.position.z = 5 - state.progress * 2;
    material.uniforms.uReveal.value = state.progress;
  }
});
```

Read `state.progress` inside the existing render loop. Do not start a second animation loop.

### 6. Match media

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
  // pinned desktop story
});

mm.add("(max-width: 767px)", () => {
  // simple stacked layout, no pin
});

return () => mm.revert();
```

Use match media for responsive behavior and reduced motion together.

## Lenis integration

Lenis is a smooth-scroll transport. It must not become a second scroll system.

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

Rules:

- Do not also set `scroll-behavior: smooth`.
- Do not add Locomotive Scroll or another smooth-scroll library.
- Use `data-lenis-prevent` on modals, drawers, and nested scroll panels that need native
  scrolling.
- Call `lenis.stop()` when a modal opens and `lenis.start()` when it closes.
- Refresh ScrollTrigger after fonts, images, and dynamic content settle.
- Test anchor links, browser find, PageDown, Space, and the scrollbar.

`autoRaf: false` is used because GSAP's ticker drives Lenis. If you do not use GSAP, Lenis
can drive its own RAF; do not do both.

## Split text

Use `split-type` rather than hand-written spans.

```js
import SplitType from "split-type";

const split = new SplitType("[data-split]", { types: "lines,words" });

gsap.from(split.words, {
  yPercent: 120,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.04,
  scrollTrigger: {
    trigger: "[data-split]",
    start: "top 85%",
    once: true
  }
});

return () => split.revert();
```

- Keep the original text accessible.
- Revert the split on cleanup.
- Re-split after fonts load or use a resize-safe approach.
- Do not split body copy; use it for short headlines.

## Page transitions

### Next.js App Router

Use `app/template.tsx` for a reliable enter animation. For exit animations, use a client
provider with `AnimatePresence` or the View Transitions API. Do not block navigation on an
exit animation.

### Multi-page sites (Astro, Nuxt, static)

Barba.js or Swup can animate between server-rendered pages. On every page change:

1. revert old GSAP contexts
2. destroy old ScrollTriggers
3. re-initialize page scripts
4. refresh ScrollTrigger
5. restore focus and announce the new page

Do not leave old timelines running after the DOM is replaced.

## Cleanup checklist

- `useGSAP` scope or `gsap.context()` reverted
- `ScrollTrigger.getAll().forEach((trigger) => trigger.kill())` only for triggers you own
- Lenis `destroy()`
- ticker callback removed
- resize/pointer/visibility listeners removed
- SplitType reverted
- `ScrollTrigger.refresh()` after dynamic content, not in a loop

## Reduced motion

Use `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` for animated branches.
Provide a static state outside the branch.

```js
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set("[data-reveal]", { opacity: 1, y: 0 });
});

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // animation
});

return () => mm.revert();
```

Do not hide content by default in CSS and rely on GSAP to reveal it. If the animation fails,
the content must still be visible.

## Performance

- Animate `transform` and `opacity`; avoid layout properties in scrubbed timelines.
- Use `ScrollTrigger.batch` for lists instead of one trigger per row.
- Use `invalidateOnRefresh` for responsive measurements.
- Pin sparingly; pinned sections are expensive on mobile.
- Avoid `scrub: true` on filters, blurs, and large shadows.
- Set `will-change` only while the animation is active.
- Kill triggers on route change.
- Test a pinned page on a mid-range Android device.
- Keep DOM depth low; GSAP can animate fast, but layout still costs.

## Accessibility

- No scroll hijacking: keyboard and scrollbar must work.
- Reduced motion must remove pinning and scrubbing, not just shorten durations.
- Provide a pause control for long loops.
- Do not animate focus outlines.
- Keep reading order intact when using horizontal layouts.
- A pinned story must have a vertical fallback for screen readers and small screens.
- Test with browser zoom at 200%.

## Anti-patterns

- GSAP for a single hover that CSS can do.
- A scroll timeline for every section.
- Two smooth-scroll libraries.
- `ScrollTrigger` created inside a render function without cleanup.
- `scrub` on a property that triggers layout.
- Animating `width` for a progress bar.
- Forgetting `invalidateOnRefresh` on responsive measurements.
- Pinning a section that is taller than the viewport without a plan.
- Using `SplitType` on body copy and never reverting it.
