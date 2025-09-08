"use client"

import type { ReactNode } from "react"

import Carousel, { type ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CustomCarousel({
    responsive,
    children
} : {
    responsive: ResponsiveType
    children: ReactNode
}) {
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            ssr={true}
            itemClass="p-2 intersect-once intersect:sm:motion-preset-expand"
        >
            {children}
        </Carousel>
    )
}