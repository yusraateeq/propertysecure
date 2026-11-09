# Analysis-Mode PRD — Property Security Services, Inc Website (Recommendations)

**Phase:** 1 — Discovery (read-only). **ALL ITEMS BELOW ARE PROPOSALS. No code was changed in this phase.**
**Date:** 2026-11-09
**Companion evidence:** `docs/product/requirements-analysis.md` (page-by-page inventory; all citations below reference files verified in that analysis — 37 files / 2,752 lines read, 7 routes).

## 1. Product summary (as observed)

Contract security-guard services company site (Property Security Services, Inc — BSIS PPO Lic # 119841, `lib/site.ts:5`). Seven routes. Content-driven architecture (`lib/content/*.json` render via `components/ui/ContentBlocks.tsx`). Conversion = quote request via phone `(844) 488-1032` or the single mailto-based form on `/contact-us#quote` (`components/forms/QuoteForm.tsx:24`).

**Central thesis:** the site's content is ahead of its conversion and trust plumbing. Narrative credibility is strong; the funnel can silently lose leads, key data contradicts itself across pages, and the legal/technical-SEO plus third-party-proof floor expected by US B2B buyers is absent.

## 2. Key findings (each = evidence in requirements-analysis §3–§7)

- **F1 — Funnel integrity:** QuoteForm is mailto-only; no server-side delivery, no success state beyond an sr-only notice.
- **F2 — Data conflicts:** wrong phone/email in `construction-security.json:106`; 32-vs-33 years; 24/7 claims vs `site.ts:9` office hours; dead Google+ link; stale "Form W-4 (2019)".
- **F3 — Missing floor:** no privacy/terms routes, no sitemap.xml, no robots.txt.
- **F4 — Verifiability gap:** license number shown but never linked to BSIS/DCA lookup for buyers.
- **F5 — Proof depth:** only 3 hardcoded testimonials; zero case studies, client logos, FAQ, service-area page.
- **F6 — Under-used differentiator:** construction security is the deepest content but its page lacks a real CTA component and carries the wrong contact data.

## 3. Prioritized backlog (P0/P1/P2) with acceptance criteria

Priority logic: P0 = revenue loss, legal exposure, or factual trust damage; P1 = material conversion/credibility lift; P2 = polish. Every item is a proposal with testable acceptance criteria (Given/When/Then).

### P0-1 — Real quote submission (fix funnel integrity) — from F1
Today: mailto submit (`QuoteForm.tsx:24`).
- **AC1:** Given a valid submission (name, email, message), When the visitor submits, Then a lead reaches the company via a server-side channel (email API or database) without relying on the visitor's mail client.
- **AC2:** Given successful submission, When the request completes, Then a visible success confirmation renders on-page; Given invalid input, When submitted, Then inline field errors appear and entered values are preserved.
- **AC3:** Given anti-spam requirement, When the form is targeted, Then a mechanism (honeypot/token) blocks or rate-limits automated submissions.
- **AC4:** Given a visitor without a configured mail client, When they submit, Then no draft is lost (no dependency on `window.location.href = 'mailto:'`).

### P0-2 — Correct published contact data (single source of truth) — from F2
Today: `(818)/sales@` live in `construction-security.json:106` vs `(844)/info@` in `lib/site.ts`.
- **AC1:** Given any route, When its content renders, Then every phone number and email string equals `business.phoneDisplay` / `business.email` from `lib/site.ts` (grep across `app/`, `components/`, `lib/` returns zero divergent contact literals).
- **AC2:** Given `/construction-security`, When rendered, Then the learn-more CTA is a `tel:` link and a `mailto:` link pointing at the canonical numbers.
- **AC3:** Given the 32-vs-33 years conflict, When any page mentions founding experience, Then a single constant (e.g., `yearsExperience` in `lib/site.ts`) is the only source; pages render from it.

### P0-3 — Reconcile the 24/7 claim with published hours + emergency path — from F2
Today: "24/7 Support Available" (trust strip, `QuoteCta.tsx:14`, contact copy) vs "Mon – Fri 9:00 – 16:00" (`site.ts:9`, TopBar site-wide).
- **AC1:** Given the client confirms actual availability, When the site renders, Then hours copy is internally consistent: either the claim is changed to match actionable hours, or a distinct 24/7 dispatch `tel:` line is added.
- **AC2:** Given any page, When a visitor needs urgent help, Then an emergency/dispatch phone link is reachable in ≤1 click (header, TopBar, or sticky component — `MobileCallButton` already exists and may be repurposed).
- **AC3 (business input required):** the prioritization of AC1 vs AC2 depends on whether the 844 line is genuinely answered 24/7 — flagged assumption, needs client confirmation.

### P0-4 — Legal pages + sitemap.xml + robots.txt — from F3
Today: no `/privacy`, `/terms`, `app/sitemap.ts`, `app/robots.ts` (verified path tests).
- **AC1:** Given `/privacy` and `/terms` exist, When each renders, Then it has a unique H1, last-updated date, full policy text, and is linked from the Footer.
- **AC2:** Given `/sitemap.xml`, When crawled, Then it returns 200 and lists all existing routes plus the new legal pages.
- **AC3:** Given `/robots.txt`, When crawled, Then it returns 200 and declares the sitemap URL.
- **Client note:** actual privacy/terms text requires client/business sign-off (this analysis only defines the acceptance criteria).

### P1-1 — License verifiability link — from F4
Today: "PPO Lic # 119841" appears in 5+ places; no buyer-facing BSIS/DCA lookup link (`employment/page.tsx:74` is applicant-only).
- **AC1:** Given the license badge in TopBar/Footer/Contact, When a visitor clicks it, Then it opens the official DCA/BSIS license-lookup search for the company PPO number.
- **AC2:** Given the policies-procedure licensing section, When rendered, Then it links the PPO number for verification.

### P1-2 — FAQ section with FAQPage schema
- **AC1:** Given an FAQ component (home section and/or `/faq`), When rendered, Then ≥6 procurement questions are answered (pricing model, quote turnaround, response time, service area, armed/unarmed, contract/cancellation).
- **AC2:** Given keyboard-only use, When tabbing, Then accordions are fully operable and emit `FAQPage` JSON-LD in the page head.

### P1-3 — Case studies / named construction proof — from F6, F5
- **AC1:** Given the testimonials dataset (`site.ts:87–99`), When a reviews surface renders, Then ≥5 attributed testimonials exist with role/location, presented on ≥2 pages (e.g., home + dedicated page or construction page).
- **AC2:** Given case-study content, When rendered, Then ≥2 construction project summaries (scope, site type, duration or outcome) link to `/construction-security`.
- **AC3:** Given consent requirements, When publishing any client name, Then usage is client-approved (proposal includes consent verification as a task gate).

### P1-4 — Service-area page
- **AC1:** Given `/service-areas` exists, When rendered, Then served regions are listed per actual operations (Granada Hills HQ + statewide-CA claim must be substantiated or scoped down), each region links relevant services, and the page appears in footer nav + sitemap.
- **Client note:** the true service-area list must come from the business (assumption flagged).

### P1-5 — COI/insurance proof surfaced above the fold where buyers look
- **AC1:** Given the $2M GL/wc/auto statements exist (`policies-procedure.json` insurance section), When facade/summary content renders on home or contact, Then a proof strip mentions coverage + "Certificate of Insurance available on request" and links to the full section.

### P2-1 — Social & badge hygiene — from F2/F6
- **AC1:** Given `site.ts:25–32`, When socials render, Then all links resolve to live pages (Google+ removed or replaced) with correct `rel`/`target`/aria labeling.
- **AC2:** Given the TrustedSite placeholder (`Footer.tsx:47–49`), When shipped, Then either a real verified badge renders or the placeholder is removed (no fake-trust UI).

### P2-2 — Employment modernization
- **AC1:** Given `/employment`, When rendered, Then current-year form versions replace the "Form W-4 (2019)" label (`page.tsx:17`), and a current openings list (role, location, shift) is present or the section states "accepting applications year-round".
- **AC2:** Given employment legal-doc URLs, When the label references a year, Then the PDF linked matches that year.

### P2-3 — 404 polish
- **AC1:** Given an unknown URL, When `not-found.tsx` renders, Then links to Home/Services/Contact are offered (currently only "Return Home", `app/not-found.tsx`, 13 lines).

## 4. Explicitly out of the first backlog (scope-control)

- Multi-step quote funnels, live chat, pricing calculators, video testimonials, blog — deferred; cheaper items (P0-2..4, P1-1, P1-2) dominate value-per-effort.
- No stack/tooling changes proposed in this phase (no backend vendor chosen; P0-1's delivery mechanism needs an engineering decision, not a product mandate).

## 5. Open questions requiring client/business input

1. Is (844) 488-1032 answered 24/7? (decides P0-3 shape; unverifiable from code)
2. Which phone/email is canonical — is the (818)/sales@ pair a second office or stale? (resolves P0-2)
3. Are testimonial attributions consented and accurate?
4. What is the real service-area list? (P1-4)
5. Quote-lead delivery channel preference (email API vs CRM vs DB)? (P0-1 implementation choice)

## 6. Proposed phase sequencing (for the orchestrator)

- **Next phase (Architecture):** decide P0-1 delivery mechanism (new dep concerns — approval required), data model for testimonials/FAQ/areas, sitemap/legal implementation approach.
- **Then:** implement P0-2/P0-3 content unification first (small, zero-risk), P0-1 funnel, P0-4 floor; P1 items follow with the design dept (uiux-special datasets must be used for any new sections).
