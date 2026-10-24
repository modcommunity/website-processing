# CLAUDE.md — website-processing

The Astro + React static site for The Modding Community's public pages: the home page, the gaming platform page (`/platform`), the two product pages (`/tmc-app`, `/tmc-cli`), licenses, privacy policy and ToS. It is separate from the core app (`../website-city`, Next.js) so the marketing and legal surface can be a fast static build. Its theme and shell come from `@modcommunity/shared` (`../tmc-global`).

## Layout

| Path | What |
| --- | --- |
| `src/pages/*/index.astro`, `src/pages/[lang]/…` | Routes, one pair per page so the language picker never 404s |
| `src/layouts/Layout.astro` | The single layout: `<html class="dark">`, fonts, `<main class="@container … overflow-x-clip">` |
| `src/components/*.astro` | Page shells; `landing/`, `platform/`, `tmcApp/`, `apiTool/` hold their sections; `helper/HeroBackdrop.astro` the three hero backdrops |
| `src/components/SiteHeader.tsx`, `SiteFooter.tsx` | Thin wrappers around the shared `Header`/`Footer` |
| `src/styles/Global.css` | Tailwind, the shared `theme.css`, the `@source` line, the old-token alias block |
| `src/lib/site.ts` | Every origin (`SITE_URL`, `CITY_URL`, `DOCS_URL`) |
| `src/lib/blog.ts` | The blog shelf's fetch, fallback and daily pick |
| `src/i18n/sections/*.ts` | Translation catalogues, nine locales, `en` is the reference shape |
| `scripts/overflow-audit.mjs`, `overflow-bisect.mjs` | The horizontal-overflow audit and its bisector |

## Run and test

- `npm run dev`: dev server. `npm run build`: static build into `dist/`; it renders every page and fails on broken imports and JSX. Run it after every change.
- `npm test`: vitest, no config file, no DOM (`src/lib/blog.test.ts`). The build cannot see behaviour; run both.
- `npm run audit:overflow` (after a build, with `dist/` served): every page, every language, every width. Run it after any layout change and read its exit code.
- `npm run shared:local` / `shared:registry` / `shared:status` / `shared:build`: which `@modcommunity/shared` you build against ([docs/dependencies.md](docs/dependencies.md)).
- `astro preview` needs the node adapter (commented out in `astro.config.mjs`); use `dev` locally.

## Rules

- The theme is not defined here: no bespoke palette, header or footer. New colours go into `../tmc-global`'s shared theme. ([design-system](docs/design-system.md))
- The `@source` line in `Global.css` is required, or the shared components render unstyled. ([design-system](docs/design-system.md#how-the-css-is-wired-srcstylesglobalcss))
- New markup uses website-city token names (`surface`, `accent`, `foreground`, …); the old names (`bg-body`, `special-1`, …) are aliases to migrate off. ([design-system](docs/design-system.md#backwards-compatibility-token-aliases))
- Icons are `lucide-react`, matching city's nav config glyph for glyph; `react-icons/fa6` only for brand marks; colour lucide with `text-*`, never `fill-*`. ([design-system](docs/design-system.md#icons))
- Props into a `client:*` island are JSON-serialised: no functions, icon components or nav configs. ([design-system](docs/design-system.md#astro-islands))
- Re-run `npm run shared:local` after any `npm install`; in local mode keep `../tmc-global` on the matching branch and `shared:build` after changing it; a shared change is not live in registry mode until published. ([dependencies](docs/dependencies.md))
- Never delete `node_modules/.vite` with `npm run dev` running: no island hydrates and no font applies while the build stays green. ([dependencies](docs/dependencies.md))
- `three` is only ever imported dynamically. ([dependencies](docs/dependencies.md#three-is-only-ever-imported-dynamically))
- `react-multi-carousel` stays pinned at exactly `2.8.5`, no caret. ([dependencies](docs/dependencies.md#react-multi-carousel-is-pinned-to-exactly-285))
- Responsive layout uses container queries (`@3xl:`, `@5xl:`), never `sm:`/`md:`/`lg:`: the sidebar makes viewport breakpoints wrong by 256px. ([layout](docs/layout.md))
- A component laid out inside a column opens its own `@container`; anything that can be squeezed gets `min-w-0`. ([layout](docs/layout.md))
- `<main>`'s `overflow-x-clip` is for entrance-animation overshoot only; no section may rely on it for layout, and it stays `clip`, not `hidden`. ([layout](docs/layout.md#main-carries-overflow-x-clip-because-of-entrance-animations))
- Every origin is a `PUBLIC_*` variable in `src/lib/site.ts` with a production default; nothing there may be a secret, because it ships to the browser. ([content](docs/content.md#origins-and-environment))
- The blog shelf treats every API field as optional and its daily pick must stay deterministic. ([content](docs/content.md#the-blog-shelf-reads-from-website-city))
- Product pages describe only what is built: `/tmc-app` is released (desktop only, say mobile is not out), `/tmc-cli` installs from a clone and is not on PyPI, untested things are called untested, and every claim is checked against `../tmc-app` or `../tmc-cli`. ([content](docs/content.md#the-product-pages-tmc-app-tmc-cli))
- Add a translation key to `en` first, then fill all eight others; names, commands, flags and exit codes are never translated. ([content](docs/content.md#translation))
- Hero backdrops are image-free and theme-aware (a dark palette and a pale tinted one, copy flips via `data-hero` in `Global.css`), no layout animates, nothing in a hero draws a grid, and motion is an optional layer over a complete backdrop. Keep them in step with website-city's `hero_backdrops.tsx`. ([heroes](docs/heroes.md))
- Reuse `@modcommunity/shared` for anything generic; build a local component only when it is specific to these pages. `.astro` for structure, `.tsx` for interactive islands.
- Third-party source cloned to be read lives in `/extra/external/` (see its README): look there before designing something from scratch; never a dependency.

## Read before

| Read | Before |
| --- | --- |
| [docs/README.md](docs/README.md) | Anything not covered above: the index |
| [docs/design-system.md](docs/design-system.md) | Styling: shared theme, CSS wiring, token aliases, dark mode, fonts, icons, island props |
| [docs/dependencies.md](docs/dependencies.md) | Switching `@modcommunity/shared` between local and registry, touching `three`, bumping a pinned package |
| [docs/layout.md](docs/layout.md) | Any responsive layout change, or touching the overflow audit |
| [docs/content.md](docs/content.md) | Origins and env vars, the blog shelf, the platform and product pages, translation keys |
| [docs/heroes.md](docs/heroes.md) | Changing a hero or adding motion |
| [docs/history.md](docs/history.md) | Wondering why a rule exists: the dead audit, the two grids, the typing headline |
