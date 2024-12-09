import { montserrat } from "@/constants/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbMenu } from "react-icons/tb";

interface NavbarProps {
  fixed?: boolean;
}

const Navbar = ({ fixed = true }: NavbarProps) => {
  return (
    <nav
      className={`${
        montserrat.className
      } w-full flex justify-between py-6 md:py-12 max-w-screen-xl mx-auto px-4 md:px-12 md:px-4 ${
        fixed && "absolute inset-x-0 z-50"
      }`}
    >
      <ul className="flex items-center justify-between md:justify-center w-full gap-x-16">
        <li className="md:hidden">
          <button className="text-2xl">
            <TbMenu />
          </button>
        </li>
        <li className="hidden md:inline">
          <Link className="uppercase font-bold text-sm" href="/">
            Home
          </Link>
        </li>
        <li className="hidden md:inline">
          <Link className="uppercase font-bold text-sm" href="/">
            Music
          </Link>
        </li>
        <li>
          <Link href="/">
            <div className="relative w-16 aspect-square">
              <Image
                sizes="200px"
                src="/logo.png"
                fill
                className="object-contain"
                alt="logo"
              />
            </div>
          </Link>
        </li>
        <li className="hidden md:inline">
          <Link className="uppercase font-bold text-sm" href="/">
            Events
          </Link>
        </li>
        <li className="hidden md:inline">
          <Link className="uppercase font-bold text-sm" href="/">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
