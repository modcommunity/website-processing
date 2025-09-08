"use client"

import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel"

import Article from "./articles/Article"
import type { HTMLAttributes } from "react"

import { FaHammer } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import IconAndText from "../../helper/IconAndText";


type Props = {
    itemClassName?: string
}

export type Article = {
    url: string
    image: string
    title: string
    desc: string

    tags?: string[]
}

export default function Articles(props : Props & HTMLAttributes<HTMLDivElement>) {
    const { itemClassName, className } = props

    // Responsive settings for carousel.
    const responsive = {
        xl5: {
            breakpoint: { max: 4000, min: 3167 },
            items: 4
        },
        xl4: {
            breakpoint: { max: 3167, min: 2832 },
            items: 4
        },
        xl3: {
            breakpoint: { max: 2832, min: 2496 },
            items: 4
        },
        xl2: {
            breakpoint: { max: 2496, min: 2160 },
            items: 4
        },
        xl: {
            breakpoint: { max: 2160, min: 1844 },
            items: 3
        },
        lg: {
            breakpoint: { max: 1844, min: 1488 },
            items: 3
        },
        md: {
            breakpoint: { max: 1488, min: 1278 },
            items: 3
        },
        sm: {
            breakpoint: { max: 1278, min: 1030 },
            items: 2
        },
        xs: {
            breakpoint: { max: 1030, min: 0 },
            items: 1
        }
    }

    const articlesModding: Article[] = [
        {
            url: "https://blog.moddingcommunity.com/how-to-install-mods-for-the-witcher-3",
            image: "tw3_how_to_mod.png",
            title: "How To Install Mods In The Witcher 3",
            desc: "A guide on how to download and install mods in The Witcher 3 (Wild Hunt) on PC.",
            tags: ["tw3", "modding", "how-to"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-to-download-install-mods-in-skyrim",
            image: "skyrim_how_to_mod.jpg",
            title: "How To Install Mods In Skyrim",
            desc: "A full guide on how to download and install mods in Skyrim on PC using mod managers like Vortex.",
            tags: ["skyrim", "modding", "how-to"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-to-install-mods-in-rdr2",
            image: "rdr2_how_to_mod.jpg",
            title: "How To Install Mods In RDR2",
            desc: "A guide on how to install mods in Red Dead Redemption 2 (RDR2) on PC, including instructions on how to use a popular mod loader, Lenny's Mod Loader (LML).",
            tags: ["rdr2", "modding", "lml", "how-to"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-to-download-install-mods-in-minecraft",
            image: "mc_how_to_mod.png",
            title: "How To Install Mods In MC",
            desc: "A full guide on how to download and install mods in Minecraft including how to use Forge and Fabric.",
            tags: ["minecraft", "modding", "how-to"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-to-download-install-mods-in-halo-mcc",
            image: "halo_how_to_mod.png",
            title: "How To Install Mods In Halo: MCC",
            desc: "A full guide on how to download and install mods in Halo: Master Chief Collection (Halo: MCC) using Steam Workshop and Vortex.",
            tags: ["halo", "modding", "how-to"]
        }
    ]

    const articlesServer: Article[] = [
        {
            url: "https://blog.moddingcommunity.com/how-to-set-up-a-rust-server",
            image: "rust_how_to_set_up_server.png",
            title: "How To Set Up A Rust Game Server",
            desc: "A guide on how to install mods in Red Dead Redemption 2.",
            tags: ["rust", "server", "setup"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-to-install-umod-onto-rust-servers",
            image: "rust_how_to_install_umod.png",
            title: "How To Install uMod Onto Rust Servers",
            desc: "A guide on how to download and install uMod (Oxide) onto a Rust game server for Windows and Linux.",
            tags: ["rust", "umod", "server"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-set-up-a-minecraft-java-edition-server",
            image: "mc_how_to_set_up_server.png",
            title: "How Set Up A MC Java Edition Server",
            desc: "A full guide on how to set up a Minecraft Java Edition server on both Windows and Linux (Debian 12).",
            tags: ["minecraft", "server", "setup"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-to-make-a-l4d2-server-with-mods",
            image: "l4d2_how_to_set_up_server.jpg",
            title: "How To Make A L4D2 Server With Mods",
            desc: "A guide on how to create and run a Left 4 Dead 2 server with mods on both Windows and Linux.",
            tags: ["l4d2", "server", "mods", "setup"]
        },
        {
            url: "https://blog.moddingcommunity.com/how-to-make-a-gmod-server-install-mods-addons",
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
                    icon={<FaHammer className="w-4 h-4 fill-text-primary" />}
                >
                    <span>Check out some of our modding <span className="special">how-to</span> guides!</span>
                </IconAndText>
                <Carousel
                    className={`intersect-once intersect:sm:motion-preset-pop ${className ?? ""}`}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={14000}
                    ssr={true}
                    itemClass={`p-6 ${itemClassName ?? ""}`}
                >
                    {articlesModding.map((a, k) => <Article key={`article-${k}`} {...a} /> )}
                </Carousel>
            </div>
            <div className="flex flex-col gap-2">
                <IconAndText
                    icon={<FaServer className="w-4 h-4 fill-text-primary" />}
                >
                    <span>Check out some of our server <span className="special">setup</span> guides!</span>
                </IconAndText>
                <Carousel
                    className={`intersect-once intersect:sm:motion-preset-pop ${className ?? ""}`}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={10000}
                    ssr={true}
                    itemClass={`p-6 ${itemClassName ?? ""}`}
                >
                    {articlesServer.map((a, k) => <Article key={`article-${k}`} {...a} /> )}
                </Carousel>
            </div>
        </div>
    )
}