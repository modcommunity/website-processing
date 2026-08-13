import type { APIRoute } from 'astro'

import { LOCALES, DEFAULT_LOCALE, localizeUrl, type LocaleT } from '../i18n/config'
import { SITE_URL } from '../lib/site'

/**
 * Routes that exist in every locale, as bare (default-locale) paths. Kept as a
 * hand-maintained list rather than a glob over `src/pages` because the two page
 * trees are not symmetric: `[lang]/community` has no unprefixed counterpart, so
 * globbing would emit URLs that 404 for English.
 */
const ROUTES = ['/', '/tos/', '/privacy-policy/', '/licenses/'] as const

const abs = (path: string, locale: LocaleT) => new URL(localizeUrl(path, locale), SITE_URL).href

/**
 * Every route × every locale, each entry carrying the full `xhtml:link` alternate
 * set (plus `x-default` on the unprefixed English URL). This mirrors the
 * canonical/hreflang tags `Layout.astro` already emits per page — the sitemap
 * repeats them because search engines only treat the 9 localized copies as one
 * page in many languages when the signal is consistent across both.
 */
export const GET: APIRoute = () => {
    const urls = ROUTES.flatMap((route) =>
        LOCALES.map((locale) => {
            const alternates = LOCALES.map(
                (alt) => `        <xhtml:link rel="alternate" hreflang="${alt}" href="${abs(route, alt)}" />`
            ).join('\n')

            return [
                '    <url>',
                `        <loc>${abs(route, locale)}</loc>`,
                alternates,
                `        <xhtml:link rel="alternate" hreflang="x-default" href="${abs(route, DEFAULT_LOCALE)}" />`,
                `        <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>`,
                `        <priority>${route === '/' ? '1.0' : '0.5'}</priority>`,
                '    </url>',
            ].join('\n')
        })
    ).join('\n')

    const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        urls,
        '</urlset>',
        '',
    ].join('\n')

    return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
