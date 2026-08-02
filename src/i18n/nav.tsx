import {
    Home,
    Boxes,
    Cog,
    Hammer,
    Server,
    Gamepad2,
    Images,
    Map,
    Search,
    Compass,
    Code2,
    Users,
    BookOpen,
    NotebookPen,
    FolderKey,
    Package,
    Plus,
    User,
    Newspaper,
    Group,
    Puzzle,
    Activity,
    MessageSquare,
    UserCheck,
    Lightbulb,
} from 'lucide-react'
// lucide dropped brand marks, so Discord stays on react-icons — website-city
// makes the same exception.
import { FaDiscord } from 'react-icons/fa6'
import type { NavItem, NavLeaf, NavSection, FooterColumn } from '@modcommunity/shared'
import type { TFunc } from './t'

// All destinations live on website-city, served under the same domain, so
// internal links are plain relative paths.
const FORUM = 'https://forum.moddingcommunity.com/'
const DISCORD = 'https://discord.moddingcommunity.com'
// Our own roadmap board on website-city, not the GitHub milestones page it used
// to be — city moved to it and this catalogue mirrors city.
const ROADMAP = '/roadmap'
const FEEDBACK = '/feedback'
const KB = 'https://forum.moddingcommunity.com/c/server-browser/knowledgebase/81'

const DEV_TRACKER = 'https://github.com/modcommunity/dev-issue-tracker/issues'

/**
 * Header primary nav — a mirror of website-city's `PRIMARY_NAV`: the same six
 * top-level links plus the hrefless "Resources" dropdown, in the same order,
 * with the same icons and the same sub-labels. Labels/descriptions come from
 * `nav.*`, ported verbatim from city's `locales/<lang>/nav.json`, so both
 * headers read identically in every locale.
 *
 * Each content pillar carries its sidebar section as a hover dropdown, exactly
 * as city does — the menu under "Assets" IS the rail's Assets section, so the
 * header and the rail cannot drift. The pillar itself still links to its landing
 * page; the menu only ever opens on hover.
 *
 * `signedIn` drops the signed-in-only leaves ("My Mods", "Messages", …) from
 * those dropdowns, mirroring what <SiteSidebar/> does to the rail. Pass the
 * `tmc_auth` hint (see `lib/auth-hint`).
 *
 * If city's PRIMARY_NAV changes, change this with it — that config is the
 * source of truth.
 */
export function buildNav(t: TFunc, signedIn = false): NavItem[] {
    // The rail's own sections, minus the leaves this visitor cannot use. The
    // shared `NavLeaf` has no notion of `requiresAuth`, so it is stripped here.
    const sections = buildSidebarSections(t)

    const pillar = (label: string): NavLeaf[] => {
        const section = sections.find((s) => s.label === label)

        if (!section)
            throw new Error(`nav: no sidebar section "${label}"`)

        return section.items
            .filter((item) => !item.requiresAuth || signedIn)
            .map(({ requiresAuth: _requiresAuth, ...leaf }) => leaf)
    }

    return [
        {
            label: t('nav.home.label'),
            href: '/',
            icon: Home,
            desc: t('nav.home.desc'),
        },
        {
            label: t('nav.apps.label'),
            href: '/apps',
            icon: Boxes,
            desc: t('nav.apps.desc'),
            children: pillar(t('rail.sections.apps')),
        },
        {
            label: t('nav.assets.label'),
            href: '/assets',
            icon: Cog,
            desc: t('nav.assets.desc'),
            children: pillar(t('rail.sections.assets')),
        },
        {
            label: t('nav.mods.label'),
            href: '/mods',
            icon: Hammer,
            desc: t('nav.mods.desc'),
            children: pillar(t('rail.sections.mods')),
        },
        {
            label: t('nav.servers.label'),
            href: '/servers',
            icon: Server,
            desc: t('nav.servers.desc'),
            children: pillar(t('rail.sections.servers')),
        },
        {
            label: t('nav.parties.label'),
            href: '/parties',
            icon: Gamepad2,
            desc: t('nav.parties.desc'),
            children: pillar(t('rail.sections.parties')),
        },
        {
            // No href: a dropdown-only trigger, exactly as in website-city.
            label: t('nav.resources.label'),
            icon: FolderKey,
            desc: t('nav.resources.desc'),
            children: [
                /*
                 * The Forum is deliberately absent, mirroring city: it is
                 * reachable from the footer and the sidebar's Community section
                 * instead.
                 */
                {
                    label: t('nav.discord.label'),
                    href: DISCORD,
                    icon: FaDiscord,
                    desc: t('nav.discord.desc'),
                    external: true,
                },
                {
                    label: t('nav.blog.label'),
                    href: '/blog/',
                    icon: NotebookPen,
                    desc: t('nav.blog.desc'),
                },
                // The member directory. City renamed this from "Users" and moved
                // the route to `/community` with it.
                {
                    label: t('nav.community.label'),
                    href: '/community',
                    icon: Users,
                    desc: t('nav.community.desc'),
                },
                {
                    label: t('nav.banners.label'),
                    href: '/banners',
                    icon: Images,
                    desc: t('nav.banners.desc'),
                },
                {
                    label: t('nav.roadmap.label'),
                    href: ROADMAP,
                    icon: Map,
                    desc: t('nav.roadmap.desc'),
                },
                {
                    // City's own feedback board — suggestions, bug reports and
                    // votes. Beside the roadmap on purpose: one says what is
                    // planned, the other is where people ask for things to be.
                    label: t('nav.feedback.label'),
                    href: FEEDBACK,
                    icon: Lightbulb,
                    desc: t('nav.feedback.desc'),
                },
                {
                    label: t('nav.devTracker.label'),
                    href: DEV_TRACKER,
                    icon: Code2,
                    desc: t('nav.devTracker.desc'),
                    external: true,
                },
            ],
        },
    ]
}

