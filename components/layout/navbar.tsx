import { montserrat } from "@/constants/fonts";
import useSidebar from "@/store/useSidebar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";

interface NavbarProps {
  fixed?: boolean;
}

const Navbar = ({ fixed = true }: NavbarProps) => {
  const { openSidebar, scrollPosition } = useSidebar();

  const router = useRouter();

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

  return (
    <nav
      className={`${montserrat.className} ${
        openSidebar ? "bg-dark/80" : "bg-transparent"
      } w-full flex justify-between flex-col md:py-12 max-w-screen-xl mx-auto md:px-12 lg:px-4 z-50 ${
        fixed ? "absolute inset-x-0" : "border-b border-b-white/5"
      }`}
    >
      <ul className="flex items-center justify-between md:justify-center w-full gap-x-16">
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Schedules`}
            onClick={() => router.push("/#schedules")}
            className="uppercase font-bold text-sm"
          >
            Schedules
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Biography`}
            onClick={() => router.push("/#about")}
            className="uppercase font-bold text-sm"
          >
            About
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
                alt="Logo Navbar Notsokoplo"
              />
            </div>
          </Link>
        </li>
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Gallery`}
            onClick={() => router.push("/#gallery")}
            className="uppercase font-bold text-sm"
          >
            Gallery
          </button>
        </li>
        <li className="hidden md:inline">
          <button
            aria-label={`Button Nav Music`}
            onClick={() => router.push("/#music")}
            className="uppercase font-bold text-sm"
          >
            Music
          </button>
        </li>
      </ul>
      {scrollPosition < 300 && <Sidebar />}
    </nav>
  );
};

export default Navbar;
