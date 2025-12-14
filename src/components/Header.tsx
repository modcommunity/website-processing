"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import HeaderTop from "./header/Top";
import HeaderSidebar from "./header/Sidebar";

export type HeaderCtxT = {
  pathName: string;

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const HeaderCtx = createContext<HeaderCtxT | undefined>(undefined);

export function useHeader() {
  const ctx = useContext(HeaderCtx);

  if (!ctx)
    throw new Error("useHeader must be used within a HeaderCtx.Provider");

  return ctx;
}

export default function Header({
  pathName,
  children,
}: {
  pathName: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderCtx.Provider value={{ pathName, isOpen, setIsOpen }}>
      <div className="flex flex-col">
        <HeaderTop />
        <div className="w-full flex">
          <HeaderSidebar />
          <div className="overflow-auto z-20 p-4 grow">{children}</div>
        </div>
      </div>
    </HeaderCtx.Provider>
  );
}
