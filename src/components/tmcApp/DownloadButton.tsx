import { useEffect, useState } from 'react'
import { Download, ExternalLink } from 'lucide-react'

/**
 * The "Download Now" button.
 *
 * Release files carry the version in their name (TMC_0.2.2_amd64.deb), so there
 * is no fixed /latest/download/<name> URL. On load the island asks GitHub for
 * the latest release once (cached in sessionStorage for ten minutes), matches
 * each build by its extension, and points the button at the one for the
 * visitor's system. Every failure (offline, rate limit, odd response, no JS)
 * leaves the plain link to the releases page, which always works.
 *
 * System rule: Linux gets the .deb, Windows gets the setup .exe, everything
 * else gets the macOS .dmg.
 */

const REPO = 'https://github.com/modcommunity/tmc-app'
const LATEST_PAGE = `${REPO}/releases/latest`
const API = 'https://api.github.com/repos/modcommunity/tmc-app/releases/latest'
const DOWNLOAD_PREFIX = `${REPO}/releases/download/`
const CACHE_KEY = 'tmc-app-latest-release'
const CACHE_MS = 10 * 60 * 1000

type Kind = 'setup' | 'portable' | 'msi' | 'deb' | 'appimage' | 'dmg' | 'checksums'
type Build = { url: string; size: number; name: string }
type Release = { version: string; builds: Partial<Record<Kind, Build>> }
type Os = 'linux' | 'win' | 'mac'

const PATTERNS: [Kind, RegExp][] = [
    ['setup', /-setup\.exe$/i],
    ['portable', /portable\.exe$/i],
    ['msi', /\.msi$/i],
    ['deb', /\.deb$/i],
    ['appimage', /\.appimage$/i],
    ['dmg', /\.dmg$/i],
    ['checksums', /^checksums\.txt$/i],
]
const LIST_ORDER: Kind[] = ['setup', 'portable', 'msi', 'deb', 'appimage', 'dmg', 'checksums']

function parse(json: unknown): Release | null {
    if (!json || typeof json !== 'object') return null
    const j = json as { tag_name?: unknown; assets?: unknown }
    if (typeof j.tag_name !== 'string' || !Array.isArray(j.assets)) return null
    const builds: Release['builds'] = {}
    for (const a of j.assets) {
        if (!a || typeof a !== 'object') continue
        const { name, browser_download_url: url, size } = a as { name?: unknown; browser_download_url?: unknown; size?: unknown }
        // Only ever link to this repository's own release files.
        if (typeof name !== 'string' || typeof url !== 'string' || !url.startsWith(DOWNLOAD_PREFIX)) continue
        const hit = PATTERNS.find(([, re]) => re.test(name))
        if (hit && !builds[hit[0]]) builds[hit[0]] = { url, name, size: typeof size === 'number' ? size : 0 }
    }
    if (!Object.keys(builds).length) return null
    return { version: j.tag_name.replace(/^v/i, ''), builds }
}

async function load(): Promise<Release | null> {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY)
        if (raw) {
            const c = JSON.parse(raw) as { t: number; r: Release }
            if (Date.now() - c.t < CACHE_MS && c.r?.builds) return c.r
        }
    } catch {
        /* storage blocked: fetch anyway */
    }
    try {
        const res = await fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
        if (!res.ok) return null
        const rel = parse(await res.json())
        if (rel) {
            try {
                sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), r: rel }))
            } catch {
                /* ignore */
            }
        }
        return rel
    } catch {
        return null
    }
}

function detectOs(): Os {
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
    const ua = navigator.userAgent || ''
    // Android reports "Linux" and iOS reports "Mac": neither can run these builds.
    if (/android|iphone|ipad|ipod|cros/i.test(ua)) return 'mac'
    const p = `${nav.userAgentData?.platform ?? ''} ${navigator.platform ?? ''} ${ua}`
    if (/win/i.test(p) && !/darwin/i.test(p)) return 'win'
    if (/linux|x11/i.test(p)) return 'linux'
    return 'mac'
}

