"use client"

import type { AnchorHTMLAttributes } from "react";

export default function CLink (props : AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { children, className, ...rest } = props

    return (
        <a
            className={`special hover:!text-special-1-light hover:duration-300 ${className ?? ""}`}
            {...rest}
        >
            {children}
        </a>
    )
}