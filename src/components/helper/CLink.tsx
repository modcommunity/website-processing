"use client"

import type { AnchorHTMLAttributes } from "react";

export default function CLink (props : AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { children, className, ...rest } = props

    // break-words, because link text is the one place an unbreakable token is
    // routine: a bare email address or URL used as its own label. The ToS and
    // privacy policy both render `contact@moddingcommunity.com` this way, 27
    // characters with no break opportunity, and at 320px that one token was
    // wider than its column — which widens the column, not the link, and puts a
    // horizontal scrollbar on the whole document. It reproduced on
    // /tos and /privacy-policy in all nine languages, because the address is the
    // same in all nine.
    //
    // This only takes effect when a word cannot fit; links whose text already
    // fits are laid out identically, so it is safe to apply to every CLink
    // rather than only the ones known to overflow today.
    return (
        <a
            className={`special hover:!text-special-1-light hover:duration-300 break-words ${className ?? ""}`}
            {...rest}
        >
            {children}
        </a>
    )
}