/** Footer quick-link columns, translated via `t`. */
export function buildFooterColumns(t: TFunc): FooterColumn[] {
    return [
        {
            heading: t('sections.explore'),
            links: [
                { label: t('common.apps'), href: '/apps' },
                { label: t('common.assets'), href: '/assets' },
                { label: t('common.mods'), href: '/mods' },
                { label: t('common.servers'), href: '/servers' },
                { label: t('common.communities'), href: '/communities' },
            ],
        },
        {
            heading: t('sections.community'),
            links: [
                { label: t('common.blog'), href: '/blog/' },
                { label: t('common.forum'), href: FORUM, external: true },
                { label: t('common.discord'), href: DISCORD, external: true },
            ],
        },
        {
            heading: t('sections.legal'),
            links: [
                { label: t('common.tos'), href: '/tos' },
                { label: t('common.privacy'), href: '/privacy-policy' },
                { label: t('common.licenses'), href: '/licenses' },
            ],
        },
    ]
}

/**
 * A sidebar leaf, plus the one thing the shared `NavLeaf` has no notion of:
 * whether it is a signed-in-only destination.
 *
 * website-city hides those from signed-out visitors using the real session.
 * We only have the non-HttpOnly `tmc_auth` hint cookie (see `AccountButton`),
 * which is enough — the flag is read in `SiteSidebar` and the leaves are
 * dropped before the list ever reaches the shared <Sidebar>.
 */
export type SidebarLeaf = NavLeaf & { requiresAuth?: boolean }

export type SidebarSection = Omit<NavSection, 'items'> & {
    items: SidebarLeaf[]
}

/**
 * Primary sidebar sections — a mirror of website-city's `SIDEBAR_SECTIONS`
 * (`src/app/_components/ui/shell/nav-config.ts`), which is the source of truth
 * for the entries, their order and their icons. Labels come from `rail.*`,
 * ported verbatim from city's `locales/<lang>/nav.json`.
 *
 * Three deliberate differences from city, all of them structural rather than
 * editorial:
 *
 * 1. **No Admin section.** City role-gates it to staff; the `tmc_auth` cookie
 *    carries a yes/no and no role, so there is nothing to gate on here. Staff
 *    reach `/admin` from the app.
 * 2. **"Add" leaves are plain links to the dedicated `/{plural}/add` pages.**
 *    In city they are buttons that open a create pop-up in place. This is a
 *    static build with no session and no tRPC client, so a pop-up asking for a
 *    name and an app has nothing to submit to — the dedicated page (which city
 *    already had behind every one of those modals) is the working destination.
 *    The same reasoning applies to the "Share your work" call-to-action, which
 *    points at `/share`.
 * 3. **No Legal section.** City has none either; ToS / Privacy / Licenses are
 *    footer links in both shells.
 */
/**
 * {@link buildSidebarSections} reduced to the plain shared contract: the
 * signed-in-only leaves are dropped for signed-out visitors and `requiresAuth`
 * — which is ours, not the shared type's — is stripped off the rest.
 *
 * Every surface that renders the rail's sections (the desktop rail, the mobile
 * drawer, the header's pillar dropdowns) goes through this, so none of them can
 * offer a destination the others hide.
 */
export function buildVisibleSidebarSections(
    t: TFunc,
    signedIn: boolean
): NavSection[] {
    return buildSidebarSections(t).map((section) => ({
        ...section,
        items: section.items
            .filter((item) => !item.requiresAuth || signedIn)
            .map(({ requiresAuth: _requiresAuth, ...leaf }) => leaf),
    }))
}

