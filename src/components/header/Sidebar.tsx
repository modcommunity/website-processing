"use client";

import { FaCogs, FaHome, FaSearch, FaServer } from "react-icons/fa";
import {
  FaCode,
  FaComments,
  FaDiscord,
  FaHammer,
  FaUsers,
} from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";

import { IoIosApps } from "react-icons/io";
import { type ReactNode } from "react";

import { useHeader } from "../Header";
import IconAndText from "../helper/IconAndText";

const COMMUNITY_PATHS = ["/community", "/licenses", "/privacy-policy", "/tos"];

export default function HeaderSidebar() {
  const { isOpen } = useHeader();

  return (
    <div
      className={`${
        isOpen ? "w-42 fixed sm:sticky" : "w-18 hidden sm:block"
      } duration-300 z-30`}
    >
      <div className="bg-header border-r-1 self-stretch border-r-border-primary sticky top-12 h-[calc(100vh-3rem)] duration-300 flex flex-col justify-between overflow-y-auto">
        {isOpen ? <NavbarLarge /> : <NavbarSmall />}
      </div>
    </div>
  );
}

export function NavbarSmall() {
  const { pathName } = useHeader();

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="w-full flex flex-col [&_>*]:px-4">
        <NavItemPrimary url="/" active={pathName === "/"}>
          <IconAndText
            icon={<FaHome className="w-5 h-5 fill-white" />}
            vertical={true}
          >
            Home
          </IconAndText>
        </NavItemPrimary>
        <NavItemPrimary url="/apps" active={false}>
          <IconAndText
            icon={<IoIosApps className="w-5 h-5 fill-white" />}
            vertical={true}
          >
            Apps
          </IconAndText>
        </NavItemPrimary>
        <NavItemPrimary url="/mods" active={false}>
          <IconAndText
            icon={<FaHammer className="w-5 h-5 fill-white" />}
            vertical={true}
          >
            Mods
          </IconAndText>
        </NavItemPrimary>
        <NavItemPrimary url="/servers" active={false}>
          <IconAndText
            icon={<FaServer className="w-5 h-5 fill-white" />}
            vertical={true}
          >
            Servers
          </IconAndText>
        </NavItemPrimary>
        <NavItemPrimary url="/assets" active={false}>
          <IconAndText
            icon={<FaCogs className="w-5 h-5 fill-white" />}
            vertical={true}
          >
            Assets
          </IconAndText>
        </NavItemPrimary>
        <NavItemPrimary
          url="/community"
          active={COMMUNITY_PATHS.includes(pathName)}
        >
          <IconAndText
            icon={<FaUsers className="w-5 h-5 fill-white" />}
            vertical={true}
          >
            Community
          </IconAndText>
        </NavItemPrimary>
      </div>
    </div>
  );
}

