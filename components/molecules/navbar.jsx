import { NAVLINKS } from "@/constants/nav.links";
import Link from "next/link";
import React from "react";
import Container from "../elements/container";
import { NAVICONS } from "@/constants/nav.icons";
import useNavbar from "@/hooks/useNavbar";
import Image from "next/image";
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";
import Sidebar from "./sidebar";

const Navbar = () => {
  const { position, setShowSidebar, showSidebar, pathname } = useNavbar();

  return (
    <>
      <div
        className={`bg-black fixed inset-x-0 top-0 px-6 md:px-8 2xl:px-0 transition-all ease-in-out duration-500 delay-150 z-50 ${
          position > 10 ? "md:h-16 h-12" : "md:h-24 h-16"
        } ${position < 10 && pathname === "/" ? "bg-opacity-90" : ""}`}
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
          <div className="h-full flex lg:hidden items-center">
            {!showSidebar ? (
              <HiOutlineMenuAlt2
                onClick={() => setShowSidebar(!showSidebar)}
                className={`text-white transition-all ease-in-out duration-500 delay-150 ${
                  position > 10 ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                }`}
              />
            ) : (
              <HiX
                onClick={() => setShowSidebar(!showSidebar)}
                className={`text-white transition-all ease-in-out duration-500 delay-150 ${
                  position > 10 ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                }`}
              />
            )}
          </div>
          <div className="hidden lg:flex lg:justify-center">
            <Link
              href="/"
              className={`relative w-14 h-auto items-center transition-all ease-in-out duration-500 delay-150 ${
                position > 10 ? "md:my-3 my-2" : "md:my-5 my-3"
              }`}
            >
              <Image
                alt="logo"
                className="object-contain relative w-full h-full"
                fill
                src="/logo/logo-nsk.png"
              />
            </Link>
          </div>
          <div className="flex gap-x-5 lg:gap-x-8 justify-end items-center transition-all ease-in-out">
            {NAVICONS.map(({ icon, path, label }) => (
              <Link aria-label={label} target="_blank" key={path} href={path}>
                {icon}
              </Link>
            ))}
          </div>
        </Container>
      </div>
      <Sidebar
        setShowSidebar={setShowSidebar}
        position={position}
        show={showSidebar}
      />
    </>
  );
};

export default Navbar;