const PRIMARY: Record<Os, Kind> = { linux: 'deb', win: 'setup', mac: 'dmg' }
const SECONDARY: Record<Os, Kind[]> = { linux: ['appimage'], win: ['portable', 'msi'], mac: [] }

const size = (b: number) => (b ? `${Math.max(1, Math.round(b / 1048576))} MB` : '')

type Props = {
    labels: Record<string, string>
    variant: 'hero' | 'full'
    /** Where the click is reported (umami place). */
    place: string
}

export default function DownloadButton({ labels, variant, place }: Props) {
    const [rel, setRel] = useState<Release | null>(null)
    const [os, setOs] = useState<Os | null>(null)

    useEffect(() => {
        let live = true
        setOs(detectOs())
        load().then((r) => live && setRel(r))
        return () => {
            live = false
        }
    }, [])

    const primaryKind = os ? PRIMARY[os] : null
    const primary = rel && primaryKind ? rel.builds[primaryKind] : undefined
    const href = primary?.url ?? LATEST_PAGE
    const sub = os && primary ? labels[`sub_${primaryKind}`] : labels.subGeneric
    const secondary = os && rel ? SECONDARY[os].map((k) => ({ k, b: rel.builds[k] })).filter((x): x is { k: Kind; b: Build } => !!x.b) : []
    const hero = variant === 'hero'

    return (
        <div className="flex min-w-0 flex-col items-start gap-3">
            <a
                href={href}
                {...(primary ? {} : { target: '_blank', rel: 'noreferrer' })}
                data-umami-event="app_page_cta"
                data-umami-event-to="download"
                data-umami-event-place={place}
                className={`group relative isolate inline-flex max-w-full items-center gap-3 rounded-xl px-6 py-3.5 text-left font-semibold shadow-lg transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${hero ? 'bg-white text-[#05060f] shadow-black/30 hover:bg-white/90' : 'bg-accent text-white shadow-accent/30 hover:bg-accent-hover'}`}
            >
                <span aria-hidden className={`absolute -inset-1 -z-10 rounded-2xl blur-lg motion-safe:animate-pulse ${hero ? 'bg-violet-300/40' : 'bg-accent/40'}`} style={{ animationDuration: '3.6s' }} />
                <Download className="h-6 w-6 shrink-0 transition-transform motion-safe:group-hover:translate-y-0.5" />
                <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-base">{labels.now}</span>
                    <span className="text-xs font-medium opacity-70">
                        {sub}
                        {rel && primary ? ` · ${labels.version.replace('{v}', rel.version)}` : ''}
                    </span>
                </span>
            </a>

            {secondary.length > 0 && (
                <p className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${hero ? 'text-white/70' : 'text-muted'}`}>
                    {secondary.map(({ k, b }) => (
                        <a key={k} href={b.url} className="underline decoration-dotted underline-offset-4 hover:text-accent">
                            {labels[`also_${k}`]}
                        </a>
                    ))}
                    {hero && (
                        <a href="#download" className="underline decoration-dotted underline-offset-4 hover:text-accent">
                            {labels.other}
                        </a>
                    )}
                </p>
            )}
            {hero && secondary.length === 0 && (
                <a href="#download" className="text-sm text-white/70 underline decoration-dotted underline-offset-4 hover:text-white">
                    {labels.other}
                </a>
            )}

            {!hero && (
                <div className="mt-2 w-full min-w-0">
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{labels.otherTitle}</h3>
                    {rel ? (
                        <ul className="grid grid-cols-1 gap-2 @3xl:grid-cols-2">
                            {LIST_ORDER.map((k) => {
                                const b = rel.builds[k]
                                if (!b) return null
                                return (
                                    <li key={k}>
                                        <a href={b.url} className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm transition-colors hover:border-accent/50">
                                            <span className="min-w-0">
                                                <span className="block truncate font-medium text-foreground">{labels[`list_${k}`]}</span>
                                                <span className="block truncate font-mono text-[11px] text-muted">{b.name}</span>
                                            </span>
                                            <span className="shrink-0 text-xs tabular-nums text-muted">{size(b.size)}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <a href={LATEST_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-accent underline decoration-dotted underline-offset-4">
                            {labels.allOnGithub}
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}
