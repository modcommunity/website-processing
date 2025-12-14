"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

import { IoIosLogIn } from "react-icons/io";
import { useHeader } from "../Header";
import HeaderLogo from "./Logo";
import IconAndText from "../helper/IconAndText";

export default function HeaderTop() {
  const { isOpen, setIsOpen } = useHeader();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12 && !isScrolled) setIsScrolled(true);
      else if (window.scrollY <= 12 && isScrolled) setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <div className="w-full sticky top-0 z-40 h-12 flex justify-between px-4 bg-header border-b-1 border-b-border-primary">
      <div className="ml-2 flex gap-8 items-center">
        <GiHamburgerMenu
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <HeaderLogo />
      </div>

      <div className="flex gap-4 items-center">
        <a href="/login" className="btn btn-special !px-2 !py-1">
          <IconAndText icon={<IoIosLogIn className="w-5 h-5 fill-white" />}>
            Sign In
          </IconAndText>
        </a>
      </div>
    </div>
  );
}
