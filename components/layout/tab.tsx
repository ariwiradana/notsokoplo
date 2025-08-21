import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import React from "react";
import { scrollToId } from "@/helper/scrollToId";
import { useRouter } from "next/router";

const TabNav = () => {
  const router = useRouter();
  return (
    <div
      className={`w-full sticky inset-x-0 top-0 bg-dark z-20 md:hidden px-4 py-3 flex justify-between gap-x-3 ${montserrat.className}`}
    >
      {NavData.map((nav) => (
        <div key={`tab-nav-${nav.path}`}>
          <button
            aria-label={`Navigate to ${nav.title}`}
            onClick={() =>
              nav.flag === "page" && router.pathname !== "/siapa-kita"
                ? scrollToId(nav.path)
                : nav.flag === "page" && router.pathname === "/siapa-kita"
                ? router.push(`/#${nav.path}`)
                : router.push(nav.path)
            }
            className="uppercase font-semibold text-sm text-white"
          >
            {nav.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabNav;
