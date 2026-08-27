"use client"

import type { ReactNode } from "react"

/**
 * One chip under an article card.
 *
 * Two kinds, rendered differently on purpose — the same distinction city's own
 * blog draws when it builds its shelves (`lib/article/blog/sections.ts` there):
 * a TAG is a free-form public label and is written `#name`, a CATEGORY is a
 * place in the taxonomy and is written as the proper noun it is. Prefixing a
 * category with a hash would claim it is a tag, and the two are separate
 * relations on the article.
 */
export default function Tag({
    kind = "tag",
    className,
    children
} : {
    kind?: "tag" | "category"
    className?: string
    children: ReactNode
}) {
    if (kind === "category")
        return (
            <span className={`text-muted text-sm ${className ?? ""}`}>{children}</span>
        )

    return (
        <span className={`text-special-2 text-sm italic ${className ?? ""}`}>{"#"}{children}</span>
    )
}
