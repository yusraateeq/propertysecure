# Typography Reference

1,959 real Google Fonts, 360 curated pairings, and the rules for choosing between them.

## Query

```bash
node .opencode/skills/uiux-special/scripts/query.mjs fonts --category "Sans Serif" --tag ui --limit 12
node .opencode/skills/uiux-special/scripts/query.mjs fonts --category Serif --search editorial --limit 12
node .opencode/skills/uiux-special/scripts/query.mjs fonts --tag variable --latin --limit 12
node .opencode/skills/uiux-special/scripts/query.mjs pairings --mood premium --limit 12
node .opencode/skills/uiux-special/scripts/query.mjs font inter
```

Useful tags: `sans`, `serif`, `display`, `script`, `mono`, `ui`, `popular`, `variable`,
`flexible`, `multi-weight`, `condensed`, `rounded`, `editorial`, `headline`, `code`,
`accent`, `latin`.

## Comparison criteria

Compare candidates in a table before choosing. Do not pick by name recognition alone.

| Criterion | What to check | Why |
| --- | --- | --- |
| Category and voice | sans / serif / display / script / mono; neutral, editorial, expressive, technical | Sets the emotional register |
| Weights and styles | 400/500/700 available? italic? | Needed for hierarchy and emphasis |
| Variable | `variable: true` and axes | One file, smaller payload, flexible |
| Latin coverage | `hasLatin` | Required for English content |
| Line height metric | `defaultLineHeight` | Predicts default readability and rhythm |
| Pairing role | heading vs body vs accent | Avoids two competing display faces |
| Performance | variable vs many static files | LCP and CLS risk |
| License | All Google Fonts are OFL or Apache | Safe for commercial use |
| Fallback similarity | Choose a metric-compatible system fallback | Prevents jarring swap |

## Recommended shortlists

Popularity ranking from the generated dataset. Re-query before a new project; rankings
change.

### UI and body sans

Roboto · Open Sans · Inter · Montserrat · Poppins · Lato · DM Sans · Raleway · Nunito ·
Nunito Sans · Manrope · Rubik · Outfit · Plus Jakarta Sans · Figtree · Work Sans ·
Public Sans · Source Sans 3 · IBM Plex Sans · Barlow · Karla · Mulish · Sora ·
Space Grotesk · Geist

### Editorial and premium serif

Playfair Display · Merriweather · Lora · Cormorant Garamond · Instrument Serif ·
Libre Baskerville · Fraunces · EB Garamond · Source Serif 4 · DM Serif Display ·
Newsreader · Faustina · Bodoni Moda · Crimson Text · Domine · Marcellus · Bitter ·
Zilla Slab · Spectral · Literata

### Display and headline

Bebas Neue · Abril Fatface · Alfa Slab One · Bungee · Comfortaa · Lilita One ·
Baloo 2 · Righteous · Rowdies · Patua One · Passion One · Oxanium · Bricolage Grotesque ·
Unbounded · Syne

### Monospace

Roboto Mono · JetBrains Mono · Source Code Pro · IBM Plex Mono · Inconsolata · Geist Mono ·
DM Mono · Space Mono · Fira Code · Martian Mono · Azeret Mono · Spline Sans Mono

### Script (accents only)

Dancing Script · Caveat · Pacifico · Great Vibes · Satisfy · Kalam · Courgette ·
Kaushan Script · Sacramento · Allura

## Pairing rules

1. **Contrast structure, not just category.** A high-contrast serif pairs well with a
   neutral grotesk. Two geometric sans faces compete.
2. **One personality.** Let the heading carry the voice; keep the body quiet.
3. **Match proportion, not style.** Similar x-height and width feel make a pairing look
   intentional.
4. **Never pair two display faces.** Display + neutral sans only.
5. **Mono is a third face, not a second.** Use it for code, IDs, timestamps, and tables.
6. **Script is decoration.** Never use it for body copy, forms, or navigation.
7. **Test the pairing in situ** at real sizes, not in a specimen sheet.

Good starting pairings from the dataset:

| Heading | Body | Mood | Best for |
| --- | --- | --- | --- |
| Playfair Display | Nunito | premium | real estate, hospitality, editorial |
| Merriweather | Manrope | editorial | publishing, nonprofit, education |
| Fraunces | DM Sans | warm | lifestyle, food, boutique commerce |
| Instrument Serif | Inter | editorial | portfolio, magazine, culture |
| Space Grotesk | Public Sans | technical | SaaS, developer tools, fintech |
| Bricolage Grotesque | Figtree | modern | startup, agency, product launch |
| Libre Baskerville | Barlow | classic | law, finance, institutional |
| JetBrains Mono | IBM Plex Sans | technical | docs, dashboards, engineering |

## Type scale

Use one ratio and one fluid scale:

| Token | Mobile | Desktop | Line height |
| --- | --- | --- | --- |
| display | 2.5rem | 4.5-5rem | 1.02-1.1 |
| h1 | 2rem | 3-3.5rem | 1.1-1.15 |
| h2 | 1.5rem | 2.25-2.5rem | 1.15-1.2 |
| h3 | 1.25rem | 1.5rem | 1.25 |
| body | 1rem | 1.0625-1.125rem | 1.6-1.7 |
| small | 0.875rem | 0.875rem | 1.4 |
| caption | 0.75rem | 0.75rem | 1.35 |

```css
:root {
  --text-display: clamp(2.5rem, 6vw, 5rem);
  --text-h1: clamp(2rem, 4.5vw, 3.5rem);
  --text-h2: clamp(1.5rem, 3vw, 2.5rem);
  --text-h3: clamp(1.25rem, 2vw, 1.5rem);
  --text-body: clamp(1rem, 0.5vw + 0.9rem, 1.125rem);
  --text-small: 0.875rem;
  --measure: 65ch;
}
```

## Implementation

### Next.js

```tsx
import { Inter, Fraunces } from "next/font/google";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Fraunces({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

### CSS variables

```css
:root {
  --font-heading: "Fraunces", Georgia, "Times New Roman", serif;
  --font-body: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}
```

### Generic @font-face

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-variable.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}
```

## Performance and licensing

- Prefer variable fonts: one file covers the whole weight range.
- Subset to `latin` unless the product needs more.
- Preload only the heading face used above the fold.
- `font-display: swap` plus a metric-compatible fallback.
- Self-host for privacy and speed; Google Fonts CDN is acceptable for prototypes.
- All fonts in the dataset are open source (OFL/Apache). Check the specimen page before
  shipping a brand-critical face.

## Do and don't

Do:

- Use 400/500/700 for most products.
- Keep body at 16px or larger.
- Use tabular numerals for money and tables.
- Test long words, numbers, and non-Latin names.

Don't:

- Use more than two text families.
- Use a display face for body copy.
- Use script for UI.
- Use faux bold or faux italic.
- Ship a font without a fallback stack.
