"use client"

import { type ReactNode, useEffect, useState } from "react"

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

export default function HeaderMobile() {

    const [showMenu, setShowMenu] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [animateIn, setAnimateIn] = useState(false)

    useEffect(() => {
        if (menuOpen)
            setShowMenu(true)
        else {
            setAnimateIn(false)

            const to = setTimeout(() => setShowMenu(false), 300);
            return () => clearTimeout(to)
        }
    }, [menuOpen])

    useEffect(() => {
        if (showMenu) {
            requestAnimationFrame(() => {
                setAnimateIn(true)
            })
        }
    }, [showMenu])

    return (
        <>
            <header className="sticky top-0 w-full bg-header px-4 h-16">
                <div className="h-full">
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="cursor-pointer"
                            >
                                <GiHamburgerMenu className="w-10 h-10" />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <a href="/">
                                <img
                                    src="https://moddingcommunity.com/public/icon.png"
                                    width={50}
                                    height={50}
                                    className="w-10 h-10"
                                    alt="icon"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            {showMenu && (
                <div className={`z-100 fixed top-0 left-0 w-1/2 h-full bg-item ring-1 ring-border-secondary flex flex-col gap-6 transition-transform duration-300 ease-in-out ${animateIn  ? "translate-x-0" : "-translate-x-full"} p-4`}>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="cursor-pointer"
                        >
                            <IoCloseSharp className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <TopLink url="/" active={true}>Home</TopLink>
                        <TopLink url="/apps">Apps</TopLink>
                        <TopLink url="/servers">Servers</TopLink>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">Community</span>
                            <a href="https://blog.moddingcommunity.com">Blog</a>
                            <a href="https://forum.moddingcommunity.com">Forum</a>
                            <a href="https://discord.moddingcommunity.com">Discord Server</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function TopLink({
    url,
    active = false,
    children
} : {
    url: string
    active?: boolean
    children: ReactNode
}) {
    return (
        <a
            href={url}
            className={active ? "font-bold text-white" : undefined}
        >
            {children}
        </a>
    )
}