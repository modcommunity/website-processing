"use client"

import { type ReactNode, useState } from "react";
import { FaDiscord } from "react-icons/fa6";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import IconAndText from "../helper/IconAndText";

export default function HeaderDesktop() {
    return (
        <header
            className={`w-full bg-header px-4 py-4 h-16`}
            style={{
                borderBottom: "1px solid var(--color-border-primary)"
            }}
        >
            <div className="container mx-auto h-full">
                <div className="flex justify-between gap-10">
                    <div className="flex gap-8 items-center">
                        <div>
                            <a href="/">
                                <img
                                    src={"https://moddingcommunity.com/public/banner.png"}
                                    width={400}
                                    height={144}
                                    className="w-20 h-8"
                                    alt="banner"
                                />
                            </a>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <a
                                href="/"
                                className="nav-active"
                            >Home</a>
                            <a href="/apps">Apps</a>
                            <a href="/servers">Servers</a>
                            <DropdownMenu title="Community">
                                <div className="flex flex-col gap-4">
                                    <a href="https://discord.moddingcommunity.com" target="_blank">
                                        <IconAndText
                                            icon={<FaDiscord />}
                                        >
                                            <span>Discord</span>
                                        </IconAndText>
                                    </a>
                                    <a href="https://blog.moddingcommunity.com">
                                        <IconAndText
                                            icon={<MdOutlineArticle />}
                                        >
                                            <span>Blog</span>
                                        </IconAndText>
                                    </a>
                                    <a href="https://forum.moddingcommunity.com">
                                        <IconAndText
                                            icon={<FaComments />}
                                        >
                                            <span>Forum</span>
                                        </IconAndText>
                                    </a>
                                </div>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function DropdownMenu({
    title,
    children
} : {
    title: string | ReactNode
    children: ReactNode
}) {
    const [menuOpen, setShowMenu] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
            onClick={() => setShowMenu(p => !p)}
        >
            <div className="flex gap-1 items-center duration-150 cursor-pointer">
                <span>{title}</span>
                <span>
                    {menuOpen ? (
                        <IoIosArrowUp />
                    ) : (
                        <IoIosArrowDown />
                    )}
                </span>
            </div>

            {menuOpen && (
                <div className="absolute left-0 z-200 pt-6">
                    <div className="py-6 px-8 rounded-b bg-item border-1 border-t-0 border-border-secondary intersect-once intersect:motion-preset-slide-up-sm backdrop-blur-sm">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}