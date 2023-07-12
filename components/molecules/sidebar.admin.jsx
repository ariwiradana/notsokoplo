import { NAVLINKSADMIN } from "@/constants/nav.links";
import Link from "next/link";
import React from "react";

const Sidebar = ({ show, position, setShowSidebar }) => {
  return (
    <div
      className={`h-full lg:hidden fixed z-30 inset-0 transition-all bg-black ease-in-out duration-500 delay-100 ${
        show && position > 10
          ? "md:mt-16 mt-[47px]"
          : show && position < 10
          ? "md:mt-20 mt-16"
          : "-mt-[200vh]"
      }`}
    >
      <div className="flex flex-col px-6 md:px-8 py-4 divide-y divide-gray-800">
        {NAVLINKSADMIN.map(({ path, title }) => (
          <Link
            key={path}
            onClick={() => setShowSidebar(false)}
            className={`text-white font-montserrat tracking-wide py-2 md:py-4 ${
              position > 10 ? "text-base" : "text-lg"
            }`}
            href={path}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
