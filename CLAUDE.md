# CLAUDE.md — website-processing

Guidance for working in this repository. This file is specific to
`website-processing` and is separate from the main website's `CLAUDE.md`.

## What this repo is
`website-processing` is the **Astro + React** static site for The Modding
Community's public landing pages — the home page, the two product pages
(`/tmc-app`, `/tmc-cli`), licenses, privacy policy and ToS. It is intentionally separate from the core app (`../website-city`, Next.js)
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
  kept *only* for **brand marks**, and that now means all of them: Discord, X,
  GitHub, Steam and Facebook, from `react-icons/fa6`.

  lucide dropped its brand glyphs. `Github`, `Twitter` and `Facebook` survived
  as deprecated aliases — 13 `ts(6385)` hints in `astro check` — and are removed
  upstream in ~0.475, so they were a build break waiting for a version bump.
  Steam never had a lucide glyph at all, which is why `Community.astro` used to
  carry a hand-inlined SVG path copied out of the shared `Footer`; `FaSteam`
  retires both copies. The shared `Footer` made the same swap in
  `@modcommunity/shared` 4.2.3, so the two social rows still match.

  **Do not add new `react-icons` imports for anything that is not a brand mark**
  — everything else has a lucide glyph and should use it. When an icon has a website-city counterpart, use **the same glyph**
  city uses (Apps→`Boxes`, Assets→`Cog`, Mods→`Hammer`, Servers→`Server`,
  Browse→`Search`, Knowledgebase→`BookOpen`, Blog→`Newspaper` in the header /
  `NotebookPen` in the sidebar) — see `../website-city`'s
  `src/app/_components/ui/shell/nav-config.ts` for the authoritative list.
  Note lucide icons are **stroke**-based: colour them with `text-*`, never
  `fill-*` (a `fill-` class leaves them invisible).
- Stack: `astro` 7, `@astrojs/react`, Tailwind v4 via `@tailwindcss/vite`,
  `react-icons`, `react-multi-carousel`, `three`. No HeroUI, no Mantine.
- **`three` is only ever imported dynamically.** It is here for one thing — the
  front page's hero field (`landing/heading/HeroField.tsx`) — and it is 700 KB
  of JS, several times the rest of the site's client bundle put together. The
  `await import('three')` inside that component's effect is what keeps it a
  separate chunk that no other page fetches and that nothing waits on. A
  top-level `import … from 'three'` anywhere would put it in the entry bundle
  and undo that; if a second thing ever needs it, give that one a dynamic
  import too.
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

## The blog shelf reads from website-city

The two article carousels at the bottom of the landing page are **not** a
hardcoded list any more. `src/lib/blog.ts` fetches them from website-city's
public content API — the *unauthenticated* half, so there is no key, no secret
and no build-time credential:

```
GET https://moddingcommunity.com/api/content/article?official=1&limit=20&page=N
```

`official=1` is the whole definition of "the blog" (that flag is what puts a
post there), and the endpoint answers with `access-control-allow-origin: *`, so
the same call works from the build and from the browser. The origin is
`CITY_URL` from `src/lib/site.ts` (`PUBLIC_CITY_URL`, defaulting to production)
— see **Origins and environment** below; a local city needs no key, so
`PUBLIC_CITY_URL=http://localhost:3000` is the whole of pointing the shelf at
dev.

Two separate mechanisms, and it is worth keeping them apart when changing this:

- **The pool** is fetched at build time and baked into the island's props
  (memoised, so the nine locale renders make one request). The island refetches
  in the browser only when that pool is more than a day old — a site rebuilt
  today sends no client request at all.
- **The selection** rotates daily, client-side, seeded with the UTC date
  (`dailyPick`). That is what makes "different articles today" work on a static
  site with no rebuild. It must stay deterministic: the server and the browser
  have to agree on the first render.

Everything the API returns is treated as optional, because the site has to build
against a city deployment that has not shipped a given field yet — no `image`
falls back to the local `public/images/blog/article/*` art by slug and then to a
gradient, no `path` falls back to `/blog/<slug>`, and a failed fetch falls back
to `FALLBACK_ARTICLES` (the ten posts this section used to hardcode) so the
section is never empty.

**`image`, `tags` and article `path` need website-city ≥ the change that added
them** (`src/lib/api/public/anon.ts` there, plus its `?official` list filter).
Until that deploys, the shelf renders from titles and the local art — correctly,
just plainer. The modding/server split reads tags and categories first and falls
back to the title.

## Origins and environment

Every origin this site points at lives in **`src/lib/site.ts`**, and every one
is a `PUBLIC_*` variable with a production default, so a fresh checkout builds
exactly as production does with no `.env` at all:

