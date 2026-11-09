#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../data");
const read = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));

const argv = process.argv.slice(2);
const cmd = argv[0];
const flags = {};
for (let i = 1; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      flags[key] = next;
      i++;
    } else {
      flags[key] = true;
    }
  } else {
    flags._ = a;
  }
}

const limit = Math.min(Number(flags.limit) || 8, 50);
const has = (v, needle) => String(v).toLowerCase().includes(String(needle).toLowerCase());
const out = (v) => process.stdout.write(JSON.stringify(v, null, 2) + "\n");

function fontSummary(f) {
  return {
    id: f.id, family: f.family, category: f.category, tags: f.tags, voice: f.voice,
    variable: f.variable, weights: f.weights, popularity: f.popularity,
    useFor: f.useFor, avoidFor: f.avoidFor, pairWith: f.pairWith, specimenUrl: f.specimenUrl,
  };
}

if (cmd === "stats") {
  const fonts = read("fonts.json");
  const pairs = read("font-pairings.json");
  const layouts = read("layouts.json");
  const themes = read("themes.json");
  out({
    fonts: fonts.summary,
    pairings: pairs.summary,
    layouts: layouts.summary,
    themes: themes.summary,
    usage: {
      fonts: "query.mjs fonts --category \"Sans Serif\" --tag ui --limit 10",
      pairings: "query.mjs pairings --mood premium --limit 10",
      layouts: "query.mjs layouts --page saas-landing --fit 4 --limit 10",
      themes: "query.mjs themes --best-for saas --mode dark-first --limit 8",
      item: "query.mjs theme TH-0001 | layout LB-0001 | font inter",
    },
  });
} else if (cmd === "fonts") {
  const { fonts } = read("fonts.json");
  let list = fonts;
  if (flags.category) list = list.filter((f) => has(f.category, flags.category));
  if (flags.tag) list = list.filter((f) => String(flags.tag).split(",").every((t) => f.tags.includes(t.trim())));
  if (flags.search) list = list.filter((f) => has(f.family, flags.search) || has(f.voice, flags.search));
  if (flags.latin) list = list.filter((f) => f.hasLatin);
  if (flags.variable) list = list.filter((f) => f.variable);
  if (flags.popular) list = list.filter((f) => f.popularity && f.popularity <= Number(flags.popular === true ? 300 : flags.popular));
  list = list.slice().sort((a, b) => (a.popularity ?? 9999) - (b.popularity ?? 9999));
  out({ count: list.length, fonts: list.slice(0, limit).map(fontSummary) });
} else if (cmd === "font") {
  const { fonts } = read("fonts.json");
  const q = String(flags._ || flags.id || flags.family || "").toLowerCase();
  const f = fonts.find((x) => x.id === q || x.family.toLowerCase() === q || has(x.family, q));
  if (!f) { console.error("font not found"); process.exit(1); }
  out(f);
} else if (cmd === "pairings") {
  const { pairings } = read("font-pairings.json");
  let list = pairings;
  if (flags.mood) list = list.filter((p) => has(p.mood, flags.mood));
  if (flags.heading) list = list.filter((p) => has(p.heading, flags.heading));
  if (flags.body) list = list.filter((p) => has(p.body, flags.body));
  if (flags.search) list = list.filter((p) => has(p.heading + " " + p.body, flags.search));
  out({ count: list.length, pairings: list.slice(0, limit) });
} else if (cmd === "layouts") {
  const { layouts } = read("layouts.json");
  let list = layouts;
  if (flags.page) list = list.filter((l) => has(l.page, flags.page));
  if (flags.group) list = list.filter((l) => has(l.group, flags.group));
  if (flags.family) list = list.filter((l) => has(l.family, flags.family));
  if (flags.hero) list = list.filter((l) => has(l.hero, flags.hero));
  if (flags.density) list = list.filter((l) => l.density === flags.density);
  if (flags.fit) list = list.filter((l) => l.fit >= Number(flags.fit));
  list = list.slice().sort((a, b) => b.fit - a.fit || a.id.localeCompare(b.id));
  out({ count: list.length, layouts: list.slice(0, limit) });
} else if (cmd === "layout") {
  const { layouts } = read("layouts.json");
  const l = layouts.find((x) => x.id === String(flags._ || flags.id).toUpperCase());
  if (!l) { console.error("layout not found"); process.exit(1); }
  out(l);
} else if (cmd === "themes") {
  const { themes } = read("themes.json");
  let list = themes;
  if (flags["best-for"]) list = list.filter((t) => t.bestFor.some((b) => has(b, flags["best-for"])));
  if (flags.mood) list = list.filter((t) => t.mood.some((m) => has(m, flags.mood)));
  if (flags.strategy) list = list.filter((t) => t.strategy === flags.strategy);
  if (flags.relation) list = list.filter((t) => t.accentRelation === flags.relation);
  if (flags.mode) list = list.filter((t) => has(t.recommendedMode, flags.mode));
  if (flags.hue) list = list.filter((t) => String(t.brandHue) === String(flags.hue));
  if (flags.search) list = list.filter((t) => has(t.name + " " + t.fontMood, flags.search));
  list = list.slice().sort((a, b) => a.id.localeCompare(b.id));
  const compact = list.slice(0, limit).map((t) => ({
    id: t.id, name: t.name, strategy: t.strategy, accentRelation: t.accentRelation,
    mood: t.mood, bestFor: t.bestFor, recommendedMode: t.recommendedMode, fontMood: t.fontMood,
    light: { bg: t.light.tokens.bg, surface: t.light.tokens.surface, text: t.light.tokens.text, accent: t.light.tokens.accent, accentAlt: t.light.tokens.accentAlt, wcag: t.light.wcag },
    dark: { bg: t.dark.tokens.bg, surface: t.dark.tokens.surface, text: t.dark.tokens.text, accent: t.dark.tokens.accent, accentAlt: t.dark.tokens.accentAlt, wcag: t.dark.wcag },
  }));
  out({ count: list.length, themes: compact });
} else if (cmd === "theme") {
  const { themes } = read("themes.json");
  const t = themes.find((x) => x.id === String(flags._ || flags.id).toUpperCase());
  if (!t) { console.error("theme not found"); process.exit(1); }
  out(t);
} else {
  console.error("Usage: query.mjs <stats|fonts|font|pairings|layouts|layout|themes|theme> [--flag value]");
  process.exit(1);
}
