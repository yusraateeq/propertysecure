---
name: security-site-revamp
description: Use when revamping the Property Security Services, Inc website while preserving its established navy/gold/teal brand, original content, business information, and media assets. Applies to design tokens, responsive layouts, Framer Motion interactions, accessibility, SEO, performance, and component architecture for this security-company site.
---

# Property Security Services, Inc — Site Revamp

## Purpose

Deliver a cleaner, more professional, premium security-company website without replacing the existing brand, content, or assets. The visual tone must remain calm, credible, established, and trustworthy.

## Hard rules

The following rules are mandatory for every implementation using this skill.

### 1. Brand tokens: refine the existing theme, never replace it

Define the palette as CSS variables and, when Tailwind is used, expose the same values as Tailwind theme tokens.

- `--color-navy: #0B4068` — headings, header, primary dark surfaces, and footer.
- `--color-navy-deep: #072C49` — deeper navy for dark sections and overlays.
- `--color-gold: #E8B100` — primary calls to action only, especially **Request Quote**. Do not use gold as general decoration or body text.
- `--color-teal: #1EC3D0` — secondary highlights, link hovers, icons, and selected accents.
- `--color-white: #FFFFFF`.
- `--color-surface: #F4F5F7` — soft-grey alternating sections and cards.
- `--color-body: #5B6470` — body copy on light surfaces; use darker values where needed to maintain WCAG AA contrast.
- `--color-border: #DCE2E8` — subtle 1px borders and dividers.

Typography must use a clean sans-serif pair through `next/font` when using Next.js: Inter or Open Sans for body and Poppins or Montserrat for headings. Preserve a clear scale:

- Desktop/mobile h1: 56px / 48px; reduce further only where required at the smallest supported viewport without losing hierarchy.
- h2: 36px, with a responsive smaller size on mobile.
- h3: 22px.
- Body: 16–17px.
- Body line-height: at least 1.6.

Use fluid sizing where appropriate, readable line lengths, and deliberate heading/body weight contrast. Never introduce an unrelated display face.

### 2. Layout system

- Content container: maximum width 1200px, centered, with responsive horizontal gutters.
- Base spacing unit: 8px; use consistent multiples for spacing and component internals.
- Section padding: 96–120px on desktop and 64px on mobile.
- Corner radius: consistently 12–16px for cards, panels, dialogs, and media.
- Borders: subtle 1px strokes using the border token.
- Shadows: soft and layered; never harsh, neon, or excessively elevated.
- Build mobile-first and verify at 360px, 768px, 1024px, and 1440px.
- Grids must collapse cleanly, equal-height cards must stay aligned, and no viewport may produce horizontal overflow.
- Preserve generous whitespace and clear section rhythm. Use restrained dividers only where they improve hierarchy.

### 3. Motion rules: Framer Motion

Create and reuse a shared motion-variants module. It must include at least:

- `fadeUp`
- `fadeIn`
- `stagger`
- `scaleIn`
- `slideLeft`
- `slideRight`

Motion requirements:

- Scroll reveals use `whileInView` with `viewport={{ once: true, amount: 0.2 }}` (a nearby amount is acceptable only when content geometry requires it).
- Card grids and checklist groups use staggered children.
- Buttons receive a subtle hover lift and arrow nudge, with `whileTap={{ scale: 0.98 }}` where motion is safe.
- The header becomes sticky with backdrop blur and shadow after scrolling.
- The hero background uses a slow Ken Burns zoom and the copy has a composed entrance.
- Hero slide changes use `AnimatePresence` crossfades.
- Testimonials use animated slide transitions, arrows, dots, keyboard support, and drag/swipe.
- “Why Choose Us” checkmarks animate via SVG `pathLength`; any numeric animation must be subtle and truthful.
- Standard durations: 0.4–0.8 seconds. Primary easing: `[0.22, 1, 0.36, 1]`.
- No parallax overload, flashing, bouncing, excessive rotation, or other distracting motion. Motion should feel calm, trustworthy, and premium.
- Always call `useReducedMotion` for significant client-side motion. Disable Ken Burns, large translations, dragging, and other heavy/nonessential movement when reduced motion is requested; content must remain immediately legible and functional.

