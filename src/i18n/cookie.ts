import { LOCALE_COOKIE } from './config'
import { DOCS_URL } from '../lib/site'

/**
 * The `Domain=` the shared `tmc_locale` cookie is written with, or `undefined`
 * for a host-only cookie.
 *
 * The docs live on their own subdomain (`docs.moddingcommunity.com`), which a
 * host-only cookie set here never reaches, so a language picked on one side was
 * invisible on the other. When the docs host is a subdomain of this page's
 * host, this host is the shared parent — derived from `PUBLIC_DOCS_URL`, so
 * there is no second variable to keep in step. website-city writes the same
 * domain from its `AUTH_COOKIE_DOMAIN`, and website-learn derives it the same
 * way from the other end.
 */
export function localeCookieDomain(): string | undefined {
    if (typeof location === 'undefined') return undefined

    try {
        const docs = new URL(DOCS_URL).hostname

        return docs.endsWith(`.${location.hostname}`)
            ? location.hostname
            : undefined
    } catch {
        return undefined
    }
}

/**
 * Remember `locale` in the cookie website-city's middleware and the docs read.
 *
 * With a shared domain it also expires any host-only copy first: a browser
 * holding both sends both, in an order the server cannot tell apart, so an old
 * host-only `de` could outvote a new shared `en`.
 */
export function writeLocaleCookie(locale: string): void {
    try {
        const domain = localeCookieDomain()

        if (domain) {
            document.cookie = `${LOCALE_COOKIE}=; path=/; max-age=0; samesite=lax`
        }

        document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${
            60 * 60 * 24 * 365
        }; samesite=lax${domain ? `; domain=${domain}` : ''}${
            location.protocol === 'https:' ? '; secure' : ''
        }`
    } catch {
        /* ignore */
    }
}
