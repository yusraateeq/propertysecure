# Launch Checklist

Use this as the definition of done for a professional motion template. A checked box
without evidence is not done.

## 0. Brief and design handoff

- [ ] Audience, goal, and primary CTA are written.
- [ ] `uiux-special` Design Decision Record exists and is cited.
- [ ] Font, pairing, layout, theme, and motion IDs are recorded.
- [ ] Recipe ID is chosen from [recipes.md](./recipes.md).
- [ ] Light and dark modes are defined.
- [ ] Performance and accessibility constraints are written.

## 1. Stack

- [ ] Framework is appropriate for the content and SEO needs.
- [ ] Motion owner is chosen (Motion, GSAP, CSS, or native).
- [ ] Scroll owner is chosen (native, Motion, GSAP, Lenis).
- [ ] 3D is justified, or explicitly rejected.
- [ ] No duplicate animation, scroll, carousel, toast, or chart libraries.
- [ ] Peer dependencies and licenses are checked.
- [ ] Dev-only tools are not in the production bundle.

## 2. Static-first

- [ ] Content is server-rendered or present in the initial HTML.
- [ ] Navigation and CTAs work without JavaScript.
- [ ] Forms have a server path or a documented no-JS fallback.
- [ ] Images have dimensions and alt text.
- [ ] Heading order is semantic.
- [ ] No essential content is canvas-only, hover-only, or animation-only.
- [ ] The page is readable with CSS disabled or partially loaded.

## 3. Layout and responsive behavior

- [ ] Mobile, tablet, and desktop layouts are checked.
- [ ] 200% zoom works without horizontal scrolling (except data tables/code).
- [ ] Sticky headers do not cover anchor targets.
- [ ] Horizontal galleries have a vertical or scrollable mobile fallback.
- [ ] Long words and CMS content do not break layout.
- [ ] Loading, empty, error, and success states are designed.

## 4. Motion

- [ ] Motion tokens are shared across CSS and JS.
- [ ] Entrance motion is under 600ms unless it is a deliberate scene.
- [ ] Stagger is 40-80ms and grouped for long lists.
- [ ] Transform and opacity are the default animated properties.
- [ ] No animation blocks input.
- [ ] No scroll hijacking.
- [ ] No infinite decorative loop without a pause.
- [ ] No flashing above 3 Hz.
- [ ] `prefers-reduced-motion` is implemented in CSS and JS.
- [ ] Content is visible before motion runs.

## 5. Scroll

- [ ] One scroll owner.
- [ ] Lenis is not combined with CSS `scroll-behavior: smooth`.
- [ ] Keyboard scrolling, PageDown, Space, Home/End work.
- [ ] Anchor links work.
- [ ] Browser find works.
- [ ] Scrollbar or position indicator is available.
- [ ] Pinned scenes have a vertical fallback where needed.
- [ ] ScrollTrigger refreshes after fonts/images and is killed on unmount.
- [ ] Mobile browser chrome does not cause layout jumps.

## 6. 3D

- [ ] The scene has a purpose statement.
- [ ] Canvas is client-only and lazy-loaded.
- [ ] Poster is visible before load.
- [ ] No-WebGL fallback is implemented.
- [ ] Reduced-motion static state is implemented.
- [ ] Context-loss error boundary exists.
- [ ] DPR, triangle, draw-call, and texture budgets are met.
- [ ] Scene pauses offscreen and when the tab is hidden.
- [ ] Geometry, materials, textures, renderer, listeners, and observers are disposed.
- [ ] No essential text is inside the canvas.
- [ ] Interactive scene has keyboard controls and reset.
- [ ] Mobile quality tier is tested on a real mid-range device.

## 7. Accessibility

- [ ] Keyboard path is complete.
- [ ] Focus is visible on every background.
- [ ] Focus returns after modal/drawer close.
- [ ] Escape closes overlays.
- [ ] Carousels have buttons and keyboard support.
- [ ] Command menu traps focus and announces results.
- [ ] Forms have labels, errors, and success announcements.
- [ ] Canvas has an accessible name or is marked decorative.
- [ ] Video has captions and a poster.
- [ ] Color is not the only signal.
- [ ] Light and dark contrast pass WCAG AA.
- [ ] Manual screen-reader pass on the primary flow.

## 8. Performance

- [ ] Production build measured, not dev server.
- [ ] LCP within budget.
- [ ] INP within budget on a mid-range device.
- [ ] CLS within budget.
- [ ] Initial JS within budget.
- [ ] 3D chunk is outside the critical path.
- [ ] Images are AVIF/WebP with responsive sizes.
- [ ] Fonts are subset and use `display: swap`.
- [ ] No layout shift from the canvas, images, or fonts.
- [ ] No long tasks on primary interaction.
- [ ] Bundle analyzer reviewed.
- [ ] Before/after numbers recorded.

## 9. SEO and content

- [ ] Title and description are unique.
- [ ] Canonical URL is set.
- [ ] Open Graph image exists.
- [ ] Sitemap and robots are configured.
- [ ] Structured data is valid.
- [ ] Primary content is server-rendered.
- [ ] Images have descriptive alt text.
- [ ] Links have meaningful text.
- [ ] No content hidden behind hover or motion only.

## 10. Testing

- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Build passes.
- [ ] Unit tests pass.
- [ ] Playwright primary flow passes.
- [ ] Playwright reduced-motion test passes.
- [ ] Playwright no-WebGL test passes.
- [ ] Keyboard test passes.
- [ ] Visual snapshots of stable sections pass.
- [ ] axe checks pass on key pages.
- [ ] Mobile viewport test passes.
- [ ] Light and dark theme test passes.

## 11. Report

- [ ] Recipe ID and design IDs are listed.
- [ ] Stack and ownership decisions are listed.
- [ ] Motion tokens and scene contract are listed.
- [ ] Files changed are listed.
- [ ] Commands run and results are listed.
- [ ] Measurements are listed.
- [ ] Fallbacks verified are listed.
- [ ] Unverified items and open risks are listed.

## Red flags

- "It looks fine on my machine" without a mobile measurement.
- A canvas with no poster.
- A scroll library plus CSS smooth scroll.
- Motion and GSAP animating the same property.
- `"use client"` on the page root for one small effect.
- A 3D model over 10MB on a marketing page.
- An entrance animation that hides the hero until JS loads.
- A pinned section with no mobile fallback.
- A carousel without keyboard controls.
- A decorative loop with no pause.
- A production bundle containing Leva or Theatre Studio.
- A report that lists files but not verification evidence.
