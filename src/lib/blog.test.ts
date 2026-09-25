import { afterEach, describe, expect, it, vi } from 'vitest'

import { CITY_URL, fetchArticles } from './blog'

/**
 * The URL checks in `toArticle` (16c0336), through the public entry point.
 *
 * `url`, `path` and `image` come from website-city's public API and land in an
 * `<a href>` and an `<img src>` on this origin, so anything that is not plainly
 * http(s) or a single-slash site path must be treated as missing — and the
 * fallback chain (city path, local art, placeholder) must take over exactly as
 * if the field had never been sent. `fetch` is stubbed: no network.
 */

type Row = Record<string, unknown>

function stubRows(rows: Row[]) {
    const fetch = vi.fn(async (_url: string | URL, _init?: RequestInit) =>
        new Response(JSON.stringify({ data: rows }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        })
    )

    vi.stubGlobal('fetch', fetch)

    return fetch
}

/** A well-formed official post; override one field per test. */
function row(over: Row = {}): Row {
    return {
        id: 1,
        name: 'How To Install Mods In Skyrim',
        slug: 'how-to-download-install-mods-in-skyrim',
        path: '/blog/how-to-download-install-mods-in-skyrim',
        url: 'https://moddingcommunity.com/blog/how-to-download-install-mods-in-skyrim',
        description: 'A guide.',
        official: true,
        image: 'https://cdn.example.com/skyrim.webp',
        ...over,
    }
}

async function one(over: Row = {}) {
    stubRows([row(over)])

    const out = await fetchArticles()

    expect(out).not.toBeNull()

    return out![0]
}

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('fetchArticles', () => {
    it('asks city for the official listing and keeps a good row as sent', async () => {
        const fetch = stubRows([row()])
        const out = await fetchArticles()

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(String(fetch.mock.calls[0]![0])).toBe(
            `${CITY_URL}/api/content/article?official=1&limit=20&page=1`
        )
        expect(out).toHaveLength(1)
        expect(out![0]).toMatchObject({
            id: 1,
            url: 'https://moddingcommunity.com/blog/how-to-download-install-mods-in-skyrim',
            image: 'https://cdn.example.com/skyrim.webp',
        })
    })

    it('returns null when city cannot be reached', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => {
                throw new Error('offline')
            })
        )
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        expect(await fetchArticles()).toBeNull()
    })
})

describe('toArticle: url', () => {
    it('accepts http as well as https', async () => {
        expect((await one({ url: 'http://example.com/x' })).url).toBe(
            'http://example.com/x'
        )
    })

    it.each([
        ['javascript:', 'javascript:alert(1)'],
        ['javascript: in mixed case', 'JavaScript:alert(1)'],
        ['data:', 'data:text/html,<script>alert(1)</script>'],
        ['vbscript:', 'vbscript:msgbox(1)'],
        ['a relative path', '/blog/x'],
        ['garbage', 'not a url'],
    ])('drops %s and falls back to the city path', async (_, url) => {
        expect((await one({ url })).url).toBe(
            `${CITY_URL}/blog/how-to-download-install-mods-in-skyrim`
        )
    })
})

describe('toArticle: path', () => {
    it.each([
        ['protocol-relative //host', '//evil.example/blog/x'],
        ['backslash /\\host', '/\\evil.example/blog/x'],
        ['a scheme', 'javascript:alert(1)'],
        ['a path without the leading slash', 'blog/x'],
    ])('refuses %s and falls back to the slug', async (_, path) => {
        const a = await one({ path, url: null })

        expect(a.url).toBe(
            `${CITY_URL}/blog/how-to-download-install-mods-in-skyrim`
        )
    })

    it('URI-encodes the slug fallback', async () => {
        const a = await one({ path: null, url: null, slug: 'a b?c/../d' })

        expect(a.url).toBe(`${CITY_URL}/blog/a%20b%3Fc%2F..%2Fd`)
    })

    it('drops a row with no usable path and no slug', async () => {
        stubRows([row({ path: '//evil.example/x', slug: null }), row({ id: 2 })])

        const out = await fetchArticles()

        expect(out!.map((a) => a.id)).toEqual([2])
    })
})

describe('toArticle: image', () => {
    it('keeps a site-relative image', async () => {
        expect((await one({ image: '/images/x.webp' })).image).toBe(
            '/images/x.webp'
        )
    })

    it.each([
        ['javascript:', 'javascript:alert(1)'],
        ['data:', 'data:image/svg+xml,<svg onload=alert(1)>'],
        ['protocol-relative //host', '//evil.example/x.png'],
        ['backslash /\\host', '/\\evil.example/x.png'],
    ])('drops %s and falls back to the local art', async (_, image) => {
        expect((await one({ image })).image).toBe(
            '/images/blog/article/skyrim_how_to_mod.jpg'
        )
    })

    it('falls back to the placeholder (null) when there is no local art', async () => {
        const a = await one({
            image: 'javascript:alert(1)',
            slug: 'no-local-art',
            path: '/blog/no-local-art',
        })

        expect(a.image).toBeNull()
    })
})