| Constant | Variable | Default | Used by |
| --- | --- | --- | --- |
| `SITE_URL` | `PUBLIC_URL` | `https://moddingcommunity.com` | `Layout.astro` — canonical, hreflang, Open Graph |
| `CITY_URL` | `PUBLIC_CITY_URL` | `https://moddingcommunity.com` | `lib/blog.ts` — the blog shelf's fetch and its article URLs |
| `DOCS_URL` | `PUBLIC_DOCS_URL` | `https://docs.moddingcommunity.com` | `apiTool/links.ts` — `docs('/tmc-cli')` |

`.env.example` documents these along with the page-metadata and analytics
variables; copy it to `.env` and uncomment what you need.

Three things worth knowing before adding a fourth:

- **`PUBLIC_` is load-bearing, and it is also a limit.** It is what makes Astro
  inline the value into the CLIENT bundle as well as the build — which the blog
  shelf needs, since its island refetches from `CITY_URL` in the browser when
  the baked pool is a day old. It equally means **nothing here may hold a
  secret**: these values ship to every visitor.
- **Trailing slashes are stripped on the way in.** Call sites concatenate rooted
  paths (`${CITY_URL}/api/content/article`), so `PUBLIC_CITY_URL=http://localhost:3000/`
  would otherwise build `//api/...`.
- **`DOCS_URL` points at a host the docs have not moved to yet.** The
  documentation site is `../website-learn`, served today at `/learn` on the main
  domain; the default here is where it is headed. That is precisely why it is a
  variable — the value is expected to be wrong for a while, and overriding it is
  a line in `.env` rather than an edit to a component.

## The product pages (`/tmc-app`, `/tmc-cli`)

Two dedicated landing pages that are not the home page, each built the same way
it is: a shell in `src/components/<Name>.astro` composing one `.astro` file per
section, and a route pair — `src/pages/<route>/index.astro` plus
`src/pages/[lang]/<route>/index.astro` — so the language picker never 404s.

| Page | Describes | Source of truth |
| --- | --- | --- |
| `/tmc-app` | The Tauri app: the live server browser, the mod manager, downloads, plugins, its security model | `../tmc-app`, chiefly its `CLAUDE.md` |
| `/tmc-cli` | `tmc`, the Python CLI for the public content API | `../api-cli`, its `README.md` and `CLAUDE.md` |

Three things to keep in mind when editing them:

