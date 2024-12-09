import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import React, { useEffect } from "react";
import { TbMenu, TbX } from "react-icons/tb";
import Sidebar from "./sidebar";
import useSidebar from "@/store/useSidebar";

const NavbarToggle = () => {
  const {
    openSidebar,
    scrollPosition,
    handleActiveId,
    handleToggleSidebar,
    handleScrollPosition,
  } = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      handleScrollPosition(window.scrollY);
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
      handleActiveId(id);
    }
  };

  return (
    <nav
      className={`${montserrat.className} ${
        scrollPosition > 300 ? "top-0" : "-top-20"
      } fixed inset-x-0 z-50 bg-dark/80 backdrop-blur-sm w-full flex flex-col justify-center items-center lg:h-12 md:px-12 lg:px-4 transition-all ease-in-out duration-500`}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className="flex justify-between lg:justify-center w-full gap-x-16"
      >
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
          <button onClick={handleToggleSidebar} className="text-2xl p-3">
            {openSidebar ? <TbX /> : <TbMenu />}
          </button>
        </li>
      </ul>

      {scrollPosition > 300 && <Sidebar />}
    </nav>
  );
};

export default NavbarToggle;
