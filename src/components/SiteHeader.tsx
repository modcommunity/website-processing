import { Header, MobileNav, ThemeToggle } from '@modcommunity/shared'
import AccountButton from './AccountButton'
import LanguagePicker from './LanguagePicker'
import { getT } from '../i18n/t'
import { buildNav, buildSidebarSections } from '../i18n/nav'
import { localeLink } from '../i18n/link'
import { stripLocale } from '../i18n/config'

/**
 * The landing site's header — the shared website-city <Header> with a translated
 * nav plus the language picker, light/dark toggle and sign-in / account action.
 * Wrapped in a local component so Astro only serializes the plain `pathName` /
 * `locale` strings across the island boundary (the nav config, link component
 * and translations stay on the client where their functions live).
 *
 * The `left` slot carries the shared <MobileNav/> drawer. Both halves of the
 * desktop shell are desktop-only — the header nav is `md:flex` and <SiteSidebar/>
 * is `lg:flex` — so without it a phone gets no navigation at all. It is given the
 * same nav + sidebar sections those two render, so the drawer is the whole shell
 * in one panel.
 */
export default function SiteHeader({
    pathName = '/',
    locale = 'en',
}: {
    pathName?: string
    locale?: string
}) {
    const t = getT(locale)

    return (
        <Header
            activePath={stripLocale(pathName)}
            nav={buildNav(t)}
            linkComponent={localeLink(locale)}
            left={
                <MobileNav
                    activePath={stripLocale(pathName)}
                    nav={buildNav(t)}
                    sections={buildSidebarSections(t)}
                    linkComponent={localeLink(locale)}
                    labels={{
                        open: t('mobile.open'),
                        close: t('mobile.close'),
                        title: t('mobile.title'),
                    }}
                />
            }
            right={
                <>
                    <LanguagePicker locale={locale} pathName={pathName} />
                    <ThemeToggle
                        labels={{
                            toLight: t('theme.toLight'),
                            toDark: t('theme.toDark'),
                        }}
                    />
                    <AccountButton
                        signInLabel={t('account.signIn')}
                        myAccountLabel={t('account.myAccount')}
                        locale={locale}
                    />
                </>
            }
        />
    )
}
