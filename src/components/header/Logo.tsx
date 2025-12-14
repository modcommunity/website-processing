"use client";

import { FaCode } from "react-icons/fa6";
import IconAndText from "../helper/IconAndText";

import "@fontsource/orbitron/700.css";

export default function HeaderLogo() {
  return (
    <a href="/">
      <IconAndText icon={<FaCode className="w-6 h-6 text-text-primary" />}>
        <span className="text-text-primary text-xl font-bold text-shadow-special-1-hover text-shadow-sm tracking-wider font-orbitron">
          TMC
        </span>
      </IconAndText>
    </a>
  );
}
