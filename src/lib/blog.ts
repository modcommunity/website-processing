/**
 * The landing page's blog shelf, sourced from website-city.
 *
 * The two carousels at the bottom of the home page used to be two hardcoded
 * arrays of five articles each, which meant the marketing site's idea of "our
 * blog" drifted from the blog the moment anybody published. They now come from
 * city's public content API — the UNAUTHENTICATED half, which needs no key and
 * answers with `access-control-allow-origin: *`, so the same call works from
 * this file at build time and from the browser afterwards:
 *
 *     GET {CITY_URL}/api/content/article?official=1&limit=20&page=N
 *
 * `official=1` IS the blog: that flag is what puts a post there (city's
 * `lib/article/blog/latest`), so the filter is the whole definition rather than
 * a heuristic over every article on the site.
 *
 * ---------------------------------------------------------------- Freshness
 * Two independent things, deliberately:
 *
 *  • the POOL is fetched at build time and baked into the island's props, so
 *    the cards are on the page the moment it hydrates, cost a visitor no
 *    request, and survive the API being down. (The carousel itself only lays
 *    its slides out after mount — it measures the container first — so this
 *    buys a filled shelf on hydration rather than server-rendered markup.)
 *    {@link fetchBlogPool} stamps it with
 *    `fetchedAt`, and the island refetches in the browser only once that stamp
 *    is a day old — a site rebuilt this morning makes no client request at all,
 *    one that has not been rebuilt in a month still picks up new posts.
 *  • the SELECTION rotates daily, client-side, from whatever pool is in hand.
 *    See {@link dailyPick}: the shuffle is seeded with the UTC date, so it is
 *    stable for everybody for a day and changes at midnight without a rebuild.
 *
 * ------------------------------------------------------------ Degrading well
 * Every field this file wants is optional on the wire, because the site must
 * build against a city that has not shipped the fields yet:
 *
 *  • no `image` → the local `public/images/blog/article/*` art, matched by
 *    slug, then a gradient placeholder ({@link LOCAL_IMAGES});
 *  • no `path`/`url` → `/blog/<slug>`, which is where city's own blog cards
 *    point;
 *  • no `tags`/`categories` → the card simply shows fewer chips, or none at
 *    all, and the modding/server split falls back to reading the title.
 *
 * And if the fetch fails outright, {@link FALLBACK_ARTICLES} — the ten articles
 * this section used to hardcode — keeps the section from rendering empty.
 */

/*
 * website-city's origin — `PUBLIC_CITY_URL`, defaulting to production. Defined
 * with the site's other origins in `./site`, and re-exported here because this
 * module is where every URL in the shelf is built and callers already reach for
 * it from here.
 */
export { CITY_URL } from './site'
import { CITY_URL } from './site'

/** Which shelf an article belongs on. */
export type BlogKind = 'modding' | 'server'

export type BlogArticle = {
    id: number
    title: string
    /** Absolute, and always present — see the URL fallback above. */
    url: string
    desc: string
    /** Absolute CDN URL, a site-relative local path, or null for a placeholder. */
    image: string | null
    /**
     * The category names this post is filed under, in the order city returned
     * them.
     *
     * Kept SEPARATE from `tags` rather than merged here, because the two are
     * different things and the card renders them differently — city writes a
     * tag as `#name` and a category as a plain proper noun, and this section
     * follows it. The merge (categories first, then tags, deduped, capped)
     * happens in `Article.tsx`, which is where the cap lives.
     */
    categories: string[]
    tags: string[]
    kind: BlogKind
}

export type BlogPool = {
    articles: BlogArticle[]
    /** Epoch ms the pool was fetched; the island refreshes a stale one. */
    fetchedAt: number
    source: 'api' | 'fallback'
}

/* -------------------------------------------------------------------------- */
/*  Wire shape                                                                */
/* -------------------------------------------------------------------------- */

/**
 * One row of city's anonymous summary, narrowed to what this section reads.
 *
 * Everything past `id` is optional on purpose: this is somebody else's
 * deployment answering, and a field that is missing must degrade rather than
 * throw. See `docs/api/public-content-api.md` in website-city for the full
 * shape.
 */
type AnonArticle = {
    id?: number
    name?: string | null
    slug?: string | null
    path?: string | null
    url?: string | null
    description?: string | null
    official?: boolean
    image?: string | null
    tags?: { id?: number; name?: string | null }[] | null
    categories?: { id?: number; name?: string | null; slug?: string | null }[] | null
    app?: { name?: string | null; slug?: string | null } | null
}

