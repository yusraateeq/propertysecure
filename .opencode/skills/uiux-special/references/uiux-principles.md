# UI/UX Principles

The standards every design produced with this skill must meet. These are not suggestions;
they are the review criteria.

## 1. What makes a web app feel professional

Users judge trust in milliseconds. Professional products share five traits:

1. **Clarity** - the next action is obvious without reading everything.
2. **Consistency** - the same control looks and behaves the same everywhere.
3. **Restraint** - one accent, two fonts, one idea per section.
4. **Responsiveness** - every state and every screen size is designed, not left to chance.
5. **Speed** - perceived performance is part of the design, not an engineering afterthought.

If a design is beautiful but unclear, slow, or inaccessible, it is not professional.

## 2. Hierarchy and composition

- One primary action per view. Secondary actions are visually quieter; destructive actions
  are separated and confirmed.
- Establish three levels: what the eye sees first, second, and third. If everything is
  bold, nothing is.
- Use size before color, color before weight, weight before decoration.
- Keep a clear focal path: headline -> supporting copy -> proof -> CTA.
- Align to a grid, then optically adjust logos, icons, and punctuation.
- Whitespace is a feature. Crowding reads as cheap; generous space reads as confidence.
- Do not center long body copy. Center only short headlines, empty states, and auth cards.
- Section rhythm: consistent vertical spacing scale, alternating density, no accidental
  one-off gaps.

## 3. Typography

- One heading family and one body family. A mono is allowed for code and tabular data.
- Body measure: 60-75 characters; 45-90 is the absolute range.
- Body line-height: 1.5-1.7. Headings: 1.05-1.25. Small labels: 1.3-1.4.
- Type scale: use a ratio, not arbitrary sizes. 1.2 for dense apps, 1.25 for product
  marketing, 1.333 for editorial. Fluid `clamp()` between mobile and desktop.
- Minimum body size 16px. Minimum tap target 44x44px.
- Avoid all-caps for long text; add 0.02-0.08em tracking when used for labels.
- Numerals: tabular figures for tables, financial values, and timers.
- Never use more than three weights on a page. Prefer 400/500/700.
- Do not fake bold or italic; load the real style or use a variable axis.

## 4. Spacing and layout

- Use an 8px spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. 4px is for icon
  nudges, not section spacing.
- Spacing communicates grouping. Space inside a group must be smaller than space between
  groups.
- Container widths: 640-720px reading, 960-1120px cards, 1200-1320px marketing, 1440px
  dashboards.
- Breakpoints: 480, 768, 1024, 1280, 1536. Design the transitions, not just the endpoints.
- Mobile: single column, 16-24px gutters, thumb-reachable primary actions.
- Do not hide essential content on mobile; reorder and prioritize instead.
- Avoid horizontal scroll except for intentional tables, carousels, and timelines.

## 5. Color

- Use semantic tokens (`bg`, `surface`, `text`, `accent`), never raw hex in components.
- 60-30-10: neutral background 60%, surfaces/text 30%, accent 10%.
- One accent for primary actions. Status colors are not brand colors.
- Body text >= 7:1; large text >= 4.5:1; muted text >= 4.5:1; subtle text >= 3:1.
- UI boundaries, focus rings, and icons >= 3:1 against their background.
- Never use color alone to convey meaning. Pair with icon, label, or pattern.
- Dark mode is not an inversion: desaturate accents, lift surfaces with elevation, avoid
  pure black and pure white glare.
- Test both modes with real content, disabled states, errors, and images.

## 6. Components and states

Every interactive component needs:

| State | Requirement |
| --- | --- |
| Default | clear affordance and label |
| Hover | visible but not distracting; pointer only |
| Focus-visible | 2px+ ring, 3:1 contrast, not clipped |
| Active/pressed | immediate tactile feedback |
| Disabled | reduced emphasis, no hover, explained why when non-obvious |
| Loading | preserves layout, prevents double submit |
| Error | specific message, recovery path, not color-only |
| Empty | explains what goes here and the next action |

Also design: read-only, selected, indeterminate, skeleton, and success states.

## 7. Forms

- One column. Multi-column forms increase errors.
- Label above the field, always visible. Placeholders are hints, not labels.
- Mark optional fields, not required ones, when most fields are required.
- Validate on blur and on submit, not on every keystroke.
- Error text sits next to the field, explains how to fix it, and is linked with
  `aria-describedby`.
