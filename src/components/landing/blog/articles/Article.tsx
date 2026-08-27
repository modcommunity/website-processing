import type { HTMLAttributes } from "react";
import Tag from "./Tag"

import type { BlogArticle } from "../../../../lib/blog"

/** Enough to say what the post is about without wrapping to a third line. */
const MAX_TAGS = 4

type Chip = { label: string; kind: "tag" | "category" }

/**
 * The chips for one card: its categories, then its tags, capped.
 *
 * Categories lead because they are the coarser, more deliberate filing — city
 * files a post under "Server Hosting" once and tags it half a dozen ways — so
 * when the cap bites, the label that survives is the one that says most about
 * what the post is. A post with four categories therefore shows no tags, which
 * is the intended trade rather than an oversight.
 *
 * Deduped case-insensitively and ACROSS both lists, because a post filed under
 * "Modding" and tagged "modding" is the common case and two chips reading the
 * same word looks like a bug. First occurrence wins, so a duplicated label
 * keeps its category spelling — the taxonomy's own capitalisation.
 */
function chipsOf(article: BlogArticle): Chip[] {
    const out: Chip[] = []
    const seen = new Set<string>()

    const push = (label: string, kind: Chip["kind"]) => {
        const key = label.toLowerCase()

        if (seen.has(key)) return

        seen.add(key)
        out.push({ label, kind })
    }

    for (const c of article.categories) push(c, "category")
    for (const t of article.tags) push(t, "tag")

    return out.slice(0, MAX_TAGS)
}

type Props = {
    article: BlogArticle
}

export default function Article(props: Props & HTMLAttributes<HTMLDivElement>) {
    const { article, className } = props

    const { url, image, title, desc } = article

    const shown = chipsOf(article)

    return (
        <div className={`card min-h-110 group ${className ?? ""}`}>
            <div className="w-full h-48">
                <a href={url} target="_blank">
                    {image ? (
                        <img
                            src={image}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full brightness-75 group-hover:brightness-100 group-hover:duration-300 rounded-lg object-cover object-center"
                            alt={`${title} Banner Image`}
                        />
                    ) : (
                        /*
                         * A post with no art anywhere in its chain. A tinted
                         * panel reads as "no image yet"; a broken <img> reads as
                         * "this site is broken", and the API leaves `image` off
                         * often enough (a fresh post, a private upload) that
                         * this is a normal state rather than an error one.
                         */
                        <div
                            aria-hidden="true"
                            className="w-full h-full rounded-lg bg-linear-to-br from-surface-secondary to-accent/25 border border-border"
                        />
                    )}
                </a>
            </div>
            <div className="flex justify-center">
                <a href={url} target="_blank">
                    <h5>{title}</h5>
                </a>
            </div>
            <div>
                <p className="text-sm">{desc}</p>
            </div>
            <div className="grow" />
            <div className="flex justify-center">
                <a
                    href={url}
                    target="_blank"
                    className="btn btn-primary text-sm"
                >View</a>
            </div>
            {shown.length > 0 && (
                <div className="flex justify-center mt-2">
                    <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
                        {shown.map((c) => (
                            <Tag key={`${c.kind}-${c.label}`} kind={c.kind}>{c.label}</Tag>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
