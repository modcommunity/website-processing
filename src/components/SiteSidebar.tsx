import { Sidebar } from '@modcommunity/shared'
import { getT } from '../i18n/t'
import { buildSidebarSections } from '../i18n/nav'
import { localeLink } from '../i18n/link'
import { stripLocale } from '../i18n/config'

/**
 * The landing site's primary sidebar — the shared website-city <Sidebar>,
 * translated. Wrapped in a local component so Astro only serializes the plain
 * `pathName` / `locale` strings across the island boundary.
 */
export default function SiteSidebar({
    pathName = '/',
    locale = 'en',
}: {
    pathName?: string
    locale?: string
}) {
    const t = getT(locale)

    return (
        <Sidebar
            activePath={stripLocale(pathName)}
            sections={buildSidebarSections(t)}
            linkComponent={localeLink(locale)}
            labels={{
                expand: t('sidebar.expand'),
                collapse: t('sidebar.collapse'),
            }}
        />
    )
}
