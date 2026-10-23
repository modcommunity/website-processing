import { useRef, useState } from 'react'
import { Gamepad2, Globe, Package } from 'lucide-react'

export type Layer = {
    id: 'game' | 'dot' | 'tmc'
    title: string
    tag: string
    body: string
    items: string[]
}

type Props = {
    layers: Layer[]
    /** Short line under the diagram telling people the layers are buttons. */
    hint: string
    label: string
    /** The home-page teaser: the same layers, a smaller panel, no bullet list. */
    compact?: boolean
}

const ICONS = { game: Gamepad2, dot: Package, tmc: Globe } as const

/**
 * The three layers, top to bottom. Selecting one (click, tap, hover or the
 * arrow keys) fills the panel beside it. Plain tabs, so a keyboard and a screen
 * reader get the same thing a mouse does; the only motion is a colour
 * transition, which `motion-reduce` removes.
 */
export default function StackDiagram({ layers, hint, label, compact = false }: Props) {
    const [active, setActive] = useState(1)
    const refs = useRef<(HTMLButtonElement | null)[]>([])
    const layer = layers[active]

    const move = (to: number) => {
        const next = (to + layers.length) % layers.length
        setActive(next)
        refs.current[next]?.focus()
    }

    return (
        <div className="@container min-w-0">
            <div className="grid min-w-0 grid-cols-1 gap-4 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <div role="tablist" aria-label={label} aria-orientation="vertical" className="flex min-w-0 flex-col items-stretch">
                    {layers.map((l, i) => {
                        const Icon = ICONS[l.id]
                        const on = i === active
                        return (
                            <div key={l.id} className="flex flex-col items-stretch">
                                {i > 0 && <span aria-hidden className="mx-auto h-4 w-px bg-gradient-to-b from-border to-accent" />}
                                <button
                                    ref={(el) => { refs.current[i] = el }}
                                    type="button"
                                    role="tab"
                                    id={`stack-tab-${compact ? 'c' : 'f'}-${l.id}`}
                                    aria-selected={on}
                                    aria-controls={`stack-panel-${compact ? 'c' : 'f'}`}
                                    tabIndex={on ? 0 : -1}
                                    onClick={() => setActive(i)}
                                    onMouseEnter={() => setActive(i)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); move(i + 1) }
                                        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); move(i - 1) }
                                        else if (e.key === 'Home') { e.preventDefault(); move(0) }
                                        else if (e.key === 'End') { e.preventDefault(); move(layers.length - 1) }
                                    }}
                                    className={`flex min-w-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                                        on
                                            ? 'border-accent/50 bg-accent/10 shadow-lg shadow-accent/10'
                                            : 'border-border bg-surface hover:border-accent/30'
                                    }`}
                                >
                                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${on ? 'bg-accent/15 text-accent ring-accent/30' : 'bg-surface-secondary text-muted ring-border'}`}>
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block font-semibold text-foreground">{l.title}</span>
                                        <span className="block text-xs text-muted">{l.tag}</span>
                                    </span>
                                </button>
                            </div>
                        )
                    })}
                </div>

                <div
                    role="tabpanel"
                    id={`stack-panel-${compact ? 'c' : 'f'}`}
                    aria-labelledby={`stack-tab-${compact ? 'c' : 'f'}-${layer.id}`}
                    className="min-w-0 rounded-2xl border border-border bg-surface p-5"
                >
                    <h3 className="text-lg font-semibold text-foreground">{layer.title}</h3>
                    <p className="mt-2 text-sm text-muted">{layer.body}</p>
                    {!compact && (
                        <ul className="mt-4 flex flex-col gap-2 text-sm text-foreground">
                            {layer.items.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                    <span className="min-w-0">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted">{hint}</p>
        </div>
    )
}
