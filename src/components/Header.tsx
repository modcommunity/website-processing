"use client"

import HeaderDesktop from "./header/Desktop";
import HeaderMobile from "./header/Mobile";

export default function Header() {
    return (
        <>
            <header className="hidden sm:block">
                <HeaderDesktop />
            </header>
            <header className="sm:hidden block">
                <HeaderMobile />
            </header>
        </>
    )
}