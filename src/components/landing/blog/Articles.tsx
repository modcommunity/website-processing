"use client"

import "react-multi-carousel/lib/styles.css";
import CarouselComponent from "react-multi-carousel";

// @ts-ignore
const Carousel = CarouselComponent.default || CarouselComponent;

import Article from "./articles/Article"
import type { HTMLAttributes } from "react"

import { ChevronLeft, ChevronRight, Hammer, Server } from "lucide-react";
import IconAndText from "../../helper/IconAndText";


/**
 * Carousel arrow.
 *
 * react-multi-carousel's built-in arrows are a translucent black disc whose
 * glyph comes from a bundled icon font ("revicons") — they read as a smudge
 * over the card underneath and match nothing else on the site. These are plain
 * themed buttons with the same lucide chevrons the rest of the shell uses; the
 * library clones the element and injects `onClick`, so the props arrive from it
 * rather than from the call site.
 */
function Arrow({
    dir,
    label,
    onClick,
}: {
    dir: "left" | "right"
    label: string
    onClick?: () => void
}) {
    const Icon = dir === "left" ? ChevronLeft : ChevronRight

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/95 text-foreground shadow-lg backdrop-blur transition-colors hover:border-accent hover:text-accent ${
                dir === "left" ? "left-0" : "right-0"
            }`}
        >
            <Icon className="h-5 w-5" />
        </button>
    )
}


type Props = {
    itemClassName?: string

    // User-visible labels, translated + passed in from Blog.astro (which has
    // access to Astro.currentLocale). English defaults keep the island usable
    // on its own. Values are HTML fragments (they carry an inline
    // <span class="special">…</span>), so they render via dangerouslySetInnerHTML.
    moddingGuidesHtml?: string
    serverGuidesHtml?: string

    // Accessible names for the carousel arrows.
    prevLabel?: string
    nextLabel?: string
}

export type ArticleType = {
    url: string
    image: string
    title: string
    desc: string

    tags?: string[]
}

export default function Articles(props : Props & HTMLAttributes<HTMLDivElement>) {
    const {
        itemClassName,
        className,
        moddingGuidesHtml = 'Check out some of our modding <span class="special">how-to</span> guides!',
        serverGuidesHtml = 'Check out some of our server <span class="special">setup</span> guides!',
        prevLabel = 'Previous articles',
        nextLabel = 'Next articles',
    } = props

    /*
     * Responsive settings for the carousel.
     *
     * The top entry is deliberately *unbounded*. react-multi-carousel picks a
     * breakpoint with `window.innerWidth >= min && <= max` and, when nothing
     * matches, leaves slidesToShow at 0 — which makes it render no slides at
     * all, i.e. the whole carousel silently disappears. The old map stopped at
     * `max: 4000`, so any viewport wider than that (an ultra-wide monitor, or a
     * zoomed-out window) got a blank gap where the articles should be.
     *
     * The tiers below collapse the old nine breakpoints, which only ever
     * resolved to four distinct item counts.
     */
    const responsive = {
        'ultrawide': {
            breakpoint: { max: Number.MAX_SAFE_INTEGER, min: 2160 },
            items: 4
        },
        'desktop': {
            breakpoint: { max: 2160, min: 1278 },
            items: 3
        },
        'tablet': {
            breakpoint: { max: 1278, min: 1030 },
            items: 2
        },
        'mobile': {
            breakpoint: { max: 1030, min: 0 },
            items: 1
        }
    }

    const articlesModding: ArticleType[] = [
        {
            url: "https://moddingcommunity.com/blog/how-to-install-mods-for-the-witcher-3/",
            image: "tw3_how_to_mod.png",
            title: "How To Install Mods In The Witcher 3",
            desc: "A guide on how to download and install mods in The Witcher 3 (Wild Hunt) on PC.",
            tags: ["tw3", "modding", "how-to"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-to-download-install-mods-in-skyrim/",
            image: "skyrim_how_to_mod.jpg",
            title: "How To Install Mods In Skyrim",
            desc: "A full guide on how to download and install mods in Skyrim on PC using mod managers like Vortex.",
            tags: ["skyrim", "modding", "how-to"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-to-install-mods-in-rdr2/",
            image: "rdr2_how_to_mod.jpg",
            title: "How To Install Mods In RDR2",
            desc: "A guide on how to install mods in Red Dead Redemption 2 (RDR2) on PC, including instructions on how to use a popular mod loader, Lenny's Mod Loader (LML).",
            tags: ["rdr2", "modding", "lml", "how-to"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-to-download-install-mods-in-minecraft/",
            image: "mc_how_to_mod.png",
            title: "How To Install Mods In MC",
            desc: "A full guide on how to download and install mods in Minecraft including how to use Forge and Fabric.",
            tags: ["minecraft", "modding", "how-to"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-to-download-install-mods-in-halo-mcc/",
            image: "halo_how_to_mod.png",
            title: "How To Install Mods In Halo: MCC",
            desc: "A full guide on how to download and install mods in Halo: Master Chief Collection (Halo: MCC) using Steam Workshop and Vortex.",
            tags: ["halo", "modding", "how-to"]
        }
    ]

    const articlesServer: ArticleType[] = [
        {
            url: "https://moddingcommunity.com/blog/how-to-set-up-a-rust-server/",
            image: "rust_how_to_set_up_server.png",
            title: "How To Set Up A Rust Game Server",
            desc: "A guide on how to set up a Rust game server.",
            tags: ["rust", "server", "setup"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-to-install-umod-onto-rust-servers/",
            image: "rust_how_to_install_umod.png",
            title: "How To Install uMod Onto Rust Servers",
            desc: "A guide on how to download and install uMod (Oxide) onto a Rust game server for Windows and Linux.",
            tags: ["rust", "umod", "server"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-set-up-a-minecraft-java-edition-server/",
            image: "mc_how_to_set_up_server.png",
            title: "How To Set Up A Minecraft Java Edition Server",
            desc: "A full guide on how to set up a Minecraft Java Edition server on both Windows and Linux (Debian 12).",
            tags: ["minecraft", "server", "setup"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-to-make-a-l4d2-server-with-mods/",
            image: "l4d2_how_to_set_up_server.jpg",
            title: "How To Make A L4D2 Server With Mods",
            desc: "A guide on how to create and run a Left 4 Dead 2 server with mods on both Windows and Linux.",
            tags: ["l4d2", "server", "mods", "setup"]
        },
        {
            url: "https://moddingcommunity.com/blog/how-to-make-a-gmod-server-install-mods-addons/",
            image: "gmod_how_to_set_up_server.png",
            title: "How To Make A GMod Server With Mods",
            desc: "A guide on how to set up a Garry's Mod server and download and install mods (addons) on both Windows and Linux.",
            tags: ["gmod", "server", "setup", "mods"]
        }
    ]
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <IconAndText
                    icon={<Hammer className="w-4 h-4 text-text-primary" />}
                >
                    <span dangerouslySetInnerHTML={{ __html: moddingGuidesHtml }} />
                </IconAndText>
                <Carousel
                    suppressHydrationWarning
                    className={` ${className ?? ""}`}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={14000}
                    ssr={true}
                    customLeftArrow={<Arrow dir="left" label={prevLabel} />}
                    customRightArrow={<Arrow dir="right" label={nextLabel} />}
                    itemClass={`p-6 ${itemClassName ?? ""} intersect-once intersect:sm:motion-preset-pop`}
                >
                    {articlesModding.map((a, k) => <Article key={`article-${k}`} {...a} /> )}
                </Carousel>
            </div>
            <div className="flex flex-col gap-2">
                <IconAndText
                    icon={<Server className="w-4 h-4 text-text-primary" />}
                >
                    <span dangerouslySetInnerHTML={{ __html: serverGuidesHtml }} />
                </IconAndText>
                <Carousel
                    suppressHydrationWarning
                    className={`${className ?? ""}`}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={10000}
                    ssr={true}
                    customLeftArrow={<Arrow dir="left" label={prevLabel} />}
                    customRightArrow={<Arrow dir="right" label={nextLabel} />}
                    itemClass={`p-6 ${itemClassName ?? ""} intersect-once intersect:sm:motion-preset-pop`}
                >
                    {articlesServer.map((a, k) => <Article key={`article-${k}`} {...a} /> )}
                </Carousel>
            </div>
        </div>
    )
}