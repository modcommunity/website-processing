import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { getT } from '../i18n/t'

/**
 * How close to the bottom of the document counts as "at the end", in pixels.
 *
 * Measured from the bottom of the viewport, so it is a distance still to travel
 * rather than a scroll offset — it means the same thing on the short legal
 * pages and on the long landing page.
 */
const NEAR_END_PX = 320

/**
 * The floating "back to top" button, bottom-centre, on every page.
 *
 * The twin of website-city's `BackToTop` (`src/app/_components/lib/
 * back_to_top.tsx`) — the two shells sit on the same domain, so a reader who
 * walks from a landing page into the site must not find the same control in a
 * different place, or behaving differently. Keep them in step.
 *
 * It appears only once the reader is near the END of the page, which is the
 * moment the walk back up stops being a flick of the wheel and starts being a
 * job. Showing it from the first pixel of scroll — the usual implementation —
 * puts a permanent widget over the page for the entire read to save a gesture
 * nobody wanted saved yet.
 *
 * Two conditions, both required:
 *
 *  1. **A screenful has actually been scrolled.** Without this the button is
 *     permanently visible on every page shorter than the viewport, because a
 *     page that cannot scroll is, trivially, always "at the end".
 *  2. **The bottom is within {@link NEAR_END_PX}.**
 *
 * The element stays mounted so both the fade in and the fade out are animated,
 * which means it is invisible-but-present while hidden: `pointer-events-none`,
 * `aria-hidden` and `tabIndex={-1}` together keep it out of the way of both the
 * pointer and the tab order, rather than leaving an armed control floating over
 * the page's own content.
 */
export default function BackToTop({ locale = 'en' }: { locale?: string }) {
    const t = getT(locale)

    const [shown, setShown] = useState(false)

    useEffect(() => {
        // rAF-coalesced: scroll fires far faster than the page paints, and this
        // handler reads layout (`scrollHeight`), so running it per event is a
        // forced reflow per event.
        let frame = 0

        const measure = () => {
            frame = 0

            const doc = document.documentElement
            const viewport = window.innerHeight
            const offset = window.scrollY

            const remaining = doc.scrollHeight - viewport - offset

            setShown(offset > viewport && remaining <= NEAR_END_PX)
        }

        const onScroll = () => {
            if (frame === 0) frame = window.requestAnimationFrame(measure)
        }

        measure()

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)

        return () => {
            if (frame !== 0) window.cancelAnimationFrame(frame)

            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    const toTop = () => {
        // `smooth` over tens of thousands of pixels is a long ride somebody who
        // asked to be at the top did not ask for, and it is exactly what
        // `prefers-reduced-motion` is about — so honour it.
        const reduced = window.matchMedia?.(
            '(prefers-reduced-motion: reduce)'
        ).matches

        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    }

    const label = t('actions.backToTop')

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-14 z-40 flex justify-center px-3">
            <button
                type="button"
                onClick={toTop}
                aria-hidden={!shown}
                tabIndex={shown ? 0 : -1}
                aria-label={label}
                title={label}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/90 text-muted shadow-lg backdrop-blur transition-visual duration-200 hover:border-accent hover:text-accent ${
                    shown
                        ? 'pointer-events-auto translate-y-0 opacity-90 hover:opacity-100'
                        : 'pointer-events-none translate-y-2 opacity-0'
                }`}
            >
                <ArrowUp className="h-4 w-4" />
            </button>
        </div>
    )
}
