# Template Recipes

Twelve end-to-end blueprints. Adapt the sections and motion to the `uiux-special` Design
Decision Record; do not copy the visual style blindly. Each recipe assumes the static
version is built and verified before motion is added.

## MT-01 - Cinematic SaaS landing

**Use when:** A product launch needs a premium first impression without becoming a demo reel.

**Stack:** Next.js, Motion, R3F/Drei (optional), GSAP + Lenis (optional), Tailwind, Lucide.

**Sections:** sticky nav, hero with product visual, logo strip, problem/solution, feature
bento, product proof, metrics, pricing, FAQ, final CTA, footer.

**Motion beats:**
- hero copy: 3-step stagger, 500-700ms total
- product visual: scroll-linked camera or a single slow float
- feature bento: group reveal, not one trigger per card
- metrics: NumberFlow or a one-time count-up
- nav: compact on scroll, no jitter

**3D scene:** floating product or shader gradient. One canvas, one continuous loop, poster
as the first frame.

**Budget:** LCP < 2.5s, INP < 200ms, initial JS <= 180KB gzip including framework (record a
documented exception if the framework alone exceeds it), 3D chunk <= 400KB gzip, <= 100k
triangles.

**Fallbacks:** static product render, reduced-motion still, no-WebGL poster, pause when
offscreen.

**Acceptance:** hero readable before JS, CTA works without motion, pricing is not hidden
behind a scroll scene, mobile loads the poster first.

## MT-02 - Agency portfolio

**Use when:** The work itself is the product and the site should feel art-directed.

**Stack:** Next.js, Motion, GSAP + Lenis, SplitType, R3F (optional), Embla.

**Sections:** intro statement, selected work grid, horizontal case-study rail, capabilities,
process, testimonials, contact.

**Motion beats:**
- split headline reveal
- cursor-aware project preview on fine pointers
- horizontal rail with vertical mobile fallback
- page transition overlay or enter animation
- subtle magnetic CTA

**3D scene:** particle field or image displacement, optional. Never let it hide project
imagery.

**Budget:** one pinned rail, one canvas max, 60fps on a mid-range phone, no layout thrash.

**Fallbacks:** vertical project list on mobile, static cursor on touch, reduced-motion
stacked layout, no-WebGL still.

**Acceptance:** every project is reachable by keyboard and direct link, the rail does not
trap scroll, and the site is usable with motion disabled.

## MT-03 - Property showcase

**Use when:** A property manager, developer, or hospitality brand needs to sell a place.

**Stack:** Next.js, Motion, Lenis, Embla, NumberFlow, R3F/Drei (optional), Sonner.

**Sections:** hero with location, property highlights, gallery, floor plans, amenities,
neighborhood, agent card, tour form, FAQ.

**Motion beats:**
- slow hero image scale, no aggressive parallax
- gallery crossfade or slide with keyboard support
- stat count-up for square footage, units, occupancy
- sticky inquiry card on desktop
- form success toast

**3D scene:** optional scroll-driven camera through a lobby or unit. If the model is not
high quality, use photography instead.

**Budget:** image-led LCP, gallery lazy-loaded, 3D only after the hero, no autoplay video
with sound.

**Fallbacks:** photo gallery, static floor plan, reduced-motion no pan, no-WebGL photo tour.

**Acceptance:** inquiry form validates and submits, gallery works by keyboard, address and
price are text (not baked into an image), mobile sticky CTA does not cover content.

## MT-04 - Product launch

**Use when:** A single product needs a focused story, specs, and a waitlist or preorder.

**Stack:** Next.js, Motion, R3F/Drei, GSAP/Lenis (optional), React Hook Form, Zod, Sonner.

**Sections:** hero product, reveal video or 3D, feature callouts, spec table, comparison,
gallery, waitlist, FAQ.

**Motion beats:**
- product enters once, then stays stable
- feature callouts appear with scroll, not autoplay loops
- spec numbers transition once
- waitlist success and error states

**3D scene:** orbiting product with controlled lighting; one scroll-driven camera move max.

**Budget:** 3D chunk lazy, model <= 5MB compressed, DPR cap 2, no postprocessing on mobile.

**Fallbacks:** product render, poster, static spec table, no-WebGL message with email CTA.

**Acceptance:** product name, price, and CTA are readable without the canvas; form has
server validation; 3D can be paused; no layout shift when the canvas loads.

## MT-05 - Ecommerce product page

**Use when:** The template must sell a physical product with variants and trust signals.

**Stack:** Next.js, Motion, Embla, NumberFlow, Sonner, Vaul, React Hook Form, Zod.

**Sections:** breadcrumb, gallery, buy box, variants, shipping/returns, reviews, related
products, sticky add-to-cart on mobile.

**Motion beats:**
- gallery transition, not a 3D scene
- variant selection feedback under 200ms
- price/cart count transitions
- drawer for cart or filters
- review filters with list animation

**3D scene:** usually none. A 360 spin or product video is enough. Use CSS 3D tilt only on
desktop.

**Budget:** product image is LCP, no 3D in the critical path, variant interaction INP <
200ms.

**Fallbacks:** static gallery, native select, no-motion cart, keyboard-operable drawer.

**Acceptance:** price and variant are text, add-to-cart works without motion, focus returns
after drawer close, error and out-of-stock states are designed.

## MT-06 - Editorial story

**Use when:** Reading flow, typography, and pacing matter more than interaction.

**Stack:** Astro or Next.js, GSAP + ScrollTrigger, SplitType, no 3D by default.

**Sections:** title block, standfirst, hero image, article body, pull quotes, inline media,
reading progress, related stories.

