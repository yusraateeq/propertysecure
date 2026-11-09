import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../data");
fs.mkdirSync(dataDir, { recursive: true });

const families = {
  "classic-single-column": {
    grid: "single column, 12-col grid with a 7-col content measure",
    container: "720-880px content, 1200px shell",
    density: "comfortable",
    nav: "sticky-top",
    responsive: { desktop: "single 720-880px measure", tablet: "fluid with 32px gutters", mobile: "single column, 20px gutters" },
    motion: ["fade-up", "stagger"],
  },
  "split-asymmetric": {
    grid: "12-col, 5/7 or 7/5 split, 80px gap",
    container: "1280px",
    density: "comfortable",
    nav: "sticky-top",
    responsive: { desktop: "persistent split", tablet: "stack with media first", mobile: "single column, media after headline" },
    motion: ["fade-up", "slide-in"],
  },
  "editorial-grid": {
    grid: "12-col with 8/4 and 4/8 offsets, baseline-aligned",
    container: "1200px",
    density: "airy",
    nav: "sticky-top",
    responsive: { desktop: "offset editorial grid", tablet: "6-col simplified grid", mobile: "single column with pull quotes" },
    motion: ["fade-up", "reveal-mask"],
  },
  bento: {
    grid: "12-col modular bento, spans 3/6/4/8",
    container: "1280px",
    density: "compact",
    nav: "sticky-top",
    responsive: { desktop: "3-4 tiles per row", tablet: "2 tiles per row", mobile: "1 tile per row" },
    motion: ["stagger", "scale-in"],
  },
  "sidebar-app": {
    grid: "fixed 240-280px sidebar + fluid main",
    container: "full viewport",
    density: "compact",
    nav: "sidebar",
    responsive: { desktop: "persistent sidebar", tablet: "collapsible rail", mobile: "bottom nav + drawer" },
    motion: ["slide-in", "fade"],
  },
  "dashboard-grid": {
    grid: "12-col app grid, KPI 3-up or 4-up, charts 6/6",
    container: "1440px",
    density: "dense",
    nav: "sidebar",
    responsive: { desktop: "fixed KPI row + 2-col charts", tablet: "2-col KPI + stacked charts", mobile: "1-col cards, horizontal scroll for tables" },
    motion: ["fade", "count-up"],
  },
  "full-bleed-immersive": {
    grid: "100vw media canvas with a 1200px overlay grid",
    container: "100vw, content capped at 1200px",
    density: "airy",
    nav: "transparent-overlay",
    responsive: { desktop: "full-bleed with overlay", tablet: "reduced media height", mobile: "poster crop + stacked copy" },
    motion: ["parallax", "reveal-mask", "scroll-scene"],
  },
  "card-stack": {
    grid: "centered stack, 1-3 cards per row, 24px gap",
    container: "960-1120px",
    density: "comfortable",
    nav: "sticky-top",
    responsive: { desktop: "3 cards per row", tablet: "2 cards per row", mobile: "1 card per row" },
    motion: ["stagger", "fade-up"],
  },
  masonry: {
    grid: "4-col masonry with variable card heights",
    container: "1280px",
    density: "compact",
    nav: "sticky-top",
    responsive: { desktop: "4 columns", tablet: "2 columns", mobile: "1 column" },
    motion: ["fade", "stagger"],
  },
  magazine: {
    grid: "12-col modular with feature well, pull quotes, and sidebars",
    container: "1320px",
    density: "editorial",
    nav: "sticky-top",
    responsive: { desktop: "feature well + sidebar", tablet: "feature well only", mobile: "single column" },
    motion: ["reveal-mask", "fade-up"],
  },
  "centered-minimal": {
    grid: "single centered measure, max 640-720px",
    container: "640-720px",
    density: "airy",
    nav: "minimal",
    responsive: { desktop: "centered 640px", tablet: "centered 640px", mobile: "single column, 20px gutters" },
    motion: ["fade", "scale-in"],
  },
  "data-dense-table": {
    grid: "full-width data table with sticky header and filter rail",
    container: "1440px",
    density: "dense",
    nav: "sidebar",
    responsive: { desktop: "full table + filter rail", tablet: "priority columns, horizontal scroll", mobile: "card rows, column selector" },
    motion: ["fade"],
  },
};

