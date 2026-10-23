import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { LayoutGrid, Layers, Download, Play, Server, SquareTerminal } from 'lucide-react'
import AppWindow from './mock/AppWindow'
import type { ScreenId } from './mock/AppWindow'
import { useInterval, useMotion } from './mock/motion'

export type TourTab = { id: ScreenId; label: string; title: string; bodyHtml: string }
type Props = { tabs: TourTab[]; label: string; caption: string }

const ICONS = { apps: LayoutGrid, play: Play, servers: Server, sandboxes: Layers, downloads: Download, rcon: SquareTerminal }

/**
 * The tabbed tour. A real tablist (arrow keys, Home/End, roving tabindex); the
 * window beside it swaps screens. It steps through the tabs by itself while it
 * is on screen, until the reader touches it or hovers it, and never at all under
 * reduced motion.
 */
export default function Tour({ tabs, label, caption }: Props) {
    const motion = useMotion()
    const [idx, setIdx] = useState(0)
    const [auto, setAuto] = useState(true)
    const [visible, setVisible] = useState(false)
    const [hover, setHover] = useState(false)
    const root = useRef<HTMLDivElement>(null)
    const btns = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const el = root.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    useInterval(() => setIdx((i) => (i + 1) % tabs.length), 7000, motion && auto && visible && !hover)

    const pick = (i: number, focus = false) => {
        setAuto(false)
        setIdx(i)
        if (focus) btns.current[i]?.focus()
    }
    const onKey = (e: KeyboardEvent, i: number) => {
        const n = tabs.length
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') pick((i + 1) % n, true)
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') pick((i + n - 1) % n, true)
        else if (e.key === 'Home') pick(0, true)
        else if (e.key === 'End') pick(n - 1, true)
        else return
        e.preventDefault()
    }

    const tab = tabs[idx]
    return (
        <div
            ref={root}
            className="@container grid min-w-0 grid-cols-1 gap-6 @5xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] @5xl:items-start"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex min-w-0 flex-col gap-4">
                <div role="tablist" aria-label={label} className="flex min-w-0 gap-2 overflow-x-auto pb-1 @5xl:flex-col @5xl:overflow-visible">
                    {tabs.map((t, i) => {
                        const Icon = ICONS[t.id]
                        const on = i === idx
                        return (
                            <button
                                key={t.id}
                                ref={(el) => {
                                    btns.current[i] = el
                                }}
                                role="tab"
                                id={`tour-tab-${t.id}`}
                                aria-selected={on}
                                aria-controls="tour-panel"
                                tabIndex={on ? 0 : -1}
                                onClick={() => pick(i)}
                                onKeyDown={(e) => onKey(e, i)}
                                className={`relative flex shrink-0 items-center gap-2 overflow-hidden rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${on ? 'border-accent/50 bg-accent/10 text-foreground' : 'border-border bg-surface text-muted hover:text-foreground'}`}
                            >
                                <Icon className={`h-4 w-4 ${on ? 'text-accent' : ''}`} />
                                {t.label}
                                {on && motion && auto && visible && !hover && (
                                    <span key={`${tab.id}`} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" style={{ animation: 'tour-bar 7s linear forwards' }} />
                                )}
                            </button>
                        )
                    })}
                </div>
                <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${tab.id}`} aria-live="polite" className="min-w-0 rounded-xl border border-border bg-surface p-5">
                    <h3 className="text-lg font-bold text-foreground">{tab.title}</h3>
                    <p className="mt-2 text-sm text-muted [&_.special]:text-accent" dangerouslySetInnerHTML={{ __html: tab.bodyHtml }} />
                </div>
            </div>
            <div className="min-w-0">
                <AppWindow screens={tabs.map((t) => t.id)} active={tab.id} caption={caption} />
            </div>
            <style>{'@keyframes tour-bar{from{transform:scaleX(0)}to{transform:scaleX(1)}}'}</style>
        </div>
    )
}
