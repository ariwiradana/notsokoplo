import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import { Socials } from "@/constants/social";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbMenu } from "react-icons/tb";

interface NavbarProps {
  fixed?: boolean;
}

const Navbar = ({ fixed = true }: NavbarProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const scrollToDiv = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setOpenSidebar(false);
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
            className="text-2xl p-3"
            onClick={() => setOpenSidebar((prevState) => !prevState)}
          >
            <TbMenu />
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            onClick={() => scrollToDiv("music")}
            className="uppercase font-bold text-sm"
          >
            Music
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            onClick={() => scrollToDiv("biography")}
            className="uppercase font-bold text-sm"
          >
            Biography
          </button>
        </li>
        <li className="hidden md:inline">
          <Link href="/">
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
            onClick={() => scrollToDiv("events")}
            className="uppercase font-bold text-sm"
          >
            Events
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            onClick={() => scrollToDiv("contact")}
            className="uppercase font-bold text-sm"
          >
            Contact
          </button>
        </li>
      </ul>
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`overflow-hidden flex flex-col gap-4 w-full transition-all duration-500 ease-in-out ${
          openSidebar ? "h-screen mt-6" : "h-0"
        }`}
      >
        {NavData.map((nav) => (
          <li
            key={`nav-${nav.path}`}
            className="text-center font-semibold text-2xl"
          >
            <button
              onClick={() => scrollToDiv(nav.path)}
              className={`${
                activeId === nav.path ? "text-white" : "text-white/60"
              }`}
            >
              {nav.title}
            </button>
          </li>
        ))}
        <li className="flex justify-center gap-6 text-2xl mt-8">
          {Socials.map((social) => (
            <Link target="_blank" key={social.title} href={social.link}>
              <div className="group-hover:text-dark">{social.icon}</div>
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
