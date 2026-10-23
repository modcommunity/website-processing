import { useEffect, useId, useRef, useState } from 'react'

/*
 * An example, not a screenshot: a stylised game view with a dot-workbench style
 * panel beside it. Field names and defaults are the real `leaper` profile of
 * game-zombie-zone (cfg/game/game-zombie-zone/npc/leaper.yml): health 250,
 * speed 7.4, sight 60, los false, extra.height 1.6. The panel layout follows
 * dot-workbench's in-game screen (profile list, a title, "N settings, M differ
 * from default", slider + number rows, per-row Reset, an applied status).
 */

export type Labels = {
    exTag: string
    exTitle: string
    note: string
    view: string
    hud: string
    panel: string
    kind: string
    savesTo: string
    savesTarget: string
    applied: string
    summary: string
    reset: string
    resetAll: string
    los: string
    on: string
    off: string
    profiles: string
}

type Props = { labels: Labels }

type Vals = { health: number; speed: number; sight: number; height: number; los: boolean }

const DEFAULTS: Vals = { health: 250, speed: 7.4, sight: 60, height: 1.6, los: false }
const START: Vals = { ...DEFAULTS, health: 180, speed: 4.5 }

const FIELDS = [
    { key: 'health', min: 1, max: 500, step: 1 },
    { key: 'speed', min: 0, max: 12, step: 0.1 },
    { key: 'sight', min: 0, max: 80, step: 1 },
    { key: 'height', min: 0.8, max: 3, step: 0.05 },
] as const

const PROFILES = ['crawler', 'leaper', 'spitter']

// Patrol segment, ground line and the pillar that blocks sight when `los` is on.
const X0 = 70
const X1 = 200
const GROUND = 198
const PILLAR_X = 262
const CONE_PX = 2.4

function fmt(v: number, step: number) {
    return step >= 1 ? String(Math.round(v)) : v.toFixed(step < 0.1 ? 2 : 1)
}

