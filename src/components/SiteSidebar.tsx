import { Sidebar } from '@modcommunity/shared'

/**
 * The landing site's primary sidebar — the shared website-city <Sidebar>.
 * Wrapped in a local component so Astro only serializes the plain `pathName`
 * string across the island boundary (the nav sections / link component stay on
 * the client where their functions live).
 */
export default function SiteSidebar({ pathName }: { pathName?: string }) {
    return <Sidebar activePath={pathName} />
}
