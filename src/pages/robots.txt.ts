import type { APIRoute } from 'astro'

import { SITE_URL } from '../lib/site'

/**
 * A static endpoint rather than `public/robots.txt` so the `Sitemap:` line is
 * built from the same `PUBLIC_URL` the canonical/hreflang tags in
 * `Layout.astro` use — a hardcoded file would point a staging deploy's
 * crawlers at production.
 */
export const GET: APIRoute = () =>
    new Response(
        ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap.xml', SITE_URL).href}`, ''].join('\n'),
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
