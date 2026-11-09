# Theme Reference

1,200 generated theme pairs. Each pair ships light and dark tokens together. There are no
other modes. Every pair is validated for WCAG contrast at generation time.

## Query

```bash
node .opencode/skills/uiux-special/scripts/query.mjs themes --best-for saas --mode dark-first --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs themes --mood premium --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs themes --strategy warm-neutral --relation complementary --limit 8
node .opencode/skills/uiux-special/scripts/query.mjs theme TH-0001
```

Filters: `--best-for`, `--mood`, `--strategy`, `--relation`, `--mode`, `--hue`, `--search`.

## Token contract

Use these semantic names in code. Never ship raw hex in components.

| Token | Role |
| --- | --- |
| `bg` | page background |
| `surface` | cards, panels, secondary sections |
| `elevated` | modals, popovers, raised cards |
| `border` | default dividers and inputs |
| `borderStrong` | emphasized boundaries, table headers |
| `text` | primary text |
| `textMuted` | secondary text |
| `textSubtle` | metadata, placeholders, disabled labels |
| `accent` | primary action, focus, active state |
| `accentHover` | hover/pressed primary |
| `accentAlt` | charts, tags, secondary highlight |
| `onAccent` | text/icon on accent |
| `focus` | focus ring |
| `selection` | text selection |
| `success`, `warning`, `danger`, `info` | status only |

## Contrast targets

| Pair | Minimum | Target |
| --- | --- | --- |
| `text` on `bg` | 7:1 | 10:1+ |
| `textMuted` on `bg` | 4.5:1 | 6:1+ |
| `textSubtle` on `bg` | 3:1 | large text only |
| `accent` on `bg` | 3:1 | 4.5:1 for icons |
| `onAccent` on `accent` | 4.5:1 | 5:1+ |
| `border` on `bg` | 1.2:1 | visible separation |

Every generated pair stores its measured values in `light.wcag` and `dark.wcag`.

## Color theory rules

- **60-30-10.** 60% neutral background, 30% surfaces and text, 10% accent.
- **One accent.** Primary actions own it. Charts may use `accentAlt`; status colors are
  reserved for status.
- **Neutral tinting.** Warm neutrals for hospitality, real estate, food. Cool neutrals for
  SaaS, fintech, engineering. Tinted neutrals for cohesive brand worlds.
- **Accent relationships.** Complementary gives tension and contrast; analogous gives calm
  harmony; triadic gives playful energy; split-complementary balances both. These describe
  how `accentAlt` relates to the brand hue; the primary `accent` stays on-brand.
- **Saturation discipline.** Large surfaces stay low-chroma. High chroma is for small
  accents and data marks.
- **No pure extremes.** Avoid `#000` and `#fff` as page/text defaults; use near-black and
  near-white from the theme.

## Strategies

| Strategy | Character | Best for |
| --- | --- | --- |
| `warm-neutral` | inviting, editorial, premium | real estate, hospitality, food, lifestyle |
| `cool-neutral` | crisp, technical, trustworthy | SaaS, fintech, developer tools, enterprise |
| `tinted` | cohesive, branded, calm | health, education, consumer, nonprofit |
| `high-contrast` | bold, graphic, confident | agency, portfolio, launch, media |
| `muted` | quiet, refined, understated | luxury, wellness, editorial, consulting |

## Combinations that look good

These are validated examples from the dataset. Use them as starting points, then query for
the exact industry.

| ID | Name | Strategy / relation | Light bg / accent | Dark bg / accent | Mood |
| --- | --- | --- | --- | --- | --- |
| `TH-0001` | Ember 01 · Warm · Complement | warm-neutral / complementary | `#fcfaf7` / `#b0416b` | `#0e0a06` / `#ee79a1` | warm, bold, premium |
| `TH-0546` | Aqua 28 · Cool · Analogous | cool-neutral / analogous | `#f8fafd` / `#008550` | `#080c10` / `#24c187` | crisp, technical |
| `TH-0553` | Aqua 28 · Contrast · Complement | high-contrast / complementary | `#feffff` / `#008550` | `#020305` / `#24c187` | bold, technical |
| `TH-0209` | Lime 11 · Tinted · Complement | tinted / complementary | `#fcf9f7` / `#ab5300` | `#0f0a06` / `#e78b30` | calm, optimistic |
| `TH-0893` | Violet 45 · Contrast · Complement | high-contrast / complementary | `#feffff` / `#4069c5` | `#020305` / `#74a1ff` | creative, expressive |
| `TH-0017` | Ember 01 · Muted · Complement | muted / complementary | `#f9f3f5` / `#a1516c` | `#140d0f` / `#dd87a2` | calm, premium |
| `TH-0011` | Ember 01 · Tinted · Triadic | tinted / triadic | `#fdf9fa` / `#b0416b` | `#10090b` / `#ee79a1` | cohesive, bold |

