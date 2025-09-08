"use client"

import type { ReactNode } from "react"

export default function Tag({
    className,
    children
} : {
    className?: string
    children: ReactNode
}) {
    return (
        <span className={`text-special-2 text-sm italic ${className ?? ""}`}>{"#"}{children}</span>
    )
}