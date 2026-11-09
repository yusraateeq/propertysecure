# Hero Revamp Spec — Property Security Services, Inc

**Scope:** homepage hero only (Option B — scoped cinematic multi-layer hero)
**Forwarded from:** `docs/architecture/homepage-revamp-plan.md`
**Blueprint:** uiux-special layout `LB-0063` (agency-home · full-bleed-immersive · hero `full-bleed-visual` · fit 5)
**Fonts:** dataset pairing `FP-0009` — `Merriweather` + `Manrope` (see `site-redesign-ddr.md`)
**Theme (by constraint):** client-provided navy/gold brand palette; dataset `TH-0013` cited for contrast targets only
**Recipe:** MT-01 · stack + motion detail in `docs/design/hero-motion-guidelines.md`

---

## 1. Hero message

The header carries the brand lockup, so the hero H1 should state the service and coverage directly rather than repeat a tenure claim that appears in the trust strip.

**Fact checks (only verified claims allowed):**

| Claim | Status | Source |
| --- | --- | --- |
| "Since 1989" | ❌ REJECTED — no founding date exists anywhere in the repo (grep `1989 / Since 1 / founded / established` → only unrelated policy text and skill docs) | repo-wide grep |
| California coverage | ✅ company describes service coverage as throughout California | `lib/site.ts`, `components/sections/AreasWeServe.tsx` |
| PPO license | ✅ published license number | `lib/site.ts:5` |
| "Over 33 years" | ✅ exists verbatim; shown in hero stats instead of repeating it in the headline | `lib/site.ts:72`, `components/sections/hero/HeroStats.tsx` |

**Selected H1:** `Security for California properties`

Supporting line: `Commercial, residential, retail, event, and construction-site security. Let's discuss what your property needs.` It identifies the service categories and invites an inquiry without implying a guarantee.

The PPO license remains in the hero chip and the verified 33+ years remain in the stats strip.

Do **not** add: response-time numbers, "24/7 dispatch" hero claims, alarm-monitoring claims — alarm monitoring and subscriptions are explicitly not sold per `docs/product/requirements-analysis.md:26`, and no response-time fact exists in `lib/site.ts` or `lib/content/`.

## 2. Layered scene (z-order, per LB-0063 full-bleed-visual)

Full-bleed media canvas with content capped inside `.site-container` (75rem). All layers inside the existing fixed-height section (`h-[calc(100svh-112px)]…`, `components/sections/Hero.tsx:39`).

| # | Layer | Content | Z | Origin |
| --- | --- | --- | --- | --- |
| 1 | Base photo carousel | 2 slides: `/images/hero-security.jpg` opens with clear left-side copy space; `/images/hero-guards.jpg` is the secondary slide | z-0 | existing photos, reordered to distinguish the new first impression |
| 2 | Parallax wrapper | photo stack translateY 0→40px as user scrolls hero out | z-0 | **NEW** |
| 3 | Kinetic gradient blobs | 2 pre-blurred radial gradients using the existing gold token behind the copy column, slow float | z-1 | **NEW** |
| 4 | Left scrim | existing L→R navy gradient (0.96→0.3) | z-2 | kept (`Hero.tsx:96`) |
| 5 | Bottom scrim | existing 0→45%→0.12 vertical navy gradient | z-2 | kept (`Hero.tsx:97`) |
| 6 | Grid overlay | existing `dark-grid` 40px grid, opacity 30% | z-3 | kept (`Hero.tsx:98`, `app/globals.css:106-110`) |
| 7 | Copy column | license chip → H1 → support line → CTA row → phone pill (existing order) | z-10 | kept, restyled slightly |
| 8 | Stats strip | **NEW** 4-stat bar, bottom-anchored above the controls row, top hairline `border-white/10` | z-10 | NEW |
| 9 | Controls + scroll cue | existing carousel dots/arrows/pause + "Scroll down" cue | z-20 | kept (`Hero.tsx:153-189`) |

**Blobs (no new hex, no animated `filter: blur`):** implemented as pre-blurred radial-gradient backgrounds (paint-once) using the existing gold token; transform/opacity drift only, never filter.

**Scrim guarantee (no text over busy media — LB-0063 accessibility rule):** the left scrim under the copy column keeps ≥0.86 navy alpha up to 40% viewport width at every breakpoint. Copy column max-width 760px stays inside the ≥0.86 band on ≥sm; on mobile the full-width scrim covers the copy band.

## 3. Stats strip (facts sourced ONLY from lib/site.ts + existing page copy)

| Stat | Label | Fact source |
| --- | --- | --- |
| `33+` | Years in the security industry | `lib/site.ts:72` |
| `5` | Security service lines | `services` (Commercial/Residential/Retail, `lib/site.ts:34-56`) + `splitServices` (Emergency/Construction Site Management, `lib/site.ts:58-75`); matches the 5-service list in the PRD |
| `PPO Lic # 119841` | BSIS-licensed | `lib/site.ts:5` |
| `CA` | Statewide service ("throughout California") | claim + copy at `components/sections/Introduction.tsx:7` and `Introduction.tsx:19` |

