# Selection Recipes

Starting points by industry. Each recipe is a hypothesis, not a rule. Confirm with the
query tool, then record the final choice in the Design Decision Record.

All commands run from the repository root.

## 1. Real estate / property management

Prompt signals: property, listings, agents, luxury homes, rentals, US market, trust.

- **Type:** Fraunces or Playfair Display heading + Inter or Manrope body. Mono only for
  prices and reference IDs.
- **Layout:** `LB-0063` agency-home / full-bleed for the brand home, `LB-0571` for the
  listing page, `LB-0614` for property detail, `LB-0657` for booking.
- **Theme:** `TH-0801` warm-neutral with a navy-indigo accent; alternate `TH-0502` deep
  teal. Light-first.
- **Motion:** reveal mask + parallax. 3D image displacement on the hero gallery only.
- **Avoid:** startup gradients, playful display faces, autoplay video with sound, stock
  photos without a scrim.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for property-management --strategy warm-neutral --hue 240 --limit 5
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page property-detail --fit 4 --limit 6
```

## 2. SaaS / B2B product

Prompt signals: platform, dashboard, workflow, teams, API, analytics, enterprise.

- **Type:** Space Grotesk or Sora heading + Inter body. Add JetBrains Mono for code and
  IDs.
- **Layout:** `LB-0002` split hero for the marketing site, `LB-0009` bento for features,
  `LB-0691` dashboard-grid, `LB-0700` sidebar-app.
- **Theme:** `TH-0805` cool-neutral indigo; alternate `TH-0666` sky-teal. Dark-first for
  the app, light-first for marketing if the brand is bright.
- **Motion:** fade-up, count-up, one product demo. 3D only for a point globe or shader
  gradient with a static fallback.
- **Avoid:** serif body, decorative 3D, more than one accent, fake dashboard screenshots.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for saas --strategy cool-neutral --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page saas-landing --fit 5 --limit 8
```

## 3. Fintech

Prompt signals: payments, banking, security, compliance, money, trust.

- **Type:** Inter or IBM Plex Sans + JetBrains Mono for figures. No display face in the
  product UI.
- **Layout:** `LB-0691` dashboard, `LB-0751` data-dense table, `LB-0002` marketing hero,
  `LB-0931` auth.
- **Theme:** `TH-0754` cobalt high-contrast; alternate `TH-0805` indigo. Dark-first.
- **Motion:** minimal and fast. Count-up for metrics. No parallax in the app shell.
- **Avoid:** neon on black, crypto clichés, playful fonts, low-contrast gray, motion that
  delays a transaction.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for fintech --strategy high-contrast --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page admin-table --fit 5 --limit 6
```

## 4. Ecommerce

Prompt signals: products, cart, checkout, collection, retail, conversion.

- **Type:** DM Sans or Manrope body with Fraunces only for editorial brand moments. Mono
  for prices if the brand is technical.
- **Layout:** `LB-0467` home, `LB-0492` product detail, `LB-0517` collection,
  `LB-0542` checkout.
- **Theme:** `TH-0925` cool-neutral violet; alternate `TH-0545` aqua. Light-first, accent
  reserved for add-to-cart and price emphasis.
- **Motion:** hover zoom, quick feedback, marquee for social proof. 3D card tilt only on
  product cards.
- **Avoid:** accent on every button, slow hero video, hidden shipping costs, fake reviews.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for ecommerce --strategy cool-neutral --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page product-detail --fit 5 --limit 6
```

## 5. Agency / portfolio

Prompt signals: creative, studio, showcase, bold, experimental, awards.

- **Type:** Bricolage Grotesque or Syne heading + Inter body. One display face maximum.
- **Layout:** `LB-0063` full-bleed home, `LB-0065` story-scroll, `LB-0096` portfolio,
  `LB-0101` centered case study.
- **Theme:** `TH-1013` magenta high-contrast; alternate `TH-0893` violet high-contrast.
  Either mode.
