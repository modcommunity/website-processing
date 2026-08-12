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
    Users,
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
    MessagesSquare,
    UserCheck,
    Lightbulb,
    Mail,
    Bug,
    ScrollText,
} from 'lucide-react'
// lucide dropped brand marks, so Discord stays on react-icons — website-city
// makes the same exception.
import { FaDiscord } from 'react-icons/fa6'
import type { NavItem, NavLeaf, NavSection, FooterColumn } from '@modcommunity/shared'
import type { TFunc } from './t'

// All destinations live on website-city, served under the same domain, so
// internal links are plain relative paths.
const DISCORD = 'https://discord.moddingcommunity.com'
// Our own roadmap board on website-city, not the GitHub milestones page it used
// to be — city moved to it and this catalogue mirrors city.
const ROADMAP = '/roadmap'
const FEEDBACK = '/feedback'
// City's own changelog (what shipped) and bug tracker (defect reports, which
// used to be a feedback type). Both sit beside the roadmap and the feedback
// board in city's Resources menu and in its footer, so they do here too.
const CHANGELOG = '/changelog'
const BUGS = '/bugs'
// City's own contact page (`CONTACT_URL` there), not a mailto — the page
// carries the address, the Discord invite and the staff directory.
const CONTACT = '/contact'

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
                    // The site-wide board. Sits right after the member
                    // directory, as in city: both are the people side of the
                    // site, one the who and the other the what-they-are-saying.
                    label: t('nav.discussions.label'),
                    href: '/discussions',
                    icon: MessagesSquare,
                    desc: t('nav.discussions.desc'),
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
                    // City's own feedback board — suggestions and votes. Beside
                    // the roadmap on purpose: one says what is planned, the
                    // other is where people ask for things to be.
                    label: t('nav.feedback.label'),
                    href: FEEDBACK,
                    icon: Lightbulb,
                    desc: t('nav.feedback.desc'),
                },
                {
                    // The site's own changelog — what actually shipped. It sits
                    // with the roadmap (what is planned) and feedback (what is
                    // asked for), which is the order those three are read in.
                    label: t('nav.changelog.label'),
                    href: CHANGELOG,
                    icon: ScrollText,
                    desc: t('nav.changelog.desc'),
                },
                {
                    // The bug tracker, which is where defect reports go now:
                    // they were previously a feedback type, and a report that
                    // needs steps to reproduce, a severity and a confirmed queue
                    // has nothing in common with "please add dark mode".
                    label: t('nav.bugs.label'),
                    href: BUGS,
                    icon: Bug,
                    desc: t('nav.bugs.desc'),
                },
                {
                    // City's contact page — email, Discord and the staff
                    // directory. Lives on website-city like everything else
                    // under this menu, so a plain relative path.
                    label: t('nav.contact.label'),
                    href: CONTACT,
                    icon: Mail,
                    desc: t('nav.contact.desc'),
                },
                // The GitHub dev-issue tracker used to sit here, and is gone
                // from city's Resources menu too: feedback and the roadmap
                // above it are the two boards we want people on, and both live
                // on the site.
            ],
        },
    ]
}

/**
 * Footer quick-link columns — a mirror of website-city's `FOOTER_LINKS`
 * (`src/app/_components/ui/shell/nav-config.ts`), which is the source of truth
 * for the columns, their entries and their order. Labels come from `footer.*`,
 * ported verbatim from city's `locales/<lang>/footer.json`, so both footers read
 * identically in every locale.
 *
 * The socials row and the brand mark beside these columns are the shared
 * <Footer/>'s own defaults, which already carry city's accounts and hover
 * colours — so neither is passed here.
 *
 * If city's FOOTER_LINKS changes, change this with it.
 */
