import { useEffect, useRef, useState } from 'react'
import { useInterval, useMotion } from '../tmcApp/mock/motion'

export type Scenario = { id: string; label: string; command: string; output: string[] }
type Props = { scenarios: Scenario[]; label: string }

/**
 * A terminal that types one real command and prints its output, then moves on
 * to the next scenario. Output shapes are the CLI's own (captured from a run
 * against the test mock). Under reduced motion nothing types or loops: the tab
 * you pick shows its full output at once. Picking a tab stops the autoplay.
 */
const TICK = 28 // ms per step
const LINE_STEPS = 7 // steps between output lines
const HOLD_STEPS = 110 // pause on a finished scenario

export default function TypedTerminal({ scenarios, label }: Props) {
    const motion = useMotion()
    const [idx, setIdx] = useState(0)
    const [step, setStep] = useState(0)
    const [auto, setAuto] = useState(true)
    const [visible, setVisible] = useState(false)
    const root = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = root.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    const sc = scenarios[idx]
    const typingEnd = sc.command.length
    const outStart = typingEnd + 10
    const total = outStart + sc.output.length * LINE_STEPS + HOLD_STEPS
    const playing = motion && visible

    useInterval(
        () => {
            if (step >= total) {
                if (auto) {
                    setIdx((i) => (i + 1) % scenarios.length)
                    setStep(0)
                }
            } else setStep((s) => s + 1)
        },
        TICK,
        playing,
    )

    const typed = playing ? Math.min(step, typingEnd) : typingEnd
    const lines = playing ? Math.max(0, Math.min(sc.output.length, Math.ceil((step - outStart) / LINE_STEPS))) : sc.output.length
    const caret = playing && step < outStart

    const pick = (i: number) => {
        setAuto(false)
        setIdx(i)
        setStep(0)
    }

    return (
        <div ref={root} className="min-w-0 overflow-hidden rounded-xl border border-white/12 bg-[#020a0c]/85 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-white/10 px-4 py-2">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-300/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                <div role="group" aria-label={label} className="ml-2 flex flex-wrap gap-1">
                    {scenarios.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            aria-pressed={i === idx}
                            onClick={() => pick(i)}
                            className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-teal-300 ${
                                i === idx ? 'bg-teal-300/15 text-teal-200' : 'text-white/45 hover:text-white/80'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>
            <pre className="min-h-[15.5rem] overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-white/85">
                <code>
                    <span className="text-teal-300">$ </span>
                    {sc.command.slice(0, typed)}
                    {caret && <span className="ml-px inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] animate-pulse bg-teal-300/80" />}
                    {sc.output.slice(0, lines).map((l, i) => (
                        <span
                            key={i}
                            className={`block ${
                                l.startsWith('error') ? 'text-red-300' : l.startsWith('  →') || /^[─ ]+$/.test(l.trim()) ? 'text-white/40' : ''
                            }`}
                        >
                            {l || ' '}
                        </span>
                    ))}
                </code>
            </pre>
        </div>
    )
}
