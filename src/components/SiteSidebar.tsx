import {
    AppSwitcher,
    AppSwitcherPanel,
    buildChrome,
    ShellCatalogKey,
    Sidebar,
    useAppSwitcherOpen,
    useSwitcherApps,
    type AppSwitcherLabels,
    type SwitcherApp,
} from '@modcommunity/shared'
import { Sparkles } from 'lucide-react'
import { getT } from '../i18n/t'
import { localeLink } from '../i18n/link'
import { stripLocale, localizeUrl, isLocale, type LocaleT } from '../i18n/config'
import { useSignedIn } from '../lib/auth-hint'
import { CITY_URL } from '../lib/site'

/** City's URL slug per content type key (website-city `AppContentTypeSlugs`). */
const CONTENT_TYPE_SLUG: Record<string, string> = {
    mod: 'mods',
    server: 'servers',
    asset: 'assets',
    article: 'articles',
    community: 'communities',
    collection: 'collections',
    group: 'groups',
}

/**
 * The landing site's primary sidebar: the shared website-city <Sidebar> over
 * `buildChrome`'s rail, translated. Wrapped in a local component so Astro only
 * serializes the plain `pathName` / `locale` strings across the island boundary.
 *
 * Two things it does beyond translating:
 *
 * - **Drops the signed-in-only leaves** (My Mods, Messages, My Friends, …) for
 *   signed-out visitors, matching city. First paint renders the signed-out set
 *   deterministically and reconciles after mount, so there is no hydration
 *   mismatch.
 * - **Renders the "Share your work" call-to-action** at the bottom. In city it
 *   opens the new-item wizard pop-up; a static build has no modal to open, so it
 *   links to `/share`, which is that same wizard as a real page.
 * - **Starts every section folded.** City unfolds the section holding the page
 *   you are on, which is the point of the rail there. Here the rail's
 *   destinations all live on city — none of this site's own routes is inside a
 *   section — so an unfolded section would only ever be an accident of a shared
 *   path prefix, not a place the reader actually is.
 */
export default function SiteSidebar({
    pathName = '/',
    locale = 'en',
}: {
    pathName?: string
    locale?: string
}) {
    const t = getT(locale)
    const lang: LocaleT = isLocale(locale) ? locale : 'en'

    const signedIn = useSignedIn()
    const sections = buildChrome({ site: 'processing', t, keys: ShellCatalogKey, locale, signedIn }).sidebar

    // The list is fetched in the browser, the first time the panel opens. A
    // failed request leaves it empty: the page never depends on city being up.
    const switcherOpen = useAppSwitcherOpen()
    const { apps, loading } = useSwitcherApps(CITY_URL, lang, switcherOpen)
    const switcher = {
        apps,
        loading,
        currentApp: null, // this site has no per-app routes
        labels: {
            find: t('appSwitcher.find'),
            open: t('appSwitcher.open'),
            hint: t('appSwitcher.hint'),
            search: t('appSwitcher.search'),
            none: t('appSwitcher.none'),
            visit: t('appSwitcher.visit'),
            sort: t('appSwitcher.sort'),
            sortPopular: t('appSwitcher.sortPopular'),
            sortName: t('appSwitcher.sortName'),
            sortTotal: t('appSwitcher.sortTotal'),
            loading: t('appSwitcher.loading'),
            contentTypes: Object.fromEntries(
                Object.keys(CONTENT_TYPE_SLUG).map((k) => [k, t(`appSwitcher.contentTypes.${k}`)])
            ),
        } satisfies AppSwitcherLabels,
    }
    // Apps live on city, under city's own locale prefix (default locale bare).
    const hrefFor = (app: SwitcherApp, contentType?: string) => {
        const slug = contentType ? CONTENT_TYPE_SLUG[contentType] ?? contentType : undefined
        return CITY_URL + localizeUrl(slug ? `/${encodeURIComponent(app.url)}/${slug}` : `/${encodeURIComponent(app.url)}`, lang)
    }

    const shareHref = localizeUrl('/share', lang)
    const shareTitle = t('rail.share.title')

    return (
        <>
        <Sidebar
            activePath={stripLocale(pathName)}
            sections={sections}
            expandActiveSection={false}
            linkComponent={localeLink(locale)}
            /* Resting state is the icon rail: pointing at it opens the full
               panel OVER the page, and the toggle pins that open. City made the
               same move — the rail was spending 16rem of every page on a nav
               nobody reads twice — and the two shells share one persisted flag,
               so a reader who pinned it open in the app arrives here pinned. */
            defaultCollapsed
            hoverExpand
            /* Plus Jakarta Sans for the rail alone, as in city: the nav is a
               fixed set of short labels read at a glance rather than prose, and
               its wider shapes hold up at 13px where the body face goes muddy. */
            className="font-pjs"
            labels={{
                expand: t('sidebar.expand'),
                collapse: t('sidebar.collapse'),
                pin: t('sidebar.pin'),
                unpin: t('sidebar.unpin'),
            }}
            footer={
                <div className="flex flex-col gap-2">
                <AppSwitcher {...switcher} expanded />
                <a
                    href={shareHref}
                    className="group relative block w-full overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-accent/15 to-[#5577f0]/5 p-4 text-left transition-visual duration-300 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/20"
                >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Sparkles className="h-4 w-4 text-accent" />
                        {shareTitle}
                    </div>
                    <p className="mt-1 text-xs text-muted">
                        {t('rail.share.desc')}
                    </p>
                    <span className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/20 blur-2xl transition-visual duration-500 group-hover:scale-150" />
                </a>
                </div>
            }
            footerCollapsed={
                <div className="flex flex-col gap-2">
                <AppSwitcher {...switcher} expanded={false} />
                <a
                    href={shareHref}
                    title={shareTitle}
                    aria-label={shareTitle}
                    className="group relative flex w-full items-center justify-center rounded-xl border border-accent/30 bg-gradient-to-br from-accent/15 to-[#5577f0]/5 p-3 text-accent transition-visual duration-300 hover:border-accent/60"
                >
                    <Sparkles className="h-4 w-4" />
                </a>
                </div>
            }
        />
        <AppSwitcherPanel {...switcher} hrefFor={hrefFor} />
        </>
    )
}
