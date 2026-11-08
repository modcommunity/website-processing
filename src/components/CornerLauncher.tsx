import { CornerLauncher as SharedCornerLauncher } from '@modcommunity/shared'
import { isLocale, localizeUrl, DEFAULT_LOCALE } from '../i18n/config'
import { getT } from '../i18n/t'
import { useSignedIn } from '../lib/auth-hint'

/**
 * The corner launcher (Play / Console / Chat). The block itself — both coats,
 * the phone stack, the sheen — lives in `@modcommunity/shared`
 * (`CornerLauncher`), shared with website-city, website-learn and
 * website-status; its styles come from `@modcommunity/shared/corner-launcher.css`
 * (imported in `styles/Components.css`). What stays here is what only this site
 * knows: the strings, the locale, the signed-in cookie hint and the addresses.
 *
 * Every destination lives on website-city, on this same domain, so they are
 * ordinary rooted paths — localized here the way `localeLink` does it for the
 * shell's nav, so a reader crossing over stays in-language.
 *
 * Hydrated (`client:idle` in `Layout.astro`): the signed-in coat is read from
 * the cookie after mount. First paint is the signed-out state on both server and
 * client, so there is nothing for hydration to disagree about.
 */
export default function CornerLauncher({ locale = 'en' }: { locale?: string }) {
    const t = getT(locale)
    const loc = isLocale(locale) ? locale : DEFAULT_LOCALE
    const signedIn = useSignedIn()

    const login = localizeUrl('/login', loc)

    return (
        <SharedCornerLauncher
            play={localizeUrl('/play', loc)}
            chat={signedIn ? localizeUrl('/messages', loc) : login}
            console={signedIn ? localizeUrl('/console', loc) : login}
            signedIn={signedIn}
            umamiEvent="docs_launcher"
            labels={{
                play: t('dock.play'),
                playAria: t('dock.playAria'),
                console: t('dock.console'),
                chat: t('dock.chat'),
                chatLabel: t('dock.chatLabel'),
                signIn: t('dock.signIn'),
                open: t('dock.open'),
                close: t('dock.close'),
            }}
        />
    )
}
