import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, ChevronRight, Download, Layers, Pause, Play, Search, Server, Users, Zap } from 'lucide-react'
import { rise, stagger, useEntrance, useInterval } from './motion'

/*
 * Drawings of the app's screens, not screenshots: every name, number and
 * address here is made up, and no game art is used (initials stand in for a
 * game's icon). The layouts follow the real app (tmc-app/src/routes).
 *
 * Every screen takes `motion`. With it false (reduced motion, or before the
 * browser has said) a screen is its settled picture: bars full, lists shown,
 * graphs drawn.
 */

type P = { motion: boolean }

const tone = (ms: number) => (ms < 60 ? 'text-emerald-300' : ms < 110 ? 'text-amber-300' : 'text-rose-300')
const stroke = (ms: number) => (ms < 60 ? '#6ee7b7' : ms < 110 ? '#fcd34d' : '#fda4af')

function Initials({ text, hue, size = 'h-9 w-9' }: { text: string; hue: number; size?: string }) {
    return (
        <span
            className={`flex ${size} shrink-0 items-center justify-center rounded-lg text-[0.65rem] font-bold text-white/90`}
            style={{ background: `linear-gradient(135deg, hsl(${hue} 45% 30%), hsl(${hue + 40} 50% 20%))` }}
        >
            {text}
        </span>
    )
}

/** A latency sparkline. The path draws itself on entrance (stroke-dashoffset). */
export function Spark({ series, drawn, max }: { series: number[]; drawn: boolean; max: number }) {
    const w = 100
    const h = 24
    const lo = Math.min(...series)
    const hi = Math.max(...series, lo + 4)
    const pts = series.map((v, i) => `${((i / (series.length - 1)) * w).toFixed(1)},${(h - 3 - ((v - lo) / (hi - lo)) * (h - 6)).toFixed(1)}`)
    const last = series[series.length - 1]
    return (
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            <path
                d={`M${pts.join(' L')}`}
                pathLength={1}
                fill="none"
                stroke={stroke(last)}
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
                strokeDasharray={1}
                strokeDashoffset={drawn ? 0 : 1}
                style={{ transition: 'stroke-dashoffset 1100ms ease-out' }}
            />
            <title>{max}</title>
        </svg>
    )
}

function wobble(base: number, n: number, seed: number) {
    const out: number[] = []
    let x = seed
    for (let i = 0; i < n; i++) {
        x = (x * 9301 + 49297) % 233280
        out.push(Math.max(4, Math.round(base + (x / 233280 - 0.5) * (base * 0.25 + 4))))
    }
    return out
}

/* ---------------------------------------------------------------- servers */

const SERVERS = [
    { n: 'Example RP #1 | Jobs | Custom', g: 'GM', hue: 210, c: 'United Kingdom', p: 89, max: 128, map: 'rp_downtown', base: 18 },
    { n: 'Night Shift | Hardcore | 2x', g: 'RU', hue: 20, c: 'United States', p: 88, max: 128, map: 'rp_harbor_v2', base: 17 },
    { n: 'Open Lobby EU', g: 'GM', hue: 150, c: 'Germany', p: 82, max: 128, map: 'rp_synapse', base: 15 },
    { n: 'Weekend Wipe Cluster', g: 'MC', hue: 120, c: 'France', p: 77, max: 125, map: 'overworld', base: 116 },
]
const PLAYERS = [
    ['velyx', 1],
    ['Father Fiddle', 0],
    ['Gee', 3],
    ['pff', 4],
    ['MyNeck', 0],
]

