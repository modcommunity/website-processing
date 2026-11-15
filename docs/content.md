# Content: origins, the blog shelf, the product pages, translation

## Origins and environment

Every origin this site points at lives in `src/lib/site.ts`, and each is a `PUBLIC_*` variable with a production default, so a fresh checkout builds exactly as production does with no `.env` at all.

| Constant | Variable | Default | Used by |
| --- | --- | --- | --- |
| `SITE_URL` | `PUBLIC_URL` | `https://moddingcommunity.com` | `Layout.astro`: canonical, hreflang, Open Graph |
| `CITY_URL` | `PUBLIC_CITY_URL` | `https://moddingcommunity.com` | `lib/blog.ts`: the blog shelf's fetch and its article URLs |
| `DOCS_URL` | `PUBLIC_DOCS_URL` | `https://docs.moddingcommunity.com` | `apiTool/links.ts`: `docs('/tmc-cli')` |
| `GAMESPICE_URL` | `PUBLIC_GAMESPICE_URL` | `https://gamespice.net` | `landing/Platform.astro` and the hero's platform card; `astro.config.mjs` reads the same variable for the `/platform` redirects |

`.env.example` documents these along with the page-metadata and analytics variables; copy it to `.env` and uncomment what you need. Before adding another:

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
| `/tmc-cli` | `tmc-cli` (package and repo; the installed command is `tmc`), the Python CLI for the public content API | `../tmc-cli`, its `README.md` and `CLAUDE.md` |
- **The tool is called `tmc-cli` in prose, the command is `tmc`.** Package, repo and every sentence naming the tool say `tmc-cli` (`tmc` alone reads as the community's abbreviation); only what a person types (`tmc whoami`, terminal blocks, the `tmc_` key prefix, `~/.config/tmc`) keeps `tmc`. The install section says so once.
- **`/tmc-app` is released; `/tmc-cli` is open source but not on PyPI.** The app ships Windows, Linux and macOS builds as GitHub releases and is GPL-3.0; there are no mobile builds, and the hero says so (`heroMobile`). The CLI installs from a clone of its public repository (`Install.astro`), and the copy never prints a `pip install tmc-cli` line. Say "untested" where the sibling repo says it: all supported-game deployment and USVFS are unproven, and `stratNote` / `modsGamesNote` state that.
- **The Download button is a client-side island** (`tmcApp/DownloadButton.tsx`). Release files carry the version in their name, so it asks GitHub's releases API once (cached in `sessionStorage` for ten minutes), matches builds by pattern, and only accepts URLs under the repo's `releases/download/`. Linux gets the `.deb`, Windows the setup `.exe`, everything else the macOS `.dmg`. Every failure leaves the plain link to the latest release. Its labels are one props object (`dlLabels.ts`), nine locales.
- **The app mockups are drawings, and say so.** `tmcApp/mock/` draws screens with made-up names and numbers; text inside them stays English like a screenshot would, only page copy is translated. Motion is state-driven (no CSS files) and gated by `useMotion`, which is false on the server and under `prefers-reduced-motion`.
- **The platform plan is desktop only for now.** Windows, Linux and macOS; mobile is mentioned once, as not out yet.
- **Every claim is checked against the sibling repo.** The protocol list, the four deployment strategies, the relation verbs and the exit codes are copied, not invented, and each is sourced in a comment. `apiTool.ts`'s header names the CLI version it was last checked against; the type, relation and cap lists come from the CLI's `src/tmc_cli/schema.py`, and any test count from actually running its suite, because the README's figure is the thing most likely to have drifted.
- **`/tmc-cli` links the repository and the docs.** The hero's buttons and the closing CTA point at `CLI_REPO` and `DOCS_URL + /tmc-cli`. The hero terminal (`TypedTerminal.tsx`, `scenarios.ts`) shows real output shapes; commands and output are never translated.

## GameSpice, the gaming platform (`/platform` redirects)

The gaming platform formerly called Dot is now [GameSpice](https://gamespice.net), with its own site. `/platform` and its eight localized copies are redirects to `GAMESPICE_URL` (`astro.config.mjs`, the same mechanism as `/api-tool`), and the sitemap filter drops them. The old page and its components are gone; the home page keeps two GameSpice surfaces, both with copy in `src/i18n/sections/platform.ts` (`landing.platform.*`):

- **The hero's platform card** (`landing/Heading.astro`): `hero.pf*` copy, the `platform/PlatformPanel.astro` stack window (real repository names from `github.com/gamespice-platform` and `zees-games`, never translated; `pn*` keys for the row titles and product names) and a button to GameSpice.
- **The GameSpice section** (`landing/Platform.astro`): a feature card grid (`f1t`..`f9t`, `f1b`..`f9b`) and a button to GameSpice. Each card is a feature that exists: cross-platform play (WebSocket/TCP and ENet/UDP, one wire format), community servers, open CDN with signed releases, the creator hub, stats and leaderboards, the item store, the Workshop, Workbench and the TMC community tools. Workbench says what it does today (live profile editing in an in-game window or a local web page, export of the changes) and that a full in-game game editor is the aim; check `dot-workbench`'s README before widening that. Do not add a card for something not built.
- **"Open source, MIT" is said only about the addons and games**, whose repos carry an MIT `LICENSE`. The web back end is not open source.
- Links to GameSpice open in a new tab with `rel="noopener"`, and the brand mark is `public/images/gamespice-mark.svg`, copied from `../website-gs/public/brand/`.
- nginx still routes `/platform` to this site (`/etc/nginx/sites-enabled/tmc.conf` and `website-city/deployment/docker/nginx.conf`), which is what serves the redirect stubs.

## Translation

The home page is fully translated in all nine locales, and an English-only key there is a regression. The product pages are translated too (`src/i18n/sections/tmcApp.ts`, `apiTool.ts`), as are the links they added into `Servers.astro` and `DeveloperApi.astro` (`servers.appLink`, `api.cliButton`).

Each page's `<title>`, description and sr-only `<h1>` come from `src/i18n/sections/pageMeta.ts` via `pageMeta()` (`src/i18n/meta.ts`); a new page adds its keys there. Canonical, hreflang and sitemap URLs are slashless (root excepted); keep `Layout.astro` and the sitemap `serialize` in `astro.config.mjs` in step. The legal pages keep English titles because their bodies are English.

`en` is the reference shape: add a key there first, then fill the other eight. `getT` falls back per key, so a half-filled key still renders (in English) rather than blank.

What stays identical across locales is everything a reader would type or recognise as a name: platform, product and engine names, the CLI's commands, flags, environment variables, HTTP methods and exit codes, snippet titles (`install.sh`, `release.yml`, …), and the mock server's own name and map in `/tmc-app`'s hero. Translating a flag produces a line that does not run. Each catalogue's header comment says this too; keep the two in step.

Links into website-city (`/changelog`, `/roadmap`, `/mods`, `/assets`, …) are plain root-relative paths, not localised: same origin in production, so they resolve.
