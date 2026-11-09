#!/usr/bin/env node
/**
 * Prompt-driven stack selector for professional motion templates.
 *
 * Usage:
 *   node scripts/select-stack.mjs --framework nextjs --goal marketing --3d yes --scroll cinematic
 *   node scripts/select-stack.mjs --framework astro --goal editorial --3d no --scroll cinematic --json
 *
 * No dependencies. Reads ../data/libraries.json.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const catalogPath = join(here, "..", "data", "libraries.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const byId = new Map(catalog.libraries.map((library) => [library.id, library]));

const FRAMEWORKS = ["nextjs", "vite", "astro", "nuxt", "sveltekit"];
const GOALS = [
  "marketing",
  "portfolio",
  "property",
  "ecommerce",
  "editorial",
  "dashboard",
  "event",
  "waitlist",
  "docs",
  "hospitality",
  "listing"
];
const SCROLL_MODES = ["none", "simple", "cinematic"];
const EFFECT_MODES = ["none", "basic", "rich"];
const BOOLEAN_VALUES = new Set(["true", "false", "yes", "no", "1", "0", "on", "off"]);

function fail(message) {
  console.error(`select-stack: ${message}`);
  console.error("Run with --help for usage.");
  process.exit(1);
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--help" || token === "-h") {
      options.help = true;
      continue;
    }
    if (!token.startsWith("--")) {
      fail(`unexpected argument "${token}"`);
    }
    const equals = token.indexOf("=");
    let key;
    let value;
    if (equals !== -1) {
      key = token.slice(2, equals);
      value = token.slice(equals + 1);
    } else {
      key = token.slice(2);
      const next = argv[index + 1];
      if (next !== undefined && !next.startsWith("--")) {
        value = next;
        index += 1;
      } else {
        value = "true";
      }
    }
    options[key] = value;
  }
  return options;
}

function boolOption(name, value, fallback) {
  if (value === undefined) return fallback;
  const normalized = String(value).toLowerCase();
  if (!BOOLEAN_VALUES.has(normalized)) {
    fail(`--${name} expects yes/no or true/false, received "${value}"`);
  }
  return ["true", "yes", "1", "on"].includes(normalized);
}

function oneOf(name, value, allowed, fallback) {
  if (value === undefined) return fallback;
  if (!allowed.includes(value)) {
    fail(`--${name} must be one of: ${allowed.join(", ")}`);
  }
  return value;
}

function printHelp() {
  console.log(`
Professional motion template stack selector

Usage:
  node select-stack.mjs [options]

Options:
  --framework  nextjs | vite | astro | nuxt | sveltekit   (default: nextjs)
  --goal       marketing | portfolio | property | ecommerce | editorial |
               dashboard | event | waitlist | docs | hospitality | listing
                                                         (default: marketing)
  --3d         yes | no                                  (default: no)
  --scroll     none | simple | cinematic                 (default: simple)
  --effects    none | basic | rich                       (default: basic with 3D)
  --forms      yes | no                                  (default: goal-dependent)
  --charts     yes | no                                  (default: dashboard)
  --testing    yes | no                                  (default: yes)
  --json       Output machine-readable JSON
  --help       Show this help

Examples:
  node select-stack.mjs --framework nextjs --goal marketing --3d yes --scroll cinematic
  node select-stack.mjs --framework astro --goal editorial --scroll cinematic
  node select-stack.mjs --framework nuxt --goal dashboard --charts yes --json
`);
}

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}

const unknownKeys = Object.keys(options).filter(
  (key) => !["framework", "goal", "3d", "scroll", "effects", "forms", "charts", "testing", "json", "help"].includes(key)
);
if (unknownKeys.length > 0) {
  fail(`unknown option(s): ${unknownKeys.map((key) => `--${key}`).join(", ")}`);
}

const framework = oneOf("framework", options.framework, FRAMEWORKS, "nextjs");
const goal = oneOf("goal", options.goal, GOALS, "marketing");
const use3d = boolOption("3d", options["3d"], false);
const scroll = oneOf(
  "scroll",
  options.scroll,
  SCROLL_MODES,
  ["portfolio", "editorial", "property", "hospitality"].includes(goal) ? "cinematic" : "simple"
);
const effects = oneOf("effects", options.effects, EFFECT_MODES, use3d ? "basic" : "none");
if (!use3d && effects !== "none") {
  fail("--effects requires --3d yes");
}
const forms = boolOption("forms", options.forms, ["waitlist", "ecommerce", "listing", "property", "hospitality"].includes(goal));
const charts = boolOption("charts", options.charts, goal === "dashboard");
const testing = boolOption("testing", options.testing, true);
const json = boolOption("json", options.json, false);

const isReact = ["nextjs", "vite"].includes(framework);
const isVue = ["nuxt"].includes(framework);
const isSvelte = ["sveltekit"].includes(framework);

const core = new Set();
const optional = new Set();
const avoid = [];
const notes = [];

function add(target, ...ids) {
  for (const id of ids) {
    if (!byId.has(id)) {
      throw new Error(`Library id "${id}" is missing from data/libraries.json`);
    }
    target.add(id);
  }
}

function addOptional(...ids) {
  add(optional, ...ids.filter(Boolean));
}

function note(message) {
  if (!notes.includes(message)) notes.push(message);
}

const carouselId = isReact ? "embla" : isVue ? "embla-vue" : isSvelte ? "embla-svelte" : "swiper";
const toastId = isReact ? "sonner" : isVue ? "vue-sonner" : isSvelte ? "svelte-sonner" : null;
const numberFlowId = isReact ? "number-flow" : isVue ? "number-flow-vue" : isSvelte ? "number-flow-svelte" : null;

// Shared foundation
add(core, "typescript", "tailwindcss", "clsx", "tailwind-merge", "class-variance-authority");

// Framework baseline
if (framework === "nextjs") {
  add(core, "next", "react", "motion", "next-themes", "lucide-react");
} else if (framework === "vite") {
  add(core, "vite", "react", "motion", "lucide-react");
} else if (framework === "astro") {
  add(core, "astro");
  add(optional, "astro-react", "motion");
  note("Astro is server-first: use vanilla GSAP/Three, or add @astrojs/react before using Motion or React Three Fiber.");
} else if (framework === "nuxt") {
  add(core, "nuxt", "vue", "motion-v", "lucide-vue");
  add(optional, "vueuse-motion");
} else if (framework === "sveltekit") {
  add(core, "sveltekit", "svelte", "lucide-svelte");
  note("SvelteKit has built-in svelte/motion; add Threlte only when a real 3D scene is justified.");
}

// Scroll ownership
if (scroll === "cinematic") {
  add(core, "gsap", "lenis");
  if (isReact) add(core, "gsap-react");
  note("Lenis owns smooth scrolling; GSAP ScrollTrigger owns scroll timelines. Do not add CSS scroll-behavior: smooth or a second smooth-scroll library.");
  avoid.push("Do not combine Lenis with CSS scroll-behavior: smooth or another smooth-scroll library.");
} else if (scroll === "simple") {
  note(isReact ? "Use Motion useScroll for a single scroll-linked element; do not pull in GSAP unless a timeline or pinning is required." : "Use native scroll or a small CSS scroll-driven effect; do not add a smooth-scroll library for its own sake.");
}

// 3D ownership
if (use3d) {
  if (isReact) {
    add(core, "three", "react-three-fiber", "drei");
  } else if (framework === "astro") {
    add(core, "three");
    add(optional, "astro-react", "react-three-fiber", "drei");
    note("For Astro 3D, either write vanilla Three.js or add @astrojs/react and render R3F in a client island.");
  } else if (isVue) {
    add(core, "three", "tresjs");
    add(optional, "tresjs-nuxt");
  } else if (isSvelte) {
    add(core, "three", "threlte");
  }

  add(optional, "gltf-transform", "draco3d", "meshoptimizer");
  note("3D is lazy-loaded, client-only, and ships with a poster, reduced-motion fallback, offscreen pause, and no-WebGL fallback.");

  if (effects === "rich") {
    if (isReact) add(optional, "r3f-postprocessing", "postprocessing");
    else add(optional, "postprocessing");
    note("Postprocessing is desktop-first. Define a mobile quality tier and disable bloom/DOF when frame time exceeds budget.");
    avoid.push("Do not enable bloom, depth of field, or heavy shadows on mobile without a measured fallback.");
  }

  if (isReact && ["portfolio", "ecommerce"].includes(goal)) {
    add(optional, "rapier");
  }

  avoid.push("Do not ship a WebGL canvas without a static poster, offscreen pause, and no-WebGL fallback.");
}

// Goal-specific content and interaction
if (goal === "marketing") {
  addOptional("split-type", carouselId);
} else if (goal === "portfolio") {
  addOptional("split-type", carouselId);
  if (isReact) add(optional, "react-wrap-balancer");
} else if (goal === "property") {
  addOptional(carouselId, numberFlowId, toastId, "split-type");
  if (isReact) add(optional, "react-wrap-balancer");
} else if (goal === "ecommerce") {
  add(core, carouselId);
  addOptional(toastId, numberFlowId, "sharp", "plaiceholder");
  if (isReact) add(optional, "vaul", "react-hook-form", "hookform-resolvers");
  add(core, "zod");
} else if (goal === "editorial") {
  add(core, "split-type");
  if (isReact) add(optional, "react-wrap-balancer");
  add(optional, "sharp", "plaiceholder", "blurhash");
  note("Editorial work should prioritize typography and reading flow over 3D spectacle.");
} else if (goal === "dashboard") {
  if (isReact) add(core, "tanstack-query", "recharts");
  else add(optional, "d3");
  addOptional(toastId, numberFlowId);
  if (isReact) add(optional, "zustand", "cmdk", "visx");
  note("Dashboards should use fast, functional motion; skip cinematic scroll and 3D by default.");
  avoid.push("Do not add scroll hijacking or a 3D hero to a utility dashboard.");
} else if (goal === "event") {
  addOptional(carouselId, toastId, numberFlowId, "split-type");
} else if (goal === "waitlist") {
  add(core, "zod");
  if (isReact) add(core, "react-hook-form", "hookform-resolvers");
  addOptional(toastId, numberFlowId);
} else if (goal === "docs") {
  if (isReact) add(optional, "cmdk");
  add(optional, "split-type");
  note("Developer docs should ship fast: minimal motion, no cinematic scroll, and no 3D by default.");
  avoid.push("Do not add scroll hijacking or a 3D hero to documentation.");
} else if (goal === "hospitality") {
  addOptional(carouselId, "split-type", toastId, numberFlowId);
  if (isReact) add(optional, "react-wrap-balancer");
} else if (goal === "listing") {
  add(core, carouselId, "zod");
  addOptional(toastId, numberFlowId);
  if (isReact) {
    add(core, "react-hook-form", "hookform-resolvers");
    add(optional, "tanstack-query");
  }
}

// Forms, charts, testing, performance
if (forms) {
  add(core, "zod");
  if (isReact) add(core, "react-hook-form", "hookform-resolvers");
  else note("Use the framework's form layer with a shared Zod schema; the catalog's React form packages do not apply.");
  note("Validate on the client for feedback and on the server for trust; never rely on client validation alone.");
}

if (charts) {
  if (isReact) add(core, "recharts");
  else add(optional, "d3");
  if (isReact) add(optional, "visx");
}

if (testing) {
  add(core, "playwright", "vitest", "axe-playwright");
  note("Add Playwright projects for reduced motion and the no-WebGL fallback; automated accessibility checks do not replace manual keyboard testing.");
}

if (framework === "nextjs") {
  add(optional, "next-bundle-analyzer");
}

// Universal guardrails
avoid.push("Do not install the whole catalog; start with the core set and add a library only when a requirement needs it.");
if (core.has("motion") && core.has("gsap")) {
  note("Motion and GSAP can coexist, but each element gets one animation owner: Motion for UI state, GSAP for scroll timelines.");
  avoid.push("Do not animate the same property on the same element with both Motion and GSAP.");
}
if (framework === "nextjs") {
  avoid.push("Do not use motion, window, or WebGL in a server component; add a client boundary at the smallest safe boundary.");
}
if (framework === "astro") {
  avoid.push("Do not import Motion or React Three Fiber in a server-only Astro component; use a React island.");
}
if (framework === "nuxt") {
  avoid.push("Do not mix React motion or R3F packages into Nuxt; use motion-v and TresJS.");
}
if (framework === "sveltekit") {
  avoid.push("Do not mix React motion or R3F packages into SvelteKit; use svelte/motion and Threlte.");
}

// Recipe mapping
const recipeMap = {
  marketing: use3d ? ["MT-01", "MT-04"] : ["MT-01", "MT-09"],
  portfolio: ["MT-02"],
  property: ["MT-03", "MT-12"],
  ecommerce: ["MT-05"],
  editorial: ["MT-06"],
  dashboard: ["MT-07"],
  event: ["MT-08"],
  waitlist: ["MT-09"],
  docs: ["MT-10"],
  hospitality: ["MT-11"],
  listing: ["MT-12"]
};
const recipes = recipeMap[goal] ?? ["MT-01"];

function describe(id) {
  const library = byId.get(id);
  return {
    id,
    package: library.package,
    name: library.name,
    category: library.category,
    role: library.role,
    status: library.status,
    weight: library.weight,
    notes: library.notes
  };
}

const output = {
  input: {
    framework,
    goal,
    "3d": use3d,
    scroll,
    effects,
    forms,
    charts,
    testing
  },
  core: [...core].map(describe),
  optional: [...optional].filter((id) => !core.has(id)).map(describe),
  avoid,
  recipes,
  notes
};

if (json) {
  console.log(JSON.stringify(output, null, 2));
  process.exit(0);
}

const line = "=".repeat(72);
console.log(line);
console.log("Professional motion template stack");
console.log(line);
console.log(`Framework : ${framework}`);
console.log(`Goal      : ${goal}`);
console.log(`3D        : ${use3d ? "yes" : "no"}`);
console.log(`Scroll    : ${scroll}`);
console.log(`Effects   : ${effects}`);
console.log(`Forms     : ${forms ? "yes" : "no"}`);
console.log(`Charts    : ${charts ? "yes" : "no"}`);
console.log(`Testing   : ${testing ? "yes" : "no"}`);

console.log("\nCORE");
for (const library of output.core) {
  console.log(`- ${library.name} (${library.package}) [${library.category}, ${library.weight}]`);
  console.log(`  ${library.role}`);
}

console.log("\nOPTIONAL");
if (output.optional.length === 0) {
  console.log("- none");
} else {
  for (const library of output.optional) {
    console.log(`- ${library.name} (${library.package}) [${library.category}, ${library.weight}]`);
    console.log(`  ${library.role}`);
  }
}

console.log("\nAVOID");
for (const item of output.avoid) {
  console.log(`- ${item}`);
}

console.log("\nRECIPES");
for (const recipe of output.recipes) {
  console.log(`- ${recipe} (see references/recipes.md)`);
}

console.log("\nNOTES");
for (const item of output.notes) {
  console.log(`- ${item}`);
}

console.log(`\n${line}`);