const heroFit = {
  "centered-statement": { "centered-minimal": 5, "classic-single-column": 5, "split-asymmetric": 3, "editorial-grid": 4, bento: 3, "full-bleed-immersive": 4, "card-stack": 3, magazine: 3, "sidebar-app": 2, "dashboard-grid": 3, "data-dense-table": 2, masonry: 2 },
  "split-hero": { "split-asymmetric": 5, "classic-single-column": 3, "editorial-grid": 4, bento: 4, "sidebar-app": 2, "dashboard-grid": 3, "full-bleed-immersive": 3, "card-stack": 3, magazine: 4, "centered-minimal": 3, "data-dense-table": 1, masonry: 2 },
  "full-bleed-visual": { "full-bleed-immersive": 5, magazine: 4, "editorial-grid": 4, "split-asymmetric": 3, "card-stack": 3, masonry: 4, "classic-single-column": 2, bento: 3, "centered-minimal": 2, "sidebar-app": 1, "dashboard-grid": 1, "data-dense-table": 1 },
  "product-demo": { bento: 5, "split-asymmetric": 4, "classic-single-column": 4, "dashboard-grid": 3, "card-stack": 4, "full-bleed-immersive": 3, "centered-minimal": 3, "editorial-grid": 2, magazine: 2, "sidebar-app": 1, "data-dense-table": 1, masonry: 1 },
  "story-scroll": { "full-bleed-immersive": 5, magazine: 5, "editorial-grid": 4, "classic-single-column": 4, "split-asymmetric": 3, "card-stack": 2, masonry: 3, "centered-minimal": 2, bento: 2, "sidebar-app": 1, "dashboard-grid": 1, "data-dense-table": 1 },
  "editorial-type": { magazine: 5, "editorial-grid": 5, "classic-single-column": 4, "centered-minimal": 4, "split-asymmetric": 2, "full-bleed-immersive": 3, "card-stack": 2, masonry: 3, bento: 2, "sidebar-app": 1, "dashboard-grid": 1, "data-dense-table": 1 },
  "search-first": { "sidebar-app": 5, "dashboard-grid": 4, "data-dense-table": 5, "classic-single-column": 4, "centered-minimal": 4, "split-asymmetric": 3, "card-stack": 3, bento: 3, masonry: 2, "editorial-grid": 2, "full-bleed-immersive": 1, magazine: 1 },
  "comparison-table": { "data-dense-table": 5, "dashboard-grid": 4, "classic-single-column": 4, bento: 3, "split-asymmetric": 2, "card-stack": 3, "editorial-grid": 1, magazine: 2, "centered-minimal": 2, "sidebar-app": 2, "full-bleed-immersive": 1, masonry: 1 },
  "product-shot": { "split-asymmetric": 5, "full-bleed-immersive": 4, "card-stack": 4, bento: 4, "classic-single-column": 3, "centered-minimal": 3, magazine: 3, "editorial-grid": 2, "sidebar-app": 1, "dashboard-grid": 1, "data-dense-table": 1, masonry: 2 },
  "data-preview": { "dashboard-grid": 5, "data-dense-table": 5, "sidebar-app": 4, bento: 4, "split-asymmetric": 3, "classic-single-column": 3, "card-stack": 2, "centered-minimal": 2, "editorial-grid": 2, magazine: 2, "full-bleed-immersive": 1, masonry: 1 },
  "form-first": { "centered-minimal": 5, "split-asymmetric": 5, "card-stack": 4, "classic-single-column": 4, "full-bleed-immersive": 3, "editorial-grid": 1, magazine: 1, bento: 1, "sidebar-app": 1, "dashboard-grid": 1, "data-dense-table": 1, masonry: 1 },
  "interactive-demo": { bento: 5, "split-asymmetric": 4, "dashboard-grid": 4, "card-stack": 3, "classic-single-column": 3, "full-bleed-immersive": 3, "centered-minimal": 2, "sidebar-app": 2, "editorial-grid": 1, magazine: 1, "data-dense-table": 1, masonry: 1 },
};

