"use client"

import { FaFacebook, FaGithub, FaInstagram, FaSteam, FaTwitter } from "react-icons/fa6";
import { type ReactNode } from "react";

const ICON_SIZE = "24px"

export default function FooterFollowUs() {
    return (
        <div className="p-4">
            <div className="flex flex-col gap-4 items-center">
                <h5>Follow Us!</h5>
                <div className="flex gap-2 flex-wrap">
                    <Item
                        icon={<FaSteam size={ICON_SIZE} />}
                        link="https://steamcommunity.com/groups/moddingcommunity"  
                    />
                    <Item
                        icon={<FaGithub size={ICON_SIZE} />}
                        link="https://github.com/modcommunity"  
                    />
                    <Item
                        icon={<FaTwitter size={ICON_SIZE} />}
                        link="https://x.com/modcommunity_"
                    />
                    <Item
                        icon={<FaInstagram size={ICON_SIZE} />}
                        link="https://instagram.com/modcommunity_"
                    />
                    <Item
                        icon={<FaFacebook size={ICON_SIZE} />}
                        link="https://facebook.com/modcommunity"
                    />
                </div>
            </div>
        </div>
    )
}

function Item({
    icon,
    link
} : {
    icon: ReactNode,
    link: string
}) {
    return (
        <a
            href={link}
            target="_blank"
            className="opacity-50 hover:opacity-100"
        >
            {icon}
        </a>
    )
}