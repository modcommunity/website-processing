import { Button } from '@modcommunity/shared'
import { isLocale, localizeUrl, type LocaleT } from '../i18n/config'
import { useSignedIn } from '../lib/auth-hint'
import { track } from '../lib/umami'

/**
 * Header account action for the landing site: "Sign In" (→ website-city login)
 * for signed-out visitors, "My Account" (→ /account) for signed-in ones. Both
 * routes live on website-city, served under the same domain.
 */
export default function AccountButton({
    signInLabel = 'Sign In',
    myAccountLabel = 'My Account',
    locale = 'en',
    className = '',
}: {
    signInLabel?: string
    myAccountLabel?: string
    locale?: string
    /** Extra classes for the link wrapper — used to gate it per breakpoint. */
    className?: string
}) {
    // SSR / first paint renders the signed-out state deterministically to avoid
    // a hydration mismatch, then reconciles to the real state after mount.
    const signedIn = useSignedIn()

    // website-city prefixes locales the same way, so keep the visitor's language
    // when they cross over to log in.
    const lang: LocaleT = isLocale(locale) ? locale : 'en'

    return (
        <a
            href={localizeUrl(signedIn ? '/account' : '/login', lang)}
            /*
             * `signedIn` is the point: this one button is Sign In to a
             * stranger and My Account to a member, and the split says how much
             * of the landing page's traffic already has an account — which is
             * what the pitch should be written for.
             */
            onClick={() => track('account', { signedIn })}
            className={className}
        >
            <Button btnType="special">
                {signedIn ? myAccountLabel : signInLabel}
            </Button>
        </a>
    )
}
