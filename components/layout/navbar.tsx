import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
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
      } w-full flex justify-between py-12 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-4 ${
        fixed && "absolute inset-x-0 z-50"
      }`}
    >
      <ul className="flex items-center gap-x-8">
        {NavData.map((nav) => (
          <li key={nav.path} className="hidden lg:inline">
            <Link className="uppercase font-bold text-sm" href={nav.path}>
              {nav.title}
            </Link>
          </li>
        ))}
        <li className="lg:hidden">
          <button className="text-4xl">
            <TbMenu />
          </button>
        </li>
      </ul>
      <ul>
        <Link href="/">
          <div className="relative w-20 lg:w-32 aspect-square">
            <Image sizes="200px" src="/logo.png" fill className="object-contain" alt="logo" />
          </div>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
