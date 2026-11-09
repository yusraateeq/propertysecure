# Dataset reference

All data is generated and validated. Do not hand-edit the JSON files; change the scripts
and regenerate.

| File | Contents | Count |
| --- | --- | --- |
| `fonts.json` | Real Google Fonts metadata + derived tags, use/avoid, pairing suggestions | 1,959 |
| `font-pairings.json` | Heading + body pairings with mood and rationale | 360 |
| `layouts.json` | Page blueprints: family, hero, sections, grid, responsive, motion | 1,200 |
| `themes.json` | Light + dark token pairs with WCAG results | 1,200 |

## fonts.json

```json
{
  "summary": { "count": 1959, "latinCount": 1838, "variableCount": 565 },
  "fonts": [
    {
      "id": "inter",
      "family": "Inter",
      "category": "Sans Serif",
      "classifications": [],
      "tags": ["flexible", "latin", "multi-weight", "popular", "sans", "ui", "variable"],
      "voice": "neutral",
      "hasLatin": true,
      "axes": [{ "tag": "wght", "min": 100, "max": 900, "default": 400 }],
      "variable": true,
      "weights": [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "styles": ["normal", "italic"],
      "useFor": ["product UI", "body copy", "dashboards"],
      "avoidFor": [],
      "pairWith": ["Playfair Display", "Fraunces", "Lora"],
      "specimenUrl": "https://fonts.google.com/specimen/Inter"
    }
  ]
}
```

## font-pairings.json

```json
{
  "pairings": [
    {
      "id": "FP-0003",
      "heading": "Playfair Display",
      "body": "Nunito",
      "mood": "premium",
      "bestFor": ["editorial", "luxury", "real estate", "hospitality"],
      "reason": "Contrast between expressive serif headings and a neutral sans body keeps long copy readable."
    }
  ]
}
```

## layouts.json

```json
{
  "layouts": [
    {
      "id": "LB-0009",
      "page": "saas-landing",
      "group": "marketing",
      "tags": ["b2b", "saas", "conversion"],
      "family": "bento",
      "hero": "product-demo",
      "fit": 5,
      "density": "compact",
      "grid": "12-col modular bento, spans 3/6/4/8",
      "container": "1280px",
      "nav": "sticky-top",
      "sections": ["nav", "hero:product-demo", "logo-cloud", "..."],
      "responsive": { "desktop": "...", "tablet": "...", "mobile": "..." },
      "motion": ["stagger", "scale-in", "fade"],
      "bestFor": ["b2b", "saas", "conversion"],
      "avoid": [],
      "themeHints": ["light-first", "high-contrast-cta", "brand-accent"],
      "accessibility": ["one h1 and a logical heading order", "..."],
      "wireframe": [{ "order": 1, "block": "nav", "span": "auto" }]
    }
  ]
}
```

`fit`: 5 = ideal, 4 = strong, 3 = workable with adjustments, 2 = weak, 1 = avoid.
Only use fit 4-5 unless the user asks for an experiment.

## themes.json

```json
{
  "themes": [
    {
      "id": "TH-0546",
      "name": "Aqua 28 · Cool · Analogous",
      "brandHue": 162,
      "strategy": "cool-neutral",
      "accentRelation": "analogous",
      "mood": ["crisp", "technical", "trustworthy"],
      "bestFor": ["saas", "b2b", "fintech", "developer-tools", "enterprise", "analytics", "ecommerce"],
      "recommendedMode": "dark-first",
      "fontMood": "grotesk + mono accents",
      "light": {
        "tokens": { "bg": "#f8fafd", "surface": "...", "text": "...", "accent": "#008550", "...": "..." },
        "wcag": { "textBg": 12.1, "mutedBg": 5.2, "subtleBg": 3.4, "accentBg": 4.9, "onAccent": 4.8, "borderBg": 1.2 }
      },
      "dark": { "tokens": {}, "wcag": {} }
    }
  ]
}
```

Token contract for both modes:
`bg`, `surface`, `elevated`, `border`, `borderStrong`, `text`, `textMuted`, `textSubtle`,
`accent`, `accentHover`, `accentAlt`, `onAccent`, `focus`, `selection`, `success`,
`warning`, `danger`, `info`.

WCAG thresholds enforced at generation: `textBg >= 7`, `mutedBg >= 4.5`,
`onAccent >= 4.5`, `subtleBg >= 3`, `accentBg >= 3`.

## Query and validate

```bash
node .opencode/skills/uiux-special/scripts/query.mjs stats
node .opencode/skills/uiux-special/scripts/validate.mjs
```

## Regenerate

```bash
node .opencode/skills/uiux-special/scripts/build-fonts.mjs
node .opencode/skills/uiux-special/scripts/build-layouts.mjs
node .opencode/skills/uiux-special/scripts/build-themes.mjs
node .opencode/skills/uiux-special/scripts/validate.mjs
```

`build-fonts.mjs` downloads the current Google Fonts catalogue. The other two are
deterministic and offline.
