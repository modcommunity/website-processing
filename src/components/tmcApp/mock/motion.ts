import { useEffect, useRef, useState } from 'react'

/**
 * True once the browser has said motion is fine. It starts false, on the server
 * and for the first client render, so the markup that is served is the settled
 * picture. Under `prefers-reduced-motion: reduce` it stays false and nothing
 * on the page ticks, slides or loops.
 */
export function useMotion(): boolean {
    const [ok, setOk] = useState(false)
    useEffect(() => {
        const m = window.matchMedia('(prefers-reduced-motion: no-preference)')
        setOk(m.matches)
        const on = () => setOk(m.matches)
        m.addEventListener('change', on)
        return () => m.removeEventListener('change', on)
    }, [])
    return ok
}

/**
 * An entrance flag for a freshly mounted block: false for one frame, then true,
 * so items given `transition` classes slide and fade in. With motion off it is
 * true from the start.
 */
export function useEntrance(motion: boolean, delay = 40): boolean {
    const [on, setOn] = useState(!motion)
    const first = useRef(true)
    useEffect(() => {
        if (!motion) {
            setOn(true)
            return
        }
        if (first.current) first.current = false
        setOn(false)
        const id = window.setTimeout(() => setOn(true), delay)
        return () => window.clearTimeout(id)
    }, [motion, delay])
    return on
}

/** Calls `fn` every `ms` while `active`. */
export function useInterval(fn: () => void, ms: number, active: boolean) {
    const saved = useRef(fn)
    saved.current = fn
    useEffect(() => {
        if (!active) return
        const id = window.setInterval(() => saved.current(), ms)
        return () => window.clearInterval(id)
    }, [ms, active])
}

/** Staggered entrance classes for item `i`; pair with `style={stagger(i)}`. */
export const rise = (on: boolean) =>
    `transition-all duration-500 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`

export const stagger = (i: number) => ({ transitionDelay: `${i * 70}ms` })