function NavItemPrimary({
  url,
  active,
  children,
  newTab = false,
  className,
}: {
  url: string;
  active: boolean;
  children: React.ReactNode;
  newTab?: boolean;
  className?: string;
}) {
  return (
    <a
      href={url}
      target={newTab ? "_blank" : undefined}
      className={`text-xs w-full p-2 flex justify-center items-center ${
        active ? "bg-special-1" : ""
      } ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function NavbarLarge() {
  const { pathName } = useHeader();

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="flex flex-col justify-center gap-2 w-full p-4">
        <NavItemPrimary
          url="/"
          active={pathName === "/"}
          className="rounded !p-2"
        >
          <NavbarLargePrimaryDisplay
            icon={<FaHome className="w-5 h-5 fill-white" />}
            text="Home"
          />
        </NavItemPrimary>
        <NavItemPrimary url="/apps" active={false} className="rounded !p-2">
          <NavbarLargePrimaryDisplay
            icon={<IoIosApps className="w-5 h-5 fill-white" />}
            text="Apps"
          />
        </NavItemPrimary>
        <NavItemPrimary url="/mods" active={false} className="rounded !p-2">
          <NavbarLargePrimaryDisplay
            icon={<FaHammer className="w-5 h-5 fill-white" />}
            text="Mods"
          />
        </NavItemPrimary>
        <div className="flex flex-col gap-1">
          <NavItemPrimary
            url="/servers"
            active={false}
            className="rounded !p-2"
          >
            <NavbarLargePrimaryDisplay
              icon={<FaServer className="w-5 h-5 fill-white" />}
              text="Servers"
            />
          </NavItemPrimary>
          <div className="flex flex-col [&_>*]:ml-2">
            <NavbarLargeSecondary url="/servers/browse">
              <IconAndText
                icon={<FaSearch className="w-4 h-4 fill-white" />}
                className="gap-2"
              >
                <span>Browse</span>
              </IconAndText>
            </NavbarLargeSecondary>
            <NavbarLargeSecondary
              url="https://forum.moddingcommunity.com/c/server-browser/knowledgebase/81"
              newTab={true}
            >
              <IconAndText
                icon={<IoIosInformationCircle className="w-4 h-4 fill-white" />}
                className="gap-2"
              >
                <span>Knowledgebase</span>
              </IconAndText>
            </NavbarLargeSecondary>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <NavItemPrimary url="/assets" active={false} className="rounded !p-2">
            <NavbarLargePrimaryDisplay
              icon={<FaCogs className="w-5 h-5 fill-white" />}
              text="Assets"
            />
          </NavItemPrimary>
        </div>
        <div className="flex flex-col gap-1">
          <NavItemPrimary
            url="/community"
            active={COMMUNITY_PATHS.includes(pathName)}
            className="rounded !p-2"
          >
            <NavbarLargePrimaryDisplay
              icon={<FaUsers className="w-5 h-5 fill-white" />}
              text="Community"
            />
          </NavItemPrimary>
          <div className="flex flex-col [&_>*]:ml-2">
            <NavbarLargeSecondary
              url="https://github.com/modcommunity/roadmap/milestones"
              newTab={true}
            >
              <IconAndText
                icon={<RiRoadMapFill className="w-4 h-4 fill-white" />}
                className="gap-2"
              >
                <span>Roadmap</span>
              </IconAndText>
            </NavbarLargeSecondary>
            <NavbarLargeSecondary
              url="https://github.com/modcommunity/dev-issue-tracker/issues"
              newTab={true}
            >
              <IconAndText
                icon={<FaCode className="w-4 h-4 fill-white" />}
                className="gap-2"
              >
                <span>Dev Tracker</span>
              </IconAndText>
            </NavbarLargeSecondary>
            <NavbarLargeSecondary
              url="https://discord.moddingcommunity.com"
              newTab={true}
            >
              <IconAndText
                icon={<FaDiscord className="w-4 h-4 fill-white" />}
                className="gap-2"
              >
                <span>Discord</span>
              </IconAndText>
            </NavbarLargeSecondary>
            <NavbarLargeSecondary
              url="https://moddingcommunity.com/blog/"
              newTab={true}
            >
              <IconAndText
                icon={<MdOutlineArticle className="w-4 h-4 fill-white" />}
                className="gap-2"
              >
                <span>Blog</span>
              </IconAndText>
            </NavbarLargeSecondary>
            <NavbarLargeSecondary
              url="https://forum.moddingcommunity.com"
              newTab={true}
            >
              <IconAndText
                icon={<FaComments className="w-4 h-4 fill-white" />}
                className="gap-2"
              >
                <span>Forum</span>
              </IconAndText>
            </NavbarLargeSecondary>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavbarLargePrimaryDisplay({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center w-full">
      <div className="px-2 flex justify-center">{icon}</div>
      <span className="text-sm text-text-default">{text}</span>
    </div>
  );
}

function NavbarLargeSecondary({
  url,
  newTab = false,
  children,
}: {
  url: string;
  newTab?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={url}
      target={newTab ? "_blank" : undefined}
      className="text-xs w-full p-2 flex items-center gap-4 text-text-default hover:text-text-primary duration-300"
    >
      {children}
    </a>
  );
}
