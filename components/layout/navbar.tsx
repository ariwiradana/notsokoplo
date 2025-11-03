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
  const router = useRouter();

  // Smooth scroll for hash links (SEO-friendly + UX)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, []);

  return (
    <nav
      className={`${montserrat.className} transition-all duration-300 ${
        openSidebar ? "bg-dark/80 backdrop-blur-sm" : "bg-transparent"
      } w-full flex justify-between flex-col md:py-12 max-w-screen-xl mx-auto md:px-12 lg:px-4 z-50 ${
        fixed ? "absolute inset-x-0 top-0" : "border-b border-b-white/5"
      }`}
      aria-label="Main navigation"
    >
      <ul className="flex items-center justify-between md:justify-center w-full gap-x-16">
        {NavDataMobile.map((nav) => {
          if (nav.path !== "beranda") {
            return (
              <li className="hidden md:inline" key={`nav-${nav.title}`}>
                <button
                  aria-label={`Navigate to ${nav.title}`}
                  onClick={() => {
                    if (nav.flag === "page") {
                      if (router.pathname === "/siapa-kita") {
                        router.push(`/#${nav.path}`);
                      } else {
                        scrollToId(nav.path);
                      }
                    } else {
                      router.push(nav.path);
                    }
                  }}
                  className="uppercase font-bold text-sm text-white hover:text-primary transition-colors duration-200"
                >
                  {nav.title}
                </button>
              </li>
            );
          } else {
            return (
              <li className="hidden md:inline" key={`nav-${nav.title}`}>
                <Link href="/" aria-label="Go to homepage - Notsokoplo">
                  <div className="relative w-16 aspect-square">
                    <Image
                      priority // ✅ penting buat LCP
                      sizes="(max-width: 768px) 64px, 80px"
                      src="/logo.png"
                      fill
                      className="object-contain"
                      alt="Notsokoplo official logo"
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