const API_LIMIT = 20

/** Two pages covers the blog with room to grow; the API caps `limit` at 20. */
const API_PAGES = 2

/** A build must not hang on somebody else's uptime. */
const FETCH_TIMEOUT_MS = 8000

/** How old a baked pool may be before the island refetches it in the browser. */
export const POOL_MAX_AGE_MS = 24 * 60 * 60 * 1000

/* -------------------------------------------------------------------------- */
/*  Normalising                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Card art for the ten articles this section used to hardcode, by slug.
 *
 * Kept as the step between city's `image` and a bare placeholder: these files
 * are already in `public/`, they are the art the page shipped with, and a post
 * whose card image nobody has set in the CMS still looks like something. New
 * posts are expected to arrive with an `image` and never reach this map.
 */
const LOCAL_IMAGES: Record<string, string> = {
    'how-to-install-mods-for-the-witcher-3': 'tw3_how_to_mod.png',
    'how-to-download-install-mods-in-skyrim': 'skyrim_how_to_mod.jpg',
    'how-to-install-mods-in-rdr2': 'rdr2_how_to_mod.jpg',
    'how-to-download-install-mods-in-minecraft': 'mc_how_to_mod.png',
    'how-to-download-install-mods-in-halo-mcc': 'halo_how_to_mod.png',
    'how-to-set-up-a-rust-server': 'rust_how_to_set_up_server.png',
    'how-to-install-umod-onto-rust-servers': 'rust_how_to_install_umod.png',
    'how-set-up-a-minecraft-java-edition-server': 'mc_how_to_set_up_server.png',
    'how-to-make-a-l4d2-server-with-mods': 'l4d2_how_to_set_up_server.jpg',
    'how-to-make-a-gmod-server-install-mods-addons': 'gmod_how_to_set_up_server.png',
}

/**
 * Which shelf a post belongs on.
 *
 * Tags and categories first, because those are somebody's deliberate filing.
 * The title is the fallback, and it is a good one here: a server guide is
 * called "How To Set Up A Rust Game Server". Anything that says nothing about
 * servers is a modding guide, which is the larger and more general shelf.
 */
function classify(title: string, labels: string[]): BlogKind {
    const SERVER = /(^|[^a-z])(server|servers|hosting|dedicated|srv)([^a-z]|$)/i

    /*
     * "…for Minecraft Client & Server" is a MOD LOADER guide that happens to
     * cover both halves — Forge, Fabric and NeoForge all read this way — and
     * the bare word in the title would file all three under server hosting.
     * Checked against the title only: a post actually tagged for servers has
     * already been placed by the line above.
     */
    const BOTH_HALVES = /client\s*(?:&|and|\+|\/)\s*server/i

    if (labels.some((l) => SERVER.test(l))) return 'server'

    if (BOTH_HALVES.test(title)) return 'modding'

    return SERVER.test(title) ? 'server' : 'modding'
}

function text(value: unknown): string {
    return typeof value === 'string' ? value.trim() : ''
}

/** One wire row into a card, or null when it is not renderable. */
function toArticle(row: AnonArticle): BlogArticle | null {
    const title = text(row.name)

    if (!title) return null

    /*
     * `official` is checked here as well as in the query. An older city
     * deployment does not know the filter and silently ignores it, and this
     * section must never advertise a member's article as one of ours. Absent
     * (rather than false) is treated as official: a deployment that does not
     * publish the flag at all is one where the whole listing predates it.
     */
    if (row.official === false) return null

    const slug = text(row.slug)

    const path = text(row.path) || (slug ? `/blog/${slug}` : '')

    if (!path) return null

    const tags = (row.tags ?? [])
        .map((t) => text(t?.name))
        .filter((t) => t.length > 0)

    const categories = (row.categories ?? [])
        .map((c) => text(c?.name))
        .filter((c) => c.length > 0)

    const local = slug ? LOCAL_IMAGES[slug] : undefined

    return {
        id: typeof row.id === 'number' ? row.id : 0,
        title,
        url: text(row.url) || `${CITY_URL}${path}`,
        desc: text(row.description),
        image:
            text(row.image) ||
            (local ? `/images/blog/article/${local}` : null),
        categories,
        tags,
        kind: classify(title, [
            ...tags,
            ...categories,
            text(row.app?.name),
        ]),
    }
}

