import { NavData } from "@/constants/navdata";
import { Socials } from "@/constants/social";
import useSidebar from "@/store/useSidebar";
import Link from "next/link";
import React, { useEffect } from "react";

const Sidebar = () => {
  const { openSidebar, handleActiveId, handleToggleSidebar } = useSidebar();

  const scrollToDiv = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      handleActiveId(id);
      handleToggleSidebar();
    }
  };

  useEffect(() => {
    if (openSidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [openSidebar]);

  return (
    <ul
      className={`overflow-hidden flex flex-col gap-4 w-full transition-all duration-500 ease-in-out ${
        openSidebar ? "h-svh mt-6" : "h-0"
      }`}
    >
      {NavData.map((nav) => (
        <li
          key={`sidebar-${nav.path}`}
          className="text-center font-semibold text-2xl"
        >
          <button
            onClick={() => scrollToDiv(nav.path)}
            // className={`${
            //   activeId === nav.path ? "text-white" : "text-white/60"
            // }`}
          >
            {nav.title}
          </button>
        </li>
      ))}
      <li className="flex justify-center gap-6 text-2xl mt-8">
        {Socials.map((social) => (
          <Link target="_blank" key={social.title} href={social.link}>
            <div className="group-hover:text-dark">{social.icon}</div>
          </Link>
        ))}
      </li>
    </ul>
  );
};

export default Sidebar;
