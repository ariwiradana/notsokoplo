import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import useSidebar from "@/store/useSidebar";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MobileNav = () => {
  const { handleScrollPosition } = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      handleScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();

  return (
    <div
      className={`top-0 w-full fixed inset-x-0 bg-dark z-20 md:hidden transition-all ease-in-out duration-500 border-b border-b-white/5 ${montserrat.className}`}
    >
      <ul className="flex items-center justify-between gap-6 p-4 flex-wrap">
        {NavData.map((nav) => (
          <li key={`tab-nav-${nav.path}`}>
            <button
              aria-label={`Navigate to ${nav.title}`}
              onClick={() => router.push(`/#${nav.path}`)}
              className="uppercase font-bold text-sm text-white"
            >
              {nav.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNav;
