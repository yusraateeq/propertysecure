# Requirements Analysis — Property Security Services, Inc Website

**Phase:** 1 — Discovery (read-only analysis)
**Date:** 2026-11-09
**Analysts:** Head of Product & Project (lead), product/business-analyst, product/product-owner
**Method:** Manual file reads only. No build, lint, tests, or visitor data. Every finding below cites the file where it was observed or the search that found nothing.
**Note:** Canonical copy at `docs/product/requirements-analysis.md`; this is the authored working copy (tool permission path workaround).

## 1. Empirical inspection counts

- **Routes:** 7 (`/`, `/about`, `/services`, `/construction-security`, `/contact-us`, `/employment`, `/policies-procedure`) from `app/*` glob (11 `app/*.tsx` files incl. shell: `layout.tsx` 95 lines, `loading.tsx` 16, `not-found.tsx` 13, `template.tsx` 16)
- **Files inspected:** 37 TypeScript/JSON source files totaling **2,752 lines** (shell-measured):
  - `app/` — 11 files, 487 lines (route pages: `page.tsx` 26, `about` 63, `services` 60, `construction-security` 33, `contact-us` 51, `employment` 76, `policies-procedure` 38)
  - `lib/` — 4 files, 971 lines (`site.ts` 99, `content/policies-procedure.json` 715, `content/construction-security.json` 108, `motion.ts` 49)
  - `components/` — 22 files, 1,294 lines (largest: `layout/Header.tsx` 212, `sections/Hero.tsx` 184, `sections/Testimonials.tsx` 116)
- **Searches that returned nothing (negative evidence):** `app/sitemap.ts` and `app/robots.ts` MISSING; `app/privacy` and `app/terms` MISSING (path tests); no FAQ or case-study component under `components/` (glob); no client-logo strip in any section component.

## 2. What the product is (observed facts)

A single-company B2C/B2B marketing site for **Property Security Services, Inc** (`lib/site.ts:3–13`): a California BSIS private patrol operator (license badge "PPO Lic # 119841", `lib/site.ts:5`), HQ Granada Hills, CA (`lib/site.ts:10`), selling contracted guard labor and equipment:

- **Core service lines** (`lib/site.ts:34–56`): Commercial (high-rise, hotels, warehouses, government facilities, banks), Residential (apartment complex front-desk), Retail (loss prevention).
- **Split services** (`lib/site.ts:58–75`): Emergency/Events (crowd control, executive protection, press/paparazzi handling) and Construction Site Management (customized packages, trailer guard).
- **Construction deep-dive exists** as data-driven content: `lib/content/construction-security.json` (108 lines) — access control, off-peak patrols, Standing Guard vs Trailer Guard with trailer/equipment package.
- **Operations credibility content:** `lib/content/policies-procedure.json` (715 lines, 11 h2 sections) — quality management, BSIS licensing narrative, hiring qualifications, drug testing, patrol division, insurance ($2M GL + workers comp + auto, "COI available upon request"), contracts.
- **Not sold:** alarm monitoring, product sales, subscriptions. All monetization paths route to a quote request.