export function buildSidebarSections(t: TFunc): SidebarSection[] {
    return [
        {
            label: t('rail.sections.apps'),
            icon: Package,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/apps',
                    icon: Compass,
                },
                {
                    label: t('rail.items.browse'),
                    href: '/apps/browse',
                    icon: Search,
                },
            ],
        },
        {
            label: t('rail.sections.assets'),
            icon: Cog,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/assets',
                    icon: Compass,
                },
                {
                    label: t('rail.items.add'),
                    href: '/assets/add',
                    icon: Plus,
                },
                {
                    label: t('rail.items.browse'),
                    href: '/assets/browse',
                    icon: Search,
                },
                {
                    label: t('rail.items.myAssets'),
                    href: '/assets/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            label: t('rail.sections.mods'),
            icon: Hammer,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/mods',
                    icon: Compass,
                },
                { label: t('rail.items.add'), href: '/mods/add', icon: Plus },
                {
                    label: t('rail.items.browse'),
                    href: '/mods/browse',
                    icon: Search,
                },
                {
                    label: t('rail.items.myMods'),
                    href: '/mods/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            label: t('rail.sections.servers'),
            icon: Server,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/servers',
                    icon: Compass,
                },
                {
                    label: t('rail.items.add'),
                    href: '/servers/add',
                    icon: Plus,
                },
                {
                    label: t('rail.items.browse'),
                    href: '/servers/browse',
                    icon: Search,
                },
                // Just "Maps" — it already sits under the Servers section, and
                // the maps landing page carries its own browse button.
                {
                    label: t('rail.items.maps'),
                    href: '/servers/maps',
                    icon: Map,
                },
                {
                    label: t('rail.items.knowledgebase'),
                    href: KB,
                    icon: BookOpen,
                    external: true,
                },
                {
                    label: t('rail.items.myServers'),
                    href: '/servers/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            label: t('rail.sections.parties'),
            icon: Gamepad2,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/parties',
                    icon: Compass,
                },
                {
                    label: t('rail.items.add'),
                    href: '/parties/add',
                    icon: Plus,
                },
                {
                    label: t('rail.items.browse'),
                    href: '/parties/browse',
                    icon: Search,
                },
                {
                    label: t('rail.items.liveParties'),
                    href: '/parties/browse/?live=live',
                    icon: Gamepad2,
                },
                {
                    label: t('rail.items.friendParties'),
                    href: '/parties/browse/?friends=1&live=live',
                    icon: Users,
                    requiresAuth: true,
                },
                {
                    label: t('rail.items.myParties'),
                    href: '/parties/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            label: t('rail.sections.communities'),
            icon: Users,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/communities',
                    icon: Compass,
                },
                {
                    label: t('rail.items.add'),
                    href: '/communities/add',
                    icon: Plus,
                },
                {
                    label: t('rail.items.browse'),
                    href: '/communities/browse',
                    icon: Search,
                },
                {
                    label: t('rail.items.myCommunities'),
                    href: '/communities/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            label: t('rail.sections.articles'),
            icon: Newspaper,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/articles',
                    icon: Compass,
                },
                // The blog lives on this site, so it keeps the trailing slash
                // Astro's directory output serves it under.
                {
                    label: t('rail.items.blog'),
                    href: '/blog/',
                    icon: NotebookPen,
                },
                {
                    label: t('rail.items.add'),
                    href: '/articles/add',
                    icon: Plus,
                },
                {
                    label: t('rail.items.browse'),
                    href: '/articles/browse',
                    icon: Search,
                },
                {
                    label: t('rail.items.myArticles'),
                    href: '/articles/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            label: t('rail.sections.collections'),
            icon: Group,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/collections',
                    icon: Compass,
                },
                {
                    label: t('rail.items.add'),
                    href: '/collections/add',
                    icon: Plus,
                },
                {
                    label: t('rail.items.browse'),
                    href: '/collections/browse',
                    icon: Search,
                },
                {
                    label: t('rail.items.myCollections'),
                    href: '/collections/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            label: t('rail.sections.groups'),
            icon: Users,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/groups',
                    icon: Compass,
                },
                { label: t('rail.items.add'), href: '/groups/add', icon: Plus },
                {
                    label: t('rail.items.browse'),
                    href: '/groups/browse',
                    icon: Search,
                },
                {
                    label: t('rail.items.myGroups'),
                    href: '/groups/browse/?mine=1',
                    icon: User,
                    requiresAuth: true,
                },
            ],
        },
        {
            // The people pillar. "Users" is the member directory inside it, and
            // it sits BELOW Activity — the feed is what a reader opens this
            // section for.
            label: t('rail.sections.community'),
            icon: Users,
            items: [
                {
                    label: t('rail.items.overview'),
                    href: '/community',
                    icon: Compass,
                },
                {
                    label: t('rail.items.activity'),
                    href: '/community/activity',
                    icon: Activity,
                },
                {
                    label: t('rail.items.users'),
                    href: '/community/browse',
                    icon: Users,
                },
                {
                    label: t('rail.items.media'),
                    href: '/media/browse',
                    icon: Images,
                },
                {
                    label: t('rail.items.messages'),
                    href: '/messages',
                    icon: MessageSquare,
                    requiresAuth: true,
                },
                {
                    label: t('rail.items.myFriends'),
                    href: '/account/friends',
                    icon: UserCheck,
                    requiresAuth: true,
                },
            ],
        },
        {
            /*
             * External sources sit at the bottom on their own rather than under
             * Assets and Mods: one `ContentSource` table serves both kinds, so a
             * leaf under each would point at the same page twice.
             */
            label: t('rail.sections.sources'),
            icon: Puzzle,
            items: [
                {
                    label: t('rail.items.browse'),
                    href: '/sources',
                    icon: Search,
                },
            ],
        },
    ]
}
