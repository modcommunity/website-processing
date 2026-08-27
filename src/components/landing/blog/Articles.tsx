"use client"

import "react-multi-carousel/lib/styles.css";
import CarouselComponent from "react-multi-carousel";

// @ts-ignore
const Carousel = CarouselComponent.default || CarouselComponent;

import Article from "./articles/Article"
import { useEffect, useState, type HTMLAttributes } from "react"

import { ChevronLeft, ChevronRight, Hammer, Server } from "lucide-react";
import IconAndText from "../../helper/IconAndText";

import {
    dailyPick,
    dayKey,
    fetchArticles,
    POOL_MAX_AGE_MS,
    type BlogArticle,
    type BlogKind,
} from "../../../lib/blog";


/**
 * Carousel arrow.
 *
 * react-multi-carousel's built-in arrows are a translucent black disc whose
 * glyph comes from a bundled icon font ("revicons") — they read as a smudge
 * over the card underneath and match nothing else on the site. These are plain
 * themed buttons with the same lucide chevrons the rest of the shell uses; the
 * library clones the element and injects `onClick`, so the props arrive from it
 * rather than from the call site.
 */
function Arrow({
    dir,
    label,
    onClick,
}: {
    dir: "left" | "right"
    label: string
    onClick?: () => void
}) {
    const Icon = dir === "left" ? ChevronLeft : ChevronRight

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-lg backdrop-blur transition-colors hover:border-accent hover:text-accent ${
                dir === "left" ? "left-0" : "right-0"
            }`}
        >
            <Icon className="h-5 w-5" />
        </button>
    )
}


type Props = {
    itemClassName?: string

    /**
     * The whole blog, fetched from website-city at build time by `Blog.astro`.
     * The island picks the day's shelves out of it rather than being handed a
     * selection, because the selection has to be able to change without a
     * rebuild — see `lib/blog`.
     */
    pool: BlogArticle[]

    /** When `pool` was fetched (epoch ms). 0 means "the build could not". */
    fetchedAt: number

    /**
     * The UTC day the pool was baked on.
     *
     * The first client render has to reproduce the server's markup or React
     * throws it away, so both start from the build's day and the effect below
     * moves to today's afterwards. On a site rebuilt today that is the same
     * string and nothing re-renders. Belt-and-braces as things stand — the
     * carousel renders no slides until it has measured the container, so the
     * server emits an empty track either way — but the day the selection is
     * made must not be a thing the server and the browser can disagree about.
     */
    buildDay: string

    // User-visible labels, translated + passed in from Blog.astro (which has
    // access to Astro.currentLocale). English defaults keep the island usable
    // on its own. Values are HTML fragments (they carry an inline
    // <span class="special">…</span>), so they render via dangerouslySetInnerHTML.
    moddingGuidesHtml?: string
    serverGuidesHtml?: string

    // Accessible names for the carousel arrows.
    prevLabel?: string
    nextLabel?: string
}

/** Cards per shelf per day. Enough to be worth a carousel, few enough to rotate. */
const PER_SHELF = 8

export default function Articles(props : Props & HTMLAttributes<HTMLDivElement>) {
    const {
        itemClassName,
        className,
        pool,
        fetchedAt,
        buildDay,
        moddingGuidesHtml = 'Check out some of our modding <span class="special">how-to</span> guides!',
        serverGuidesHtml = 'Check out some of our server <span class="special">setup</span> guides!',
        prevLabel = 'Previous articles',
        nextLabel = 'Next articles',
    } = props

    const [articles, setArticles] = useState<BlogArticle[]>(pool)
    const [day, setDay] = useState<string>(buildDay)

    useEffect(() => {
        // Rotate to today. On a fresh build this is a no-op.
        setDay(dayKey())

        /*
         * Refetch only a POOL that has gone stale.
         *
         * The section is already correct without this — it is the baked pool
         * that renders, and the daily rotation runs over whatever is in hand.
         * The request exists for the case the build cannot cover: a static site
         * that has not been rebuilt since a post went up. Gating it on the
         * stamp means a site deployed this morning sends no request at all,
         * which is the common case and the one worth being free.
         */
        if (Date.now() - fetchedAt <= POOL_MAX_AGE_MS) return

        const abort = new AbortController()

        void (async () => {
            const fresh = await fetchArticles(abort.signal)

            if (!abort.signal.aborted && fresh && fresh.length > 0)
                setArticles(fresh)
        })()

        return () => abort.abort()
    }, [fetchedAt])

    /*
     * Responsive settings for the carousel.
     *
     * The top entry is deliberately *unbounded*. react-multi-carousel picks a
     * breakpoint with `window.innerWidth >= min && <= max` and, when nothing
     * matches, leaves slidesToShow at 0 — which makes it render no slides at
     * all, i.e. the whole carousel silently disappears. The old map stopped at
     * `max: 4000`, so any viewport wider than that (an ultra-wide monitor, or a
     * zoomed-out window) got a blank gap where the articles should be.
     *
     * The tiers below collapse the old nine breakpoints, which only ever
     * resolved to four distinct item counts.
     */
    const responsive = {
        'ultrawide': {
            breakpoint: { max: Number.MAX_SAFE_INTEGER, min: 2160 },
            items: 4
        },
        'desktop': {
            breakpoint: { max: 2160, min: 1278 },
            items: 3
        },
        'tablet': {
            breakpoint: { max: 1278, min: 1030 },
            items: 2
        },
        'mobile': {
            breakpoint: { max: 1030, min: 0 },
            items: 1
        }
    }

    const shelves: { kind: BlogKind; icon: typeof Hammer; html: string; speed: number }[] = [
        { kind: 'modding', icon: Hammer, html: moddingGuidesHtml, speed: 14000 },
        { kind: 'server', icon: Server, html: serverGuidesHtml, speed: 10000 },
    ]

    return (
        <div className="flex flex-col gap-4">
            {shelves.map(({ kind, icon: Icon, html, speed }) => {
                const picked = dailyPick(articles, kind, PER_SHELF, day)

                // A shelf with nothing on it is a heading over a blank strip.
                if (picked.length < 1)
                    return null

                return (
                    <div key={kind} className="flex flex-col gap-2">
                        <IconAndText
                            icon={<Icon className="w-4 h-4 text-text-primary" />}
                        >
                            <span dangerouslySetInnerHTML={{ __html: html }} />
                        </IconAndText>
                        <Carousel
                            suppressHydrationWarning
                            className={`${className ?? ""}`}
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={speed}
                            ssr={true}
                            customLeftArrow={<Arrow dir="left" label={prevLabel} />}
                            customRightArrow={<Arrow dir="right" label={nextLabel} />}
                            itemClass={`p-6 ${itemClassName ?? ""} intersect-once intersect:sm:motion-preset-pop`}
                        >
                            {picked.map((a) => <Article key={`article-${kind}-${a.id}`} article={a} /> )}
                        </Carousel>
                    </div>
                )
            })}
        </div>
    )
}
