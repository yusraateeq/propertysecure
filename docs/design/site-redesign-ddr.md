# Property Security Services — Site Redesign Decisions

## Brief

- **Audience:** California businesses, residential communities, institutions, retailers, construction sites, and people seeking security services.
- **Mood:** authoritative, established, calm, premium, and clear.
- **Conversion:** request a quote or call the company.
- **Content constraints:** retain the supplied logo and genuine testimonials; use only existing service and location information; distinguish office hours from security assignment availability; do not imply alarm monitoring is sold.
- **Brand:** use the supplied navy, blue, gold, white, and soft-neutral direction. Keep the existing light-first pages with navy sections; no theme switcher.

## Design decisions

- **Typography:** Merriweather headings + Manrope body, pairing **FP-0009**. The pairing provides an editorial headline voice with neutral, readable body copy.
- **Homepage layout:** **LB-0063** (agency-home, full-bleed visual, fit 5, airy). Keep the existing hero scene and organize the page around services, process, proof, coverage, testimonials, FAQ, and a final conversion section.
- **Theme reference:** **TH-0013** (light-first, high-contrast) is retained as a contrast-check reference from the existing hero specification, not as the site palette. Its magenta/green accents conflict with the company’s supplied navy/gold brand, so those colors are not applied.
- **Motion:** **MT-01** with the existing Framer Motion stack. Keep the hero as the only scroll-linked motion owner; retain reduced-motion behavior; no 3D, GSAP, Lenis, or new dependencies.

## Implementation guardrails

- Keep the business address, phone, email, PPO license, and published weekday office hours sourced from `lib/site.ts`.
- Avoid unsupported response-time, referral, award, rating, service-area, and staffing guarantees.
- Use California-wide wording only where the existing site states statewide coverage; list Granada Hills and Los Angeles only as verified locations.
- The quote form continues to open the visitor's email application; it must not report a server-side submission.
- Preserve keyboard navigation, visible focus, responsive layouts, and reduced-motion behavior.
