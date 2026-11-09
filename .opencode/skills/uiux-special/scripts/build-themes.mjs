import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../data");
fs.mkdirSync(dataDir, { recursive: true });

// ---------- color math ----------
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const rad = (d) => (d * Math.PI) / 180;

function oklchToLinear(L, C, H) {
  const a = C * Math.cos(rad(H));
  const b = C * Math.sin(rad(H));
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

function linearToSrgb(c) {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  return clamp(v);
}

function toHex(L, C, H) {
  const lin = oklchToLinear(L, C, H);
  const r = Math.round(linearToSrgb(lin.r) * 255);
  const g = Math.round(linearToSrgb(lin.g) * 255);
  const b = Math.round(linearToSrgb(lin.b) * 255);
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function luminance(L, C, H) {
  const lin = oklchToLinear(L, C, H);
  return 0.2126 * clamp(lin.r) + 0.7152 * clamp(lin.g) + 0.0722 * clamp(lin.b);
}

function contrast(a, b) {
  const la = luminance(...a);
  const lb = luminance(...b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

function lumLin([r, g, b]) {
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b);
}

function contrastLin(a, b) {
  const la = lumLin(a);
  const lb = lumLin(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// ---------- theme engine ----------
const strategies = {
  "warm-neutral": { neutralH: 70, surfaceC: 0.008, textC: 0.012, label: "warm neutral" },
  "cool-neutral": { neutralH: 250, surfaceC: 0.008, textC: 0.012, label: "cool neutral" },
  tinted: { neutralH: null, surfaceC: 0.014, textC: 0.02, label: "tinted neutral" },
  "high-contrast": { neutralH: 250, surfaceC: 0.004, textC: 0.008, label: "high contrast" },
  muted: { neutralH: null, surfaceC: 0.01, textC: 0.014, label: "muted" },
};

const relations = {
  complementary: 180,
  analogous: 30,
  triadic: 120,
  "split-complementary": 150,
};
const strategyLabel = {
  "warm-neutral": "Warm",
  "cool-neutral": "Cool",
  tinted: "Tinted",
  "high-contrast": "Contrast",
  muted: "Muted",
};
const relationLabel = {
  complementary: "Complement",
  analogous: "Analogous",
  triadic: "Triadic",
  "split-complementary": "Split",
};

const hueNames = [
  [0, "Ember"], [20, "Amber"], [40, "Gold"], [60, "Lime"], [80, "Spring"],
  [100, "Emerald"], [120, "Jade"], [140, "Teal"], [160, "Aqua"], [180, "Sky"],
  [200, "Azure"], [220, "Cobalt"], [240, "Indigo"], [260, "Violet"], [280, "Orchid"],
  [300, "Magenta"], [320, "Rose"], [340, "Crimson"],
];
function hueName(h) {
  let name = hueNames[0][1];
  for (const [start, n] of hueNames) if (h >= start) name = n;
  return name;
}
function hueFamily(h) {
  if (h < 60 || h >= 340) return "warm";
  if (h < 160) return "fresh";
  if (h < 260) return "cool";
  return "vivid";
}
const familyMood = {
  warm: ["bold", "inviting", "premium"],
  fresh: ["calm", "healthy", "optimistic"],
  cool: ["crisp", "technical", "trustworthy"],
  vivid: ["creative", "expressive", "modern"],
};
const familyBestFor = {
  warm: ["real-estate", "property-management", "hospitality", "food", "restaurant", "lifestyle", "luxury"],
  fresh: ["health", "wellness", "education", "sustainability", "nonprofit", "fitness"],
  cool: ["saas", "b2b", "fintech", "developer-tools", "enterprise", "analytics", "ecommerce"],
  vivid: ["agency", "portfolio", "media", "consumer", "ecommerce", "creative"],
};
const strategyMood = {
  "warm-neutral": "warm",
  "cool-neutral": "crisp",
  tinted: "cohesive",
  "high-contrast": "bold",
  muted: "calm",
};

function pickAccent({ bgL, bgC, bgH, hue, chroma, minVsBg = 3, mode }) {
  const bg = [bgL, bgC, bgH];
  const candidates = [];
  const range = mode === "light" ? [0.38, 0.7] : [0.52, 0.82];
  for (let L = range[0]; L <= range[1] + 1e-9; L += 0.005) {
    const accent = [L, chroma, hue];
    const vsBg = contrast(accent, bg);
    const vsWhite = contrast(accent, [0.995, 0, 0]);
    const vsBlack = contrast(accent, [0.17, 0, 0]);
    if (vsBg < minVsBg) continue;
    // 4.6 keeps a safety margin against hex rounding.
    const useWhite = vsWhite >= 4.6;
    const useBlack = vsBlack >= 4.6;
    if (!useWhite && !useBlack) continue;
    candidates.push({ L, accent, vsBg, vsWhite, vsBlack, useWhite, useBlack });
  }
  if (!candidates.length) return { L: mode === "light" ? 0.48 : 0.7, accent: [mode === "light" ? 0.48 : 0.7, chroma, hue], on: "white" };
  // Target a vivid accent instead of the maximum-contrast (near-black) one.
  const targetL = mode === "light" ? 0.54 : 0.72;
  const preferWhite = mode === "light";
  let best = candidates[0];
  let bestScore = Infinity;
  for (const c of candidates) {
    const onPreferred = preferWhite ? c.useWhite : c.useBlack;
    const score = Math.abs(c.L - targetL) + (onPreferred ? 0 : 0.04);
    if (score < bestScore) {
      bestScore = score;
      best = c;
    }
  }
  const useWhite = preferWhite ? best.useWhite : !best.useBlack;
  return {
    L: best.L,
    accent: best.accent,
    on: useWhite ? "white" : "black",
    vsBg: round2(best.vsBg),
    onContrast: round2(useWhite ? best.vsWhite : best.vsBlack),
  };
}

function statusColor(hue, mode, bg) {
  const target = mode === "light" ? 0.46 : 0.76;
  let best = null;
  for (let L = target; L <= target + 0.2; L += 0.01) {
    const c = [L, 0.13, hue];
    const ratio = contrast(c, bg);
    if (ratio >= 4.5) { best = { L, c, ratio }; break; }
  }
  if (!best) {
    const c = [mode === "light" ? 0.4 : 0.82, 0.13, hue];
    best = { L: c[0], c, ratio: contrast(c, bg) };
  }
  return { hex: toHex(...best.c), contrast: round2(best.ratio) };
}

function buildTheme({ hueIndex, brandH, strategyKey, relationKey }) {
  const s = strategies[strategyKey];
  const neutralH = s.neutralH === null ? brandH : s.neutralH;
  const accentH = brandH;
  const altH = (brandH + relations[relationKey]) % 360;
  const lightBg = strategyKey === "high-contrast" ? [1, 0.002, neutralH] : strategyKey === "muted" ? [0.97, 0.006, neutralH] : [0.985, 0.004, neutralH];
  const darkBg = strategyKey === "high-contrast" ? [0.1, 0.006, neutralH] : strategyKey === "muted" ? [0.17, 0.012, neutralH] : [0.15, 0.012, neutralH];

  const lightTextL = strategyKey === "high-contrast" ? 0.16 : 0.22;
  const darkTextL = strategyKey === "high-contrast" ? 0.99 : 0.96;

  const lightSurface = strategyKey === "high-contrast" ? [0.975, 0.003, neutralH] : [0.96, s.surfaceC, neutralH];
  const darkSurface = strategyKey === "high-contrast" ? [0.14, 0.008, neutralH] : [0.19, s.surfaceC + 0.002, neutralH];

  const accentC = strategyKey === "muted" ? 0.11 : 0.15;
  const lightAccent = pickAccent({ bgL: lightBg[0], bgC: lightBg[1], bgH: lightBg[2], hue: accentH, chroma: accentC, mode: "light" });
  const darkAccent = pickAccent({ bgL: darkBg[0], bgC: darkBg[1], bgH: darkBg[2], hue: accentH, chroma: accentC, mode: "dark" });

  const lightAlt = toHex(0.52, accentC * 0.9, altH);
  const darkAlt = toHex(0.74, accentC * 0.9, altH);

  const light = {
    bg: toHex(...lightBg),
    surface: toHex(...lightSurface),
    elevated: toHex(strategyKey === "high-contrast" ? 1 : 1, 0, 0),
    border: toHex(0.9, s.surfaceC, neutralH),
    borderStrong: toHex(0.82, s.surfaceC + 0.004, neutralH),
    text: toHex(lightTextL, s.textC, neutralH),
    textMuted: toHex(0.45, s.textC + 0.004, neutralH),
    textSubtle: toHex(0.56, s.textC + 0.006, neutralH),
    accent: toHex(...lightAccent.accent),
    accentHover: toHex(Math.max(0.34, lightAccent.L - 0.05), accentC + 0.01, accentH),
    accentAlt: lightAlt,
    onAccent: lightAccent.on === "white" ? toHex(0.99, 0, 0) : toHex(0.16, 0, 0),
    focus: toHex(...lightAccent.accent),
    selection: toHex(0.9, 0.05, accentH),
    success: statusColor(150, "light", lightBg).hex,
    warning: statusColor(75, "light", lightBg).hex,
    danger: statusColor(27, "light", lightBg).hex,
    info: statusColor(250, "light", lightBg).hex,
  };
  const dark = {
    bg: toHex(...darkBg),
    surface: toHex(...darkSurface),
    elevated: toHex(strategyKey === "high-contrast" ? 0.18 : 0.23, s.surfaceC + 0.002, neutralH),
    border: toHex(0.32, s.surfaceC + 0.006, neutralH),
    borderStrong: toHex(0.42, s.surfaceC + 0.008, neutralH),
    text: toHex(darkTextL, s.textC, neutralH),
    textMuted: toHex(0.74, s.textC + 0.004, neutralH),
    textSubtle: toHex(0.62, s.textC + 0.006, neutralH),
    accent: toHex(...darkAccent.accent),
    accentHover: toHex(Math.min(0.88, darkAccent.L + 0.05), accentC + 0.01, accentH),
    accentAlt: darkAlt,
    onAccent: darkAccent.on === "white" ? toHex(0.99, 0, 0) : toHex(0.16, 0, 0),
    focus: toHex(...darkAccent.accent),
    selection: toHex(0.3, 0.06, accentH),
    success: statusColor(150, "dark", darkBg).hex,
    warning: statusColor(75, "dark", darkBg).hex,
    danger: statusColor(27, "dark", darkBg).hex,
    info: statusColor(250, "dark", darkBg).hex,
  };

  const wcag = (tokens) => ({
    textBg: round2(contrastLin(hexToLin(tokens.text), hexToLin(tokens.bg))),
    mutedBg: round2(contrastLin(hexToLin(tokens.textMuted), hexToLin(tokens.bg))),
    subtleBg: round2(contrastLin(hexToLin(tokens.textSubtle), hexToLin(tokens.bg))),
    accentBg: round2(contrastLin(hexToLin(tokens.accent), hexToLin(tokens.bg))),
    onAccent: round2(contrastLin(hexToLin(tokens.onAccent), hexToLin(tokens.accent))),
    borderBg: round2(contrastLin(hexToLin(tokens.border), hexToLin(tokens.bg))),
  });

  function hexToLin(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const f = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return [f(r), f(g), f(b)];
  }

  const lightWcag = wcag(light);
  const darkWcag = wcag(dark);
  const failures = [];
  for (const [mode, w] of [["light", lightWcag], ["dark", darkWcag]]) {
    if (w.textBg < 7) failures.push(mode + ":textBg " + w.textBg);
    if (w.mutedBg < 4.5) failures.push(mode + ":mutedBg " + w.mutedBg);
    if (w.subtleBg < 3) failures.push(mode + ":subtleBg " + w.subtleBg);
    if (w.accentBg < 3) failures.push(mode + ":accentBg " + w.accentBg);
    if (w.onAccent < 4.5) failures.push(mode + ":onAccent " + w.onAccent);
  }
  if (failures.length) throw new Error("contrast failure " + strategyKey + "/" + relationKey + "/" + brandH + ": " + failures.join(", "));

  const family = hueFamily(brandH);
  return {
    id: "TH-" + String(hueIndex * 20 + Object.keys(strategies).indexOf(strategyKey) * 4 + Object.keys(relations).indexOf(relationKey) + 1).padStart(4, "0"),
    name:
      hueName(brandH) +
      " " +
      String(hueIndex + 1).padStart(2, "0") +
      " · " +
      strategyLabel[strategyKey] +
      " · " +
      relationLabel[relationKey],
    brandHue: brandH,
    strategy: strategyKey,
    accentRelation: relationKey,
    mood: [...new Set([strategyMood[strategyKey], ...familyMood[family]])],
    bestFor: familyBestFor[family],
    recommendedMode: ["saas", "fintech", "developer-tools", "enterprise", "analytics"].some((x) => familyBestFor[family].includes(x)) ? "dark-first" : "light-first",
    fontMood: strategyKey === "high-contrast" ? "display + neutral sans" : family === "warm" ? "serif + humanist sans" : family === "fresh" ? "geometric sans + sans" : family === "cool" ? "grotesk + mono accents" : "display + grotesk",
    light: { tokens: light, wcag: lightWcag },
    dark: { tokens: dark, wcag: darkWcag },
  };
}

const hues = Array.from({ length: 60 }, (_, i) => i * 6);
const themes = [];
let idx = 0;
for (const brandH of hues) {
  for (const strategyKey of Object.keys(strategies)) {
    for (const relationKey of Object.keys(relations)) {
      themes.push(buildTheme({ hueIndex: idx, brandH, strategyKey, relationKey }));
    }
  }
  idx++;
}

const summary = {
  generatedAt: new Date().toISOString(),
  count: themes.length,
  modes: ["light", "dark"],
  strategies: Object.keys(strategies),
  accentRelations: Object.keys(relations),
  minContrast: Math.min(
    ...themes.flatMap((t) => [t.light.wcag.textBg, t.light.wcag.mutedBg, t.light.wcag.onAccent, t.dark.wcag.textBg, t.dark.wcag.mutedBg, t.dark.wcag.onAccent]),
  ),
};

fs.writeFileSync(path.join(dataDir, "themes.json"), JSON.stringify({ summary, themes }, null, 0));
console.log("themes:", themes.length);
console.log("min key contrast:", round2(summary.minContrast));
console.log("sample:", JSON.stringify(themes[0], null, 2).slice(0, 900));
