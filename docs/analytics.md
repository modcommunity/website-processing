# Analytics (Umami)

Off by default. The tracker script and every handler are only emitted when both
env vars are set at build time (`src/layouts/Layout.astro`); without them no
request is made and `window.umami` is undefined, so `track()` is a no-op.

| Env var | Meaning |
| --- | --- |
| `PUBLIC_UMAMI_SRC` | URL of the Umami `script.js` |
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami website id |

Placeholders live in `.env.example`. Both are inlined at build time.

## Rules

- Names are `<area>_<action>` snake_case (the repo's existing convention), props are flat.
- Props are identifiers (slug, section id, locale), never translated labels, free text or personal data.
- Outbound links send `origin + pathname` only: no query string or hash.
- Registry: `src/lib/umami.ts`. `track()` never throws and no-ops when Umami is absent.
- Guard: `npm run umami:check` (also part of `npm test`) fails on a registered name nothing fires, a fired name that is not registered, and a click handler with neither an event nor an `umami-ignore: <reason>` comment.

## Events

| Event | Props | Fired by |
| --- | --- | --- |
| `section_view` | section, index, of, path | landing section first seen |
| `section_cta` | to, place | landing section links into the app |
| `pillar_click` | to | pillar cards |
| `social_click` | network | community social links |
| `cta_explore`, `cta_app`, `cta_play`, `cta_gamespice` | place | hero and section CTAs |
| `cta_discord`, `cta_github` | place / repo | Discord and GitHub links |
| `hero_surface` | href | hero surface index |
| `app_link` | href (no query) | links from shared header, drawer, footer |
| `app_page_cta`, `cli_page_cta` | to, place | product page CTAs and download links |
| `command_copy` | none | copy button on a shell command |
| `tour_tab` | tab | app tour tabs |
| `terminal_scenario` | scenario | API terminal scenario buttons |
| `roadmap_view` | view | roadmap columns/list switch |
| `blog_arrow`, `blog_article` | dir / slot | blog carousel |
| `launcher` | none | corner Play/Chat launcher |
| `legal_toc_click` | section, index, of | legal table of contents |
| `legal_depth` | deepest, of, section | deepest legal section read, on leave |
| `locale_change` | from, to | language picker |
| `theme_change` | from, to | light/dark switch |
| `header_link`, `account`, `back_to_top` | item / signedIn / none | shell controls |
| `outbound-link-click` | url (origin + path) | any other-host link (helper script) |

`path` and `locale` are added to every `track()` call. Automated browsers are
dropped in `tmcUmamiBeforeSend` (`helper/UmamiAnalytics.astro`).

There are no forms or search on this site, so there are no events for them.