### 4. Content and asset rules

- Audit the existing project and public/media directories before implementation.
- Reuse all existing assets: shield/logo, hero and guard photography, service icons, testimonial avatar, video/media, badges, and other supplied media where applicable.
- Do not invent copy, statistics, testimonials, client names, licenses, certifications, imagery, reviews, or service claims.
- Keep source copy verbatim except for obvious typographical or spacing corrections. In particular, correct “Property Services, Security Inc” in the About paragraph to “Property Security Services, Inc”.
- Preserve all real business information exactly:
  - PPO Lic # 119841
  - info@PropertySecurityInc.com
  - (844) 488-1032
  - Mon–Fri 9:00–16:00
- Use `next/image` in Next.js with meaningful alt text, explicit dimensions or `fill` with a sized parent, responsive `sizes`, and `priority` only for the primary above-the-fold hero asset. Lazy-load below-the-fold media.
- Do not fabricate a replacement asset if an expected source asset is unavailable. Reuse the closest real supplied asset and document the limitation.
- External video, social, badge, and navigation destinations must use real supplied URLs where available; otherwise use an honest in-page action or document the unavailable destination.

### 5. Quality bar

Accessibility:

- Use semantic landmarks and heading order, with exactly one h1 per page.
- Maintain WCAG AA contrast for text and interactive states; do not place gold text on white or teal text on navy without verifying contrast.
- Provide clearly visible `:focus-visible` states.
- Navigation, mobile drawer, sliders, and dialogs must be keyboard navigable.
- Icon-only buttons require accessible names. Slider dots require slide-specific labels and current-state semantics.
- Dialogs need a label, focus management, Escape-to-close, scroll locking, and focus restoration.
- Decorative icons/images must be hidden from assistive technology where appropriate.

SEO:

- Supply a specific title and meta description, canonical URL when known, OpenGraph metadata, and appropriate image metadata.
- Include truthful JSON-LD `LocalBusiness` (or the most specific valid security-service subtype) using only verified business details.

Performance and engineering:

- Target Lighthouse scores of 90+ without sacrificing accessibility or functionality.
- Avoid layout shift with reserved media dimensions and stable font loading.
- Lazy-load below-the-fold sections/media where beneficial; keep the primary hero prioritized.
- Build reusable components and data-driven repeated content; avoid duplicated markup and styles.
- Keep server components server-side unless interactivity requires a client component.
- Organize tokens, motion primitives, shared UI, sections, data, and assets cleanly.
- Run lint, type checking, and a production build. Resolve all implementation errors and warnings rather than suppressing them.

## Required page order

1. Slim navy top bar with verified license, contact details, hours, and social links.
2. Sticky header/navigation and gold Request Quote action.
3. Full-bleed hero slider with existing guard imagery, navy overlay, two CTAs, controls, and scroll indicator.
4. Centered company introduction.
5. Commercial, Residential, and Retail service cards.
6. Emergency Security Solution / Construction Site Management split panels.
7. Centered About statement.
8. Seven-item Why Choose Us checklist, video action, and Information Package action.
9. Testimonial slider preserving the supplied testimonial and counter.
10. Navy footer with social icons, copyright, and TrustedSite badge area.

## Definition of done

- Existing content, assets, and business details have been audited and retained.
- Tokens and shared motion primitives exist before section implementation.
- Every section follows the required page order and responsive layout rules.
- Reduced-motion, keyboard, focus, dialog, and slider behavior are verified.
- Metadata and truthful LocalBusiness JSON-LD are present.
- Lint, type checks, and production build pass with no implementation warnings.
- Final handoff lists reused assets, material changes, run commands, and any assumptions or unavailable source material.
