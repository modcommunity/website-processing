/**
 * Every origin this site points at, in one place.
 *
 * All three are `PUBLIC_*` Vite variables with a PRODUCTION default, so a fresh
 * checkout builds against production with no `.env` at all, and pointing a dev
 * build at a local stack is one line in `.env` rather than an edit to a source
 * file — see `.env.example`.
 *
 * `PUBLIC_` is load-bearing: it is what makes Astro inline the value into the
 * CLIENT bundle as well as the build, which the blog shelf needs (its island
 * refetches from {@link CITY_URL} in the browser when the baked pool is stale).
 * That also means nothing here may ever hold a secret — these values ship to
 * every visitor.
 *
 * Trailing slashes are stripped on the way in, because every call site
 * concatenates a rooted path onto these (`${CITY_URL}/api/content/article`) and
 * `PUBLIC_CITY_URL=http://localhost:3000/` would otherwise produce `//api/...`.
 */
const origin = (value: string | undefined, fallback: string): string =>
    (value ?? fallback).replace(/\/+$/, '')

/**
 * This site's own public origin — canonical, hreflang and Open Graph URLs.
 * `Layout.astro` builds all three off it.
 */
export const SITE_URL: string = origin(import.meta.env.PUBLIC_URL, 'https://moddingcommunity.com')

/**
 * website-city — the app, and the source of the landing page's blog shelf. The
 * shelf reads its UNAUTHENTICATED content API, so pointing this at a local city
 * needs no key: `PUBLIC_CITY_URL=http://localhost:3000`.
 */
export const CITY_URL: string = origin(import.meta.env.PUBLIC_CITY_URL, 'https://moddingcommunity.com')

/**
 * The documentation site (`../website-learn`).
 *
 * Its own host rather than a path on this one, which is where it is headed —
 * today the same content is served at `/learn`, so this is the value most
 * likely to want overriding before that move lands.
 */
export const DOCS_URL: string = origin(import.meta.env.PUBLIC_DOCS_URL, 'https://docs.moddingcommunity.com')

/** A page on the docs site: `docs('/tmc-cli')`. */
export const docs = (path: string): string =>
    `${DOCS_URL}${path.startsWith('/') ? path : `/${path}`}`
