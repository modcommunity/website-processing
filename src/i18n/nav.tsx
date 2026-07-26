import {
    Home,
    Boxes,
    Cog,
    Hammer,
    Server,
    MessagesSquare,
    Newspaper,
    Map,
    Search,
    Compass,
    Scroll,
    Code2,
    Users,
    BookOpen,
    NotebookPen,
    FolderKey,
} from 'lucide-react'
// lucide dropped brand marks, so Discord stays on react-icons — website-city
// makes the same exception.
import { FaDiscord } from 'react-icons/fa6'
import type { NavItem, NavSection, FooterColumn } from '@modcommunity/shared'
import type { TFunc } from './t'

// All destinations live on website-city, served under the same domain, so
// internal links are plain relative paths.
const FORUM = 'https://forum.moddingcommunity.com/'
const DISCORD = 'https://discord.moddingcommunity.com'
const ROADMAP = 'https://github.com/modcommunity/roadmap/milestones'
const KB = 'https://forum.moddingcommunity.com/c/server-browser/knowledgebase/81'

const DEV_TRACKER = 'https://github.com/modcommunity/dev-issue-tracker/issues'

/**
 * Header primary nav — a mirror of website-city's `PRIMARY_NAV`: the same five
 * top-level links plus the hrefless "Resources" dropdown, in the same order,
 * with the same icons and the same sub-labels. Labels/descriptions come from
 * `nav.*`, ported verbatim from city's `locales/<lang>/nav.json`, so both
 * headers read identically in every locale.
 *
 * If city's PRIMARY_NAV changes, change this with it — that config is the
 * source of truth.
 */
export function buildNav(t: TFunc): NavItem[] {
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
        },
        {
            label: t('nav.assets.label'),
            href: '/assets',
            icon: Cog,
            desc: t('nav.assets.desc'),
        },
        {
            label: t('nav.mods.label'),
            href: '/mods',
            icon: Hammer,
            desc: t('nav.mods.desc'),
        },
        {
            label: t('nav.servers.label'),
            href: '/servers/browse',
            icon: Server,
            desc: t('nav.servers.desc'),
        },
        {
            // No href: a dropdown-only trigger, exactly as in website-city.
            label: t('nav.resources.label'),
            icon: FolderKey,
            desc: t('nav.resources.desc'),
            children: [
                {
                    label: t('nav.blog.label'),
                    href: '/blog/',
                    icon: Newspaper,
                    desc: t('nav.blog.desc'),
                },
                {
                    label: t('nav.forum.label'),
                    href: FORUM,
                    icon: MessagesSquare,
                    desc: t('nav.forum.desc'),
                    external: true,
                },
                {
                    label: t('nav.discord.label'),
                    href: DISCORD,
                    icon: FaDiscord,
                    desc: t('nav.discord.desc'),
                    external: true,
                },
                {
                    label: t('nav.users.label'),
                    href: '/users',
                    icon: Users,
                    desc: t('nav.users.desc'),
                },
                {
                    label: t('nav.roadmap.label'),
                    href: ROADMAP,
                    icon: Map,
                    desc: t('nav.roadmap.desc'),
                    external: true,
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
                { label: t('common.servers'), href: '/servers/browse' },
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

/** Primary sidebar sections, translated via `t`. */
export function buildSidebarSections(t: TFunc): NavSection[] {
    return [
        { items: [{ label: t('common.home'), href: '/', icon: Home }] },
        {
            label: t('sections.discover'),
            icon: Compass,
            items: [
                { label: t('common.apps'), href: '/apps', icon: Boxes },
                { label: t('common.assets'), href: '/assets', icon: Cog },
                { label: t('common.mods'), href: '/mods', icon: Hammer },
                { label: t('common.servers'), href: '/servers/browse', icon: Server },
            ],
        },
        {
            label: t('sections.community'),
            icon: Users,
            items: [
                // website-city's sidebar uses NotebookPen for the blog entry and
                // Newspaper in the header dropdown; mirrored here so both shells
                // read identically.
                { label: t('common.blog'), href: '/blog/', icon: NotebookPen },
                { label: t('common.forum'), href: FORUM, icon: MessagesSquare, external: true },
                { label: t('common.discord'), href: DISCORD, icon: FaDiscord, external: true },
                { label: t('common.roadmap'), href: ROADMAP, icon: Map, external: true },
            ],
        },
        {
            label: t('sections.legal'),
            icon: Scroll,
            items: [
                { label: t('common.tos'), href: '/tos', icon: Scroll },
                { label: t('common.privacy'), href: '/privacy-policy', icon: Scroll },
                { label: t('common.licenses'), href: '/licenses', icon: Code2 },
            ],
        },
    ]
}
