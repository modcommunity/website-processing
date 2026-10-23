# Content: origins, the blog shelf, the product pages, translation

## Origins and environment

Every origin this site points at lives in `src/lib/site.ts`, and each is a `PUBLIC_*` variable with a production default, so a fresh checkout builds exactly as production does with no `.env` at all.

| Constant | Variable | Default | Used by |
| --- | --- | --- | --- |
| `SITE_URL` | `PUBLIC_URL` | `https://moddingcommunity.com` | `Layout.astro`: canonical, hreflang, Open Graph |
| `CITY_URL` | `PUBLIC_CITY_URL` | `https://moddingcommunity.com` | `lib/blog.ts`: the blog shelf's fetch and its article URLs |
| `DOCS_URL` | `PUBLIC_DOCS_URL` | `https://docs.moddingcommunity.com` | `apiTool/links.ts`: `docs('/tmc-cli')` |

`.env.example` documents these along with the page-metadata and analytics variables; copy it to `.env` and uncomment what you need. Before adding a fourth:

- **`PUBLIC_` is load-bearing, and it is also a limit.** It makes Astro inline the value into the client bundle as well as the build, which the blog shelf needs (its island refetches from `CITY_URL` in the browser). It equally means nothing here may hold a secret: these values ship to every visitor.
- **Trailing slashes are stripped on the way in.** Call sites concatenate rooted paths (`${CITY_URL}/api/content/article`), so a trailing slash would otherwise build `//api/...`.
- **`DOCS_URL` points at a host the docs have not moved to yet.** The documentation site is `../website-learn`, served today at `/learn` on the main domain; the default is where it is headed. That is why it is a variable: the value is expected to be wrong for a while, and overriding it is a line in `.env`, not an edit to a component.

## The blog shelf reads from website-city

The two article carousels at the bottom of the landing page come from `src/lib/blog.ts`, which fetches website-city's public content API, the unauthenticated half, so there is no key and no build-time credential:

```
GET https://moddingcommunity.com/api/content/article?official=1&limit=20&page=N
```

`official=1` is the whole definition of "the blog", and the endpoint answers with `access-control-allow-origin: *`, so the same call works from the build and from the browser. Pointing the shelf at a local city is `PUBLIC_CITY_URL=http://localhost:3000`.

Two separate mechanisms; keep them apart when changing this:

- **The pool** is fetched at build time and baked into the island's props (memoised, so the nine locale renders make one request). The island refetches in the browser only when that pool is more than a day old, so a site rebuilt today sends no client request.
- **The selection** rotates daily, client-side, seeded with the UTC date (`dailyPick`). That is what makes "different articles today" work on a static site with no rebuild. It must stay deterministic: the server and the browser have to agree on the first render.

Everything the API returns is treated as optional, because the site has to build against a city deployment that has not shipped a given field yet: no `image` falls back to the local `public/images/blog/article/*` art by slug and then to a gradient, no `path` falls back to `/blog/<slug>`, and a failed fetch falls back to `FALLBACK_ARTICLES` so the section is never empty. The modding/server split reads tags and categories first and falls back to the title.

## The product pages (`/tmc-app`, `/tmc-cli`)

Each is built like the home page: a shell in `src/components/<Name>.astro` composing one `.astro` file per section, and a route pair (`src/pages/<route>/index.astro` plus `src/pages/[lang]/<route>/index.astro`) so the language picker never 404s. `/api-tool` is the old name of `/tmc-cli`; `astro.config.mjs` redirects it in every locale.

| Page | Describes | Source of truth |
| --- | --- | --- |
| `/tmc-app` | The desktop app: the live server browser, the mod manager, downloads, plugins, its security model | `../tmc-app`, chiefly its `CLAUDE.md` and `docs/` |
| `/tmc-cli` | `tmc`, the Python CLI for the public content API | `../tmc-cli`, its `README.md` and `CLAUDE.md` |