**The one recurring conversion is the quote funnel — currently `mailto:`-only** (`components/forms/QuoteForm.tsx:24` submits by opening the visitor's email client; no backend, no success page). Single most consequential product finding.

## 3. Page-by-page inventory (purpose / content observed / CTAs / gaps)

### `/` — `app/page.tsx` (26 lines; 7 sections)
- **Purpose:** brand + trust + lead capture.
- **Blocks observed:** `Hero` (2-slide carousel, license badge `components/sections/Hero.tsx:109`; "Request Quote" → `/contact-us#quote` and tel buttons `Hero.tsx:133–149`); `Introduction` trust strip — "33+ Years", license, "24/7 Support Available", "CA Statewide Service" (`components/sections/Introduction.tsx`); `Services` 3 cards; `SplitServices` 2 cards; `AboutStatement` blockquote; `WhyChooseUs` 7 checked bullets incl. trailer/equipment detail (`lib/site.ts:77–85`); `Testimonials` carousel — **exactly 3 hardcoded quotes** (`lib/site.ts:87–99`; ratings 5 / 4.5 / 4).
- **CTAs:** Request Quote, tel:(844) 488-1032, "See More" ×5 → `/services#slug`, video modal (`WhyChooseUs.tsx:66` + `components/ui/VideoModal.tsx`).
- **Gaps:** no client-logo strip, no case studies, no metrics beyond the 4-item trust strip, no FAQ anchor.

### `/about` — 63 lines
- **Blocks:** page hero; "more than 32 years" claim (`app/about/page.tsx:39`); "Over 75% of our new clients are gained as a result of… referral" (unverified, `page.tsx:40`); 3 commitment cards (Supervision / Reliability / Communication).
- **CTAs:** none inline; closing `QuoteCta` banner (`components/layout/QuoteCta.tsx`).
- **Gaps:** **32 (about:39) vs 33 (site.ts/intro) years inconsistency**; no leadership names/bios; no stats; no link to the policies page.

### `/services` — 60 lines
- **Blocks:** page hero; anchored service articles (`#commercial-security`, `#residential-security`, `#retail-security`); "See / Download Flyer" → `/documents/security-flyer.pdf` (exists under `public/documents/`); 2 split cards (`#emergency-security`, `#construction-management`).
- **CTAs:** flyer download; `QuoteCta`.
- **Gaps:** Emergency and Construction get one short card each; no pricing explainer; no inline quote form (user must navigate to `/contact-us#quote`).

### `/construction-security` — 33 lines (data-driven from JSON)
- **Purpose:** highest-differentiation offering (trailer guards, alarm systems).
- **CTAs:** `QuoteCta` only; in-content CTA is prose inside a paragraph.
- **Gaps (verified defect):** `lib/content/construction-security.json:106` tells buyers to call **(818) 488-1032 / sales@propertysecurityinc.com**, while the site single source is **(844) 488-1032 / info@PropertySecurityInc.com** (`lib/site.ts:6–7`). Two different live numbers inside one paid-service funnel = direct lead loss / trust damage.

### `/contact-us` — 51 lines (conversion hub)
- **Blocks:** page hero; 4 detail cards (address + Google Maps link, tel, mailto, hours "Mon – Fri 9:00 – 16:00" — `lib/site.ts:9`); license/phone/email panel; **QuoteForm** anchored `#quote`.
- **Form fields** (`components/forms/QuoteForm.tsx:30–35`): name*, email*, phone (optional), service select (3 core + 2 split options), message*.
- **Gaps:** submit is mailto (`QuoteForm.tsx:24`) — **on a device with no mail handler, the lead is silently lost after the visitor typed everything**; only an sr-only `aria-live` acknowledgment exists (`QuoteForm.tsx:40`); published hours contradict "24/7" claims (`Introduction.tsx`, contact copy) — and TopBar hours are visible site-wide.

### `/employment` — 76 lines (recruiting)
- **Blocks:** EEO/ADA copy; external guard-card training link; 9 downloadable PDF employment forms (incl. "**Form W-4 (2019)**" — stale label, `app/employment/page.tsx:17`); "Verify Your Guardcard" → search.dca.ca.gov (`page.tsx:74`).
- **CTAs:** "Apply by Email" mailto; PDFs; 2 external links.
- **Gaps:** no job openings list (roles, pay, locations); no online application form.

### `/policies-procedure` — 38 lines (renders a 715-line JSON document)
- **Purpose:** long-form trust/ops document with sticky TOC — strongest raw content asset (insurance numbers, BSIS narrative, training curriculum).
- **CTAs:** `QuoteCta` only; **no inline link from the "contact us for price quote" prose to the contact form**.
- **Gaps:** wall-of-text; insurance/COI proof (buyers' #1 vendor-diligence item) buried here, not surfaced on homepage or contact.

### Global shell
- `app/layout.tsx` (95 lines): TopBar (license, email, phone, hours, socials); sticky `Header` (212 lines) with "Request Quote" buttons (`Header.tsx:124,208`) and mailto panel (`Header.tsx:216`); `Footer` (56 lines) with 7-item nav (`site.ts:15–23`), contact column, `SocialLinks`, **TrustedSite placeholder — an empty styled div, not a real badge** (`Footer.tsx:47–49`), copyright + dev credit; `MobileCallButton` sticky "Call Now" (21 lines); LocalBusiness JSON-LD + OG/Twitter metadata in layout.
- **Verified missing:** legal links in footer nav, `app/sitemap.ts`, `app/robots.ts`, privacy/terms routes.
- `SocialLinks` renders a **dead Google+ profile link** (`lib/site.ts:30`) — plus.google.com is shut down; every click errors.

## 4. Requirements gap analysis vs a competitive US property/construction-security site

| # | Required capability | Status | Evidence |
|---|---|---|---|
| 1 | License number + verifiable lookup link | PARTIAL — number in 5+ places (`TopBar.tsx:12`, `Hero.tsx:109`, `Footer.tsx:24`, trust strip, contact panel), **no buyer-facing BSIS/DCA lookup link**; only applicant-side guard-card verify (`employment/page.tsx:74`) |
| 2 | Working lead capture with real delivery | **FAIL** — mailto-only (`QuoteForm.tsx:24`), no backend, no confirmation, no spam protection |
| 3 | Legal pages (privacy, terms) | **MISSING** — no routes; no footer legal links |
| 4 | sitemap.xml / robots.txt | **MISSING** (per-route metadata + canonical + OG/Twitter do exist in `layout.tsx`) |
| 5 | Testimonials with verifiability | PARTIAL — 3 hardcoded quotes (`site.ts:87–99`), home only, no review links, no Review schema |
| 6 | Case studies / named accounts | **MISSING** — searched all routes + both content JSONs; only vague copy (`about/page.tsx:40`) |
| 7 | Client-logo strip | **MISSING** — no such component | glob |
| 8 | FAQ (procurement Q&A, FAQPage schema) | **MISSING** — no route or component | glob |
| 9 | 24/7 emergency line distinction | **CONTRADICTORY** — "24/7" claimed (`Introduction.tsx`, `QuoteCta.tsx:14`, contact copy) vs "Mon – Fri 9:00 – 16:00" (`site.ts:9`, TopBar) |
| 10 | Insurance/COI surfaced where buyers look | PARTIAL — $2M GL / workers comp / auto only inside `policies-procedure.json` insurance section |
| 11 | Content single source of truth | **FAIL** — phone/email conflict (JSON:106 vs `site.ts`); 32-vs-33 years (`about:39`); dead Google+ (`site.ts:30`); "Form W-4 (2019)" (`employment:17`) |
| 12 | Service-area page beyond "Statewide CA" bullet | **MISSING** — no locations route in `app/` | glob |
| 13 | Functional trust badge | PARTIAL — placeholder div only (`Footer.tsx:47–49`) |
| 14 | Pricing transparency (even "how we price") | **MISSING** — quote-gated only | negative search |

**Net read:** unusually strong *narrative* credibility assets (715-line ops document, real equipment detail, license number everywhere) but broken *mechanical* trust/conversion plumbing: a quote funnel that can silently discard leads, contradictory contact data on a money page, no legal/SEO floor, no verifiable third-party proof (logos, case studies, review links, BSIS lookup link).

## 5. Audience segments observed (copy-derived, not user research)

| Segment | Evidence |
|---|---|
| General contractors / construction firms | dedicated route + JSON; construction testimonials `site.ts:89,95` (Rialto, Long Beach); biggest long-form content investment (dedicated page + 715-line document) |
| Property/apartment owners & HOAs | Residential copy `site.ts:46`; HOA/communities refs in `policies-procedure.json` |
| Facility managers (hotel/warehouse/gov) | `site.ts:39` |
| Retail loss-prevention managers | `site.ts:53` |
| Event organizers / VIP protection | `site.ts:64`; "executives to celebrities" in `policies-procedure.json` |
| Officers / applicants (secondary funnel) | `/employment`: 9 PDF forms + external training link |

**Assumptions (inferred, not observed):** segments are copy-derived; no analytics on disk; whether the 844 number is truly answered 24/7 cannot be determined from code — open business question requiring client confirmation.

## 6. Conversion goals per route (observed state)

| Route | Conversion action | Reachable? |
|---|---|---|
| `/` | Quote request | Yes (hero + header); mailto-risk at submit |
| `/about` | Quote / phone | QuoteCta banner only |
| `/services` | Quote + flyer download | QuoteCta |
| `/construction-security` | Phone call | **Compromised — wrong number in body copy (JSON:106)** |
| `/contact-us` | Submit quote form | Yes — mailto-risk at submit |
| `/employment` | Apply by email | Yes |
| `/policies-procedure` | none inline | Prose CTA not linked |

## 7. Defects that matter most (evidence-ranked)

1. `components/forms/QuoteForm.tsx:24` — mailto-only submit = probable majority-of-mobile lead loss (highest revenue risk).
2. `lib/content/construction-security.json:106` — wrong phone (818 vs 844) + wrong email (sales@ vs info@) published to buyers.
3. `lib/site.ts:9` hours vs "24/7" claims — trust contradiction visible in TopBar on every page.
4. No legal pages, sitemap, robots — compliance and crawl floor gaps.
5. `lib/site.ts:30` dead Google+ link in the site-wide footer/socials.
6. `components/layout/Footer.tsx:47–49` placeholder trust badge.

## 8. Recommendation backlog

Moved to the companion deliverable: **`docs/product/prd-recommendations.md`** (analysis-mode PRD + P0/P1/P2 backlog with acceptance criteria; all items are proposals — no code changed in this phase).
