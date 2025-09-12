"use client"

import { type ReactNode, useState } from "react";
import { FaCode, FaDiscord } from "react-icons/fa6";

import { IoIosArrowDown, IoIosArrowUp, IoIosInformationCircle } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import IconAndText from "../helper/IconAndText";
import { DropdownMenu } from "../helper/DropdownMenu";
import { RiRoadMapFill } from "react-icons/ri";

export default function HeaderDesktop() {
    return (
        <header
            className={`w-full bg-header px-4 h-16`}
            style={{
                borderBottom: "1px solid var(--color-border-primary)"
            }}
        >
            <div className="container mx-auto h-full">
                <div className="flex h-full justify-between gap-10">
                    <div className="flex gap-8 h-full items-center">
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
                        <div className="flex gap-6 text-sm h-full items-center">
                            <a
                                href="/"
                                className="nav-active"
                            >Home</a>
                            <a href="/apps">Apps</a>
                            <DropdownMenu title="Servers" href="/servers" className="flex items-center h-full" fixed={true}>
                                <div className="flex flex-col gap-4">
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
                            </DropdownMenu>
                            <DropdownMenu title="Community" className="flex items-center h-full" fixed={true}>
                                <div className="flex flex-col gap-4">
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
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}