/* -------------------------------------------------------------------------- */
/*  Fetching                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The blog, newest first — or null when city could not be reached.
 *
 * Null rather than an empty array, because "the API said there are no posts"
 * and "we never got an answer" want different handling: the first is a real
 * (if odd) state, the second must leave whatever the caller already had alone.
 *
 * Safe to call from the browser: the endpoint is unauthenticated, CORS-open and
 * cached, and its per-address quota is spent by the visitor, not by us.
 */
export async function fetchArticles(
    signal?: AbortSignal
): Promise<BlogArticle[] | null> {
    const out: BlogArticle[] = []

    const seen = new Set<number>()

    for (let page = 1; page <= API_PAGES; page++) {
        const url =
            `${CITY_URL}/api/content/article` +
            `?official=1&limit=${API_LIMIT}&page=${page}`

        let rows: AnonArticle[]

        try {
            const res = await fetch(url, {
                headers: { accept: 'application/json' },
                signal: signal ?? AbortSignal.timeout(FETCH_TIMEOUT_MS),
            })

            if (!res.ok) throw new Error(`HTTP ${res.status}`)

            const body = (await res.json()) as { data?: AnonArticle[] }

            rows = Array.isArray(body.data) ? body.data : []
        } catch (err) {
            /*
             * A partial answer is still an answer. Page 1 failing means we have
             * nothing and the caller should keep its fallback; page 2 failing
             * just means a shorter pool, which the shuffle does not care about.
             */
            console.warn(`[blog] ${url} failed:`, err)

            return out.length > 0 ? out : null
        }

        for (const row of rows) {
            const article = toArticle(row)

            if (!article || seen.has(article.id)) continue

            seen.add(article.id)
            out.push(article)
        }

        if (rows.length < API_LIMIT) break
    }

    return out
}

/**
 * The build-time pool, fetched once per build.
 *
 * Memoised on the PROMISE rather than the result: `Blog.astro` renders once per
 * locale (nine of them today), and without this the build would make eighteen
 * requests for one answer — concurrently, which is also the shape most likely
 * to trip the endpoint's per-address rate limit and get a build a partial pool.
 */
let poolPromise: Promise<BlogPool> | null = null

export function fetchBlogPool(): Promise<BlogPool> {
    poolPromise ??= (async (): Promise<BlogPool> => {
        const articles = await fetchArticles()

        if (!articles || articles.length === 0)
            return {
                articles: FALLBACK_ARTICLES,
                fetchedAt: 0,
                source: 'fallback',
            }

        return { articles, fetchedAt: Date.now(), source: 'api' }
    })()

    return poolPromise
}

/* -------------------------------------------------------------------------- */
/*  Selection                                                                 */
/* -------------------------------------------------------------------------- */

/** Today, in UTC, as the seed string. One rotation a day for everybody. */
export function dayKey(now: Date = new Date()): string {
    return now.toISOString().slice(0, 10)
}

/** xfnv1a — a string to a 32-bit seed. */
function seedOf(str: string): number {
    let h = 2166136261

    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i)
        h = Math.imul(h, 16777619)
    }

    return h >>> 0
}

/** mulberry32 — small, fast, and identical on the server and in the browser. */
function rng(seed: number): () => number {
    let a = seed

    return () => {
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/**
 * `count` articles of one kind, shuffled deterministically for the given day.
 *
 * Deterministic is the whole point: the server and the browser must agree, or
 * React discards the server's HTML on hydration, and two visitors comparing
 * notes on the same day should see the same shelf. The day string is folded
 * into the seed with the kind so the two carousels do not rotate in lockstep.
 */
export function dailyPick(
    articles: BlogArticle[],
    kind: BlogKind,
    count: number,
    day: string
): BlogArticle[] {
    const pool = articles.filter((a) => a.kind === kind)

    const next = rng(seedOf(`${day}:${kind}`))

    // Fisher-Yates over a copy.
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))

        ;[pool[i], pool[j]] = [pool[j]!, pool[i]!]
    }

    return pool.slice(0, count)
}

/* -------------------------------------------------------------------------- */
/*  Fallback                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The ten articles this section hardcoded before it read the API.
 *
 * Only ever rendered when the build could not reach city at all. They are real,
 * published posts, so the worst case is a shelf that is out of date rather than
 * a hole in the page — and `fetchedAt: 0` marks the pool as infinitely stale,
 * which makes the island refetch in the browser and repair it for the visitor.
 */
