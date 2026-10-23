import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Download, Globe, ListChecks, MousePointerClick, UserCheck } from 'lucide-react'

type Step = { title: string; body: string; source: string }

type Props = {
    steps: Step[]
    label: string
    prev: string
    next: string
    stepOf: string
}

const ICONS = [MousePointerClick, Globe, Download, UserCheck, ListChecks]

/** A step-through of what happens between pressing Play and being on a server. */
export default function PlayFlow({ steps, label, prev, next, stepOf }: Props) {
    const [i, setI] = useState(0)
    const refs = useRef<(HTMLButtonElement | null)[]>([])
    const go = (n: number) => {
        const to = Math.max(0, Math.min(steps.length - 1, n))
        setI(to)
        refs.current[to]?.focus()
    }
    const step = steps[i]
    const Icon = ICONS[i % ICONS.length]

    return (
        <div className="@container flex min-w-0 flex-col gap-6">
            <ol role="tablist" aria-label={label} className="relative flex min-w-0 items-start justify-between gap-1">
                <span aria-hidden className="absolute left-5 right-5 top-5 h-px bg-border" />
                <span
                    aria-hidden
                    className="absolute left-5 top-5 h-px bg-accent transition-[width] duration-500 motion-reduce:transition-none"
                    style={{ width: `calc((100% - 2.5rem) * ${i / (steps.length - 1)})` }}
                />
                {steps.map((s, n) => {
                    const SI = ICONS[n % ICONS.length]
                    const done = n <= i
                    return (
                        <li key={s.title} className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-2">
                            <button
                                ref={(el) => { refs.current[n] = el }}
                                type="button"
                                role="tab"
                                aria-selected={n === i}
                                aria-controls="playflow-panel"
                                tabIndex={n === i ? 0 : -1}
                                onClick={() => setI(n)}
                                onKeyDown={(e) => {
                                    if (e.key === 'ArrowRight') { e.preventDefault(); go(n + 1) }
                                    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(n - 1) }
                                    else if (e.key === 'Home') { e.preventDefault(); go(0) }
                                    else if (e.key === 'End') { e.preventDefault(); go(steps.length - 1) }
                                }}
                                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                                    n === i
                                        ? 'border-accent bg-accent text-white shadow-lg shadow-accent/30'
                                        : done
                                          ? 'border-accent/50 bg-surface text-accent'
                                          : 'border-border bg-surface text-muted'
                                }`}
                            >
                                <SI className="h-4 w-4" />
                                <span className="sr-only">{s.title}</span>
                            </button>
                            <span className={`hidden text-center text-xs @3xl:block ${n === i ? 'text-foreground' : 'text-muted'}`}>{s.title}</span>
                        </li>
                    )
                })}
            </ol>

            <div id="playflow-panel" role="tabpanel" className="min-w-0 rounded-2xl border border-border bg-surface p-5 @3xl:p-7">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                        <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                            {stepOf.replace('{n}', String(i + 1)).replace('{total}', String(steps.length))}
                        </p>
                        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    </div>
                </div>
                <p className="mt-3 text-muted">{step.body}</p>
                <p className="mt-3 text-xs text-muted">{step.source}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className="btn btn-primary disabled:opacity-40">
                        <ArrowLeft className="h-4 w-4" />
                        <span>{prev}</span>
                    </button>
                    <button type="button" onClick={() => go(i + 1)} disabled={i === steps.length - 1} className="btn btn-special disabled:opacity-40">
                        <span>{next}</span>
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