export default function WorkbenchDemo({ labels }: Props) {
    const uid = useId().replace(/:/g, '')
    const [v, setV] = useState<Vals>(START)
    const [flash, setFlash] = useState(0)
    const vRef = useRef(v)
    vRef.current = v

    const flip = useRef<SVGGElement>(null)
    const pos = useRef<SVGGElement>(null)
    const hud = useRef<SVGGElement>(null)
    const legA = useRef<SVGGElement>(null)
    const legB = useRef<SVGGElement>(null)
    const armA = useRef<SVGGElement>(null)
    const armB = useRef<SVGGElement>(null)
    const cone = useRef<SVGPolygonElement>(null)
    const bob = useRef<SVGGElement>(null)

    const set = <K extends keyof Vals>(k: K, val: Vals[K]) => {
        setV((p) => ({ ...p, [k]: val }))
        setFlash((n) => n + 1)
    }

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let x = X0 + 30
        let dir = 1
        let phase = 0
        let last = performance.now()
        let raf = 0

        const draw = () => {
            const s = vRef.current
            pos.current?.setAttribute('transform', `translate(${x} ${GROUND})`)
            hud.current?.setAttribute('transform', `translate(${x} ${GROUND})`)
            flip.current?.setAttribute('transform', `scale(${dir} 1)`)
            const sw = Math.sin(phase) * 26
            legA.current?.setAttribute('transform', `rotate(${sw} 0 -22)`)
            legB.current?.setAttribute('transform', `rotate(${-sw} 0 -22)`)
            armA.current?.setAttribute('transform', `rotate(${-sw * 0.6} 6 -40)`)
            armB.current?.setAttribute('transform', `rotate(${sw * 0.6} 6 -40)`)
            bob.current?.setAttribute('transform', `translate(0 ${-Math.abs(Math.cos(phase)) * 2.5})`)
            // Sight cone on the floor; with line of sight on, the pillar stops it.
            let len = s.sight * CONE_PX
            if (s.los) {
                const d = (PILLAR_X - 14 - x) * dir
                if (d > 0 && d < len) len = d
            }
            const w = len * 0.42
            cone.current?.setAttribute('points', `0,0 ${len},${-w * 0.3} ${len},${w * 0.3}`)
        }

        const tick = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            const sp = vRef.current.speed
            const px = sp * 9
            x += dir * px * dt
            if (x > X1) { x = X1; dir = -1 }
            if (x < X0) { x = X0; dir = 1 }
            phase += dt * (2 + sp * 1.4)
            draw()
            raf = requestAnimationFrame(tick)
        }

        draw()
        if (!reduce) raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    // Redraw the static pose when motion is off and a value changes.
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const s = v
            let len = s.sight * CONE_PX
            if (s.los) len = Math.min(len, PILLAR_X - 14 - (X0 + 30))
            cone.current?.setAttribute('points', `0,0 ${len},${-len * 0.126} ${len},${len * 0.126}`)
        }
    }, [v])

    const differ = (Object.keys(DEFAULTS) as (keyof Vals)[]).filter((k) => v[k] !== DEFAULTS[k]).length
    const scale = v.height / 1.6
    const hp = Math.max(0, Math.min(1, v.health / 500))
    const barW = 46
    const barY = -(68 * scale) - 14

    return (
        <figure className="@container flex min-w-0 flex-col gap-3">
            <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {labels.exTag}
                </span>
                <span className="text-sm font-medium text-foreground">{labels.exTitle}</span>
            </figcaption>

            <div className="grid min-w-0 grid-cols-1 gap-4 @3xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                {/* Game view */}
                <div
                    role="img"
                    aria-label={labels.view}
                    className="relative min-w-0 overflow-hidden rounded-2xl border border-border bg-[#0b0d12]"
                >
                    <svg viewBox="0 0 400 260" className="block h-auto w-full" aria-hidden="true">
                        <defs>
                            <linearGradient id={`${uid}sky`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#0a0c14" />
                                <stop offset="1" stopColor="#1b2133" />
                            </linearGradient>
                            <linearGradient id={`${uid}floor`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#181d2b" />
                                <stop offset="1" stopColor="#0d1018" />
                            </linearGradient>
                            <linearGradient id={`${uid}cone`} x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0" stopColor="#f5b942" stopOpacity="0.55" />
                                <stop offset="1" stopColor="#f5b942" stopOpacity="0.05" />
                            </linearGradient>
                            <radialGradient id={`${uid}glow`} cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0" stopColor="#000" stopOpacity="0.55" />
                                <stop offset="1" stopColor="#000" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="400" height="260" fill={`url(#${uid}sky)`} />
                        {/* far wall */}
                        <rect x="0" y="62" width="400" height="38" fill="#141929" />
                        {[40, 110, 180, 250, 320, 390].map((wx) => (
                            <rect key={wx} x={wx - 14} y="70" width="28" height="30" rx="2" fill="#0d1120" />
                        ))}
                        {/* floor with a perspective grid */}
                        <rect x="0" y="100" width="400" height="160" fill={`url(#${uid}floor)`} />
                        <g stroke="#2a3350" strokeWidth="1" opacity="0.8">
                            {[130, 150, 176, 210, 256].map((gy) => (
                                <line key={gy} x1="0" y1={gy} x2="400" y2={gy} />
                            ))}
                            {Array.from({ length: 15 }, (_, i) => -300 + i * 70).map((bx) => (
                                <line key={bx} x1={200 + (bx - 200) * 0.18} y1="100" x2={bx + 100} y2="260" />
                            ))}
                        </g>
                        {/* pillar */}
                        <g>
                            <ellipse cx={PILLAR_X} cy={GROUND + 3} rx="22" ry="5" fill={`url(#${uid}glow)`} />
                            <rect x={PILLAR_X - 14} y={GROUND - 62} width="28" height="62" fill="#252c42" />
                            <rect x={PILLAR_X - 14} y={GROUND - 62} width="9" height="62" fill="#323b57" />
                        </g>

                        {/* monster */}
                        <g ref={pos}>
                            <ellipse cx="0" cy="2" rx={26 * scale} ry="5" fill={`url(#${uid}glow)`} />
                            <g ref={flip}>
                                <polygon ref={cone} fill={`url(#${uid}cone)`} points="0,0 0,0 0,0" />
                                <g transform={`scale(${scale})`}>
                                    <g ref={bob}>
                                        {/* back limbs */}
                                        <g ref={legB}>
                                            <path d="M-2 -24 L-8 -12 L-4 0 L4 0" fill="none" stroke="#2e4a35" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <g ref={armB}>
                                            <path d="M8 -42 L22 -34 L30 -38" fill="none" stroke="#2e4a35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        {/* torso, hunched forward */}
                                        <path d="M-12 -24 C-16 -44 -4 -58 10 -54 C22 -50 22 -36 14 -26 C8 -20 -8 -18 -12 -24 Z" fill="#4c7a58" />
                                        <path d="M-6 -50 L-10 -58 M0 -54 L-2 -63 M6 -55 L8 -63" stroke="#2e4a35" strokeWidth="3" strokeLinecap="round" />
                                        {/* head */}
                                        <circle cx="18" cy="-56" r="9" fill="#5e9069" />
                                        <path d="M14 -50 Q22 -46 27 -52" fill="none" stroke="#1f3326" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="22" cy="-59" r="2.6" fill="#ffd25a" />
                                        <circle cx="22.6" cy="-59" r="1" fill="#2a1a00" />
                                        {/* front limbs */}
                                        <g ref={legA}>
                                            <path d="M2 -24 L-2 -12 L4 0 L12 0" fill="none" stroke="#3c6347" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <g ref={armA}>
                                            <path d="M10 -42 L24 -32 L34 -35" fill="none" stroke="#3c6347" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M34 -35 l6 -3 M34 -35 l6 0 M34 -35 l5 4" stroke="#e8e0c8" strokeWidth="1.6" strokeLinecap="round" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>

                        {/* health bar and name over the head (never flips) */}
                        <g ref={hud}>
                            <g transform={`translate(0 ${barY})`}>
                                <rect x={-barW / 2} y="0" width={barW} height="5" rx="2.5" fill="#05070b" stroke="#3a4260" strokeWidth="0.8" />
                                <rect x={-barW / 2} y="0" width={barW * hp} height="5" rx="2.5" fill={hp > 0.4 ? '#5fd37f' : '#e5584a'} />
                                <text x="0" y="-4" textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill="#c9d1e6">leaper</text>
                            </g>
                        </g>
                    </svg>
                    <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white/80 ring-1 ring-white/10">
                        {labels.hud}
                    </div>
                </div>

                {/* Panel */}
                <div
                    role="group"
                    aria-label={labels.panel}
                    className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface [color-scheme:dark]"
                >
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border px-4 py-2.5 text-xs text-muted">
                        <span>
                            {labels.kind} <code className="text-foreground">npc</code>
                        </span>
                        <span className="flex items-center gap-1.5 text-success" aria-live="polite">
                            <span key={flash} className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                            </span>
                            {labels.applied}
                        </span>
                    </div>

                    <div className="grid min-w-0 grid-cols-1 @sm:grid-cols-[auto_minmax(0,1fr)]">
                        <ul aria-label={labels.profiles} className="flex gap-1 overflow-x-auto border-b border-border p-2 @sm:flex-col @sm:border-b-0 @sm:border-r">
                            {PROFILES.map((id) => (
                                <li
                                    key={id}
                                    aria-current={id === 'leaper' ? 'true' : undefined}
                                    className={`rounded-lg px-3 py-1.5 font-mono text-xs ${id === 'leaper' ? 'bg-accent text-accent-foreground' : 'text-muted'}`}
                                >
                                    {id}
                                </li>
                            ))}
                        </ul>

                        <div className="flex min-w-0 flex-col gap-3 p-4">
                            <div>
                                <p className="text-base font-semibold text-foreground">Leaper</p>
                                <p className="text-xs text-muted">{labels.summary.replace('{n}', '5').replace('{m}', String(differ))}</p>
                            </div>

                            {FIELDS.map((f) => {
                                const id = `${uid}-${f.key}`
                                const val = v[f.key]
                                const changed = val !== DEFAULTS[f.key]
                                return (
                                    <div key={f.key} className="flex min-w-0 flex-col gap-1.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <label htmlFor={id} className="font-mono text-xs text-foreground">
                                                {changed && <span className="mr-1.5 inline-block h-3 w-0.5 translate-y-0.5 bg-accent" aria-hidden="true" />}
                                                {f.key}
                                            </label>
                                            <button
                                                type="button"
                                                disabled={!changed}
                                                onClick={() => set(f.key, DEFAULTS[f.key])}
                                                className="rounded px-1.5 text-xs text-accent hover:underline disabled:invisible focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                            >
                                                {labels.reset}
                                                <span className="sr-only"> {f.key}</span>
                                            </button>
                                        </div>
                                        <div className="flex min-w-0 items-center gap-3">
                                            <input
                                                id={id}
                                                type="range"
                                                min={f.min}
                                                max={f.max}
                                                step={f.step}
                                                value={val}
                                                onChange={(e) => set(f.key, Number(e.target.value))}
                                                className="h-2 min-w-0 flex-1 accent-[var(--accent)]"
                                            />
                                            <input
                                                type="number"
                                                aria-label={f.key}
                                                min={f.min}
                                                max={f.max}
                                                step={f.step}
                                                value={fmt(val, f.step)}
                                                onChange={(e) => {
                                                    const n = Number(e.target.value)
                                                    if (Number.isFinite(n)) set(f.key, Math.min(f.max, Math.max(f.min, n)))
                                                }}
                                                className="w-20 shrink-0 rounded-lg border border-border bg-surface-secondary px-2 py-1 text-right font-mono text-xs text-foreground"
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="flex items-center justify-between gap-2">
                                <label htmlFor={`${uid}-los`} className="font-mono text-xs text-foreground">
                                    {v.los !== DEFAULTS.los && <span className="mr-1.5 inline-block h-3 w-0.5 translate-y-0.5 bg-accent" aria-hidden="true" />}
                                    los
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
                                    <input
                                        id={`${uid}-los`}
                                        type="checkbox"
                                        role="switch"
                                        checked={v.los}
                                        onChange={(e) => set('los', e.target.checked)}
                                        className="h-4 w-4 accent-[var(--accent)]"
                                    />
                                    {v.los ? labels.on : labels.off}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-2.5 text-xs">
                        <span className="text-muted">
                            {labels.savesTo} <span className="text-foreground">{labels.savesTarget}</span>
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setV(DEFAULTS)
                                setFlash((n) => n + 1)
                            }}
                            className="rounded px-1.5 text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            {labels.resetAll}
                        </button>
                    </div>
                </div>
            </div>

            <p className="max-w-3xl text-xs text-muted [&_code]:text-foreground">{labels.note}</p>
        </figure>
    )
}
