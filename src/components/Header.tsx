"use client"

import HeaderDesktop from "./header/Desktop";
import HeaderMobile from "./header/Mobile";

export default function Header() {
    return (
        <>
            <div className="hidden sm:block">
                <HeaderDesktop />
            </div>
            <div className="sm:hidden block">
                <HeaderMobile />
            </div>
        </>
    )
}