**Motion beats:**
- reading progress bar
- image reveal masks
- pull-quote fade-up
- optional pinned chapter title
- no cursor effects, no scroll hijacking

**3D scene:** none. A static image or subtle CSS gradient is enough.

**Budget:** text-first LCP, font subsetting, no layout shift, one pinned element max.

**Fallbacks:** reduced motion shows all content immediately, no-JS article is complete,
images have captions and alt text.

**Acceptance:** article is readable at 200% zoom, reading order is correct, progress bar is
not the only position cue, links are distinguishable.

## MT-07 - Dashboard app

**Use when:** The template is a working interface, not a marketing page.

**Stack:** Next.js or Vite, Motion, Recharts, TanStack Query, Zod, Sonner, cmdk.

**Sections:** sidebar, top bar, overview cards, chart grid, data table, filters, detail
drawer, settings, empty/error states.

**Motion beats:**
- layout animation for panels under 250ms
- skeleton-to-content transition
- number transitions on metrics
- drawer/command menu presence
- row insert/remove animation

**3D scene:** none. Dashboards need speed and clarity.

**Budget:** INP < 200ms, no cinematic scroll, no pinned scenes, table virtualization for
large data.

**Fallbacks:** reduced motion instant states, keyboard navigation, no-JS not required for an
authenticated app but loading and error states are.

**Acceptance:** every filter has a URL or shareable state where appropriate, charts have
text summaries, tables are keyboard navigable, empty states suggest an action.

## MT-08 - Conference / event

**Use when:** A conference or launch event needs schedule, speakers, tickets, and energy.

**Stack:** Next.js, Motion, Embla, NumberFlow, R3F (optional), GSAP/Lenis (optional).

**Sections:** hero with date/location, countdown, speakers, schedule tabs, venue, tickets,
sponsors, FAQ.

**Motion beats:**
- countdown number transitions
- speaker card stagger
- schedule tab transition
- ticket CTA feedback
- one ambient hero scene

**3D scene:** shader gradient, particle field, or venue model. Keep it behind text.

**Budget:** date, venue, and ticket CTA are server-rendered; countdown is client-only; no
autoplay audio; one canvas.

**Fallbacks:** static hero gradient, reduced-motion static countdown, no-WebGL poster.

**Acceptance:** schedule is readable from the initial HTML, ticket link works, timezone is
explicit, speaker images have alt text, and tabs do not hide the schedule from non-JS users.

## MT-09 - Waitlist / coming soon

**Use when:** The product is not launched and the goal is a clean email capture.

**Stack:** Next.js, Motion, React Hook Form, Zod, Sonner, R3F gradient (optional).

**Sections:** brand, headline, short proof, email form, social proof, FAQ, footer.

**Motion beats:**
- headline stagger
- ambient gradient or blob
- form success state
- no long intro that delays the form

**3D scene:** one slow shader gradient or morphing blob. It must not compete with the form.

**Budget:** form visible before the 3D chunk, LCP < 2s, initial JS small.

**Fallbacks:** CSS gradient, static poster, reduced-motion still, form works without JS via
a server action where possible.

**Acceptance:** email validation is clear, success and error are announced, privacy note is
visible, form is keyboard-first.

## MT-10 - Developer docs landing

**Use when:** A developer tool needs a fast landing page plus docs entry points.

**Stack:** Astro or Next.js, minimal Motion, cmdk, SplitType (optional), no 3D by default.

**Sections:** hero with install command, code sample, feature grid, integration logos,
quickstart steps, docs links, community CTA.

**Motion beats:**
- copy-to-clipboard feedback
- tab switch between package managers
- code block reveal
- no scroll hijacking, no long pinned intro

**3D scene:** none by default. A grid wave is acceptable only if it does not delay the
install command.

**Budget:** install command is LCP or near it, docs links server-rendered, no heavy syntax
highlighter on first paint.

**Fallbacks:** static code block, no-motion tabs, keyboard copy button, readable without JS.

**Acceptance:** install command is selectable and copyable, code has contrast, docs search
is keyboard accessible, mobile code blocks scroll horizontally.

## MT-11 - Hospitality / restaurant

**Use when:** A restaurant, hotel, or venue needs atmosphere plus a reservation path.

**Stack:** Next.js, Motion, Embla, GSAP/Lenis (optional), NumberFlow, Sonner.

**Sections:** hero, story, menu highlights, gallery, rooms/spaces, reservation, location,
reviews.

**Motion beats:**
- slow image reveals
- menu category transition
- gallery with keyboard support
- reservation form feedback
- no autoplay sound

**3D scene:** usually none. A 3D room tour is allowed only with a high-quality model and a
photo fallback.

**Budget:** hero image optimized, gallery lazy, reservation CTA visible on mobile.

**Fallbacks:** static gallery, text menu, phone link, reduced-motion no parallax.

**Acceptance:** menu and prices are text, reservation works on mobile, hours and address are
structured data, images have alt text.

## MT-12 - Listing / marketplace

**Use when:** Users browse many items and need filters, cards, and detail views.

**Stack:** Next.js, Motion, Embla, Zod, NumberFlow, Sonner, TanStack Query (optional).

**Sections:** search/filter bar, result count, card grid, map or gallery, sort, pagination,
empty state, detail drawer.

**Motion beats:**
- filter feedback under 200ms
- card insert/remove animation
- image gallery transition
- no 3D per card

**3D scene:** none. Performance belongs to the list and images.

**Budget:** image sizes per card, virtualize long lists, no layout shift when filters change,
INP < 200ms.

**Fallbacks:** server-rendered results, native form controls, no-motion list, keyboard
filters.

**Acceptance:** filters are shareable, empty state is useful, cards have text alternatives,
pagination or infinite scroll does not trap keyboard focus.