- **Both products are unreleased, and the pages say so loudly.** The app has no builds; the CLI is not on PyPI and has no public repository. `/tmc-app` says it in the badge (`heroBadge`), the hero note (`heroNoteHtml`) and a closing section "Not Available, And Not Ready" (`statusTitleHtml`, `statusIntroHtml`, the `n1`–`n4` cards). `/tmc-cli` says it in the badge, an amber note in the hero (`heroNoteHtml`) and one above the closing buttons (`ctaNoteHtml`); the notes wear amber/`warning` rather than the page's teal, because a caution should not be dressed in the page's own colour. `installNote` is only about the install itself. When a product ships, those are the strings, and the install snippet becomes a real `pip install tmc-cli`.
- **`/tmc-app` states no version number, on purpose.** The app's manifests say `0.1.0`, which is the scaffold default rather than a decision, and a version nobody can install tells a reader nothing. If a real pre-release number is set there, `heroNoteHtml` is where it comes back.
- **The platform plan is desktop first.** Windows, Linux and macOS, then mobile: the hero's chips are in that order, the mobile two are dimmed and tagged "Later" (`pLater`), and the `n4` card says it in words. A flat row of five would read as a shipping matrix.
- **Forward-looking copy is fenced, not folded in.** These pages describe what is built. The one place `/tmc-app` talks about what is coming, the server administration panel at the end of `LiveBrowser.astro`, has one "In the app" row (RCON, which exists), four rows each tagged "Planned", and a line saying planned means planned. A planned feature in a plain `FeatureCard` beside built ones would read as shipped; if something else needs a "later", copy this panel.
- **Every claim is checked against the sibling repo.** The protocol list, the four deployment strategies, the relation verbs and the exit codes are copied, not invented, and each is sourced in a comment. `apiTool.ts`'s header names the CLI version it was last checked against; the type, relation and cap lists come from the CLI's `src/tmc_cli/schema.py`, and any test count from actually running its suite, because the README's figure is the thing most likely to have drifted.
- **`/tmc-cli` links the docs, not a repository.** There is no public repo, so the hero's third button and the closing CTA both point at `DOCS_URL + /tmc-cli`.

## The platform page (`/platform`)

`src/components/PlatformPage.astro` composes `src/components/platform/*` (hero, stack diagram, differentiators, addon explorer, play step-through, games, projects, goals, MIT block, CTA); copy is `src/i18n/sections/platformPage.ts`, and the home page's `landing/Platform.astro` is a teaser over the same `stackLayers()` and `platform.ts`. Interactive parts are three React islands (`StackDiagram`, `AddonExplorer`, `PlayFlow`).

- **Lists are data, in `components/platform/data.ts`.** `ADDONS` (id + category), `GAMES` (id + repo) and `PROJECTS`. Adding one is an entry there plus its keys: `ad_<id>`, `gm_<id>`, or for a project `proj_<id>_desc` and `proj_<id>_g1..gN` (the key names use underscores because the catalogue lookup splits on dots).
- **"Open source, MIT" is said only about the Dot addons and the listed games**, whose repos have a verified MIT `LICENSE`. The site backend and the desktop app are not MIT and the page says so (`mitScopeHtml`). Check a repo's `LICENSE` before adding it to a list; `dot-bot-learn` has none and is left off.
- **Every claim traces to the addons' own docs or code, and the stage is stated** (`badgeStage`, `heroNoteHtml`, the Goals section's built / next / not built columns). Update Goals when something ships; do not fold a plan into "built".
- A project's goals are copied from that project's own goals page and link back to it; do not write goals for someone else.
- nginx routes `/platform` to this site (`/etc/nginx/sites-enabled/tmc.conf` and `website-city/deployment/docker/nginx.conf`); a new page here needs the same edit in both.

## Translation

The home page is fully translated in all nine locales, and an English-only key there is a regression. The product pages are translated too (`src/i18n/sections/tmcApp.ts`, `apiTool.ts`), as are the links they added into `Servers.astro` and `DeveloperApi.astro` (`servers.appLink`, `api.cliButton`); the two product heroes are English-only.

`en` is the reference shape: add a key there first, then fill the other eight. `getT` falls back per key, so a half-filled key still renders (in English) rather than blank.

What stays identical across locales is everything a reader would type or recognise as a name: platform, product and engine names, the CLI's commands, flags, environment variables, HTTP methods and exit codes, snippet titles (`install.sh`, `release.yml`, …), and the mock server's own name and map in `/tmc-app`'s hero. Translating a flag produces a line that does not run. Each catalogue's header comment says this too; keep the two in step.

Links into website-city (`/changelog`, `/roadmap`, `/mods`, `/assets`, …) are plain root-relative paths, not localised: same origin in production, so they resolve.