Each hue/strategy has four relation variants. The primary `accent` stays on the brand hue;
`accentAlt` is the related secondary color. Use `accent` for CTAs and `accentAlt` for
charts, tags, and highlights. Query the full theme to see both.

Rules of thumb:

- Warm neutral + deep jewel accent reads expensive. Good for property and hospitality.
- Cool neutral + analogous green or teal reads reliable. Good for finance and health.
- Tinted neutrals + triadic accent read branded but calm. Good for consumer products.
- High contrast + one vivid accent reads confident. Good for agency and launch pages.
- Muted neutrals + split-complementary accent read editorial. Good for luxury and culture.

Avoid:

- Two saturated brand colors fighting for attention.
- Accent used on body text, borders, and backgrounds at the same time.
- Gray text that looks elegant but fails 4.5:1.
- Neon accents on pure black; they vibrate and fatigue the eye.
- Status colors reused as brand colors.

## Industry starting points

| Industry | Strategy | Relation | Mode | Notes |
| --- | --- | --- | --- | --- |
| Real estate | warm-neutral | complementary | light-first | deep green, navy, or burgundy accent |
| SaaS / B2B | cool-neutral | analogous | dark-first | indigo, teal, or emerald accent |
| Fintech | high-contrast | analogous | dark-first | navy base, restrained green/blue |
| Ecommerce | cool-neutral or tinted | complementary | light-first | accent reserved for add-to-cart |
| Agency / portfolio | high-contrast | complementary or triadic | either | one vivid accent, lots of neutral |
| Health / wellness | tinted | analogous | light-first | teal, sage, soft blue |
| Education | tinted | analogous | light-first | warm blue, green, amber |
| Restaurant / hospitality | warm-neutral | split-complementary | light-first | terracotta, olive, cream |
| Nonprofit | tinted | analogous | light-first | trustworthy blue/green |
| Media / editorial | warm-neutral | muted complementary | light-first | paper light, near-black dark |

## Light mode rules

- Background near-white, not pure white: `bg` around L 0.98, `surface` around 0.96.
- Text near-black, not pure black: around L 0.22.
- Elevation: white `elevated` plus a soft border or shadow.
- Borders must be visible; a 1px `border` at roughly 0.90 L works on most screens.
- Check accent as a button and as text; both must pass.
- Use real photography; avoid washing images out with white overlays.

## Dark mode rules

- Do not invert. Rebuild with a near-black tinted background, not `#000`.
- Elevation is lighter, not darker: `surface` and `elevated` step up.
- Desaturate large surfaces; keep accent chroma moderate (around 0.14-0.16).
- Text near-white, not pure white; around L 0.96.
- Borders carry more weight; shadows are weak on dark.
- Dim images slightly and avoid large pure-white blocks.
- Status colors need their own contrast check on dark; the dataset already does this.
- Test focus rings on both `bg` and `surface`.

## Implementation

```css
:root {
  color-scheme: light;
  --bg: #fcfaf7;
  --surface: #f5f1ec;
  --elevated: #ffffff;
  --border: #e1ddd8;
  --border-strong: #c9c3bc;
  --text: #1e1a15;
  --text-muted: #5b544c;
  --text-subtle: #7c7369;
  --accent: #b0416b;
  --accent-hover: #a32b5d;
  --accent-alt: #00816c;
  --on-accent: #fcfcfc;
  --focus: #b0416b;
  --selection: #fcd1dc;
  --success: #006b2d;
  --warning: #814a00;
  --danger: #93332d;
  --info: #005a9d;
}

html[data-theme="dark"] {
  color-scheme: dark;
  --bg: #0e0a06;
  --surface: #17130f;
  --elevated: #201c18;
  --border: #38322b;
  --border-strong: #534c44;
  --text: #f7f1e9;
  --text-muted: #b2a9a0;
  --text-subtle: #8d847b;
  --accent: #ee79a1;
  --accent-hover: #ff85b0;
  --accent-alt: #00c6ae;
  --on-accent: #0d0d0d;
  --focus: #ee79a1;
  --selection: #46202d;
  --success: #6fc884;
  --warning: #e1a447;
  --danger: #f98f84;
  --info: #6db6ff;
}
```

No-flash theme script (inline in `<head>`, before paint):

```html
<script>
  (function () {
    try {
      var saved = localStorage.getItem("theme");
      var dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme = dark ? "dark" : "light";
    } catch (e) {}
  })();
</script>
```

Tailwind mapping:

```js
theme: {
  extend: {
    colors: {
      bg: "var(--bg)",
      surface: "var(--surface)",
      elevated: "var(--elevated)",
      border: "var(--border)",
      text: "var(--text)",
      muted: "var(--text-muted)",
      accent: "var(--accent)",
      "on-accent": "var(--on-accent)",
    },
  },
}
```

## Verification

- Toggle both modes on every page and every state.
- Run a contrast checker on text, muted text, accent buttons, focus rings, and status
  messages.
- Check disabled controls and placeholders in both modes.
- Check images, charts, and empty states in both modes.
- Confirm the theme persists and does not flash on reload.
