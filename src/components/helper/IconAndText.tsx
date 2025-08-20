"use client"

import type { HTMLAttributes, ReactNode } from "react";

type CustomProps = {
    icon: string | ReactNode
    children: ReactNode
    vertical?: boolean
}

export default function IconAndText(props: HTMLAttributes<HTMLDivElement> & CustomProps) {
    const { icon, children, vertical, className, ...rest } = props

    return (
        <div className={`flex items-center gap-1 ${vertical ? "flex-col" : ""} ${className ?? ""}`} {...rest}>
            <div>
                {icon}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}