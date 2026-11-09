# Template Architecture

A professional template is a reusable system, not a page with animations glued on. It has a
content model, section contracts, one motion language, one scroll owner, explicit client
boundaries, an asset pipeline, and a verification path.

## Content model

Keep copy and section order outside the components. The same template should support a
different brand without rewriting the hero.

```ts
// content/types.ts
export type CTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type Media = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Feature = {
  title: string;
  body: string;
  icon?: string;
};

export type Plan = {
  name: string;
  price: string;
  features: string[];
  cta: CTA;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type FooterColumn = {
  title: string;
  links: CTA[];
};

export type Section =
  | { type: "hero"; eyebrow?: string; title: string; body: string; cta: CTA; media?: Media }
  | { type: "features"; title: string; items: Feature[] }
  | { type: "gallery"; title?: string; items: Media[] }
  | { type: "pricing"; title: string; plans: Plan[] }
  | { type: "faq"; title: string; items: FAQ[] }
  | { type: "cta"; title: string; body?: string; cta: CTA };

export type SiteConfig = {
  brand: { name: string; logo: string; description: string };
  nav: CTA[];
  hero: Extract<Section, { type: "hero" }>;
  sections: Section[];
  footer: { columns: FooterColumn[]; legal: string };
  seo: { title: string; description: string; ogImage: string };
  motion: { intensity: "restrained" | "expressive" | "cinematic" };
};
```

```ts
// content/site.ts
import type { SiteConfig } from "./types";

export const site = {
  brand: {
    name: "Northline",
    logo: "/brand/logo.svg",
    description: "Property management for modern portfolios."
  },
  nav: [
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact", variant: "primary" }
  ],
  hero: {
    type: "hero",
    title: "Every property, under control.",
    body: "Leasing, maintenance, and reporting in one calm workspace.",
    cta: { label: "Book a walkthrough", href: "/contact", variant: "primary" },
    media: { src: "/images/hero.avif", alt: "Sunlit lobby of a managed property" }
  },
  sections: [
    { type: "features", title: "One operating system", items: [] },
    { type: "gallery", title: "Portfolio", items: [] },
    { type: "cta", title: "Ready to simplify operations?", cta: { label: "Talk to us", href: "/contact" } }
  ],
  footer: { columns: [], legal: "© 2026 Northline" },
  seo: {
    title: "Northline - Property management",
    description: "Leasing, maintenance, and reporting for modern property portfolios.",
    ogImage: "/images/og.jpg"
  },
  motion: { intensity: "restrained" }
} satisfies SiteConfig;
```

`satisfies` keeps literal types and catches missing fields. If the content comes from a CMS,
validate it with Zod at the boundary and map it into the same `SiteConfig`.

## Folder structure

### Next.js App Router

```text
app/
  layout.tsx                 metadata, providers, fonts
  template.tsx               enter transition
  (marketing)/
    page.tsx                 root route; route groups do not add a URL segment
    about/page.tsx
    contact/page.tsx
  api/
    contact/route.ts
components/
  layout/
    SiteHeader.tsx
    SiteFooter.tsx
    Container.tsx
  sections/
    HeroSection.tsx
    FeaturesSection.tsx
    GallerySection.tsx
    PricingSection.tsx
    FAQSection.tsx
    CTASection.tsx
    SectionRenderer.tsx
  motion/
    MotionProvider.tsx
    Reveal.tsx
    Stagger.tsx
    ScrollProgress.tsx
    PageTransition.tsx
  three/
    SceneGate.tsx
    ScenePoster.tsx
    ProductScene.tsx
    ProductModel.tsx
    EffectBoundary.tsx
  ui/
    Button.tsx
    Card.tsx
    Input.tsx
    Dialog.tsx
    Badge.tsx
content/
  site.ts
  types.ts
lib/
  motion/tokens.ts
  three/quality.ts
  gsap/register.ts
  utils/cn.ts
  seo/metadata.ts
public/
  brand/
  images/
  models/
  posters/
  fonts/
```

### Vite React

```text
src/
  main.tsx
  App.tsx
  routes/
  components/
    layout/
    sections/
    motion/
    three/
    ui/
  content/
  lib/
public/
```

Vite has no server components. Keep the same component boundaries and asset pipeline, and
add prerendering or a static host if SEO matters.

### Astro

```text
src/
  layouts/BaseLayout.astro
  pages/index.astro
  components/
    sections/*.astro
    islands/*.tsx
    motion/scroll.ts
    three/scene.ts
  content/
  lib/
public/
```

Astro components are server-rendered by default. Put React Motion or R3F only in an island
with `client:load` or `client:visible`. Use vanilla GSAP/Three for zero-React pages.

### Nuxt

```text
app/
  app.vue
  layouts/default.vue
  pages/index.vue
  components/
    sections/
    motion/
    three/
  composables/
  content/
plugins/
  motion.client.ts
```

### SvelteKit

```text
src/
  routes/+layout.svelte
  routes/+page.svelte
  lib/components/
    sections/
    motion/
    three/
  lib/content/
static/
```

Use `svelte/motion` for simple state and Threlte for 3D. Keep client-only code in
`onMount` or a `*.client.ts` module.

## Providers

### Next.js layout

```tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northline - Property management",
  description: "Leasing, maintenance, and reporting for modern property portfolios."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionProvider>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`ThemeProvider` is a client component; importing it into a server layout is fine. Keep the
provider tree shallow and do not wrap the entire app in a heavy client component just for
one animation.

### Fonts

Use `next/font` in Next.js, or self-host with `font-display: swap` elsewhere. Subset to the
scripts you need and preload only the hero font.

```tsx
import { Inter, Fraunces } from "next/font/google";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Design fonts are selected in `uiux-special`; this skill only implements them.

## Section contract

Every section should accept data, not hardcoded copy.

```tsx
type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: CTA;
  media?: Media;
  motion?: "none" | "reveal" | "stagger" | "scene";
};
```

Renderer:

```tsx
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { GallerySection } from "./GallerySection";
import { PricingSection } from "./PricingSection";
import { FAQSection } from "./FAQSection";
import { CTASection } from "./CTASection";
import type { Section } from "@/content/types";

const sectionComponents = {
  hero: HeroSection,
  features: FeaturesSection,
  gallery: GallerySection,
  pricing: PricingSection,
  faq: FAQSection,
  cta: CTASection
} as const;

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const Component = sectionComponents[section.type];
        return <Component key={`${section.type}-${index}`} {...section} />;
      })}
    </>
  );
}
```

If a section type is not in the map, fail at build time rather than rendering nothing.

## Client boundary strategy

| Code | Boundary |
| --- | --- |
| Static copy, images, layout | Server component |
| Motion reveal wrapper | Small client component |
| Header with mobile menu | Client component |
| Canvas | Client component, dynamic import, `ssr: false` |
| Contact form | Client component plus server action/API |
| Theme toggle | Client component |
| Analytics event | Client component or server event |

Do not put `"use client"` on `app/page.tsx` just because one child animates. Move the client
boundary down.

## Asset pipeline

### Images

- Serve AVIF/WebP with fallbacks.
- Use responsive `sizes` and explicit width/height or aspect ratio.
- Mark the hero image `priority` in Next.js; lazy-load the rest.
- Generate blur placeholders at build time with Sharp/Plaiceholder.
- Do not put text in images.
- Alt text describes purpose, not decoration.

```tsx
import Image from "next/image";

<Image
  src="/images/hero.avif"
  alt="Sunlit lobby of a managed property"
  width={1600}
  height={1000}
  priority
  sizes="(min-width: 1024px) 60vw, 100vw"
/>
```

### 3D assets

- Export GLB, not glTF with loose files.
- Compress geometry with Draco or Meshopt.
- Compress textures; keep the hero model under a few megabytes.
- Use a poster that matches the first frame.
- Preload only above-the-fold assets.
- Version model URLs for cache busting.

### Video

- Provide a poster and captions.
- `muted`, `playsInline`, `loop` for background video.
- Do not autoplay sound.
- Respect reduced motion; show the poster instead.
- Compress with a modern codec and provide a fallback.

## SEO and metadata

- Unique title and description per page.
- Canonical URL.
- Open Graph and Twitter image.
- Sitemap and robots.
- Structured data for the business, product, article, or event.
- Semantic landmarks and heading order.
- No essential content only in canvas or client-only state.
- Server-render the primary content.

```tsx
export const metadata = {
  title: "Northline - Property management",
  description: "Leasing, maintenance, and reporting for modern property portfolios.",
  alternates: { canonical: "https://example.com" },
  openGraph: {
    title: "Northline - Property management",
    description: "Leasing, maintenance, and reporting for modern property portfolios.",
    images: ["/images/og.jpg"]
  }
};
```

## Loading, empty, and error states

Every data-driven section needs:

- skeleton or poster while loading
- empty state with a useful next action
- error state with retry
- no layout shift when content arrives
- readable text at every state

The 3D scene is not a loading state. The page must be useful before the scene loads.

## Analytics

Track outcomes, not every hover:

- CTA click
- form start, submit, success, error
- pricing view
- gallery interaction (if it indicates intent)
- 3D scene load success/failure and time to interactive

Do not send personally identifiable information. Add consent handling where required.

## Testing

### Unit

Vitest for tokens, content mapping, formatting, and pure helpers. Do not unit-test GSAP
timelines frame-by-frame.

### End-to-end

Playwright for:

- navigation and CTA flow
- form validation and success
- keyboard path
- reduced motion
- no-WebGL fallback
- light/dark theme
- mobile viewport
- visual snapshots of stable sections

### Accessibility

`@axe-core/playwright` for automated checks, plus manual keyboard and screen-reader
testing. Automated tools miss focus order, scroll hijacking, and canvas alternatives.

## Deployment

- Static or SSR depending on the framework and CMS.
- Cache immutable assets with content hashes.
- Do not cache HTML containing user-specific data publicly.
- Set security headers at the host or edge.
- Monitor Core Web Vitals in the field, not only in the lab.
- Keep the 3D chunk out of the critical path.
- Provide a rollback path for model or scene changes.

## Handoff contract

The design handoff includes:

- `uiux-special` IDs for font, pairing, layout, theme, and motion
- section order and content model
- motion tokens and scene concept
- asset list with formats and sizes
- performance budget
- acceptance checks

The engineering handoff includes:

- recipe ID and stack
- files changed
- tests run
- measurements
- fallbacks verified
- open risks
