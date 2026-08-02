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
- `@modcommunity/shared` has **two sources**: the published package on GitHub
  Packages (`^2.0.0` — the committed default, what CI gets from `npm ci`;
  `.npmrc` maps the `@modcommunity` scope to `https://npm.pkg.github.com`, auth
  token goes in your `~/.npmrc`) and the local checkout at `../tmc-global/shared`
  (what you develop against). Either way it lands at the same path —
  `node_modules/@modcommunity/shared`, a symlink in local mode — so **no source,
  import or CSS path changes between modes**, and nothing needs editing per
  build. Switch with:

  | command | effect |
  | --- | --- |
  | `npm run shared:local` | link the on-disk `../tmc-global/shared` |
  | `npm run shared:registry` | install the published version instead |
  | `npm run shared:status` | print which one is currently installed |

  Both use `npm install … --no-save`, so `package.json` and `package-lock.json`
  are left untouched — switching never shows up in `git status`. A plain
  `npm install` / `npm ci` restores the lockfile's registry version, so **re-run
  `npm run shared:local` after any `npm install`** or you silently go back to
  building against the published package.
- **A shared change is not live here until it is published.** In registry mode
  the site builds the published tarball, so editing `../tmc-global/shared` does
  nothing — `npm run shared:status` says `registry -> 2.0.0` while your source
  says otherwise. Either `npm run shared:local` (dev) or publish a new version
  and bump the dependency (prod). Symptom: a fix you just made to a shared
  component doesn't appear in `dist/`.
- It is consumed as the built `dist`, so after changing the shared library you
  must rebuild it: `npm run shared:build` (or `npm run shared:watch` to rebuild
  on save). A stale `dist` shows up here as a resolve or missing-export error.
- **Never delete `node_modules/.vite` while `npm run dev` is running.** The dev
  server then answers every client module with `504 (Outdated Optimize Dep)`,
  which fails silently in a very misleading way: no React island hydrates (the
  hero typing animation never starts) and no webfont applies (everything falls
  back to a system sans), while the page itself still renders and `npm run build`
  stays perfectly green. If you see those two symptoms together, it is always
  this — restart the dev server. `astro.config.mjs` now sets
  `optimizeDeps.exclude: ['@modcommunity/shared']` so the linked package is
  served straight from disk: `shared:build` / `shared:local` are safe to run with
  dev up, and no cache flush is needed.
- **In local mode the two repos must be on matching branches.** `../tmc-global`
  is a separate checkout, so if this repo is on `task/rebuild` and tmc-global is
  on `main`, you build against the wrong shared library — the symptom is
  `"X" is not exported by ".../shared"` for components that plainly exist
  (`Sidebar`, `ThemeToggle`). Fix by checking out the matching branch there and
  running `npm run shared:build`, not by re-implementing the component here.
- Fonts: DM Sans (body), Plus Jakarta Sans (headings), Orbitron (the shared logo
  wordmark) are loaded via `@fontsource/*` imports in `Layout.astro`.
- **Icons: `lucide-react` is the house set** — it is what website-city uses, so
  matching it is what keeps the two shells visually identical. `react-icons` is
  kept *only* for brand marks lucide dropped (Discord); Steam is a small inline
  SVG in the shared `Footer` for the same reason. Do not add new `react-icons`
  imports. When an icon has a website-city counterpart, use **the same glyph**
  city uses (Apps→`Boxes`, Assets→`Cog`, Mods→`Hammer`, Servers→`Server`,
  Browse→`Search`, Knowledgebase→`BookOpen`, Blog→`Newspaper` in the header /
  `NotebookPen` in the sidebar) — see `../website-city`'s
  `src/app/_components/ui/shell/nav-config.ts` for the authoritative list.
  Note lucide icons are **stroke**-based: colour them with `text-*`, never
  `fill-*` (a `fill-` class leaves them invisible).
- Stack: `astro` 7, `@astrojs/react`, Tailwind v4 via `@tailwindcss/vite`,
  `react-icons`, `react-multi-carousel`. No HeroUI, no Mantine.
- **`react-multi-carousel` is pinned to an exact `2.8.5` — do not change it to
  `^2.8.5` or bump it to `2.8.6`.** 2.8.6 accidentally ships `npm`, `install` and
  `core-js` as *runtime* dependencies (the classic `npm install install npm`
  slip), which drags the entire 19 MB npm CLI into `node_modules` and makes
  `npm audit` report ~17 advisories — all of them from npm's own vendored deps,
  none from code this site ever loads. The two releases are otherwise
  byte-identical: `2.8.5` vs `2.8.6` differ *only* in `package.json`, so the pin
  costs nothing functionally. A caret range would silently resolve back to 2.8.6
  and bring the noise back. Revisit only if upstream publishes a 2.8.7 that drops
  those deps.

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
