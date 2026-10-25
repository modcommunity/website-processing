import {
    AccountButton,
    buildChrome,
    Header,
    HeaderActions,
    HeaderLinks,
    LanguagePicker,
    MobileNav,
    ShellCatalogKey,
    ThemeToggle,
} from '@modcommunity/shared'
import { getT } from '../i18n/t'
import { localeLink } from '../i18n/link'
import { isLocale, localizeUrl, stripLocale } from '../i18n/config'
import { WriteLocaleCookie } from '@modcommunity/shared/i18n'
import lockup from '@modcommunity/shared/logo01.webp'
import { useSignedIn } from '../lib/auth-hint'
import { track } from '../lib/umami'
import { DOCS_URL } from '../lib/site'

/**
 * The landing site's header: the shared <Header> over `buildChrome`, the same
 * call and the same link list website-city, website-learn and website-status
 * draw, so a link edited in tmc-global's site-nav.json reaches this bar at the
 * next version bump instead of through a copied list here. Wrapped in a local
 * component so Astro only serializes the plain `pathName` / `locale` strings
 * across the island boundary (the nav, its icon components and the link
 * component stay on the client where their functions live).
 *
 * The `left` slot carries the shared <MobileNav/> drawer. The header nav and
 * <SiteSidebar/> are both `md:flex` and the drawer's trigger is `md:hidden`, so
 * exactly one navigation exists at any width. Below `sm` the bar has no room
 * for the language picker, theme toggle or "My Account" (it wraps under
 * ~375px): <HeaderActions/> hides them there and they move into the drawer's
 * footer, as on city.
 */
export default function SiteHeader({
    pathName = '/',
    locale = 'en',
}: {
    pathName?: string
    locale?: string
}) {
    const t = getT(locale)

    // First paint renders the signed-out set deterministically and reconciles
    // after mount, so there is no hydration mismatch.
    const signedIn = useSignedIn()
    const chrome = buildChrome({ site: 'processing', t, keys: ShellCatalogKey, locale, signedIn })
    const link = localeLink(locale)

    const language = (className?: string) => (
        <LanguagePicker
            locale={locale}
            className={className}
            // `{name}` survives: getT only substitutes the params it is given.
            labels={{ current: t('picker.current'), select: t('picker.select') }}
            onSelect={(next, from) => {
                /*
                 * Before the navigation, not after: assigning `location.href`
                 * unloads the page, and an event queued on the way out may
                 * never be sent. `from` as well as `to`, because the pageview
                 * path already says which languages are read; what it cannot
                 * say is which ones people switch AWAY from, which is where a
                 * translation is failing.
                 */
                track('locale_change', { from, to: next })
                // `subdomainUrl`: this site is the PARENT of the docs host
                // (the apex in production), so the cookie goes on this host
                // whenever the docs are under it and the docs and city see the
                // choice; host-only otherwise.
                WriteLocaleCookie(next, { subdomainUrl: DOCS_URL })
                window.location.href = localizeUrl(pathName, isLocale(next) ? next : 'en')
            }}
        />
    )
    const theme = <ThemeToggle cookieOptions={{ subdomainUrl: DOCS_URL }} labels={{ toLight: t('theme.toLight'), toDark: t('theme.toDark') }} />
    const links = (showLabels?: boolean) => (
        <HeaderLinks
            signedIn={signedIn}
            locale={locale}
            labels={{ app: t('account.app'), dashboard: t('account.dashboard') }}
            onNavigate={(item) => track('header_link', { item })}
            showLabels={showLabels}
        />
    )
    const account = (className: string) => (
        <AccountButton
            signedIn={signedIn}
            locale={locale}
            labels={{ signIn: t('account.signIn'), myAccount: t('account.myAccount') }}
            // `signedIn` is the point: this one button is Sign In to a stranger
            // and My Account to a member, and the split says how much of the
            // landing page's traffic already has an account.
            onNavigate={(s) => track('account', { signedIn: s })}
            className={className}
        />
    )

    return (
        <Header
            activePath={stripLocale(pathName)}
            nav={chrome.nav}
            linkComponent={link}
            // The mark as a file rather than the package's inline data URI:
            // that is ~14 kB of base64 in the island and again in the HTML at
            // each place the shell draws it, against one cached request.
            // `logoSrc` rather than a `logo` slot, so the shell's own <Logo>
            // keeps the locale-aware link a slotted one would have to be given.
            logoSrc={lockup}
            // Without it the overflow trigger reads "More" in all nine
            // languages; city passes its own `nav.more` here too.
            moreLabel={t('nav.more')}
            left={
                <MobileNav
                    activePath={stripLocale(pathName)}
                    nav={chrome.nav}
                    sections={chrome.sidebar}
                    linkComponent={link}
                    logoSrc={lockup}
                    footer={
                        <div className="flex flex-col gap-3 sm:hidden">
                            {links(true)}
                            <div className="flex items-center justify-between gap-2">
                                {/* The list opens upwards here: at the foot of
                                    the drawer a downward one runs off the screen. */}
                                {language(
                                    '[&_ul]:bottom-full [&_ul]:left-0 [&_ul]:right-auto [&_ul]:top-auto [&_ul]:mb-1 [&_ul]:mt-0'
                                )}
                                {theme}
                            </div>
                            {account('block')}
                        </div>
                    }
                    labels={{
                        open: t('mobile.open'),
                        close: t('mobile.close'),
                        title: t('mobile.title'),
                    }}
                />
            }
            right={<HeaderActions language={language()} theme={theme} links={links()} account={account('hidden sm:block')} />}
        />
    )
}
