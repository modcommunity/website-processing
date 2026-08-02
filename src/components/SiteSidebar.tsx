import { Sidebar } from '@modcommunity/shared'
import { Sparkles } from 'lucide-react'
import { getT } from '../i18n/t'
import { buildVisibleSidebarSections } from '../i18n/nav'
import { localeLink } from '../i18n/link'
import { stripLocale, localizeUrl, isLocale, type LocaleT } from '../i18n/config'
import { useSignedIn } from '../lib/auth-hint'

/**
 * The landing site's primary sidebar — the shared website-city <Sidebar>,
 * translated. Wrapped in a local component so Astro only serializes the plain
 * `pathName` / `locale` strings across the island boundary.
 *
 * Two things it does beyond translating:
 *
 * - **Drops the signed-in-only leaves** (My Mods, Messages, My Friends, …) for
 *   signed-out visitors, matching city. First paint renders the signed-out set
 *   deterministically and reconciles after mount, so there is no hydration
 *   mismatch — the same trick `AccountButton` uses.
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
    const sections = buildVisibleSidebarSections(t, signedIn)

    const shareHref = localizeUrl('/share', lang)
    const shareTitle = t('rail.share.title')

    return (
        <Sidebar
            activePath={stripLocale(pathName)}
            sections={sections}
            expandActiveSection={false}
            linkComponent={localeLink(locale)}
            labels={{
                expand: t('sidebar.expand'),
                collapse: t('sidebar.collapse'),
            }}
            footer={
                <a
                    href={shareHref}
                    className="group relative block w-full overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-br from-accent/15 to-[#5577f0]/5 p-4 text-left transition-all duration-300 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/20"
                >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Sparkles className="h-4 w-4 text-accent" />
                        {shareTitle}
                    </div>
                    <p className="mt-1 text-xs text-muted">
                        {t('rail.share.desc')}
                    </p>
                    <span className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/20 blur-2xl transition-all duration-500 group-hover:scale-150" />
                </a>
            }
            footerCollapsed={
                <a
                    href={shareHref}
                    title={shareTitle}
                    aria-label={shareTitle}
                    className="group relative flex w-full items-center justify-center rounded-xl border border-accent/30 bg-gradient-to-br from-accent/15 to-[#5577f0]/5 p-3 text-accent transition-all duration-300 hover:border-accent/60"
                >
                    <Sparkles className="h-4 w-4" />
                </a>
            }
        />
    )
}