const groups = {
  marketing: {
    families: ["split-asymmetric", "bento", "full-bleed-immersive", "card-stack", "classic-single-column", "centered-minimal", "editorial-grid", "magazine"],
    heroes: ["centered-statement", "split-hero", "full-bleed-visual", "product-demo", "story-scroll"],
    themeHints: ["light-first", "high-contrast-cta", "brand-accent"],
  },
  editorial: {
    families: ["editorial-grid", "magazine", "masonry", "classic-single-column", "split-asymmetric", "full-bleed-immersive", "card-stack", "centered-minimal"],
    heroes: ["editorial-type", "split-hero", "full-bleed-visual", "search-first", "story-scroll"],
    themeHints: ["paper-light", "serif-pairing", "dark-reading-mode"],
  },
  commerce: {
    families: ["card-stack", "masonry", "editorial-grid", "split-asymmetric", "full-bleed-immersive", "classic-single-column", "bento", "magazine"],
    heroes: ["full-bleed-visual", "split-hero", "comparison-table", "story-scroll", "product-shot"],
    themeHints: ["light-first", "product-photography", "trust-signals"],
  },
  app: {
    families: ["dashboard-grid", "sidebar-app", "data-dense-table", "bento", "split-asymmetric", "classic-single-column", "card-stack", "centered-minimal"],
    heroes: ["data-preview", "split-hero", "centered-statement", "interactive-demo", "search-first"],
    themeHints: ["dual-mode", "dense-data", "focus-visible"],
  },
  auth: {
    families: ["centered-minimal", "split-asymmetric", "full-bleed-immersive", "classic-single-column", "card-stack", "magazine", "editorial-grid", "bento"],
    heroes: ["form-first", "centered-statement", "split-hero", "full-bleed-visual", "product-shot"],
    themeHints: ["dual-mode", "trust-signals", "minimal-chrome"],
  },
  directory: {
    families: ["sidebar-app", "data-dense-table", "masonry", "card-stack", "split-asymmetric", "editorial-grid", "dashboard-grid", "classic-single-column"],
    heroes: ["search-first", "split-hero", "full-bleed-visual", "data-preview", "comparison-table"],
    themeHints: ["light-first", "dense-data", "map-or-media"],
  },
};

