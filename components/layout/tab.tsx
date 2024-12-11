import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import useSidebar from "@/store/useSidebar";
import { useRouter } from "next/router";
import React from "react";

const TabNav = () => {
  const { handleActiveId } = useSidebar();

  const scrollToDiv = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleActiveId(id);
    }
  };

  const router = useRouter();

  return (
    <div
      className={`w-full sticky inset-x-0 top-0 bg-dark z-20 md:hidden ${montserrat.className}`}
    >
      <ul className="flex items-center justify-center gap-6 p-4 flex-wrap">
        {NavData.map((nav) => (
          <li key={`tab-nav-${nav.path}`}>
            <button
              aria-label={`Navigate to ${nav.title}`}
              onClick={() =>
                nav.path === "contact"
                  ? router.push("/contact")
                  : scrollToDiv(nav.path)
              }
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

export default TabNav;
