import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbMenu } from "react-icons/tb";

const NavbarToggle = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${montserrat.className} ${
        scrollPosition > 300 ? "top-0" : "-top-20"
      } fixed inset-x-0 z-50 lg:bg-dark/95 lg:backdrop-blur-sm w-full flex justify-between lg:h-12 px-4 md:px-12 lg:px-4 transition-all ease-in-out duration-500`}
    >
      <ul className="flex items-center justify-between lg:justify-center w-full gap-x-16">
        {NavData.map((nav) => (
          <li className="hidden lg:inline" key={`nav-toggle-${nav.path}`}>
            <Link className="uppercase font-bold text-sm" href={nav.path}>
              {nav.title}
            </Link>
          </li>
        ))}
        <li className="lg:hidden mt-4">
          <button className="text-2xl bg-dark/50 backdrop-blur-sm p-3">
            <TbMenu />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarToggle;
