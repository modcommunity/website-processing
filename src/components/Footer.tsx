"use client"

import FollowUs from "./footer/FollowUs";

export default function Footer() {
    return (
        <footer className="relative z-40 bg-footer">
            <div className="container mx-auto">
                <div>
                    <div className="flex flex-col w-full">
                        <section className="px-2 py-10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm">Taking modding to the next level!</span>
                                </div>
                                <FollowUs />
                            </div>
                        </section>
                        <hr className="border-border-secondary"/>
                        <section className="px-2 py-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-y-8">
                                <div className="flex flex-col gap-2">
                                    <h5>Applications</h5>
                                    <div className="flex flex-col gap-1">
                                        <a href="/apps">
                                            <span className="text-sm">Browse</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h5>Servers</h5>
                                    <div className="flex flex-col gap-1">
                                        <a href="/servers">
                                            <span className="text-sm">Browse</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h5>Community</h5>
                                    <div className="flex flex-col gap-1 text-sm">
                                        <a href="https://blog.moddingcommunity.com">
                                            <span>Blog</span>
                                        </a>
                                
                                        <a href="https://forum.moddingcommunity.com">
                                            <span>Forum</span>
                                        </a>
                                        <a href="https://discord.moddingcommunity.com" target="_blank">
                                            <span>Discord</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr className="border-border-secondary" />
                        <section className="px-2 py-10">
                            <div className="flex gap-4 items-center">
                                <a href="/terms">
                                    <span className="text-sm">Terms of Service</span>
                                </a>
                                <a href="/privacy-policy">
                                    <span className="text-sm">Privacy Policy</span>
                                </a>
                                <a href="/licenses">
                                    <span className="text-sm">Licenses</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </footer>
    )
}