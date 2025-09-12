"use client"

import { type ReactNode, useEffect, useState } from "react"

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import IconAndText from "../helper/IconAndText";
import { RiRoadMapFill } from "react-icons/ri";
import { FaCode, FaComments, FaDiscord } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";

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
            <header
                className="sticky top-0 w-full bg-header px-4 h-16"
                style={{
                    borderBottom: "1px solid var(--color-border-primary)"
                }}
            >
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
                        <div className="flex flex-col gap-2">
                            <TopLink url="/servers">Servers</TopLink>
                            <div className="flex flex-col gap-2 text-sm">
                                <a href="https://forum.moddingcommunity.com/c/server-browser/knowledgebase/81">
                                    <IconAndText
                                        icon={<IoIosInformationCircle className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Knowledgebase</span>
                                    </IconAndText>
                                </a>
                                <a href="https://github.com/modcommunity/roadmap/issues?q=is%3Aissue%20state%3Aopen%20label%3Aservers" target="_blank">
                                    <IconAndText
                                        icon={<RiRoadMapFill className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Roadmap</span>
                                    </IconAndText>
                                </a>
                                <a href="https://github.com/modcommunity/dev-issue-tracker/issues?q=is%3Aissue%20state%3Aopen%20label%3Aservers" target="_blank">
                                    <IconAndText
                                        icon={<FaCode className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Dev Tracker</span>
                                    </IconAndText>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">Community</span>
                            <div className="flex flex-col gap-2 text-sm">
                                <a href="https://github.com/modcommunity/roadmap/milestones" target="_blank">
                                    <IconAndText
                                        icon={<RiRoadMapFill className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Roadmap</span>
                                    </IconAndText>
                                </a>
                                <a href="https://github.com/modcommunity/dev-issue-tracker/issues" target="_blank">
                                    <IconAndText
                                        icon={<FaCode className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Dev Tracker</span>
                                    </IconAndText>
                                </a>
                                <a href="https://discord.moddingcommunity.com" target="_blank">
                                    <IconAndText
                                        icon={<FaDiscord className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Discord</span>
                                    </IconAndText>
                                </a>
                                <a href="https://blog.moddingcommunity.com">
                                    <IconAndText
                                        icon={<MdOutlineArticle className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Blog</span>
                                    </IconAndText>
                                </a>
                                <a href="https://forum.moddingcommunity.com">
                                    <IconAndText
                                        icon={<FaComments className="w-4 h-4 fill-white" />}
                                        className="gap-2"
                                    >
                                        <span>Forum</span>
                                    </IconAndText>
                                </a>
                            </div>
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