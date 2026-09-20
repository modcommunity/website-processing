/**
 * Umami event tracking for the landing and legal site.
 *
 * The sibling of `website-learn/src/lib/umami.ts` and of website-city's
 * `src/utils/umami/event.ts`: a flat registry of names, a permissive data bag,
 * and a `track()` that can never throw. Three copies rather than a shared
 * module because the three builds have no dependency on each other and their
 * registries measure genuinely different things — a catalogue, a book, and
 * this, which is a pitch and a set of legal documents.
 *
 * ------------------------------------------- What a pageview cannot tell you
 *
 * This site is four long single-page documents and a few legal ones. A
 * pageview says a reader arrived. It says nothing about the two questions
 * that matter here:
 *
 *   * **Did they get to the bottom?** The landing page is ten sections tall
 *     and the argument for the platform is spread across all of them. Which
 *     section a reader stops at is the entire shape of that funnel, and it
 *     produces no navigation whatsoever — the whole page is one URL.
 *   * **Did they leave for the app?** Every conversion this site exists to
 *     produce is a click onto website-city, which is the SAME HOST — so the
 *     analytics snippet's outbound-link tagger deliberately ignores it, and
 *     the destination's own pageview cannot be attributed back here.
 *
 * Everything below answers one of those two, or is a control whose use is
 * otherwise invisible.
 *
 * -------------------------------------------------------- The rule for names
 *
 * **Do not register a name nothing fires.** A registry that lists events the
 * site cannot emit reads as coverage. `umami.test.ts` enforces it rather than
 * trusting this paragraph.
 *
 * An event carries an IDENTIFIER, never a translated label — this site renders
 * in nine languages and one button must be one row in Umami, not nine.
 *
 * --------------------------------------------------- Attributes, not handlers
 *
 * Most of this site is static Astro with no island, so the majority of these
 * are `data-umami-event` attributes that Umami's own tracker reads off the DOM
 * — no JavaScript of ours runs at all. `track()` is for the handful of things
 * an attribute cannot express: a scroll depth, a runtime-built table of
 * contents, and a locale change that has to be recorded before the page
 * unloads.
 */

export const UMAMI_EVENTS = [
    /*
     * How far down the landing page a reader actually got.
     *
     * Fired once per section, the first time it comes into view, carrying the
     * section's ordinal. Section names rather than percentages because a
     * percentage of a page whose length changes with every edit is not
     * comparable across two months, while "reached the Servers section" is.
     *
     * One event per section per pageview — see `sectionSeen` below.
     */
    'section_view',

    /*
     * The hero's two calls to action, and the surface index under them.
     *
     * `cta_explore` is the conversion this whole page is for. It is a
     * same-host link, which is exactly why it needs a name: the outbound
     * tagger skips it and website-city's own pageview cannot say it came
     * from here.
     */
    'cta_explore',
    'cta_discord',
    'cta_github',
    'hero_surface',

    /*
     * Every other link from this site into the app, from the shared header,
     * sidebar, footer and drawer. Fired from the link adapter they are all
     * handed, so a nav entry is covered without touching the nav config.
     */
    'app_link',

    /** The stickied Play/Chat control in the bottom-right. */
    'launcher',

    /*
     * The product pages. Each is a pitch with one thing it wants the reader to
     * do, and every one of those is a link this site cannot otherwise see —
     * a repository, a download, a docs page.
     */
    'app_page_cta',
    'cli_page_cta',

    /*
     * Legal pages.
     *
     * The table of contents is built at run time from the sections on the
     * page, so the rail does not exist in the HTML and every entry is a
     * `#hash` — no pageview, no request, nothing.
     *
     * `legal_depth` is the one number anybody actually asks about a policy
     * page: how far down it people read. It reports the DEEPEST section
     * reached, once, when the reader leaves — one row per visit rather than
     * one per section, because unlike the landing page the interesting figure
     * here is a single high-water mark.
     */
    'legal_toc_click',
    'legal_depth',

    /* Shell. */
    'locale_change',
    'theme_change',
    'account',
    'back_to_top',
] as const

export type UmamiEventName = (typeof UMAMI_EVENTS)[number]

export type UmamiEventData = Record<
    string,
    string | number | boolean | null | undefined
>

declare global {
    interface Window {
        umami?: {
            track: (name: string, data?: UmamiEventData) => void
        }
    }
}

/**
 * Fire an event. SSR-safe, safe before the Umami script has loaded, and it
 * never throws — analytics must never be able to break a page.
 *
 * `path` and `locale` are filled in automatically: `path` so no caller has to
 * remember which document it was on, and `locale` because one set of
 * components serves nine languages and "which languages is the pitch read in"
 * should not require string surgery on every row.
 */
export function track(name: UmamiEventName, data?: UmamiEventData): void {
    try {
        if (typeof window === 'undefined') return

        const payload: UmamiEventData = {
            path: window.location.pathname,
            locale: localeFromPath(window.location.pathname),
            ...data,
        }

        if (window.umami) window.umami.track(name, payload)
    } catch {
        // Swallowed on purpose.
    }
}

/**
 * The locale a path is under.
 *
 * English is unprefixed and the other eight live at `/{lang}/…` — the shape
 * all three sites on this domain share, so the language picker in the shared
 * header lands on the same URL shape wherever the reader is.
 */
export function localeFromPath(path: string): string {
    const m = /^\/(es|fr|de|ru|nl|ja|zh|pt)(\/|$)/.exec(path)

    return m?.[1] ?? 'en'
}
