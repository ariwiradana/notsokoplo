import { montserrat } from "@/constants/fonts";
import useSidebar from "@/store/useSidebar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import { scrollToId } from "@/helper/scrollToId";
import { NavDataMobile } from "@/constants/navdata";
import { useRouter } from "next/router";

interface NavbarProps {
  fixed?: boolean;
}

const Navbar = ({ fixed = true }: NavbarProps) => {
  const { openSidebar, scrollPosition } = useSidebar();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const router = useRouter();

  return (
    <nav
      className={`${montserrat.className} ${
        openSidebar ? "bg-dark/80" : "bg-transparent"
      } w-full flex justify-between flex-col md:py-12 max-w-screen-xl mx-auto md:px-12 lg:px-4 z-50 ${
        fixed ? "absolute inset-x-0" : "border-b border-b-white/5"
      }`}
    >
      <ul className="flex items-center justify-between md:justify-center w-full gap-x-16">
        {NavDataMobile.map((nav) => {
          if (nav.path !== "beranda") {
            return (
              <li className="hidden md:inline" key={`Nav ${nav.title}`}>
                <button
                  aria-label={`Button Nav Schedules`}
                  onClick={() =>
                    nav.flag === "page" && router.pathname !== "/siapa-kita"
                      ? scrollToId(nav.path)
                      : nav.flag === "page" && router.pathname === "/siapa-kita"
                      ? router.push(`/#${nav.path}`)
                      : router.push(nav.path)
                  }
                  className="uppercase font-bold text-sm"
                >
                  {nav.title}
                </button>
              </li>
            );
          } else {
            return (
              <li className="hidden md:inline" key={`Nav ${nav.title}`}>
                <Link href="/" aria-label="Nav Logo">
                  <div className="relative w-16 aspect-square">
                    <Image
                      sizes="200px"
                      src="/logo.png"
                      fill
                      className="object-contain"
                      alt="Logo Navbar Notsokoplo"
                    />
                  </div>
                </Link>
              </li>
            );
          }
        })}
      </ul>
      {scrollPosition < 300 && <Sidebar />}
    </nav>
  );
};

export default Navbar;
