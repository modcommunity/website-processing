import { Footer } from '@modcommunity/shared'
import { getT } from '../i18n/t'
import { buildFooterColumns } from '../i18n/nav'
import { localeLink } from '../i18n/link'

/** The landing site's footer — the shared website-city <Footer>, translated. */
export default function SiteFooter({ locale = 'en' }: { locale?: string }) {
    const t = getT(locale)
    const year = new Date().getFullYear()

    return (
        <Footer
            year={year}
            slogan={t('footer.slogan')}
            columns={buildFooterColumns(t)}
            linkComponent={localeLink(locale)}
            copyright={t('footer.copyright', { year })}
        />
    )
}
