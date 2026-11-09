# Library catalog data

`libraries.json` is the machine-readable catalog used by
`scripts/select-stack.mjs`. It is curated, not generated. Package names were checked against
the npm registry on **2026-11-09**. Versions are intentionally omitted because they change.

## Schema

Each library has:

| Field | Meaning |
| --- | --- |
| `id` | Stable kebab-case identifier used by scripts and docs. |
| `package` | npm package name. |
| `name` | Human-readable name. |
| `category` | One of the keys in `categories`. |
| `frameworks` | `react`, `nextjs`, `vite`, `vue`, `nuxt`, `svelte`, `sveltekit`, `astro`, or `any`. |
| `role` | One-line job the library does in a template. |
| `status` | `core`, `recommended`, `optional`, or `legacy`. |
| `weight` | `tiny`, `small`, `medium`, or `large` bundle/asset impact. |
| `ssr` | `safe`, `client`, `server`, `build`, `island`, or `dev`. |
| `notes` | Integration caveat or preferred usage. |

## Status rules

- **core** - the default stack for the matching framework or goal.
- **recommended** - strong default when the relevant feature is in scope.
- **optional** - add only for a named requirement.
- **legacy** - do not choose for new work; documented so the team can migrate away.

`select-stack.mjs` uses the catalog to produce a core set, an optional set, and an avoid
list. It never recommends every library at once.

## Adding or changing a library

1. Verify the package exists on npm and read its license and peer dependencies.
2. Prefer the maintained package; add a `legacy` entry instead of silently deleting an old one.
3. Add the entry with a specific `role` and a real integration caveat.
4. Update `meta.count` and `meta.verified`.
5. Run:

```bash
node .opencode/skills/motion-template/scripts/check-skill.mjs
node .opencode/skills/motion-template/scripts/select-stack.mjs --framework nextjs --goal marketing --3d yes --scroll cinematic
```

The checker verifies unique IDs and packages, valid categories and enums, the declared
count, recipe links, frontmatter, code fences, and internal links.