- **Motion:** split headline, cursor follower, particle field or morphing blob. Keep the
  work, not the effect, the hero.
- **Avoid:** effects that hide the work, seven fonts, scroll hijacking, unreadable
  experimental type.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for agency --strategy high-contrast --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page agency-home --fit 5 --limit 8
```

## 6. Health / wellness

Prompt signals: care, patients, clinic, wellness, calm, accessible.

- **Type:** Manrope or Figtree + Source Sans 3. Large body text, generous line height.
- **Layout:** `LB-0002` service landing, `LB-0657` booking, `LB-0691` patient dashboard,
  `LB-0271` article.
- **Theme:** `TH-0550` tinted aqua-teal. Light-first. Dark mode available for portals.
- **Motion:** gentle fade and reveal. No 3D, no aggressive parallax.
- **Avoid:** alarming red as brand, dense text, small tap targets, motion without a
  reduced-motion path.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for health --strategy tinted --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page booking-flow --fit 5 --limit 6
```

## 7. Education

Prompt signals: courses, students, lessons, learning, academy.

- **Type:** Fraunces or Newsreader heading + Inter body for editorial courses; Manrope for
  product UI.
- **Layout:** `LB-0034` course landing, `LB-0271` lesson article, `LB-0362` docs,
  `LB-0691` learner dashboard.
- **Theme:** `TH-0810` tinted indigo. Light-first, dark mode for study sessions.
- **Motion:** reveal, progress indicators, gentle stagger. No heavy 3D.
- **Avoid:** childish fonts for adult learners, gamification noise, low contrast.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for education --strategy tinted --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page docs-article --fit 4 --limit 6
```

## 8. Restaurant / hospitality

Prompt signals: menu, reservation, dining, hotel, experience.

- **Type:** Cormorant Garamond or Fraunces heading + DM Sans body.
- **Layout:** `LB-0664` restaurant home, `LB-1092` menu page, `LB-0657` booking,
  `LB-0215` story page.
- **Theme:** `TH-0064` ember warm-neutral; alternate `TH-0142` gold. Light-first.
- **Motion:** parallax and image reveals. Optional 3D product orbit for a signature dish.
- **Avoid:** neon, cluttered menus, text over food photos without a scrim, tiny menu type.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for restaurant --strategy warm-neutral --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page menu-page --fit 5 --limit 6
```

## 9. Nonprofit

Prompt signals: mission, donate, impact, community, volunteers.

- **Type:** Source Serif 4 heading + Public Sans body. Humanist and trustworthy.
- **Layout:** `LB-0215` nonprofit home, `LB-0217` split hero, `LB-0436` case study,
  `LB-0271` story article.
- **Theme:** `TH-0670` tinted sky-blue. Light-first.
- **Motion:** gentle story scroll and counters for impact.
- **Avoid:** guilt-driven imagery, low-contrast "soft" palettes, hidden donation costs.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for nonprofit --strategy tinted --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page nonprofit-home --fit 5 --limit 6
```

## 10. Media / editorial

Prompt signals: news, magazine, blog, publishing, long-form, culture.

- **Type:** Instrument Serif or Newsreader heading + Inter body. JetBrains Mono for
  metadata and timestamps.
- **Layout:** `LB-0271` article, `LB-0337` feature, `LB-0343` immersive story,
  `LB-0312` news home.
- **Theme:** `TH-0142` warm paper gold; alternate `TH-0001` ember. Light-first.
- **Motion:** reveal mask, reading progress. No 3D.
- **Avoid:** autoplay video, infinite scroll without pagination fallback, pop-ups over
  reading content.

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for media --strategy warm-neutral --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page news-home --fit 5 --limit 6
```

## Cross-industry defaults

- Start with fit-5 layouts and one primary + one alternate.
- Start with one theme and two alternates from a different hue family.
- Use the same font pairing across marketing and app unless the brand demands a split.
- Add 3D only when the prompt names an experience, product, or global story.
- When unsure, choose the quieter option. Restraint is easier to defend than spectacle.
