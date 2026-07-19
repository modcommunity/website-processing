import { Header, Button } from '@modcommunity/shared'

/**
 * The landing site's header — the shared website-city <Header> with a sign-in
 * action. Wrapped in a local component so Astro only has to serialize the plain
 * `pathName` string across the island boundary (the nav config / link component
 * stay on the client where their functions live).
 */
export default function SiteHeader({ pathName }: { pathName?: string }) {
    return (
        <Header
            activePath={pathName}
            right={
                <a href="/login">
                    <Button btnType="special">Sign In</Button>
                </a>
            }
        />
    )
}
