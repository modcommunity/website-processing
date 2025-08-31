"use client"

import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

export function DropdownMenu(props : {
    title: string | ReactNode
    children: ReactNode
    topOff?: number
    fixed?: boolean
    clickOnly?: boolean
    menuClassName?: string
    href?: string
    hrefNewTab?: boolean
} & HTMLAttributes<HTMLDivElement>) {
    const { title, children, className, fixed, clickOnly, menuClassName, href, hrefNewTab, topOff = 0 } = props
    const [menuOpen, setShowMenu] = useState(false)

    const triggerRef = useRef<HTMLDivElement | null>(null)
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })

    useEffect(() => {
        if (menuOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            
            setPos({
                top: rect.top + rect.height + (!fixed ? scrollY : 0) + topOff,
                left: rect.left + window.scrollX,
                width: rect.width,
            })
        }
    }, [menuOpen, fixed, topOff])

    const closeTimeout = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        if (closeTimeout.current)
            clearTimeout(closeTimeout.current)

        if (!clickOnly)
            setShowMenu(true)
    }

    const handleMouseLeave = () => {
        if (!clickOnly) {
            closeTimeout.current = setTimeout(() => {
                setShowMenu(false)
            }, 150)
        }
    }

    return (
        <div
            ref={triggerRef}
            className={`relative z-10 ${className ?? ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setShowMenu(p => !p)}
        >
            <div className="flex gap-1 items-center duration-150 cursor-pointer">
                {href ? (
                    <a href={href} target={hrefNewTab ? "_blank" : undefined}>{title}</a>
                ) : (
                    <span>{title}</span>
                )}
                <span>
                    {menuOpen ? (
                        <IoIosArrowUp />
                    ) : (
                        <IoIosArrowDown />
                    )}
                </span>
            </div>

            {menuOpen && (
                createPortal(
                    <div
                        className={`${fixed ? "fixed" : "absolute"} z-[10] ${menuClassName ?? ""}`}
                        style={{
                            top: pos.top,
                            left: pos.left,
                            minWidth: pos.width
                        }}
                    >
                        <div className="bg-item py-6 px-8 rounded-b border-1 border-border-secondary intersect-once intersect:motion-preset-slide-down-sm backdrop-blur-sm">
                            {children}
                        </div>
                    </div>
                , document.body)
            )}
        </div>
    )
}