const pages = [
  { page: "saas-landing", group: "marketing", tags: ["b2b", "saas", "conversion"], sections: ["nav", "hero", "logo-cloud", "feature-tabs", "metrics", "testimonials", "pricing-preview", "faq", "cta", "footer"] },
  { page: "startup-landing", group: "marketing", tags: ["startup", "launch", "conversion"], sections: ["nav", "hero", "problem", "solution", "features", "social-proof", "cta", "footer"] },
  { page: "agency-home", group: "marketing", tags: ["agency", "services", "portfolio"], sections: ["nav", "hero", "services", "case-studies", "process", "testimonials", "cta", "footer"] },
  { page: "personal-portfolio", group: "marketing", tags: ["portfolio", "personal", "creative"], sections: ["nav", "hero", "selected-work", "about", "experience", "contact", "footer"] },
  { page: "pricing-page", group: "marketing", tags: ["saas", "pricing", "conversion"], sections: ["nav", "hero", "pricing-table", "comparison", "faq", "cta", "footer"] },
  { page: "waitlist-page", group: "marketing", tags: ["launch", "waitlist", "conversion"], sections: ["nav", "hero", "value-props", "waitlist-form", "social-proof", "faq", "footer"] },
  { page: "careers-page", group: "marketing", tags: ["hiring", "culture", "listing"], sections: ["nav", "hero", "culture", "benefits", "open-roles", "cta", "footer"] },
  { page: "nonprofit-home", group: "marketing", tags: ["nonprofit", "mission", "donation"], sections: ["nav", "hero", "mission", "impact", "programs", "donate-cta", "footer"] },

  { page: "blog-index", group: "editorial", tags: ["blog", "content", "listing"], sections: ["nav", "masthead", "featured-post", "post-grid", "categories", "newsletter", "footer"] },
  { page: "blog-post", group: "editorial", tags: ["blog", "article", "long-form"], sections: ["nav", "article-header", "article-body", "author", "related", "newsletter", "footer"] },
  { page: "news-home", group: "editorial", tags: ["news", "publishing", "dense"], sections: ["nav", "breaking-bar", "top-stories", "latest", "opinion", "footer"] },
  { page: "magazine-feature", group: "editorial", tags: ["magazine", "feature", "visual"], sections: ["nav", "cover-story", "features-grid", "columns", "newsletter", "footer"] },
  { page: "docs-article", group: "editorial", tags: ["docs", "technical", "reading"], sections: ["nav", "sidebar", "article", "toc", "feedback", "footer-minimal"] },
  { page: "changelog", group: "editorial", tags: ["product", "updates", "timeline"], sections: ["nav", "header", "timeline", "subscribe", "footer"] },
  { page: "case-study", group: "editorial", tags: ["case-study", "b2b", "proof"], sections: ["nav", "hero", "challenge", "approach", "results", "gallery", "cta", "footer"] },

  { page: "ecommerce-home", group: "commerce", tags: ["ecommerce", "retail", "conversion"], sections: ["nav", "hero", "category-strip", "deals", "product-grid", "reviews", "newsletter", "footer"] },
  { page: "product-detail", group: "commerce", tags: ["ecommerce", "product", "conversion"], sections: ["nav", "breadcrumbs", "gallery", "buy-box", "details", "reviews", "related", "footer"] },
  { page: "collection-page", group: "commerce", tags: ["ecommerce", "collection", "filters"], sections: ["nav", "collection-header", "filters", "product-grid", "pagination", "footer"] },
  { page: "checkout-flow", group: "commerce", tags: ["checkout", "payment", "conversion"], sections: ["nav-minimal", "steps", "cart-summary", "payment-form", "trust-badges", "footer-minimal"] },
  { page: "real-estate-listing", group: "commerce", tags: ["real-estate", "listing", "search"], sections: ["nav", "search", "filters", "property-grid", "map", "pagination", "footer"] },
  { page: "property-detail", group: "commerce", tags: ["real-estate", "property", "gallery"], sections: ["nav", "gallery", "summary", "amenities", "floor-plan", "agent", "similar", "footer"] },
  { page: "booking-flow", group: "commerce", tags: ["booking", "travel", "payment"], sections: ["nav-minimal", "steps", "availability", "guest-form", "payment", "confirmation", "footer-minimal"] },
  { page: "restaurant-home", group: "commerce", tags: ["restaurant", "hospitality", "reservation"], sections: ["nav", "hero", "menu-preview", "story", "gallery", "reservation", "footer"] },

  { page: "dashboard-overview", group: "app", tags: ["dashboard", "saas", "product"], sections: ["sidebar", "topbar", "page-header", "kpi-row", "chart-grid", "activity", "quick-actions"] },
  { page: "analytics-dashboard", group: "app", tags: ["analytics", "data", "product"], sections: ["sidebar", "topbar", "date-filter", "kpi-row", "funnel", "cohort", "table"] },
  { page: "admin-table", group: "app", tags: ["admin", "table", "crud"], sections: ["sidebar", "topbar", "toolbar", "data-table", "bulk-actions", "pagination"] },
  { page: "settings-page", group: "app", tags: ["settings", "forms", "product"], sections: ["sidebar", "topbar", "settings-nav", "form-sections", "save-bar"] },
  { page: "onboarding-flow", group: "app", tags: ["onboarding", "activation", "product"], sections: ["logo", "progress", "step-content", "tips", "next-cta"] },
  { page: "user-profile", group: "app", tags: ["profile", "account", "product"], sections: ["sidebar", "topbar", "profile-header", "stats", "activity", "settings"] },
  { page: "project-board", group: "app", tags: ["project", "kanban", "collaboration"], sections: ["sidebar", "topbar", "board-header", "kanban-columns", "card-detail"] },
  { page: "calendar-app", group: "app", tags: ["calendar", "scheduling", "product"], sections: ["sidebar", "topbar", "toolbar", "month-grid", "agenda-panel"] },

  { page: "auth-login", group: "auth", tags: ["auth", "login", "trust"], sections: ["brand-panel", "form-card", "support-note"] },
  { page: "auth-signup", group: "auth", tags: ["auth", "signup", "conversion"], sections: ["brand-panel", "form-card", "benefits", "support-note"] },
  { page: "auth-reset", group: "auth", tags: ["auth", "recovery", "minimal"], sections: ["brand-panel", "form-card", "help-links"] },

  { page: "marketplace-listing", group: "directory", tags: ["marketplace", "listing", "search"], sections: ["nav", "search", "filters", "listing-grid", "pagination", "footer"] },
  { page: "search-results", group: "directory", tags: ["search", "results", "filters"], sections: ["nav", "search", "filter-bar", "result-list", "pagination", "footer"] },
  { page: "menu-page", group: "directory", tags: ["restaurant", "menu", "hospitality"], sections: ["nav", "header", "menu-sections", "dietary-notes", "reservation-cta", "footer"] },
  { page: "travel-guide", group: "directory", tags: ["travel", "guide", "editorial"], sections: ["nav", "hero", "highlights", "itinerary", "map", "tips", "cta", "footer"] },
  { page: "job-board", group: "directory", tags: ["jobs", "listing", "search"], sections: ["nav", "search", "filters", "job-list", "pagination", "footer"] },
  { page: "event-listing", group: "directory", tags: ["events", "listing", "calendar"], sections: ["nav", "date-strip", "filters", "event-grid", "pagination", "footer"] },
];

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const unique = (a) => [...new Set(a)];

