# Framer Motion / Motion Guide

Framer Motion is now published as **Motion**. For new projects install `motion` and import
from `motion/react`; `framer-motion` remains the compatibility package for existing code.

```bash
npm i motion
```

```tsx
import { motion, AnimatePresence, useScroll } from "motion/react";
```

Do not install both packages in one project unless you are migrating. Mixing import paths
creates duplicate context and bundle weight.

## Next.js App Router boundaries

Motion is client-side. Add `"use client"` at the smallest component that needs it, not on
the whole page.

```tsx
// components/motion/Reveal.tsx
"use client";

import { m } from "motion/react";

export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
```

Server component:

```tsx
import { Reveal } from "@/components/motion/Reveal";

export default function Page() {
  return (
    <main>
      <Reveal>
        <h1>Server-rendered content with a small client reveal</h1>
      </Reveal>
    </main>
  );
}
```

## Provider

Use one provider at the app root. `MotionConfig reducedMotion="user"` respects the OS
setting. `LazyMotion` with `domAnimation` reduces the initial bundle; `strict` requires
`m.*` components.

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

If the team needs the full `motion` API, remove `strict` and keep `MotionConfig`. Do not
use `LazyMotion` and import `motion` everywhere; the optimization only works with `m`.

## Pattern 1 - Entrance stagger

```tsx
"use client";

import { m, useReducedMotion } from "motion/react";

export function HeroCopy({ items }: { items: string[] }) {
  const reduce = useReducedMotion();

  return (
    <div>
      {items.map((item, index) => (
        <m.p
          key={item}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: reduce ? 0 : index * 0.06,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {item}
        </m.p>
      ))}
    </div>
  );
}
```

Use `whileInView` instead of `animate` when the block is below the fold. Prefer
`viewport={{ once: true }}` so content does not replay on every scroll.

## Pattern 2 - Scroll reveal without jank

```tsx
"use client";

import { m } from "motion/react";

export function SectionReveal({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
```

Rules:

- `amount` or `margin` controls when the animation starts; do not reveal before content is
  visible.
- Do not put `whileInView` on hundreds of individual list rows. Reveal the group.
- Keep distance under ~32px for content, more only for deliberate hero scenes.

## Pattern 3 - Scroll progress

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

`useScroll` returns a motion value. Pass it to `style`, not to React state. Reading it in a
component render causes a re-render every frame.

## Pattern 4 - Scroll-linked transform

```tsx
"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="overflow-hidden">
      <m.img src={src} alt={alt} style={{ y }} className="h-full w-full object-cover" />
    </div>
  );
}
```

Use `useSpring` only when the lag is intentional. Springs add perceived smoothing but can
make the interface feel disconnected from the pointer.

## Pattern 5 - Page transitions in the App Router

The most reliable App Router transition is an enter animation in `template.tsx`:

```tsx
// app/template.tsx
"use client";

import { m } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
```

For exit animations, use a client provider with `AnimatePresence` and `usePathname`. Test
it against the current Next.js version; App Router caching can keep the old tree alive. If
exit animations are unreliable, use the View Transitions API or animate the incoming page
only. Do not block navigation waiting for an exit animation.

`AnimatePresence` is still the correct tool for modals, drawers, and conditional UI:

```tsx
"use client";

import { AnimatePresence, m } from "motion/react";

export function Toast({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open ? (
        <m.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
```

## Pattern 6 - Shared layout

```tsx
"use client";

import { m } from "motion/react";

export function Card({ id, expanded }: { id: string; expanded: boolean }) {
  return (
    <m.div
      layoutId={`card-${id}`}
      layout="position"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={expanded ? "card card--expanded" : "card"}
    >
      Card {id}
    </m.div>
  );
}
```

Rules:

- Use `layoutId` for a genuine shared element, not every card.
- `layout="position"` avoids width/height distortion in text-heavy components.
- Layout animations on long lists are expensive; animate the container or use
  `Reorder`.
- Scroll containers need `layoutScroll` on the scroll parent.

## Pattern 7 - Modal and drawer

```tsx
"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef } from "react";

export function Modal({
  open,
  onClose,
  label,
  children
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className="modal-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
```

Motion does not replace a focus trap. Use a primitive library or implement one, and test
keyboard navigation.

## Pattern 8 - Gestures

```tsx
"use client";

import { m } from "motion/react";

export function DraggableCard() {
  return (
    <m.div
      drag
      dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
      dragElastic={0.18}
      whileTap={{ scale: 0.98 }}
      className="card cursor-grab active:cursor-grabbing"
    >
      Drag me
    </m.div>
  );
}
```

- Drag is not a substitute for keyboard controls.
- Provide buttons or inputs for any value a drag changes.
- `dragElastic` should be subtle; large bounce reads as novelty.
- On touch, test that the drag does not block page scroll unintentionally.

## Pattern 9 - Magnetic button

```tsx
"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  return (
    <m.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - rect.left - rect.width / 2) * 0.15);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.15);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="btn"
    >
      {children}
    </m.button>
  );
}
```

Disable magnetic motion for coarse pointers and reduced motion. It is a desktop affordance.

## Pattern 10 - Lists and numbers

For reorderable lists, use `Reorder.Group` and `Reorder.Item`. For simple insert/remove,
use `AnimatePresence` or `@formkit/auto-animate`. For animated metrics and prices, use
`@number-flow/react` rather than a hand-rolled counter.

```tsx
import NumberFlow from "@number-flow/react";

export function Metric({ value }: { value: number }) {
  return <NumberFlow value={value} format={{ style: "currency", currency: "USD" }} />;
}
```

## Reduced motion

Use all three layers:

1. `MotionConfig reducedMotion="user"` at the root.
2. `useReducedMotion()` for logic that must change, such as disabling a scene.
3. CSS for non-Motion animations:

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

Do not remove focus styles, and do not hide content that only appears through motion.

## Performance

- Animate `transform` and `opacity`; avoid `width`, `height`, `top`, `left`, `filter`, and
  `box-shadow` in loops.
- `will-change` is a hint, not a default. Add it only around a known expensive animation.
- `LazyMotion` + `m` reduces bundle size.
- Avoid `layout` on large lists; use `layout="position"` or container animation.
- Use `viewport={{ once: true }}` for reveals.
- Do not read motion values in render; pass them to `style`.
- Use `useSpring` sparingly; it adds lag.
- Code-split heavy interactive widgets and 3D scenes.
- Measure with the production build, not the dev server.

## Accessibility

- Keep focus visible; never animate the focus ring away.
- Do not move focus on scroll or hover.
- Modals need focus trap, Escape, and focus return.
- Hover-only content must have a focus/tap equivalent.
- Looping motion needs a pause control if it lasts more than five seconds.
- No flashing above 3 Hz.
- Content must be readable before the animation runs.
- Test with keyboard, VoiceOver/NVDA, reduced motion, and 200% zoom.

## Testing

```ts
import { test, expect } from "@playwright/test";

test("reduced motion keeps content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-static", "true");
});
```

Add visual checks for the hero and any pinned section. Do not snapshot animations mid-frame;
wait for the settled state.

## Anti-patterns

- `"use client"` on the whole page for one hover effect.
- Animating a list with `layout` when CSS or AutoAnimate is enough.
- Using `AnimatePresence` for server-rendered content that never unmounts.
- Reading `scrollYProgress` in React state.
- Stacking entrance, hover, parallax, and scroll reveal on the same card.
- Animating `height: auto` on a large panel.
- Infinite decorative loops with no pause.
- Importing the full Motion API when `LazyMotion` is configured.
