import { SOCIALS } from '../i18n/nav'
import { SITE_URL } from './site'

/**
 * The site-level JSON-LD: `Organization` and `WebSite`, the same two nodes
 * website-city emits from its root layout (`src/lib/metadata/structured.ts`
 * there).
 *
 * The home page is this site, not city, so without these the one page a search
 * engine weighs most carried no structured data at all, while every city page
 * did. The `@id`s are city's, byte for byte (`/#organization`, `/#website` on
 * the same origin): both sites describe ONE publisher, and two nodes with
 * different ids would read as two organisations. The name, description and
 * logo are city's too, for the same reason — a node with one `@id` that says
 * different things on different pages is a conflict for the consumer to
 * resolve, not extra information.
 *
 * No `SearchAction`: city explains why (no `/search` route exists).
 */
const SITE_NAME = 'The Modding Community'
const SITE_DESCRIPTION =
    'A welcoming and inclusive modding and game development community. Discover mods, assets, game servers, articles and the people building them.'

export const ORG_ID = `${SITE_URL}/#organization`
export const SITE_ID = `${SITE_URL}/#website`

export function siteJsonLd(locale: string): string {
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': ORG_ID,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
                description: SITE_DESCRIPTION,
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/icon.png` },
                // The footer's own list, so the markup and the visible links
                // can never name different accounts.
                sameAs: SOCIALS.map((s) => s.href),
            },
            {
                '@type': 'WebSite',
                '@id': SITE_ID,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
                description: SITE_DESCRIPTION,
                inLanguage: locale,
                publisher: { '@id': ORG_ID },
            },
        ],
    }

    // `<` escaped so no string in the graph can close the script element.
    return JSON.stringify(graph).replace(/</g, '\\u003c')
}
