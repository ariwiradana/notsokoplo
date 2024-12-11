import { montserrat } from "@/constants/fonts";
import useSidebar from "@/store/useSidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbMenu, TbX } from "react-icons/tb";
import Sidebar from "./sidebar";

interface NavbarProps {
  fixed?: boolean;
}

const Navbar = ({ fixed = true }: NavbarProps) => {
  const { openSidebar, handleActiveId, handleToggleSidebar, scrollPosition } =
    useSidebar();

  const scrollToDiv = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleActiveId(id);
    }
  };

  return (
    <nav
      className={`${montserrat.className} ${
        openSidebar ? "bg-dark/80" : "bg-transparent"
      } w-full flex justify-between flex-col md:py-12 max-w-screen-xl mx-auto md:px-12 lg:px-4 ${
        fixed && "absolute inset-x-0 z-50"
      }`}
    >
      <ul className="flex items-center justify-between md:justify-center w-full gap-x-16">
        <li className="md:hidden">
          <button
            aria-label={`Button Toggle Sidebar Desktop`}
            className="text-2xl p-3 text-white"
            onClick={handleToggleSidebar}
          >
            {openSidebar ? <TbX /> : <TbMenu />}
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Events`}
            onClick={() => scrollToDiv("events")}
            className="uppercase font-bold text-sm"
          >
            Events
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Biography`}
            onClick={() => scrollToDiv("biography")}
            className="uppercase font-bold text-sm"
          >
            Biography
          </button>
        </li>
        <li className="hidden md:inline">
          <Link href="/" aria-label="Nav Logo">
            <div className="relative w-16 aspect-square">
              <Image
                sizes="200px"
                src="/logo.png"
                fill
                className="object-contain"
                alt="logo"
              />
            </div>
          </Link>
        </li>
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Music`}
            onClick={() => scrollToDiv("music")}
            className="uppercase font-bold text-sm"
          >
            Music
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Contact`}
            onClick={() => scrollToDiv("contact")}
            className="uppercase font-bold text-sm"
          >
            Contact
          </button>
        </li>
      </ul>
      {scrollPosition < 300 && <Sidebar />}
    </nav>
  );
};

export default Navbar;
