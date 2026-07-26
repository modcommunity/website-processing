import { useEffect, useState } from 'react'
import { Button } from '@modcommunity/shared'
import { isLocale, localizeUrl, type LocaleT } from '../i18n/config'

/**
 * Reads the non-HttpOnly `tmc_auth` hint cookie that website-city's middleware
 * keeps in sync with the (HttpOnly, unreadable) auth session. Both apps share
 * the same domain, so it's directly readable here. It carries no identity — just
 * a yes/no for which button to show.
 */
function isSignedIn(): boolean {
    if (typeof document === 'undefined') return false
    return document.cookie.split('; ').some((c) => {
        const [name, value] = c.split('=')
        return name === 'tmc_auth' && value === '1'
    })
}

/**
 * Header account action for the landing site: "Sign In" (→ website-city login)
 * for signed-out visitors, "My Account" (→ /account) for signed-in ones. Both
 * routes live on website-city, served under the same domain.
 */
export default function AccountButton({
    signInLabel = 'Sign In',
    myAccountLabel = 'My Account',
    locale = 'en',
}: {
    signInLabel?: string
    myAccountLabel?: string
    locale?: string
}) {
    // SSR / first paint renders the signed-out state deterministically to avoid
    // a hydration mismatch, then reconciles to the real state after mount.
    const [signedIn, setSignedIn] = useState(false)
    useEffect(() => setSignedIn(isSignedIn()), [])

    // website-city prefixes locales the same way, so keep the visitor's language
    // when they cross over to log in.
    const lang: LocaleT = isLocale(locale) ? locale : 'en'

    return (
        <a href={localizeUrl(signedIn ? '/account' : '/login', lang)}>
            <Button btnType="special">
                {signedIn ? myAccountLabel : signInLabel}
            </Button>
        </a>
    )
}
