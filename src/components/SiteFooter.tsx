import { Footer } from '@modcommunity/shared'

/** The landing site's footer — the shared website-city <Footer>. */
export default function SiteFooter() {
    return <Footer year={new Date().getFullYear()} />
}
