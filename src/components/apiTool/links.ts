import { docs } from "../../lib/site"

/**
 * Account → API Keys on website-city. Same domain as this site, so it is a
 * plain path; call sites run it through `localizePath` exactly as the landing
 * sections do for `/servers`, `/roadmap` and friends.
 */
export const API_KEYS = '/account/api'

export const DISCORD = 'https://discord.moddingcommunity.com'

/**
 * The CLI's page on the docs site.
 *
 * A different HOST, not a path on this one, so it does not go through
 * `localizePath` and it carries no locale — `DOCS_URL` defaults to
 * `https://docs.moddingcommunity.com` and is overridable per build
 * (`PUBLIC_DOCS_URL`), which is the point: the docs are moving to their own
 * host, and until then a dev build can point this at wherever they are served.
 */
export const DOCS_CLI = docs('/tmc-cli')