const layouts = [];
for (const p of pages) {
  const g = groups[p.group];
  const start = pages.filter((x) => x.group === p.group).findIndex((x) => x.page === p.page);
  const chosenFamilies = [];
  for (let i = 0; i < 6; i++) chosenFamilies.push(g.families[(start + i) % g.families.length]);

  for (const family of chosenFamilies) {
    const fam = families[family];
    for (const hero of g.heroes) {
      const fit = heroFit[hero]?.[family] ?? 3;
      const nav = hero === "full-bleed-visual" && fam.nav === "sticky-top" ? "transparent-overlay" : fam.nav;
      const id = "LB-" + String(layouts.length + 1).padStart(4, "0");
      const sections = p.sections.map((s) => (s === "hero" ? "hero:" + hero : s));
      layouts.push({
        id,
        page: p.page,
        group: p.group,
        tags: p.tags,
        family,
        hero,
        fit,
        density: fam.density,
        grid: fam.grid,
        container: fam.container,
        nav,
        sections,
        responsive: fam.responsive,
        motion: unique([...fam.motion, hero === "story-scroll" ? "scroll-trigger" : "fade"]),
        bestFor: p.tags,
        avoid:
          fit <= 3
            ? ["high-stakes conversion without a content rewrite", "teams without responsive QA"]
            : [],
        themeHints: g.themeHints,
        accessibility: [
          "one h1 and a logical heading order",
          "keyboard-reachable nav and CTAs",
          "visible focus ring on every interactive element",
          "no text over busy media without a scrim",
        ],
        wireframe: sections.map((s, i) => ({ order: i + 1, block: s, span: s.startsWith("hero") ? "full" : fam.grid.includes("sidebar") && i === 0 ? "rail" : "auto" })),
      });
    }
  }
}

fs.writeFileSync(path.join(dataDir, "layouts.json"), JSON.stringify({ summary: { count: layouts.length, pages: pages.length, families: Object.keys(families).length }, layouts }, null, 0));

const fitCounts = layouts.reduce((a, l) => ((a[l.fit] = (a[l.fit] || 0) + 1), a), {});
console.log("layouts:", layouts.length, "| pages:", pages.length, "| families:", Object.keys(families).length);
console.log("fit distribution:", JSON.stringify(fitCounts));