- Preserve input on error. Never clear a form.
- Use correct `type`, `inputmode`, and `autocomplete`.
- Destructive or irreversible actions require confirmation with the consequence named.

## 8. Navigation

- Desktop: persistent top nav for marketing, sidebar for apps, tabs for peer views.
- Mobile: bottom nav for 3-5 primary destinations, drawer for the rest. Never both for the
  same items.
- Current location is always visible. Breadcrumbs for deep hierarchies.
- Search is a first-class action in content-heavy and directory products.
- Nav labels are concrete nouns: "Properties", not "Explore".
- Keep the logo linked to home. Keep account and help reachable from every app screen.

## 9. Feedback and system status

- Acknowledge every action within 100ms visually, even if the request takes longer.
- Loading: skeleton for known layout, spinner only for short unknown waits.
- Empty: explain the value, show an example, and offer the first action.
- Error: say what happened, why, and what to do next. Never "Something went wrong" alone.
- Success: confirm the outcome and the next step; auto-dismiss non-critical toasts.
- Optimistic UI only when rollback is safe and visible.

## 10. Accessibility (WCAG 2.2 AA minimum)

- Semantic HTML first; ARIA only to fill gaps.
- One `h1` per page and a logical heading order.
- All interactive elements reachable and operable by keyboard.
- Visible focus ring on every focusable element; never `outline: none` without a
  replacement.
- Images have meaningful alt text or empty alt if decorative.
- Form controls have programmatic labels.
- Respect `prefers-reduced-motion`; never autoplay video with sound.
- No keyboard traps. Modals trap focus intentionally, restore focus on close.
- Target size >= 24x24px minimum (44x44 recommended).
- Test at 200% zoom and with a screen reader at least once per release.

## 11. Performance as UX

- LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 on a mid-range mobile profile.
- Reserve space for images, embeds, and fonts to prevent layout shift.
- Load fonts with `display: swap` and preload only the critical face.
- Lazy-load below-the-fold media and 3D scenes.
- Animate transform and opacity; never animate layout properties in a loop.
- Budget: initial JS <= 200KB gzip for marketing, <= 350KB for apps, before framework
  exclusions are agreed.

## 12. Content and microcopy

- Plain language. Short sentences. Active voice.
- Buttons say what happens: "Save changes", not "Submit".
- Errors say how to fix the problem.
- Numbers, dates, and currency follow the user's locale.
- Do not use jargon the audience would not use.
- Every page has one job and one primary message.

## 13. Trust and conversion

- Show proof near the decision: testimonials, logos, ratings, guarantees.
- Pricing is explicit: currency, billing period, taxes, cancellation.
- Security and privacy signals appear at the point of data entry.
- No fake urgency, fake counters, or invented testimonials.
- Reduce risk with clear return, cancellation, and support paths.

## 14. Consistency and design system

- Tokens for color, type, space, radius, shadow, motion.
- Primitives before pages. No page-specific one-off buttons.
- Variants are named by intent (`primary`, `secondary`, `danger`), not appearance.
- Document do/don't examples for each component.
- Deprecate rather than fork.

## 15. Anti-patterns

- Carousels for critical content; auto-rotating hero sliders.
- Text over busy images without a scrim.
- Low-contrast gray-on-gray "minimal" UI.
- Icon-only buttons without labels or tooltips.
- Placeholder-only labels; disappearing form labels.
- Modals for everything; nested modals.
- Infinite scroll without a footer or pagination fallback.
- Fake dashboards, lorem ipsum shipped to production, dead links.
- More than two font families; more than one accent.
- Motion that delays the task or cannot be reduced.
- Dark mode made by inverting colors.

## 16. Review gates

A design is not done until:

- [ ] Hierarchy is obvious in a 5-second squint test.
- [ ] Both light and dark pass contrast checks.
- [ ] Every component state is designed.
- [ ] Keyboard path is complete and focus is visible.
- [ ] Mobile, tablet, and desktop layouts are defined.
- [ ] Loading, empty, error, and success states exist.
- [ ] Motion has a reduced-motion fallback.
- [ ] Performance budget is respected.
- [ ] Copy is final, specific, and free of placeholders.
