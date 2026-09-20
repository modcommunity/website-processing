import type { LinkComponent, LinkProps } from '@modcommunity/shared'
import { track } from '../lib/umami'
import { isLocale, localizeUrl, type LocaleT } from './config'

/**
 * Locale-aware link for the shared Header / Sidebar / Footer.
 *
 * The nav configs in `nav.tsx` keep **bare** hrefs (`/mods`, `/tos`) because the
 * shared components match them against `activePath` to highlight the current
 * entry — prefixing them there would break that comparison. So the prefix is
 * applied at render time instead: this is passed as `linkComponent`, and every
 * internal href comes out localized (`/fr/mods`) while external links, anchors
 * and protocol-relative URLs pass through untouched.
 *
 * website-city uses the same "as-needed" prefixing (English unprefixed, others
 * under `/xx`), so links that leave this site for the app stay in-language too.
 */
function isInternal(href: string): boolean {
    return href.startsWith('/') && !href.startsWith('//')
}

/**
 * Internal paths that are linked from the global chrome but are not worth
 * passing link equity to.
 *
 * The legal column sits in the footer, so it is linked from EVERY page on the
 * domain — without this the terms of service outranks the pages the site is
 * actually about by internal link count alone. They stay crawlable and
 * indexable (a legal page nobody can fetch is a legal page nobody can read);
 * they just stop voting.
 *
 * Mirrors `NOFOLLOW_PREFIXES` in website-city's `src/lib/metadata/crawl.ts` —
 * both apps serve the same footer on the same domain, so the two lists have to
 * agree.
 */
const NOFOLLOW_PREFIXES = ['/tos', '/privacy-policy', '/licenses']

function shouldNoFollow(href: string): boolean {
    if (!isInternal(href)) return false

    const path = href.split('?')[0]!.replace(/\/+$/, '')

    return NOFOLLOW_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))
}

/** Merge `nofollow` into whatever the caller asked for, without duplicating. */
function mergeRel(href: string, rel: string | undefined, blank: boolean) {
    const parts = new Set((rel ?? '').split(/\s+/).filter(Boolean))

    if (!rel && blank) {
        parts.add('noopener')
        parts.add('noreferrer')
    }

    // Off-site links from the shared chrome are our own socials and Discord —
    // ours, but not pages we need to vouch for.
    if (blank || shouldNoFollow(href)) parts.add('nofollow')

    return parts.size > 0 ? Array.from(parts).join(' ') : undefined
}

// Cached per locale so the component identity is stable across renders — a fresh
// function component each render would remount the whole nav subtree.
const CACHE = new Map<string, LinkComponent>()

export function localeLink(locale: string): LinkComponent {
    const cached = CACHE.get(locale)
    if (cached) return cached

    const target: LocaleT = isLocale(locale) ? locale : 'en'

    function LocaleLink({
        href,
        target: t,
        rel,
        children,
        onClick: callerOnClick,
        ...rest
    }: LinkProps & { onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
        /*
         * Every header, sidebar, footer and mobile-drawer link comes through
         * here, which makes it the one place to record what this site is FOR:
         * a visitor leaving the pitch for the app.
         *
         * Only internal links. An external one is already auto-tagged
         * `outbound-link-click` by the analytics snippet — which ignores
         * same-host links, so without this these are recorded nowhere at all.
         *
         * The BARE href, so `/mods` is one row rather than nine localized
         * ones.
         *
         * `callerOnClick` is destructured OUT of `rest` and composed rather
         * than left in it: `{...rest}` is spread after the explicit props, so
         * an `onClick` arriving from `@modcommunity/shared` — the mobile
         * drawer passes one to close itself — would silently replace this and
         * the event would fire nowhere.
         */
        const leaving = isInternal(href)

        function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
            if (leaving) track('app_link', { href: href.split('?')[0] })

            callerOnClick?.(e)
        }

        return (
            <a
                href={isInternal(href) ? localizeUrl(href, target) : href}
                target={t}
                rel={mergeRel(href, rel, t === '_blank')}
                {...rest}
                onClick={onClick}
            >
                {children}
            </a>
        )
    }

    CACHE.set(locale, LocaleLink)
    return LocaleLink
}