- **Both products are unreleased, and the pages say so — loudly.** The app has
  no builds on any platform; the CLI is not on PyPI and has no public
  repository. `/tmc-app` states it in the badge (`heroBadge`), the hero note
  (`heroNoteHtml`) and a whole closing section headed "Not Available, And Not
  Ready" (`statusTitleHtml`, `statusIntroHtml`, the `n1`–`n4` cards). `/tmc-cli`
  says it three times over the same way: the badge (`heroBadge`, "Not Released
  Yet"), an amber note in the hero (`heroNoteHtml`) and one more above the
  closing buttons (`ctaNoteHtml`) — the two notes wear amber/`warning` rather
  than the page's teal, because a caution should not be dressed in the page's
  own colour. `installNote` under the terminal is now only about the install
  itself. When that changes, those are the strings, and the install snippet
  becomes a real `pip install tmc-cli`.
- **`/tmc-app` states no version number, on purpose.** The app's three manifests
  (`package.json`, `src-tauri/Cargo.toml`, `src-tauri/tauri.conf.json`) all say
  `0.1.0`, which is the `create-tauri-app` default rather than a decision, and a
  version nobody can install tells a reader nothing. If a real pre-release
  number is set over there, `heroNoteHtml` is where it comes back.
- **The platform plan is desktop first.** Windows, Linux and macOS, then mobile
  — that is the order the hero's chips are in, the mobile two are dimmed and
  tagged "Later" (`pLater`), and the `n4` card says it in words. A flat row of
  five reads as a shipping matrix, which would be wrong twice over.
- **Forward-looking copy is fenced, not folded in.** These pages describe what
  is BUILT, so the one place `/tmc-app` talks about what is coming — the server
  administration panel at the end of `LiveBrowser.astro` — is shaped to make
  that unmissable: one "In the app" row (RCON, which exists), four rows each
  tagged "Planned", and a line saying planned means planned. A planned feature
  in a plain `FeatureCard` alongside built ones would read as shipped; if
  something else needs a "later", copy this panel rather than adding a card.
- **Every claim is checked against the sibling repo.** The protocol list, the
  four deployment strategies, the relation verbs and the exit codes are copied,
  not invented, and each is sourced in a comment. When a sibling changes, this
  is downstream of it. `apiTool.ts`'s header names the version it was last
  checked against (**api-cli 1.1.0**) — the type, relation and cap lists come
  from `src/tmc_cli/schema.py`, and the test count from actually running
  `python3 -m unittest discover -s tests` over there, because the README's
  figure is the thing most likely to have drifted.
- **`/tmc-cli` links the docs, not a repository.** There is no public repo to
  link, so the hero's third button and the closing CTA both point at
  `DOCS_URL + /tmc-cli` — see **Origins and environment**.
- **Translated in all nine locales, like the home page.** `src/i18n/sections/tmcApp.ts`
  and `apiTool.ts` fill every locale, as do the two links these pages added into
  `Servers.astro` and `DeveloperApi.astro` (`servers.appLink`, `api.cliButton`).
  `en` stays the reference shape: add a key there first, then fill the other
  eight — `getT` falls back per KEY, so a half-filled key still renders (in
  English) rather than blank.

  What deliberately stays identical across locales is everything a reader would
  *type or recognise as a name*: platform and product names (Windows, macOS,
  RCON, USVFS, Source, Frostbite, Ed25519), the CLI's commands, flags,
  environment variables, HTTP methods and exit codes, the snippet titles
  (`install.sh`, `release.yml`, …), and the mock server's own name and map in
  `/tmc-app`'s hero. Translating a flag would produce a line that does not run.
  Each catalogue's header comment says this too — keep the two in step.

## The three heroes (`src/components/helper/HeroBackdrop.astro`)

The home page, `/tmc-app` and `/tmc-cli` each open with a hero, and they are
deliberately **not** the same hero. They used to be: all three painted the same
two layers — one `from-accent/10 via-background to-background` wash and one
accent orb under the title — over the same centred column, so the only thing
that told you which page you were on was the words.

Each is now built over one of three named backdrops, and each has its own
silhouette — including its own frame: the product pages are self-contained
rounded panels, the front page is a full-bleed band.

| Page | Backdrop | Shape |
| --- | --- | --- |
| `/` (`landing/Heading.astro`) | `blueprint` — two restrained lights and a diagonal sweep, plus a slowly turning Three.js point cloud over them (`HeroField.tsx`) | Full-bleed asymmetric band: copy left (eyebrow rule, static display headline, CTAs), the five surfaces as a numbered index in a rule-separated column right |
| `/tmc-app` (`tmcApp/Hero.astro`) | `workshop` — indigo/violet over a lit horizon | Two-column split: copy left, a pure-markup mock of the app's server browser right |
| `/tmc-cli` (`apiTool/Hero.astro`) | `console` — teal on black, perspective floor, scanlines | Banner: headline left with CTAs on its baseline, then the full-width install terminal |

Things that are load-bearing:

- **The backdrops are image-free and fixed-dark.** Pure gradient and blurred
  light, so nothing can fail to load and nothing goes stale. They are fixed
  dark rather than tokenised because the copy over them is white — a backdrop
  built from `--surface` would lighten under a light theme and take the copy
  with it. `var(--accent)` is the one token used. Same rules, same vocabulary
  as website-city's `src/app/_components/ui/browser/hero_backdrops.tsx`; keep
  the two in step.
- **No layout ever animates — the headlines included.** The front page's
  headline used to type itself in (`HeadingTitle`, `react-type-animation`),
  which made the first paint of the site an empty box that then shoved
  everything below it down, and needed a `min-h-*` floor on its wrapper to hide
  that. It is plain markup now; the component and the dependency are gone.
- **Nothing in a hero draws a grid any more, and that is the point.** There
  were two of them: `blueprint` painted a flat one in CSS (a 40px minor lattice
  and a 200px major one behind a radial mask) and `HeroField` drew a second one
  in perspective — a wireframe terrain displaced by three sines in a vertex
  shader. They were meant to hand over to each other, but a reader saw both
  crossing, which is exactly the interference the drawn field was supposed to
  fix. The CSS grid is gone from `blueprint` outright, so the question cannot
  come back, and the terrain is gone with it.

- **The one animation is the front page's hero field, and it is strictly
  additive.** `landing/heading/HeroField.tsx` is now a point cloud — ~560 dots
  scattered through a box, turning slowly — over the `blueprint` backdrop. It
  has **no lines in it**, so there is nothing for the copy or the backdrop to
  collide with, and it is deliberately small: no custom shaders at all. Depth
  fade is `scene.fog`, which `PointsMaterial` honours for free, and the round
  dot is a radial gradient drawn once into a `<canvas>`. If you find yourself
  writing GLSL in here again, that is the thing this replaced.

  Everything about it is arranged so that it can simply not happen:

  - The backdrop under it is complete on its own. There is no handshake left —
    no `data-hero-field` attribute, no `:has()` fade, no scrim — because
    nothing below it needs hiding any more. No JS, no WebGL, or a context that
    fails to create leaves the hero exactly as it renders without it.
  - It hydrates `client:idle` and imports `three` dynamically, so nothing about
    the first paint waits on it, and `three` stays its own ~724 KB chunk rather
    than entering the bundle.
  - `prefers-reduced-motion: reduce` renders one frame and never starts the
    loop, and the loop stops whenever the hero is off-screen or the tab is
    hidden. Time advances only on frames actually drawn, so a hero that was
    away for a minute resumes rather than jumping a minute of rotation.
  - The camera widens its lens by *aspect*, not width: a tall, narrow hero sees
    a much smaller slice of the box, so portrait gets a wider FOV to keep the
    same amount of field in frame.

  If another page ever wants motion, copy this shape — a backdrop that is
  complete on its own, and an enhancement layered over it that adds no
  structure the backdrop already draws. Do not animate a backdrop in place of
  one, and do not give the enhancement and the backdrop the same motif.
- **`.special` is `text-special-1 font-bold` from `Utilities.css`,** and each
  hero overrides its colour (`[&_.special]:…`) so the emphasis belongs to that
  page's palette rather than to the site accent, which is a blue that fights
  both the green and the violet. The 200-weight Tailwind shades read as white at
  hero sizes — 300 is where they actually look coloured.
- **The front page's surface index is not a stat row.** This site is static and
  has no live counts; three invented numbers under a headline is worse than
  none. That half of the hero carries the five destinations instead — numbered
  rows, one hover target per row — labelled from `nav.*` (which website-city
  translates in all nine locales, so it needs no new strings) with the icons
  city's nav config uses. The closing rule sits on the `<ul>`, not on the last
  row: each anchor is its `<li>`'s only child, so `last:` would match all five.
- **The hero copy keys are translated in all nine locales.** `landing.hero.*`
  gained `eyebrow`, `ctaExplore`, `ctaDiscord`, `tagline` and `shelfLabel`
  (and `titleAnim1` is now just `title`),
  filled for every locale — unlike the product-page sections, the home page is
  fully translated and an English-only key there would be a regression. The two
  product heroes stay English-only, matching the rest of those pages.
- **`devWarningHtml` links to `/changelog` and `/roadmap`,** which are
  website-city routes (`src/app/[locale]/{changelog,roadmap}`), reached as
  plain root-relative paths — the same convention `nav.tsx` and the hero's
  `card1Html` already use for `/mods`, `/assets` and friends. Same origin in
  production, so they resolve; they are not localized, for the same reason
  those are not.

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
- **Responsive layout goes through container queries, not `sm:`/`md:`/`lg:`.**
  `Layout.astro` marks `<main>` as `@container`; page content sizes itself off
  *that* element, and sections use `@3xl:grid-cols-2`, `@5xl:grid-cols-3`, … .

  This is not a style preference — the viewport variants are actively wrong
  here. `<SiteSidebar/>` appears at `lg` and takes 16rem, so `lg:grid-cols-2`
  fires at precisely the moment the space available to lay out in *drops* by
  256px, and every viewport breakpoint above it is off by that much. The
  symptom was a 1024–1280px window rendering four ~180px columns with a
  horizontal scrollbar, while the same page at 390px was fine.

  Rules of thumb:
  - Container sizes are content widths, so they are much smaller than the
    viewport names: `@3xl` = 768px, `@5xl` = 1024px. The rough conversion for
    old code is `md:` → `@3xl:`, `xl:` → `@5xl:`, `sm:` → `@2xl:`.
  - **A component laid out inside a column needs its own `@container`.** The
    `@…` variants measure the nearest container ancestor, which by default is
    the whole of `<main>` — so a card grid inside a half-width column would
    still be sized against the full page. `Feedback.astro`, `DeveloperApi.astro`
    and `StatDonut.astro` each open one; copy that pattern.
  - Anything that can be squeezed wants `min-w-0`. A grid/flex item's automatic
    minimum size is its content's, so one long unbreakable line (the `curl`
    snippet in `DeveloperApi.astro`) will widen its column and push a scrollbar
    onto the entire page rather than scroll inside its own `overflow-x-auto`.
  - Purely decorative viewport variants (`intersect:md:motion-preset-*`, which
    only pick an entrance animation) are deliberately left as-is.

  To check a change: `npm run build`, serve `dist/`, then compare
  `document.documentElement.scrollWidth` against `clientWidth` at a spread of
  widths — 320 / 390 / 768 / **1024 / 1100** / 1440 / 1920. The two in bold are
  the sidebar-transition widths where this class of bug lives, and they are the
  ones nobody tests by hand.
- **New colours** should be added to the shared theme in `../tmc-global`, not
  hard-coded here, so website-city and the app stay in sync.
- Keep `.astro` files for page structure and React (`.tsx`) for interactive
  islands, matching the existing split.

---

## External source code

`~/stack/external-study/` holds third-party source cloned **to be read** — Godot, the
Source engine, Momentum Mod, Shavit's `bhoptimer`, and the mod managers. Read-only,
never a dependency, never imported. Look there before designing something from
scratch; see [`external-study/README.md`](../external-study/README.md).
