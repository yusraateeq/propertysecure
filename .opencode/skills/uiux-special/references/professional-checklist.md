# Professional UI/UX Checklist

Definition of done for any page or app screen produced with this skill.

## Global

### Hierarchy and layout

- [ ] One clear primary action per view.
- [ ] A 5-second squint test reveals the intended reading order.
- [ ] Section spacing follows the 8px scale with no one-off gaps.
- [ ] Container widths match the content type.
- [ ] Mobile, tablet, and desktop layouts are explicitly defined.
- [ ] No accidental horizontal scroll at 320px.

### Typography

- [ ] Maximum two text families plus one mono.
- [ ] Body size >= 16px; measure 60-75 characters.
- [ ] Headings use a consistent scale and line height.
- [ ] Tabular numerals for money, tables, and timers.
- [ ] No faux bold, faux italic, or stretched text.
- [ ] Long words, numbers, and translations tested.

### Color

- [ ] All colors come from theme tokens.
- [ ] Only light and dark modes exist; both are complete.
- [ ] Body text >= 7:1, muted >= 4.5:1, UI boundaries >= 3:1.
- [ ] Accent used for one primary action, not every link.
- [ ] Status colors are distinct from brand colors.
- [ ] Dark mode uses tinted near-black, not `#000`, and lifted surfaces.

### Components and states

- [ ] Default, hover, focus-visible, active, disabled for every control.
- [ ] Loading, error, empty, and success states designed.
- [ ] Focus ring visible on every background, never clipped.
- [ ] Tap targets >= 44x44px.
- [ ] Skeletons preserve layout and prevent shift.

### Forms

- [ ] Visible labels, not placeholder-only.
- [ ] Correct `type`, `inputmode`, and `autocomplete`.
- [ ] Validation on blur and submit, not every keystroke.
- [ ] Errors next to the field, with a recovery path.
- [ ] Input preserved on error.
- [ ] Destructive actions confirmed with the consequence named.

### Accessibility

- [ ] One `h1`, logical heading order.
- [ ] Full keyboard path; no traps.
- [ ] Semantic landmarks and controls.
- [ ] Images have alt text; decorative images are empty alt.
- [ ] `aria-describedby` links help and error text.
- [ ] `prefers-reduced-motion` respected.
- [ ] 200% zoom and screen-reader pass completed.

### Performance

- [ ] LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 on mobile.
- [ ] Fonts preloaded and swapped; only needed subsets.
- [ ] Images sized, lazy-loaded below the fold, modern formats.
- [ ] 3D and heavy motion lazy-loaded and paused offscreen.
- [ ] Initial JS within the agreed budget.

### Content and trust

- [ ] Copy is final; no lorem ipsum, no placeholder links.
- [ ] Buttons describe the outcome.
- [ ] Pricing, billing, and cancellation are explicit.
- [ ] Proof near the decision; no invented testimonials.
- [ ] Privacy and security signals at data entry.

## Page-specific

### Marketing landing

- [ ] Value proposition in the first viewport.
- [ ] Primary CTA repeated but not competing.
- [ ] Social proof within one scroll.
- [ ] FAQ answers real objections.
- [ ] SEO metadata, OG image, canonical.

### Dashboard

- [ ] KPI row answers "is anything wrong?" first.
- [ ] Charts have titles, units, and time ranges.
- [ ] Empty and loading states for every widget.
- [ ] Dense data has filters, sorting, and export.
- [ ] Tables keep priority columns on mobile.

### Ecommerce

- [ ] Product images zoom and have alt text.
- [ ] Price, taxes, shipping, and returns visible before checkout.
- [ ] Add-to-cart feedback is immediate.
- [ ] Checkout is one column, guest-friendly, and preserves input.
- [ ] Trust badges and support contact at payment.

### Auth

- [ ] One primary action per screen.
- [ ] Password visibility toggle and clear requirements.
- [ ] OAuth buttons clearly separated from email login.
- [ ] Error messages do not leak whether an account exists.
- [ ] Redirect targets validated; focus restored.

### Listing / directory

- [ ] Search and filters are first-class and persist.
- [ ] Result count and sort are visible.
- [ ] Empty results explain how to broaden the search.
- [ ] Cards show the decision-critical facts.
- [ ] Pagination or "load more" with a footer fallback.

### Editorial

- [ ] Reading measure and line height are comfortable.
- [ ] Heading anchors and a table of contents for long pieces.
- [ ] Images have captions and alt text.
- [ ] Reading progress and related content.
- [ ] No pop-up interrupts the first scroll.

## Motion and 3D

- [ ] Motion explains state, hierarchy, or story.
- [ ] Durations follow the motion scale.
- [ ] Only transform and opacity animate in loops.
- [ ] Reduced-motion fallback works.
- [ ] 3D has a static poster and a no-WebGL fallback.
- [ ] Canvas pauses offscreen and on hidden tabs.
- [ ] No essential information only in 3D.
- [ ] Tested on a mid-range mobile device.

## Design decision record

- [ ] Font IDs and pairing recorded.
- [ ] Layout blueprint IDs recorded, with fit.
- [ ] Theme IDs recorded, with WCAG values.
- [ ] Motion scenes recorded, with fallbacks.
- [ ] Rejected options and reasons recorded.
- [ ] Final report names the IDs so the decision is traceable.

## Sign-off

A screen is done only when every applicable box is checked, both modes are reviewed, and
the verification evidence is included in the final report. A failing accessibility or
contrast check blocks release.
