import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../data");
fs.mkdirSync(dataDir, { recursive: true });

const res = await fetch("https://fonts.google.com/metadata/fonts", {
  headers: { "user-agent": "Mozilla/5.0" },
});
if (!res.ok) throw new Error("HTTP " + res.status);
const raw = await res.text();
const data = JSON.parse(raw.replace(/^\)\]\}'?\s*/, ""));
const list = data.familyMetadataList || [];

const asciiSlug = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const commonBody = ["Inter", "Manrope", "DM Sans", "Public Sans", "Source Sans 3", "IBM Plex Sans", "Work Sans"];
const commonHeading = ["Playfair Display", "Fraunces", "Lora", "Source Serif 4", "Sora", "Space Grotesk", "Archivo"];
const available = new Set(list.map((f) => f.family));
const pickFrom = (pool, self, count) => {
  const out = [];
  for (const name of pool) {
    if (name !== self && available.has(name) && !out.includes(name)) out.push(name);
    if (out.length === count) break;
  }
  return out;
};

const fonts = list.map((f) => {
  const cat = f.category || "Sans Serif";
  const cls = Array.isArray(f.classifications) ? f.classifications : [];
  const weights = Object.keys(f.fonts || {})
    .filter((k) => /^\d+$/.test(k))
    .map(Number)
    .sort((a, b) => a - b);
  const styles = Object.keys(f.fonts || {}).filter((k) => k.endsWith("i")).length > 0 ? ["normal", "italic"] : ["normal"];
  const axes = (f.axes || []).map((a) => ({ tag: a.tag, min: a.min, max: a.max, default: a.defaultValue }));
  const hasLatin = (f.subsets || []).includes("latin");
  const lineHeights = Object.values(f.fonts || {}).map((x) => x.lineHeight).filter(Boolean);
  const defaultLineHeight = lineHeights.length
    ? Math.round((lineHeights.reduce((a, b) => a + b, 0) / lineHeights.length) * 1000) / 1000
    : null;

  const tags = new Set();
  if (cat === "Sans Serif") tags.add("sans");
  if (cat === "Serif") tags.add("serif");
  if (cat === "Display") tags.add("display");
  if (cat === "Handwriting") tags.add("script");
  if (cat === "Monospace") tags.add("mono");
  for (const c of cls) {
    const v = String(c).toLowerCase();
    if (v.includes("display")) tags.add("display");
    if (v.includes("monospace")) tags.add("mono");
    if (v.includes("rounded")) tags.add("rounded");
    if (v.includes("black")) tags.add("heavy");
    if (v.includes("condensed")) tags.add("condensed");
  }
  if (f.popularity && f.popularity <= 150) tags.add("popular");
  if (f.popularity && f.popularity <= 300) tags.add("ui");
  if (axes.length) tags.add("variable");
  if (weights.length >= 6) tags.add("flexible");
  if (weights.length >= 9) tags.add("multi-weight");
  if (cat === "Serif") tags.add("editorial");
  if (cat === "Monospace") tags.add("code");
  if (cat === "Display" || cls.includes("Display")) tags.add("headline");
  if (cat === "Handwriting") tags.add("accent");
  if (hasLatin) tags.add("latin");

  let voice = "neutral";
  if (cat === "Serif") voice = "editorial-trustworthy";
  if (cat === "Display") voice = "expressive";
  if (cat === "Handwriting") voice = "personal";
  if (cat === "Monospace") voice = "technical";
  if (cat === "Sans Serif" && tags.has("rounded")) voice = "friendly";

  const pairPool = tags.has("display") || tags.has("script") || tags.has("headline")
    ? commonBody
    : tags.has("serif")
      ? commonBody
      : commonHeading;

  return {
    id: asciiSlug(f.family),
    family: f.family,
    category: cat,
    classifications: cls,
    tags: [...tags].sort(),
    voice,
    hasLatin,
    subsets: (f.subsets || []).filter((s) => s !== "menu"),
    axes,
    variable: axes.length > 0,
    weights,
    styles,
    defaultLineHeight,
    popularity: f.popularity ?? null,
    trending: f.trending ?? null,
    dateAdded: f.dateAdded || null,
    designers: f.designers || [],
    useFor: tags.has("mono")
      ? ["code", "technical labels", "tabular data"]
      : tags.has("serif")
        ? ["editorial", "long-form body", "premium headings"]
        : tags.has("display")
          ? ["hero headlines", "campaigns", "brand accents"]
          : tags.has("script")
            ? ["signature accents", "invitations", "short labels"]
            : ["product UI", "body copy", "dashboards"],
    avoidFor: tags.has("script") || tags.has("display")
      ? ["long body text", "dense tables", "small UI labels"]
      : tags.has("mono")
        ? ["long marketing copy", "luxury editorial"]
        : [],
    pairWith: pickFrom(pairPool, f.family, 3),
    specimenUrl: "https://fonts.google.com/specimen/" + encodeURIComponent(f.family).replace(/%20/g, "+"),
  };
});

fonts.sort((a, b) => (a.popularity ?? 9999) - (b.popularity ?? 9999) || a.family.localeCompare(b.family));

const byFamily = new Map(fonts.map((f) => [f.family, f]));
const headingPool = fonts
  .filter((f) => f.hasLatin && (f.tags.includes("display") || f.tags.includes("serif")))
  .slice(0, 120);
const bodyPool = fonts
  .filter((f) => f.hasLatin && f.tags.includes("sans") && f.popularity && f.popularity <= 500)
  .slice(0, 40);

const moods = ["editorial", "modern", "premium", "technical", "friendly", "bold"];
const pairings = [];
let pi = 0;
for (const heading of headingPool) {
  for (let k = 0; k < 3; k++) {
    const body = bodyPool[(pi + k * 7) % bodyPool.length];
    if (!body || body.family === heading.family) continue;
    pairings.push({
      id: "FP-" + String(pairings.length + 1).padStart(4, "0"),
      heading: heading.family,
      body: body.family,
      mood: moods[pairings.length % moods.length],
      bestFor:
        heading.category === "Serif"
          ? ["editorial", "luxury", "real estate", "hospitality"]
          : ["saas", "startup", "portfolio", "agency"],
      reason:
        heading.category === "Serif"
          ? "Contrast between expressive serif headings and a neutral sans body keeps long copy readable."
          : "Neutral sans body balances a high-personality display face without competing with it.",
    });
  }
  pi++;
}

const maxPopularity = Math.max(...fonts.map((f) => f.popularity ?? 0));
const summary = {
  generatedAt: new Date().toISOString(),
  source: "https://fonts.google.com/metadata/fonts",
  count: fonts.length,
  latinCount: fonts.filter((f) => f.hasLatin).length,
  variableCount: fonts.filter((f) => f.variable).length,
  categoryCounts: fonts.reduce((acc, f) => ((acc[f.category] = (acc[f.category] || 0) + 1), acc), {}),
  pairingCount: pairings.length,
  maxPopularity,
};

fs.writeFileSync(path.join(dataDir, "fonts.json"), JSON.stringify({ summary, fonts }, null, 0));
fs.writeFileSync(path.join(dataDir, "font-pairings.json"), JSON.stringify({ summary: { count: pairings.length }, pairings }, null, 0));

console.log("fonts:", fonts.length, "| latin:", summary.latinCount, "| variable:", summary.variableCount);
console.log("categories:", JSON.stringify(summary.categoryCounts));
console.log("pairings:", pairings.length);
