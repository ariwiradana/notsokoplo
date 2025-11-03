import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import React, { useEffect } from "react";
import { TbMenu, TbX } from "react-icons/tb";
import Sidebar from "./sidebar";
import useSidebar from "@/store/useSidebar";
import { scrollToId } from "@/helper/scrollToId";
import { useRouter } from "next/router";

const NavbarToggle = () => {
  const {
    openSidebar,
    scrollPosition,
    handleToggleSidebar,
    handleScrollPosition,
  } = useSidebar();

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      handleScrollPosition(window.scrollY);
    };
    // gunakan passive listener untuk kinerja scroll yang lebih baik
    window.addEventListener("scroll", handleScroll, { passive: true });

    // jika ada hash pada URL, scroll otomatis ke elemen tersebut
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
  }, [handleScrollPosition]);

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={`${montserrat.className} ${
        scrollPosition > 300 ? "top-0" : "-top-20"
      } hidden fixed inset-x-0 z-50 bg-dark w-full md:flex flex-col justify-center items-center md:h-12 md:px-12 lg:px-4 transition-all ease-in-out duration-500`}
    >
      <ul
        className="flex justify-between md:justify-center w-full gap-x-16"
        onClick={(e) => e.stopPropagation()}
      >
        {NavData.map((nav) => (
          <li className="hidden md:inline" key={`nav-toggle-${nav.path}`}>
            <button
              aria-label={`Navigate to ${nav.title}`}
              onClick={() => {
                if (nav.flag === "page" && router.pathname !== "/siapa-kita") {
                  scrollToId(nav.path);
                } else if (
                  nav.flag === "page" &&
                  router.pathname === "/siapa-kita"
                ) {
                  router.push(`/#${nav.path}`);
                } else {
                  router.push(nav.path);
                }
              }}
              className="uppercase font-bold text-sm text-white hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {nav.title}
            </button>
          </li>
        ))}

        {/* Tombol toggle untuk sidebar mobile */}
        <li className="md:hidden">
          <button
            type="button"
            aria-label={openSidebar ? "Close menu" : "Open menu"}
            aria-expanded={openSidebar}
            aria-controls="sidebar-menu"
            onClick={handleToggleSidebar}
            className="text-2xl p-3 text-white hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {openSidebar ? (
              <TbX aria-hidden="true" />
            ) : (
              <TbMenu aria-hidden="true" />
            )}
          </button>
        </li>
      </ul>

      {scrollPosition > 300 && <Sidebar />}
    </nav>
  );
};

export default NavbarToggle;
