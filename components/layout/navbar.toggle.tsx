import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import React, { useEffect } from "react";
import { TbMenu, TbX } from "react-icons/tb";
import Sidebar from "./sidebar";
import useSidebar from "@/store/useSidebar";
import { scrollToId } from "@/helper/scrollToId";

const NavbarToggle = () => {
  const {
    openSidebar,
    scrollPosition,
    handleToggleSidebar,
    handleScrollPosition,
  } = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      handleScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${montserrat.className} ${
        scrollPosition > 300 ? "top-0" : "-top-20"
      } hidden fixed inset-x-0 z-50 bg-dark w-full md:flex flex-col justify-center items-center md:h-12 md:px-12 lg:px-4 transition-all ease-in-out duration-500`}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className="flex justify-between md:justify-center w-full gap-x-16"
      >
        {NavData.map((nav) => (
          <li className="hidden md:inline" key={`nav-toggle-${nav.path}`}>
            <button
              aria-label={`Navigate to ${nav.title}`}
              onClick={() => scrollToId(nav.path)}
              className="uppercase font-bold text-sm"
            >
              {nav.title}
            </button>
          </li>
        ))}
        <li className="md:hidden">
          <button
            aria-label={`Button Toggle Sidebar`}
            onClick={handleToggleSidebar}
            className="text-2xl p-3 text-white"
          >
            {openSidebar ? <TbX /> : <TbMenu />}
          </button>
        </li>
      </ul>

      {scrollPosition > 300 && <Sidebar />}
    </nav>
  );
};

export default NavbarToggle;
