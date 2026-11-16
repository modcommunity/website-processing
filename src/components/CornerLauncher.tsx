import { CornerLauncher as SharedCornerLauncher } from '@modcommunity/shared'
import { isLocale, localizeUrl, DEFAULT_LOCALE } from '../i18n/config'
import { getT } from '../i18n/t'
import { useSignedIn } from '../lib/auth-hint'
import { GAMESPICE_URL } from '../lib/site'

/**
 * The corner launcher: a thin wrapper over `@modcommunity/shared`'s
 * `CornerLauncher` (the compact coat: small Play pill, round more button, menu
 * sliding up from the corner). This file only resolves what is the site's own:
 * the locale, the auth hint, the (same-domain, localized) destinations and the
 * labels. The styles come from `@modcommunity/shared/corner-launcher.css`.
 *
 * Play is the exception to the localized destinations: the play center moved
 * to GameSpice /games (website-city 308s `/play` there), so the button links
 * there directly and opens it in a new tab rather than navigating away.
 */
export default function CornerLauncher({ locale = 'en' }: { locale?: string }) {
    const t = getT(locale)
    const loc = isLocale(locale) ? locale : DEFAULT_LOCALE
    const signedIn = useSignedIn()

    const login = localizeUrl('/login', loc)

    return (
        <SharedCornerLauncher
            play={`${GAMESPICE_URL}/games`}
            playNewTab
            chat={signedIn ? localizeUrl('/messages', loc) : login}
            console={signedIn ? localizeUrl('/console', loc) : login}
            signedIn={signedIn}
            umamiEvent="launcher"
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