export function buildFooterColumns(t: TFunc): FooterColumn[] {
    return [
        {
            heading: t('footer.headings.explore'),
            links: [
                { label: t('footer.links.apps'), href: '/apps' },
                { label: t('footer.links.assets'), href: '/assets' },
                { label: t('footer.links.mods'), href: '/mods' },
                { label: t('footer.links.servers'), href: '/servers' },
                { label: t('footer.links.parties'), href: '/parties' },
                {
                    label: t('footer.links.communities'),
                    href: '/communities',
                },
                {
                    label: t('footer.links.collections'),
                    href: '/collections',
                },
                { label: t('footer.links.groups'), href: '/groups' },
                // The member directory, not the column heading above it — city
                // names this link "Community" as well.
                { label: t('footer.links.community'), href: '/community' },
                { label: t('footer.links.banners'), href: '/banners' },
            ],
        },
        {
            heading: t('footer.headings.community'),
            links: [
                {
                    label: t('footer.links.discord'),
                    href: DISCORD,
                    external: true,
                },
                // The blog lives on this site, so it keeps the trailing slash
                // Astro's directory output serves it under.
                { label: t('footer.links.blog'), href: '/blog/' },
                {
                    label: t('footer.links.activity'),
                    href: '/community/activity',
                },
                {
                    label: t('footer.links.discussions'),
                    href: '/discussions',
                },
                { label: t('footer.links.media'), href: '/media/browse' },
                { label: t('footer.links.contact'), href: CONTACT },
            ],
        },
        {
            /*
             * The header's Resources menu, in the footer.
             *
             * Everything under that menu was reachable from the header and from
             * nowhere else — the changelog, the roadmap, the feedback board and
             * the bug tracker are the four pages a reader goes looking for once
             * they want to know what shipped, what is planned, ask for
             * something or report something. The menu's other entries (Discord,
             * blog, community, discussions, banners, contact) are already in the
             * columns beside this one.
             */
            heading: t('footer.headings.resources'),
            links: [
                { label: t('footer.links.changelog'), href: CHANGELOG },
                { label: t('footer.links.roadmap'), href: ROADMAP },
                { label: t('footer.links.feedback'), href: FEEDBACK },
                { label: t('footer.links.bugs'), href: BUGS },
            ],
        },
        {
            heading: t('footer.headings.legal'),
            links: [
                { label: t('footer.links.tos'), href: '/tos' },
                { label: t('footer.links.privacy'), href: '/privacy-policy' },
                { label: t('footer.links.licenses'), href: '/licenses' },
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
                    desc: t('rail.pillars.apps.overview'),
                },
                {
                    label: t('rail.items.browse'),
                    href: '/apps/browse',
                    icon: Search,
                    desc: t('rail.pillars.apps.browse'),
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
                    desc: t('rail.pillars.assets.overview'),
                },
                {
                    label: t('rail.items.add'),
                    href: '/assets/add',
                    icon: Plus,
                    desc: t('rail.pillars.assets.add'),
                },
                {
                    label: t('rail.items.browse'),
                    href: '/assets/browse',
                    icon: Search,
                    desc: t('rail.pillars.assets.browse'),
                },
                {
                    label: t('rail.items.myAssets'),
                    href: '/assets/browse/?mine=1',
                    icon: User,
                    desc: t('rail.pillars.assets.mine'),
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
                    desc: t('rail.pillars.mods.overview'),
                },
                {
                    label: t('rail.items.add'),
                    href: '/mods/add',
                    icon: Plus,
                    desc: t('rail.pillars.mods.add'),
                },
                {
                    label: t('rail.items.browse'),
                    href: '/mods/browse',
                    icon: Search,
                    desc: t('rail.pillars.mods.browse'),
                },
                {
                    label: t('rail.items.myMods'),
                    href: '/mods/browse/?mine=1',
                    icon: User,
                    desc: t('rail.pillars.mods.mine'),
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
                    desc: t('rail.pillars.servers.overview'),
                },
                {
                    label: t('rail.items.add'),
                    href: '/servers/add',
                    icon: Plus,
                    desc: t('rail.pillars.servers.add'),
                },
                {
                    label: t('rail.items.browse'),
                    href: '/servers/browse',
                    icon: Search,
                    desc: t('rail.pillars.servers.browse'),
                },
                // Just "Maps" — it already sits under the Servers section, and
                // the maps landing page carries its own browse button.
                {
                    label: t('rail.items.maps'),
                    href: '/servers/maps',
                    icon: Map,
                    desc: t('rail.pillars.servers.maps'),
                },
                // The forum's Knowledgebase leaf used to sit here, and is
                // gone from city's rail too until the FAQ section replacing it
                // exists.
                {
                    label: t('rail.items.myServers'),
                    href: '/servers/browse/?mine=1',
                    icon: User,
                    desc: t('rail.pillars.servers.mine'),
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
                    desc: t('rail.pillars.parties.overview'),
                },
                {
                    label: t('rail.items.add'),
                    href: '/parties/add',
                    icon: Plus,
                    desc: t('rail.pillars.parties.add'),
                },
                {
                    label: t('rail.items.browse'),
                    href: '/parties/browse',
                    icon: Search,
                    desc: t('rail.pillars.parties.browse'),
                },
                {
                    label: t('rail.items.liveParties'),
                    href: '/parties/browse/?live=live',
                    icon: Gamepad2,
                    desc: t('rail.pillars.parties.live'),
                },
                {
                    label: t('rail.items.friendParties'),
                    href: '/parties/browse/?friends=1&live=live',
                    icon: Users,
                    desc: t('rail.pillars.parties.friends'),
                    requiresAuth: true,
                },
                {
                    label: t('rail.items.myParties'),
                    href: '/parties/browse/?mine=1',
                    icon: User,
                    desc: t('rail.pillars.parties.mine'),
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