Formatting: reuse the `Introduction` dl pattern (`Introduction.tsx:24-34`): Manrope `font-heading` values, tracking-tight, 11–12px uppercase labels, and white text. The license stat stays plain literal text (no count-up).

**Excluded on purpose:** "24/7 Support Available" (contradicts `business.hours` = Mon–Fri 9:00–16:00, `lib/site.ts:9`; keep it OFF the hero), response times, "monitoring" claims, "Since 1989".

**Task-brief discrepancy noted:** the delegation brief said "4 options count"; `lib/site.ts` defines **5** service lines. Spec uses the data-backed 5.

Office hours remain visible in the site header and are not repeated in the hero call link.

## 4. CTA hierarchy

| Tier | Element | Style | Behavior |
| --- | --- | --- | --- |
| 1° | `Request Quote` → `/contact-us#quote` | existing `ButtonLink variant="gold"` (`components/ui/ButtonLink.tsx:23`) | gold bg + navy-deep label = 7.28:1 (passes `TH-0013` onAccent bar 5.37); `whileHover y:-2`, `whileTap scale:0.98` kept |
| 2° | `Our Services` → `#services` | `variant="light"` | ghost → fills white on hover (existing style map, `ButtonLink.tsx:26`) |
| 3° | Phone pill → `tel:+18444881032` | compact inline call link (`Hero.tsx`) | shows the phone number without repeating office hours already present in the site header |

The phone link stays visually quiet so it does not compete with the quote CTA. Button states inherit from `ButtonLink` and site CSS: default / hover (border+bg swap) / focus-visible (navy outline with white focus halo, `app/globals.css:74-77`) / active (tap scale) / disabled (n/a; links) / loading (n/a; links) / error-empty (n/a). The photo layer has explicit empty/error states: if a slide image fails or is blocked, the `bg-navy-deep` section + scrims keep every text readable.

## 5. Typography & spacing (per kept dataset fonts)

- H1: Merriweather, 36px mobile → 48px sm → 56px lg, `leading-[1.1]`, `text-balance`; highlight “California” with the existing gold token.
- Support line: Manrope 16/17px, `leading-8`, `text-white/80`.
- Stats strip: Manrope values (`25px`, `-0.04em`) and 9–12px uppercase labels; mirrors `HeroStats.tsx`.
- Spacing rhythm: compact copy block with chip mb-4 / H1 / mt-4 support / mt-6 CTAs / mt-4 phone link; mobile CTAs share a row from 360px and the 740px minimum hero height keeps the stats and controls in a shorter scene.

## 6. Responsive behavior (LB-0063 responsive contract)

| Breakpoint | Behavior |
| --- | --- |
| ≥360px mobile | Poster crop + stacked copy: copy column full-width, full-width scrim behind the text band; CTAs share a row when they fit; stats strip = 2×2 grid, condensed gap; controls include a reachable pause button; scroll cue hidden (`md:flex`, kept). Hero minimum height is 740px so the controls and stats are less likely to fall below the initial viewport. |
| sm–lg | Strip = 2×2 until width allows 4-up; copy column 720px max |
| ≥md desktop | Strip single row 4-up with hairline dividers (mirror `Introduction.tsx:28` border pattern), copy column 760px |
| Short landscape viewports (<860px height) | Strip collapses to single-line inline badges; scroll cue hidden |

## 7. Accessibility (maintain + upgrade the carousel)

**Maintained (`Hero.tsx`):** `aria-roledescription="carousel"`, `aria-label`, keyboard ←/→, `aria-current` on dots, per-dot labels, play/pause `aria-pressed`, hover/focus pause, scroll-cue link. The pause control is visible on mobile as well as desktop.

**Upgrades:**

1. Announce manual slide changes only: an `aria-live="polite"` region outside the photo layers reports "Slide N of 2" **only inside `goTo`**, never in the autoplay interval tick — matches WAI dimmed-carousel practice; `Testimonials.tsx:92` already uses `aria-live="polite"` on the blockquote.
2. Dots group keeps `role="group"` + label (`Hero.tsx:155`); all dot/pause/arrow buttons remain tab-reachable with visible focus.
3. All new strip text is real text (no icon-only meaning); no count-up on stats.
4. Verify the visible white focus halo against the navy hero.

## 8. Component-state matrix (new elements)

| Element | default | hover | focus | active | disabled | loading | error/empty |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Stats strip cell | static text, no hover affordance | n/a | n/a (not interactive) | n/a | n/a | renders after hydration with no reflow (space reserved inside fixed-height hero) | renders text-only even when photos fail |
| Kinetic blob | slow float | n/a | n/a | n/a | n/a | pure CSS paint, no JS needed | static gradient fallback |
| Parallax wrapper | transform 0 | n/a | n/a | n/a | n/a | starts at 0 — no visible pop | same as photo error state |
| Live region | `aria-live="polite"`, empty content | n/a | n/a | n/a | n/a | n/a | silent during autoplay advances |
