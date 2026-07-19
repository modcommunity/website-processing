# CLAUDE.md — website-processing

Guidance for working in this repository. This file is specific to
`website-processing` and is separate from the main website's `CLAUDE.md`.

## What this repo is

`website-processing` is the **Astro + React** static site for The Modding
Community's public landing pages — the home page, licenses, privacy policy and
ToS. It is intentionally separate from the core app (`../website-city`, Next.js)
so the marketing/legal surface can be a fast static build.

Pages live in `src/pages/*/index.astro`; each renders a `src/components/*.astro`
shell inside the single `src/layouts/Layout.astro`. React components are
hydrated as Astro islands (`client:load`).

## Design system — shared with website-city (important)

This site's theme is **not defined here**. It comes from
**`@modcommunity/shared`** (the `../tmc-global` repo), the single source of truth
for the TMC design, which mirrors website-city's look. That means:

- **Header, Footer and Logo are the shared components**, not local ones. See
  `src/components/SiteHeader.tsx` / `SiteFooter.tsx` — thin wrappers around
  `Header`/`Footer` from `@modcommunity/shared`, rendered by `Layout.astro`.
  (The old bespoke `Header.tsx`/`Footer.tsx`/`header/*`/`footer/*` were removed
  in the conversion.)
- **The theme tokens come from `@modcommunity/shared/theme.css`**, imported at
  the top of `src/styles/Global.css`. Do not re-add a bespoke palette.

### How the CSS is wired (`src/styles/Global.css`)

```css
@import "tailwindcss";
@import "@modcommunity/shared/theme.css";                 /* website-city tokens */
@source "../../node_modules/@modcommunity/shared/dist";   /* generate shared components' classes */
```

The `@source` line is required: Tailwind ignores `node_modules`, so without it
the shared Header/Footer/Logo classes would not be generated and they'd render
unstyled.

### Backwards-compatibility token aliases

The existing landing/legal components were written against an **older token
vocabulary** (`bg-body`, `text-text-default`, `special-1`, `border-secondary`,
`item`, `btn-*`, …). Rather than rewrite every component, `Global.css` contains an
`@theme inline` block that **aliases those old names onto the website-city
tokens** (e.g. `--color-special-1: var(--accent)`, `--color-body:
var(--background)`, `--color-text-default: var(--foreground)`). So the whole site
re-skins to the shared theme automatically.

**When writing new markup, prefer the website-city names directly** (`surface`,
`accent`, `foreground`, `border`, `muted`, `surface-secondary`, …). Treat the
alias block as a migration bridge, not the target vocabulary. A good incremental
task is to migrate a component off the old names and, once none remain, delete
the corresponding aliases.

### Dark mode

The site is dark. `Layout.astro`'s `<html>` carries `class="dark"`, which
activates the shared theme's `.dark` token block. There is no theme toggle here.

## Dependencies

- `@modcommunity/shared` is a **`file:` dependency** → `file:../tmc-global/shared`
  (npm symlinks it into `node_modules`). It is consumed as the built `dist`, so
  after changing the shared library you must rebuild it
  (`cd ../tmc-global/shared && npm run build`) for changes to appear here.
- Fonts: DM Sans (body), Plus Jakarta Sans (headings), Orbitron (the shared logo
  wordmark) are loaded via `@fontsource/*` imports in `Layout.astro`.
- Stack: `astro` 7, `@astrojs/react`, Tailwind v4 via `@tailwindcss/vite`,
  `react-icons`, `react-multi-carousel`. No HeroUI, no Mantine.

## Build / dev

- `npm run dev` — Astro dev server.
- `npm run build` — static build into `dist/` (this is the check to run after
  changes; it renders every page and fails on broken imports/JSX).
- `npm run preview` — note `astro preview` needs the node adapter (commented out
  in `astro.config.mjs`); prefer `dev` locally.

## Conventions & recommendations

- **Reuse the shared library** for anything generic (buttons, blocks, icon rows,
  sections). Import from `@modcommunity/shared`. Only build a local component when
  it is specific to the landing pages.
- **Astro island prop rule:** props passed from `.astro` to a `client:*` React
  component are JSON-serialized — you cannot pass functions (icon components,
  `linkComponent`, a `nav` config). Keep those on the client: use the shared
  component defaults, or wrap them in a local React component (as `SiteHeader`
  does) that supplies the non-serializable bits internally.
- **New colours** should be added to the shared theme in `../tmc-global`, not
  hard-coded here, so website-city and the app stay in sync.
- Keep `.astro` files for page structure and React (`.tsx`) for interactive
  islands, matching the existing split.
