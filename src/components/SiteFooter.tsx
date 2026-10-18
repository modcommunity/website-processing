import { buildChrome, Footer, ShellCatalogKey } from '@modcommunity/shared'
import { getT } from '../i18n/t'
import { localeLink } from '../i18n/link'
import lockup from '@modcommunity/shared/logo01.webp'

/** The landing site's footer: the shared <Footer> over `buildChrome`, translated. */
export default function SiteFooter({ locale = 'en' }: { locale?: string }) {
    // UTC, matching website-city's footer. `getFullYear()` reads the runtime's
    // local zone (the build machine's when the page is generated, the viewer's
    // when this island hydrates), and around New Year those disagree, so the
    // copyright text node would change under the reader for no reason.
    const year = new Date().getUTCFullYear()
    const chrome = buildChrome({ site: 'processing', t: getT(locale), keys: ShellCatalogKey, locale, year })

    return (
        <Footer
            year={year}
            slogan={chrome.slogan}
            columns={chrome.footer}
            socials={chrome.socials}
            linkComponent={localeLink(locale)}
            // The file, not the data URI (see SiteHeader).
            logoSrc={lockup}
            copyright={chrome.copyright}
        />
    )
}
