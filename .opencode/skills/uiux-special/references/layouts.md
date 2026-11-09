# Layout Reference

1,200 blueprints built from 40 page types, 12 layout families, and 12 hero patterns.
Each page type gets 6 families × 5 heroes = 30 blueprints.

## Query

```bash
node .opencode/skills/uiux-special/scripts/query.mjs layouts --page saas-landing --fit 4 --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs layouts --group commerce --density comfortable --limit 10
node .opencode/skills/uiux-special/scripts/query.mjs layout LB-0009
```

Always query by `page` first. Prefer `fit: 5`, accept `fit: 4`, and treat `fit <= 3` as
an experiment that needs a reason.

## The 12 layout families

| Family | Grid | Container | Density | Use when |
| --- | --- | --- | --- | --- |
| `classic-single-column` | 1 column, 7-col measure | 720-880px | comfortable | reading, policy, simple marketing |
| `split-asymmetric` | 5/7 or 7/5 | 1280px | comfortable | SaaS hero, product detail, auth |
| `editorial-grid` | 8/4 and 4/8 offsets | 1200px | airy | blog, magazine, case study |
| `bento` | modular spans 3/6/4/8 | 1280px | compact | feature storytelling, dashboards |
| `sidebar-app` | 240-280px rail + fluid main | full viewport | compact | apps, docs, inbox, settings |
| `dashboard-grid` | KPI 3-up, charts 6/6 | 1440px | dense | analytics, admin, overview |
| `full-bleed-immersive` | 100vw media + overlay grid | 100vw / 1200px | airy | property, travel, portfolio |
| `card-stack` | centered 1-3 cards | 960-1120px | comfortable | commerce, pricing, listings |
| `masonry` | 4-col variable heights | 1280px | compact | galleries, inspiration, recipes |
| `magazine` | feature well + sidebar | 1320px | editorial | long-form, news, culture |
| `centered-minimal` | single 640-720px measure | 640-720px | airy | auth, waitlist, focused tasks |
| `data-dense-table` | full-width table + filter rail | 1440px | dense | admin, CRM, records |

## The 40 page types

### Marketing (8)

`saas-landing`, `startup-landing`, `agency-home`, `personal-portfolio`, `pricing-page`,
`waitlist-page`, `careers-page`, `nonprofit-home`

### Editorial (7)

`blog-index`, `blog-post`, `news-home`, `magazine-feature`, `docs-article`, `changelog`,
`case-study`

### Commerce (8)

`ecommerce-home`, `product-detail`, `collection-page`, `checkout-flow`,
`real-estate-listing`, `property-detail`, `booking-flow`, `restaurant-home`

### App (8)

`dashboard-overview`, `analytics-dashboard`, `admin-table`, `settings-page`,
`onboarding-flow`, `user-profile`, `project-board`, `calendar-app`

### Auth (3)

`auth-login`, `auth-signup`, `auth-reset`

### Directory (6)

`marketplace-listing`, `search-results`, `menu-page`, `travel-guide`, `job-board`,
`event-listing`

## The 12 hero patterns

| Hero | Best on | Avoid on |
| --- | --- | --- |
| `centered-statement` | focused marketing, waitlist | dense apps |
| `split-hero` | SaaS, product detail, auth | pure editorial |
| `full-bleed-visual` | real estate, travel, portfolio | data tables |
| `product-demo` | SaaS, tools, launch | text-heavy pages |
| `story-scroll` | brand, case study, magazine | admin screens |
| `editorial-type` | blog, magazine, culture | commerce |
| `search-first` | directory, docs, marketplace | brand storytelling |
| `comparison-table` | pricing, B2B, plans | visual-first brands |
| `product-shot` | commerce, hardware, apps | long-form |
| `data-preview` | dashboards, analytics | marketing homepages |
| `form-first` | auth, onboarding, lead capture | content pages |
| `interactive-demo` | SaaS, developer tools | low-bandwidth audiences |

## Selection tree

1. Identify the page type. If it is not in the 40, choose the closest and say so.
2. Filter `fit >= 4`. If nothing is left, widen to `fit >= 3` and note the compromise.
3. Match density:
   - marketing -> airy or comfortable
   - editorial -> editorial or airy
   - commerce -> comfortable or compact
   - app -> compact or dense
4. Match navigation:
   - marketing and editorial -> sticky top nav
   - app -> sidebar (desktop) and bottom nav or drawer (mobile)
   - auth -> minimal chrome, no full nav
5. Keep one primary and one alternate blueprint.
6. Copy `sections`, `responsive`, and `motion` exactly, then adapt content.

## Responsive rules

Breakpoints: 480, 768, 1024, 1280, 1536.

- 12-col desktop -> 6-col tablet -> 1-col mobile is the default collapse.
- Sidebars become a rail at 1024 and a drawer or bottom nav at 768.
- Tables keep priority columns and scroll horizontally; never squeeze every column.
- Bento tiles go 4-up -> 2-up -> 1-up.
- Hero splits stack with media first on mobile only when the image carries meaning.
- Sticky elements become static on short viewports to protect content.
- Tap targets >= 44x44px; keep primary actions in the thumb zone.
- Test at 320px width, 200% zoom, and with long translated strings.

## Blueprint anatomy

```json
{
  "id": "LB-0009",
  "page": "saas-landing",
  "family": "bento",
  "hero": "product-demo",
  "fit": 5,
  "sections": ["nav", "hero:product-demo", "logo-cloud", "feature-tabs", "..."],
  "wireframe": [{ "order": 1, "block": "nav", "span": "auto" }]
}
```

Wireframe notation:

- `rail` - fixed or sticky sidebar region.
- `full` - full-bleed region.
- `auto` - follows the family grid.
- `hero:<pattern>` - hero variant to render.

## Worked examples

| Page | Blueprint | Why |
| --- | --- | --- |
| SaaS landing | `LB-0002` split-asymmetric / split-hero | form or demo next to the value proposition |
| SaaS landing | `LB-0009` bento / product-demo | feature storytelling with uneven emphasis |
| Property detail | `LB-0614` magazine / story-scroll | gallery-led narrative with an agent rail |
| Dashboard | `LB-0691` dashboard-grid / data-preview | KPI row first, charts second |
| Dashboard | `LB-0701` data-dense-table / data-preview | record-heavy operations |
| Blog post | `LB-0271` magazine / editorial-type | reading-first with a feature well |
| Checkout | `LB-0542` split-asymmetric / split-hero | form and order summary side by side |

## Common mistakes

- Choosing a beautiful family that does not fit the page's job.
- Using a marketing hero for an app screen.
- Forcing a 12-col grid onto a 640px reading page.
- Designing only the desktop breakpoint.
- Hiding the primary action below the fold on mobile.
- Making every section full-bleed; contrast in rhythm is what makes it feel designed.
- Copying a blueprint's ordering without adapting it to the product's story.
