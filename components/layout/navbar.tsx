import { NavData } from "@/constants/navdata";
import Link from "next/link";
import React, { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="w-full flex justify-between absolute inset-x-0 z-20 py-20 max-w-screen-xl mx-auto">
      <ul className="flex items-center gap-x-8">
        {NavData.map((nav) => (
          <li key={nav.path}>
            <Link className="uppercase font-bold text-sm" href={nav.path}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