export function ServersScreen({ motion }: P) {
    const on = useEntrance(motion)
    const [series, setSeries] = useState(() => SERVERS.map((s, i) => wobble(s.base, 28, 11 + i * 7)))
    const [players, setPlayers] = useState(() => SERVERS.map((s) => s.p))
    const [total, setTotal] = useState(4302)

    useInterval(
        () => {
            setSeries((all) => all.map((s, i) => [...s.slice(1), wobble(SERVERS[i].base, 1, Math.floor(Math.random() * 9000) + 1)[0]]))
            setPlayers((all) => all.map((p, i) => Math.max(1, Math.min(SERVERS[i].max, p + (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.6 ? 1 : 0)))))
            setTotal((t) => t + (Math.random() < 0.5 ? -1 : 2))
        },
        1400,
        motion && on,
    )

    const s0 = series[0]
    const now = s0[s0.length - 1]
    const best = Math.min(...s0)
    const avg = Math.round(s0.reduce((a, b) => a + b, 0) / s0.length)
    const jit = Math.round(s0.reduce((a, v, i) => (i ? a + Math.abs(v - s0[i - 1]) : a), 0) / (s0.length - 1))

    return (
        <div className="flex h-full min-w-0 flex-col">
            <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1.5">
                    <Search className="h-3.5 w-3.5 shrink-0 text-white/35" />
                    <span className="truncate text-[0.7rem] text-white/35">Search servers...</span>
                </div>
                <span className="rounded-full bg-[#4f6bd8] px-2.5 py-1 text-[0.62rem] font-semibold text-white">Servers</span>
                <span className="hidden rounded-full px-2 py-1 text-[0.62rem] text-white/50 @2xl:inline">Maps</span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden px-3 py-2">
                <p className="mb-1.5 text-[0.62rem] tabular-nums text-white/45">{total.toLocaleString('en-US')} servers</p>
                <div className="overflow-hidden rounded-lg border border-white/8">
                    <div className="grid grid-cols-[3rem_minmax(0,1fr)_4rem] gap-2 border-b border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[0.55rem] font-semibold uppercase tracking-wider text-white/40 @2xl:grid-cols-[3rem_minmax(0,1fr)_6rem_4rem_8rem]">
                        <span>Ping</span>
                        <span>Server</span>
                        <span className="hidden @2xl:block">Country</span>
                        <span>Players</span>
                        <span className="hidden @2xl:block">Map</span>
                    </div>
                    {SERVERS.map((s, i) => {
                        const p = series[i][series[i].length - 1]
                        return (
                            <div key={s.n} className={`border-b border-white/6 last:border-0 ${rise(on)}`} style={stagger(i)}>
                                <div className="grid grid-cols-[3rem_minmax(0,1fr)_4rem] items-center gap-2 px-2.5 py-1.5 @2xl:grid-cols-[3rem_minmax(0,1fr)_6rem_4rem_8rem]">
                                    <span className={`flex items-center gap-1 text-[0.68rem] font-semibold tabular-nums ${tone(p)}`}>
                                        {i === 0 ? <ChevronDown className="h-3 w-3 text-white/40" /> : <ChevronRight className="h-3 w-3 text-white/40" />}
                                        {p}ms
                                    </span>
                                    <span className="flex min-w-0 items-center gap-2">
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                        <span className="min-w-0">
                                            <span className="block truncate text-[0.7rem] font-medium text-white/85">{s.n}</span>
                                            <span className="block text-[0.58rem] text-white/40">{s.g === 'GM' ? 'Sandbox game' : s.g === 'RU' ? 'Survival game' : 'Block game'}</span>
                                        </span>
                                    </span>
                                    <span className="hidden truncate text-[0.62rem] text-white/50 @2xl:block">{s.c}</span>
                                    <span className="text-[0.66rem] tabular-nums text-emerald-300">
                                        {players[i]}/{s.max}
                                    </span>
                                    <span className="hidden truncate text-[0.62rem] text-white/50 @2xl:block">{s.map}</span>
                                </div>
                                {i === 0 && (
                                    <div className="grid grid-cols-1 gap-2 px-2.5 pb-2.5 @2xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                                        <div>
                                            <div className="h-9 rounded-md border border-white/8 bg-white/[0.02] px-1">
                                                <Spark series={series[0]} drawn={on} max={now} />
                                            </div>
                                            <div className="mt-1.5 grid grid-cols-4 text-center tabular-nums">
                                                {(
                                                    [
                                                        [now, 'now'],
                                                        [best, 'best'],
                                                        [avg, 'average'],
                                                        [jit, 'jitter'],
                                                    ] as const
                                                ).map(([v, l]) => (
                                                    <span key={l}>
                                                        <span className={`block text-[0.7rem] font-semibold ${l === 'now' ? tone(now) : 'text-white/80'}`}>{v}ms</span>
                                                        <span className="block text-[0.5rem] uppercase tracking-wider text-white/35">{l}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <ul className="hidden divide-y divide-white/6 overflow-hidden rounded-md border border-white/8 text-[0.62rem] text-white/70 @2xl:block">
                                            {PLAYERS.map(([n, sc]) => (
                                                <li key={n} className="flex justify-between px-2 py-1">
                                                    <span>{n}</span>
                                                    <span className="tabular-nums text-white/45">{sc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

/* --------------------------------------------------------------- discover */

const APPS = [
    ['Block Survival', 'Game', 'BS', 1.2, 2.0],
    ['Arena Shooter', 'Game', 'AS', 395, 526],
    ['Zombie Sandbox', 'Game · Unity', 'ZS', 302, 522],
    ['Class Wars', 'Game · Source Engine', 'CW', 188, 429],
    ['Deep Mines', 'Game · Unity', 'DM', 321, 300],
    ['Tactics Source', 'Game · Source Engine', 'TS', 63, 250],
    ['Surf Arcade', 'Game', 'SA', 100, 236],
    ['Old Shooter', 'Game', 'OS', 43, 222],
] as const
const PILLS = ['All', 'Game', 'Singleplayer', 'Engine', 'Voice', 'Other']

export function DiscoverScreen({ motion }: P) {
    const on = useEntrance(motion)
    const [pill, setPill] = useState(0)
    const [bump, setBump] = useState(0)
    useInterval(
        () => {
            setPill((p) => (p + 1) % PILLS.length)
            setBump((b) => b + 1)
        },
        2400,
        motion && on,
    )
    const fmt = (v: number, k: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}m` : `${Math.round(v + (k % 3))}k`)
    return (
        <div className="flex h-full min-w-0 flex-col">
            <div className="flex items-center gap-2 px-3 pt-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1.5">
                    <Search className="h-3.5 w-3.5 shrink-0 text-white/35" />
                    <span className="truncate text-[0.7rem] text-white/35">Search games and apps</span>
                </div>
                <span className="hidden rounded-md border border-white/10 px-2 py-1.5 text-[0.62rem] text-white/70 @xl:block">Players online</span>
            </div>
            <div className="flex gap-1.5 overflow-hidden px-3 py-2">
                {PILLS.map((p, i) => (
                    <span
                        key={p}
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[0.62rem] transition-colors duration-300 ${i === pill ? 'border-[#6f8cff] bg-[#4f6bd8]/25 text-white' : 'border-white/10 text-white/55'}`}
                    >
                        {p}
                    </span>
                ))}
                <span className="hidden shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-[0.62rem] text-white/55 @3xl:block">Playable</span>
                <span className="hidden shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-[0.62rem] text-white/55 @3xl:block">Moddable here</span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-hidden px-3 pb-2 @3xl:grid-cols-4">
                {APPS.map(([name, kind, ini, srv, pl], i) => (
                    <div key={name} className={`rounded-lg border border-white/8 bg-white/[0.025] p-2 ${rise(on)} ${i > 3 ? 'hidden @3xl:block' : ''}`} style={stagger(i)}>
                        <div className="flex items-center gap-2">
                            <Initials text={ini} hue={(i * 47) % 360} />
                            <span className="min-w-0">
                                <span className="block truncate text-[0.68rem] font-semibold text-white/90">{name}</span>
                                <span className="block truncate text-[0.56rem] text-white/40">{kind}</span>
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[0.58rem] tabular-nums text-white/50">
                            <span className="flex items-center gap-1">
                                <Server className="h-3 w-3" />
                                {fmt(srv, i)}
                            </span>
                            <span className="flex items-center gap-1" key={bump % (i + 2) === 0 ? bump : 'x'}>
                                <Users className="h-3 w-3" />
                                {fmt(pl, i + bump * (i % 2))}
                            </span>
                        </div>
                        <div className="mt-2 flex gap-1">
                            {i % 3 === 1 && <span className="rounded border border-white/12 px-1.5 py-0.5 text-[0.55rem] text-white/70">Mods</span>}
                            <span className="rounded border border-white/12 px-1.5 py-0.5 text-[0.55rem] text-white/70">Servers</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------- play */

const GAMES = [
    ['Arena', 'AR', 'Fast first-person deathmatch.'],
    ['Dangerous Delivery', 'DD', 'Deliveries in awful weather.'],
    ['Hide N Seek', 'HN', 'Hide from the seekers.'],
    ['Hungario', 'HU', 'Eat to grow, outlast everyone.'],
    ['Look At Me!', 'LA', 'Finish levels, avoid the witches.'],
    ['Playground', 'PL', 'A physics sandbox with surf maps.'],
] as const

export function PlayScreen({ motion }: P) {
    const on = useEntrance(motion)
    const [playing, setPlaying] = useState(3)
    useInterval(() => setPlaying((p) => Math.max(0, p + (Math.random() < 0.55 ? 1 : -1))), 1800, motion && on)
    return (
        <div className="flex h-full min-w-0 flex-col">
            <div className="flex items-start justify-between gap-3 px-3 pt-2">
                <div>
                    <p className="text-sm font-bold text-white">Play</p>
                    <p className="hidden text-[0.6rem] text-white/45 @xl:block">Jump into a game, pick a server, or let quick play choose.</p>
                </div>
                <div className="flex gap-3 text-[0.55rem] text-white/45">
                    {[
                        ['15', 'games'],
                        ['12', 'servers'],
                        [String(playing), 'playing'],
                    ].map(([v, l]) => (
                        <span key={l} className="text-center tabular-nums">
                            <span className="block text-[0.8rem] font-bold text-white">{v}</span>
                            {l}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-2 flex gap-4 border-b border-white/8 px-3 text-[0.65rem] text-white/55">
                {['Games', 'Servers', 'Lobbies', 'Invites'].map((t, i) => (
                    <span key={t} className={`pb-1.5 ${i === 0 ? 'border-b-2 border-[#6f8cff] text-white' : ''}`}>
                        {t}
                    </span>
                ))}
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-hidden p-3 @3xl:grid-cols-3">
                {GAMES.map(([name, ini, blurb], i) => (
                    <div key={name} className={`rounded-lg border border-white/8 bg-white/[0.025] p-2.5 ${rise(on)} ${i > 3 ? 'hidden @3xl:block' : ''}`} style={stagger(i)}>
                        <div className="flex items-center gap-2">
                            <Initials text={ini} hue={(i * 61 + 200) % 360} />
                            <span className="min-w-0">
                                <span className="block truncate text-[0.68rem] font-semibold text-white/90">{name}</span>
                                <span className="block text-[0.55rem] text-white/40">1 server</span>
                            </span>
                        </div>
                        <p className="mt-1.5 hidden truncate text-[0.58rem] text-white/45 @xl:block">{blurb}</p>
                        <div className="mt-1.5 flex gap-1 text-[0.5rem] text-white/50">
                            <span className="rounded border border-white/10 px-1 py-px">In a window</span>
                            <span className="rounded border border-white/10 px-1 py-px">Installed game</span>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                            <span className={`flex items-center gap-1 rounded bg-[#4f6bd8] px-2 py-1 text-[0.58rem] font-semibold text-white ${motion ? 'animate-pulse' : ''}`} style={{ animationDuration: '2.6s', animationDelay: `${i * 300}ms` }}>
                                <Zap className="h-3 w-3" />
                                Quick play
                            </span>
                            <span className="flex items-center gap-1 rounded border border-white/12 px-2 py-1 text-[0.58rem] text-white/75">
                                <Play className="h-3 w-3" />
                                Play solo
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* -------------------------------------------------------------- sandboxes */

const BOXES = [
    ['Main run', 'Example Game', 'Hard link'],
    ['Vanilla plus', 'Example Game', 'Symlink'],
    ['Co-op night', 'Other Game', 'Copy'],
]
const MODS = [
    ['Better Lighting', 'v2.0', true],
    ['Extra Weapons', 'v0.9', true],
    ['Map Pack', 'v1.4', true],
    ['UI Tweaks', 'v3.1', false],
] as const

export function SandboxesScreen({ motion }: P) {
    const on = useEntrance(motion)
    const [flip, setFlip] = useState(0)
    useInterval(() => setFlip((f) => f + 1), 1800, motion && on)
    return (
        <div className="grid h-full min-w-0 grid-cols-1 gap-3 p-3 @2xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-white">Sandboxes</p>
                {BOXES.map(([n, g, s], i) => (
                    <div key={n} className={`flex items-center gap-2 rounded-lg border p-2 ${i === 0 ? 'border-[#6f8cff]/60 bg-[#4f6bd8]/10' : 'border-white/8 bg-white/[0.025]'} ${rise(on)} ${i > 1 ? 'hidden @2xl:flex' : ''}`} style={stagger(i)}>
                        <Layers className="h-4 w-4 shrink-0 text-white/50" />
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.7rem] font-semibold text-white/90">{n}</span>
                            <span className="block truncate text-[0.56rem] text-white/40">{g}</span>
                        </span>
                        <span className="rounded border border-white/12 px-1.5 py-0.5 text-[0.55rem] text-white/65">{s}</span>
                    </div>
                ))}
            </div>
            <div className="min-w-0">
                <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-wider text-white/40">Load order</p>
                <ul className="divide-y divide-white/6 overflow-hidden rounded-lg border border-white/8">
                    {MODS.map(([n, v, def], i) => {
                        const enabled = i === 3 ? flip % 2 === 1 || (!motion && def) : def
                        return (
                            <li key={n} className={`flex items-center gap-2 px-2.5 py-1.5 ${rise(on)}`} style={stagger(i + 2)}>
                                <span className="w-3 text-[0.58rem] tabular-nums text-white/35">{i + 1}</span>
                                <span className="min-w-0 flex-1 truncate text-[0.68rem] text-white/85">{n}</span>
                                <span className="text-[0.56rem] text-white/40">{v}</span>
                                {i === 1 && <span className="rounded bg-amber-300/15 px-1 text-[0.5rem] text-amber-200">overrides 3 files</span>}
                                <span className={`relative h-3.5 w-6 shrink-0 rounded-full transition-colors duration-300 ${enabled ? 'bg-[#4f6bd8]' : 'bg-white/15'}`}>
                                    <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all duration-300 ${enabled ? 'left-3' : 'left-0.5'}`} />
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <p className="mt-2 text-[0.58rem] text-white/40">Deployed by hard link. The game folder is untouched until you deploy.</p>
            </div>
        </div>
    )
}

/* -------------------------------------------------------------- downloads */

const DLS = [
    ['Map Pack 1.4', '212 MB', 0.62, 2.4],
    ['Better Lighting 2.0', '38 MB', 0.3, 1.2],
    ['Extra Weapons 0.9', '96 MB', 0.1, 0.7],
    ['Example Game build', '1.1 GB', 0.45, 0],
] as const

export function DownloadsScreen({ motion }: P) {
    const on = useEntrance(motion)
    const [prog, setProg] = useState<number[]>(() => DLS.map((d) => d[2]))
    useInterval(() => setProg((p) => p.map((v, i) => (DLS[i][3] === 0 ? v : v >= 1 ? 0.04 : Math.min(1, v + 0.012 * DLS[i][3])))), 350, motion && on)
    return (
        <div className="flex h-full min-w-0 flex-col gap-2 p-3">
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-white">Downloads</p>
                <span className="rounded border border-white/12 px-2 py-0.5 text-[0.58rem] text-white/60">Limit 20 MB/s</span>
            </div>
            <ul className="flex flex-col gap-1.5">
                {DLS.map(([n, size, , speed], i) => {
                    const v = prog[i]
                    const paused = speed === 0
                    return (
                        <li key={n} className={`rounded-lg border border-white/8 bg-white/[0.025] px-2.5 py-2 ${rise(on)}`} style={stagger(i)}>
                            <div className="flex items-center gap-2 text-[0.68rem]">
                                <Download className="h-3.5 w-3.5 shrink-0 text-white/45" />
                                <span className="min-w-0 flex-1 truncate text-white/85">{n}</span>
                                <span className="hidden text-[0.56rem] tabular-nums text-white/40 @xl:block">
                                    {paused ? 'Paused' : `${(speed * (0.9 + (v % 0.2))).toFixed(1)} MB/s`} · {size}
                                </span>
                                {paused ? <Pause className="h-3.5 w-3.5 text-white/50" /> : v >= 0.99 ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <span className="w-8 text-right text-[0.58rem] tabular-nums text-white/60">{Math.round(v * 100)}%</span>}
                            </div>
                            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                                <div className={`h-full rounded-full ${paused ? 'bg-white/30' : 'bg-[#6f8cff]'}`} style={{ width: `${on ? v * 100 : 0}%`, transition: 'width 350ms linear' }} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

/* ------------------------------------------------------------------- rcon */

const RCON: [string, string[]][] = [
    ['status', ['hostname: Example Server', 'map     : example_map', 'players : 12 humans, 0 bots (24 max)']],
    ['say Restart in 5 minutes', ['Message sent']],
    ['changelevel example_map2', ['Changing map']],
]

export function RconScreen({ motion }: P) {
    const on = useEntrance(motion)
    const total = RCON.reduce((a, [c, o]) => a + c.length + o.length, 0)
    const [n, setN] = useState(motion ? 0 : total)
    useEffect(() => {
        if (!motion) {
            setN(total)
            return
        }
        setN(0)
    }, [motion, total])
    useInterval(() => setN((x) => (x > total + 14 ? 0 : x + 1)), 90, motion && on)
    // Walk the script: `left` characters of command, then the output lines as units of 1 each.
    const lines = useMemo(() => {
        const out: { kind: 'cmd' | 'out'; text: string }[] = []
        let left = n
        for (const [cmd, res] of RCON) {
            if (left <= 0) break
            out.push({ kind: 'cmd', text: cmd.slice(0, left) })
            left -= cmd.length
            if (left <= 0) break
            for (const r of res) {
                if (left <= 0) break
                out.push({ kind: 'out', text: r })
                left -= 1 + r.length / 4
            }
        }
        return out
    }, [n])
    const done = n >= total
    return (
        <div className="flex h-full min-w-0 flex-col gap-2 p-3">
            <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-white">RCON</p>
                <span className="ml-auto flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[0.6rem] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Example Server · 192.0.2.10:27015
                </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-white/8 bg-black/40 p-2.5 font-mono text-[0.62rem] leading-relaxed text-white/80">
                {lines.map((l, i) => (
                    <p key={i} className={`truncate ${l.kind === 'cmd' ? 'text-emerald-300' : 'text-white/60'}`}>
                        {l.kind === 'cmd' ? '> ' : '  '}
                        {l.text}
                        {motion && i === lines.length - 1 && !done && <span className="ml-px inline-block h-3 w-1.5 translate-y-0.5 bg-white/70" />}
                    </p>
                ))}
            </div>
            <p className="rounded-md border border-white/8 px-2.5 py-1.5 font-mono text-[0.6rem] text-white/35">Type a command. Up and down walk the history.</p>
        </div>
    )
}
