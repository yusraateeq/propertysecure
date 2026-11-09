#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../data");
const read = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));

const problems = [];
const fonts = read("fonts.json");
const pairings = read("font-pairings.json");
const layouts = read("layouts.json");
const themes = read("themes.json");
const families = ["classic-single-column", "split-asymmetric", "editorial-grid", "bento", "sidebar-app", "dashboard-grid", "full-bleed-immersive", "card-stack", "masonry", "magazine", "centered-minimal", "data-dense-table"];
const tokens = ["bg", "surface", "elevated", "border", "borderStrong", "text", "textMuted", "textSubtle", "accent", "accentHover", "accentAlt", "onAccent", "focus", "selection", "success", "warning", "danger", "info"];

if (fonts.fonts.length < 1000) problems.push("fonts < 1000");
if (layouts.layouts.length < 1000) problems.push("layouts < 1000");
if (themes.themes.length < 1000) problems.push("themes < 1000");

const unique = (arr, label) => {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x.id)) problems.push(label + " duplicate id " + x.id);
    seen.add(x.id);
  }
};
unique(fonts.fonts, "fonts");
unique(pairings.pairings, "pairings");
unique(layouts.layouts, "layouts");
unique(themes.themes, "themes");

const fontNames = new Set(fonts.fonts.map((f) => f.family));
for (const p of pairings.pairings) {
  if (!fontNames.has(p.heading)) problems.push("pairing heading missing: " + p.heading);
  if (!fontNames.has(p.body)) problems.push("pairing body missing: " + p.body);
}

const pages = new Set(layouts.layouts.map((l) => l.page));
for (const l of layouts.layouts) {
  if (!families.includes(l.family)) problems.push("layout bad family " + l.id + " " + l.family);
  if (!(l.fit >= 1 && l.fit <= 5)) problems.push("layout bad fit " + l.id);
  if (!Array.isArray(l.sections) || !l.sections.length) problems.push("layout empty sections " + l.id);
  if (!l.responsive || !l.responsive.desktop || !l.responsive.mobile) problems.push("layout missing responsive " + l.id);
}
if (pages.size !== 40) problems.push("expected 40 page types, got " + pages.size);

for (const t of themes.themes) {
  for (const mode of ["light", "dark"]) {
    const m = t[mode];
    if (!m || !m.tokens) { problems.push("theme missing " + mode + " " + t.id); continue; }
    for (const k of tokens) if (!m.tokens[k]) problems.push("theme " + t.id + " " + mode + " missing token " + k);
    if (m.wcag.textBg < 7) problems.push("theme " + t.id + " " + mode + " text contrast " + m.wcag.textBg);
    if (m.wcag.mutedBg < 4.5) problems.push("theme " + t.id + " " + mode + " muted contrast " + m.wcag.mutedBg);
    if (m.wcag.onAccent < 4.5) problems.push("theme " + t.id + " " + mode + " onAccent contrast " + m.wcag.onAccent);
  }
}

if (problems.length) {
  console.error("VALIDATION FAILED (" + problems.length + "):");
  for (const p of problems.slice(0, 40)) console.error(" - " + p);
  process.exit(1);
}
console.log("UIUX dataset valid");
console.log("fonts:", fonts.fonts.length, "| pairings:", pairings.pairings.length, "| layouts:", layouts.layouts.length, "| pages:", pages.size, "| themes:", themes.themes.length);
