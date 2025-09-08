
import type { HTMLAttributes } from "react";
import Tag from "./Tag"

import type { Article } from "../Articles"

export default function Article(props: Article & HTMLAttributes<HTMLDivElement>) {
    const { url, image, title, desc, tags = [], className } = props

    return (
        <div className={`card min-h-110 group ${className ?? ""}`}>
            <div className="w-full h-48">
                <a href={url} target="_blank">
                    <img
                        src={`/images/blog/article/${image}`}
                        className="w-full h-full brightness-75 group-hover:brightness-100 group-hover:duration-300 rounded-lg object-cover object-center"
                        alt={`${title} Banner Image`}
                    />
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
                    className="p-2 px-4 rounded-lg bg-btn-primary ring-1 ring-border-secondary hover:bg-btn-primary-hover hover:ring-border-primary hover:duration-300"
                >View</a>
            </div>
            {tags.length > 0 && (
                <div className="flex justify-center mt-2">
                    <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
                        {tags.map((t, k) => <Tag key={`tag-${k}`}>{t}</Tag> )}
                    </div>
                </div>
            )}
        </div>
    )
}