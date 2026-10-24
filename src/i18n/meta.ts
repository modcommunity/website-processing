import { getT } from './t'

export type MetaPage = 'home' | 'platform' | 'app' | 'cli'

/** `meta` prop for `Layout` in the page's language. */
export function pageMeta(page: MetaPage, locale: string | undefined) {
    const t = getT(locale)
    const k = (s: string) => t(`landing.pageMeta.${page}${s}`)
    return {
        // The home page has no short title: Layout's own default applies.
        ...(page === 'home' ? {} : { title: k('Title') }),
        titleMain: k('Main'),
        desc: k('Desc'),
    }
}
