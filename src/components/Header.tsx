"use client"

import HeaderDesktop from "./header/Desktop";
import HeaderMobile from "./header/Mobile";

export default function Header() {
    return (
        <>
            <div className="sticky top-0 z-20 hidden sm:block">
                <HeaderDesktop />
            </div>
            <div className="sticky top-0 z-20 sm:hidden block">
                <HeaderMobile />
            </div>
        </>
    )
}