export const FALLBACK_ARTICLES: BlogArticle[] = [
    {
        id: -1,
        title: 'How To Install Mods In The Witcher 3',
        url: `${CITY_URL}/blog/how-to-install-mods-for-the-witcher-3`,
        desc: 'A guide on how to download and install mods in The Witcher 3 (Wild Hunt) on PC.',
        image: '/images/blog/article/tw3_how_to_mod.png',
        categories: [],
        tags: ['tw3', 'modding', 'how-to'],
        kind: 'modding',
    },
    {
        id: -2,
        title: 'How To Install Mods In Skyrim',
        url: `${CITY_URL}/blog/how-to-download-install-mods-in-skyrim`,
        desc: 'A full guide on how to download and install mods in Skyrim on PC using mod managers like Vortex.',
        image: '/images/blog/article/skyrim_how_to_mod.jpg',
        categories: [],
        tags: ['skyrim', 'modding', 'how-to'],
        kind: 'modding',
    },
    {
        id: -3,
        title: 'How To Install Mods In RDR2',
        url: `${CITY_URL}/blog/how-to-install-mods-in-rdr2`,
        desc: "A guide on how to install mods in Red Dead Redemption 2 (RDR2) on PC, including instructions on how to use a popular mod loader, Lenny's Mod Loader (LML).",
        image: '/images/blog/article/rdr2_how_to_mod.jpg',
        categories: [],
        tags: ['rdr2', 'modding', 'lml', 'how-to'],
        kind: 'modding',
    },
    {
        id: -4,
        title: 'How To Install Mods In MC',
        url: `${CITY_URL}/blog/how-to-download-install-mods-in-minecraft`,
        desc: 'A full guide on how to download and install mods in Minecraft including how to use Forge and Fabric.',
        image: '/images/blog/article/mc_how_to_mod.png',
        categories: [],
        tags: ['minecraft', 'modding', 'how-to'],
        kind: 'modding',
    },
    {
        id: -5,
        title: 'How To Install Mods In Halo: MCC',
        url: `${CITY_URL}/blog/how-to-download-install-mods-in-halo-mcc`,
        desc: 'A full guide on how to download and install mods in Halo: Master Chief Collection (Halo: MCC) using Steam Workshop and Vortex.',
        image: '/images/blog/article/halo_how_to_mod.png',
        categories: [],
        tags: ['halo', 'modding', 'how-to'],
        kind: 'modding',
    },
    {
        id: -6,
        title: 'How To Set Up A Rust Game Server',
        url: `${CITY_URL}/blog/how-to-set-up-a-rust-server`,
        desc: 'A guide on how to set up a Rust game server.',
        image: '/images/blog/article/rust_how_to_set_up_server.png',
        categories: [],
        tags: ['rust', 'server', 'setup'],
        kind: 'server',
    },
    {
        id: -7,
        title: 'How To Install uMod Onto Rust Servers',
        url: `${CITY_URL}/blog/how-to-install-umod-onto-rust-servers`,
        desc: 'A guide on how to download and install uMod (Oxide) onto a Rust game server for Windows and Linux.',
        image: '/images/blog/article/rust_how_to_install_umod.png',
        categories: [],
        tags: ['rust', 'umod', 'server'],
        kind: 'server',
    },
    {
        id: -8,
        title: 'How To Set Up A Minecraft Java Edition Server',
        url: `${CITY_URL}/blog/how-set-up-a-minecraft-java-edition-server`,
        desc: 'A full guide on how to set up a Minecraft Java Edition server on both Windows and Linux (Debian 12).',
        image: '/images/blog/article/mc_how_to_set_up_server.png',
        categories: [],
        tags: ['minecraft', 'server', 'setup'],
        kind: 'server',
    },
    {
        id: -9,
        title: 'How To Make A L4D2 Server With Mods',
        url: `${CITY_URL}/blog/how-to-make-a-l4d2-server-with-mods`,
        desc: 'A guide on how to create and run a Left 4 Dead 2 server with mods on both Windows and Linux.',
        image: '/images/blog/article/l4d2_how_to_set_up_server.jpg',
        categories: [],
        tags: ['l4d2', 'server', 'mods', 'setup'],
        kind: 'server',
    },
    {
        id: -10,
        title: "How To Make A GMod Server With Mods",
        url: `${CITY_URL}/blog/how-to-make-a-gmod-server-install-mods-addons`,
        desc: "A guide on how to set up a Garry's Mod server and download and install mods (addons) on both Windows and Linux.",
        image: '/images/blog/article/gmod_how_to_set_up_server.png',
        categories: [],
        tags: ['gmod', 'server', 'setup', 'mods'],
        kind: 'server',
    },
]
