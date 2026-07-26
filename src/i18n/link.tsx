import type { LinkComponent, LinkProps } from '@modcommunity/shared'
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

// Cached per locale so the component identity is stable across renders — a fresh
// function component each render would remount the whole nav subtree.
const CACHE = new Map<string, LinkComponent>()

export function localeLink(locale: string): LinkComponent {
    const cached = CACHE.get(locale)
    if (cached) return cached

    const target: LocaleT = isLocale(locale) ? locale : 'en'

    function LocaleLink({ href, target: t, rel, children, ...rest }: LinkProps) {
        return (
            <a
                href={isInternal(href) ? localizeUrl(href, target) : href}
                target={t}
                rel={rel ?? (t === '_blank' ? 'noopener noreferrer' : undefined)}
                {...rest}
            >
                {children}
            </a>
        )
    }

    CACHE.set(locale, LocaleLink)
    return LocaleLink
}
