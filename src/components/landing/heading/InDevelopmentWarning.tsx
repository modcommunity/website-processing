"use client"

import { TriangleAlert } from "lucide-react"
import IconAndText from "../../helper/IconAndText"
import type { HTMLAttributes } from "react"

const DEFAULT_HTML =
    'We are currently under <span class="special">heavy development</span>. Community updates are often posted on our <a href="https://moddingcommunity.com/blog/" class="special hover:!text-special-2 hover:duration-300">blog</a>!'

type Props = HTMLAttributes<HTMLDivElement> & { html?: string }

export default function InDevelopmentWarning({ html, ...props }: Props) {
    return (
        <IconAndText
            icon={<TriangleAlert className="w-5 h-5 text-yellow-500" />}
            {...props}
        >
            <span dangerouslySetInnerHTML={{ __html: html ?? DEFAULT_HTML }} />
        </IconAndText>
    )
}