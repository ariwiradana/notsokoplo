import { NAVLINKS } from "@/constants/nav.links";
import Link from "next/link";
import React from "react";
import Container from "./container";
import { NAVICONS } from "@/constants/nav.icons";
import useNavbar from "@/hooks/useNavbar";
import Image from "next/image";

const Navbar = () => {
  const { position } = useNavbar();

  return (
    <div
      className={`bg-black fixed inset-x-0 top-0 px-6 md:px-8 2xl:px-0 transition-all ease-in-out duration-500 delay-150 z-50 ${
        position > 10 ? "md:h-16 h-12" : "md:h-24 h-16"
      }`}
    >
      <Container className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 h-full">
        <div className="lg:flex hidden items-center lg:gap-x-8">
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
        <div className="flex lg:justify-center">
          <Link
            href="/"
            className={`relative w-14 h-auto items-center transition-all ease-in-out duration-500 delay-150 ${
              position > 10 ? "md:my-3 my-2" : "md:my-5 my-3"
            }`}
          >
            <Image
              alt="logo"
              className="object-contain relative w-full h-full"
              layout="fill"
              src="/logo/logo-nsk.png"
            />
          </Link>
        </div>
        <div className="flex gap-x-5 lg:gap-x-8 justify-end items-center transition-all ease-in-out">
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
