import { NAVLINKS } from "@/constants/nav.links";
import Link from "next/link";
import React from "react";
import Container from "./container";
import { NAVICONS } from "@/constants/nav.icons";
import useNavbar from "@/hooks/useNavbar";

const Navbar = () => {
  const { position } = useNavbar();

  return (
    <div
      className={`bg-black fixed inset-x-0 top-0 transition-all ease-in-out duration-500 delay-150 z-50 ${
        position > 10 ? "md:h-16 h-12" : "md:h-24 h-16"
      }`}
    >
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-y-4 h-full">
        {/* <div className="md:block hidden relative w-32 h-32">
          <Image className="object-contain relative w-full h-full" layout="fill" src="/logo/logo.png" />
        </div> */}
        <div className="flex justify-between md:justify-start items-center md:gap-x-8 px-8 md:px-0">
          {NAVLINKS.map(({ title, path }) => (
            <Link
              className="flex items-center justify-center font-raleway text-[12px] uppercase text-white font-medium"
              key={path}
              href={path}
            >
              {title}
            </Link>
          ))}
        </div>
        <div
          className={`justify-center gap-x-5 lg:gap-x-8 lg:justify-end items-center transition-all ease-in-out ${
            position > 10 ? "hidden md:flex" : "md:flex hidden"
          }`}
        >
          {NAVICONS.map(({ icon, path }) => (
            <Link target="_blank" key={path} href={path}>
              {icon}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
