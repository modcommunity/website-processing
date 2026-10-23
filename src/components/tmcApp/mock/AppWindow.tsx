import { useState } from 'react'
import { BookOpen, Box, Compass, Download, Ellipsis, LayoutGrid, Layers, Play, Server, Settings, SquareTerminal, Store, Terminal, User, Users } from 'lucide-react'
import type { ComponentType } from 'react'
import { DiscoverScreen, DownloadsScreen, PlayScreen, RconScreen, SandboxesScreen, ServersScreen } from './screens'
import { useInterval, useMotion } from './motion'

export type ScreenId = 'apps' | 'play' | 'servers' | 'sandboxes' | 'downloads' | 'rcon'

type Item = { id: string; label: string; icon: ComponentType<{ className?: string }>; sub?: boolean }

// The sidebar, as the real app lays it out: Play, Discover (Apps, Mods, Assets,
// Servers, RCON), Library (Sandboxes, Downloads, Stores), Friends, Console, Settings.
const SIDEBAR: Item[] = [
    { id: 'play', label: 'Play', icon: Play },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'apps', label: 'Apps', icon: LayoutGrid, sub: true },
    { id: 'mods', label: 'Mods', icon: Box, sub: true },
    { id: 'servers', label: 'Servers', icon: Server, sub: true },
    { id: 'rcon', label: 'RCON', icon: SquareTerminal, sub: true },
    { id: 'more', label: 'More', icon: Ellipsis, sub: true },
    { id: 'library', label: 'Library', icon: Download },
    { id: 'sandboxes', label: 'Sandboxes', icon: Layers, sub: true },
    { id: 'downloads', label: 'Downloads', icon: Download, sub: true },
    { id: 'stores', label: 'Stores', icon: Store, sub: true },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'console', label: 'Console', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
]

const SCREENS: Record<ScreenId, ComponentType<{ motion: boolean }>> = {
    apps: DiscoverScreen,
    play: PlayScreen,
    servers: ServersScreen,
    sandboxes: SandboxesScreen,
    downloads: DownloadsScreen,
    rcon: RconScreen,
}

type Props = {
    /** Screens to show; with `autoplay` the window walks through them. */
    screens: ScreenId[]
    /** Controlled screen. When set, `autoplay` is ignored. */
    active?: ScreenId
    autoplay?: boolean
    /** Accessible name; the drawing itself is decorative. */
    caption?: string
}

/**
 * The app window drawing. Decorative (aria-hidden): the page's own copy makes
 * every claim, the window only shows it. Opens its own `@container`, so the
 * sidebar collapses to icons and the dense columns drop out in a narrow column
 * (no viewport breakpoints; docs/layout.md).
 */
export default function AppWindow({ screens, active, autoplay = false, caption }: Props) {
    const motion = useMotion()
    const [i, setI] = useState(0)
    useInterval(() => setI((x) => (x + 1) % screens.length), 5600, motion && autoplay && active === undefined)
    const current: ScreenId = active ?? screens[i % screens.length]
    const Screen = SCREENS[current]

    // "Discover" and "Library" light up with their children.
    const lit = new Set<string>([current])
    if (current === 'apps' || current === 'servers' || current === 'rcon') lit.add('discover')
    if (current === 'sandboxes' || current === 'downloads') lit.add('library')

    return (
        <div className="@container min-w-0">
            <div aria-hidden className="overflow-hidden rounded-2xl border border-white/12 bg-[#070913] shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-3 py-1.5">
                    <span className="text-[0.62rem] text-white/60">The Modding Community</span>
                    <span className="ml-auto flex gap-3 text-white/35">
                        <span className="h-px w-2.5 translate-y-1.5 bg-current" />
                        <span className="h-2.5 w-2.5 rounded-[2px] border border-current" />
                        <span className="text-[0.7rem] leading-none">×</span>
                    </span>
                </div>
                <div className="flex h-[22rem] @3xl:h-[26rem]">
                    <nav className="flex w-11 shrink-0 flex-col gap-0.5 border-r border-white/8 bg-white/[0.015] p-1.5 @xl:w-40">
                        <div className="mb-1.5 flex h-7 items-center justify-center @xl:justify-start @xl:px-2">
                            <span className="font-black tracking-tight text-white">
                                <span className="text-white/50">{'</>'}</span>
                                <span className="hidden @xl:inline"> TMC</span>
                            </span>
                        </div>
                        {SIDEBAR.map(({ id, label, icon: Icon, sub }) => {
                            const on = lit.has(id)
                            const strong = id === current
                            return (
                                <span
                                    key={id}
                                    className={`flex items-center justify-center gap-2 rounded-md px-1.5 py-1 text-[0.66rem] transition-colors duration-500 @xl:justify-start ${sub ? '@xl:ml-3' : ''} ${sub && !strong ? 'hidden @xl:flex' : ''} ${strong ? 'bg-[#4f6bd8] text-white shadow-[0_0_16px_-2px] shadow-[#4f6bd8]/60' : on ? 'bg-white/[0.06] text-white/90' : 'text-white/55'}`}
                                >
                                    <Icon className="h-3.5 w-3.5 shrink-0" />
                                    <span className="hidden @xl:inline">{label}</span>
                                </span>
                            )
                        })}
                        {/* In the icon-only rail, the sub-items that matter still show. */}
                        <span className="mt-auto flex items-center justify-center gap-2 px-1.5 py-1 text-[0.66rem] text-white/45 @xl:justify-start">
                            <User className="h-3.5 w-3.5" />
                            <span className="hidden @xl:inline">Account</span>
                        </span>
                    </nav>
                    <div className="min-w-0 flex-1 overflow-hidden">
                        <Screen key={current} motion={motion} />
                    </div>
                </div>
            </div>
            {caption && <p className="mt-2 text-center text-[0.65rem] text-white/45">{caption}</p>}
        </div>
    )
}
