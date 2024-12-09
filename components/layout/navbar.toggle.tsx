import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import { Socials } from "@/constants/social";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbMenu, TbX } from "react-icons/tb";

const NavbarToggle = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setOpenSidebar(false);
        setOpenSidebar(false);
      } else {
        setScrollPosition(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        scrollPosition > 300 || openSidebar ? "top-0" : "-top-20"
      } fixed inset-x-0 z-50 bg-dark/80 backdrop-blur-sm w-full flex flex-col justify-center items-center lg:h-12 md:px-12 lg:px-4 transition-all ease-in-out duration-500`}
    >
      <ul className="flex justify-between lg:justify-center w-full gap-x-16">
        {NavData.map((nav) => (
          <li className="hidden lg:inline" key={`nav-toggle-${nav.path}`}>
            <button
              onClick={() => scrollToDiv(nav.path)}
              className="uppercase font-bold text-sm"
            >
              {nav.title}
            </button>
          </li>
        ))}
        <li className="lg:hidden">
          <button
            onClick={() => setOpenSidebar((prevState) => !prevState)}
            className="text-2xl p-3"
          >
            {openSidebar ? <TbX /> : <TbMenu />}
          </button>
        </li>
      </ul>

      <ul
        className={`overflow-hidden flex flex-col gap-4 w-full transition-all duration-500 ease-in-out ${
          openSidebar ? "h-screen mt-6" : "h-0"
        }`}
      >
        {NavData.map((nav) => (
          <li
            key={`sidebar-${nav.path}`}
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

export default NavbarToggle;
