"use client"

import { IoIosWarning } from "react-icons/io"
import CLink from "../../helper/CLink"
import IconAndText from "../../helper/IconAndText"
import type { HTMLAttributes } from "react"

export default function InDevelopmentWarning(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <IconAndText
            icon={<IoIosWarning className="w-5 h-5 fill-yellow-500" />}
            {...props}
        >
            <span>We are currently under <span className="special">heavy development</span>. Community updates are often posted on our <CLink href="https://forum.moddingcommunity.com">forum</CLink>!</span>
        </IconAndText>
    )
}