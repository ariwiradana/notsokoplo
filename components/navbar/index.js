import Image from "next/image";
import Link from "next/link";
import React from "react";
import { logo } from "../../assets/img";
import { NavbarItems } from "./NavbarItems";
import { useRouter } from "next/router";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="w-full relative bg-gray-900 px-8 md:px-20 lg:px-36 xl:px-52 box-border flex items-center justify-between py-4 lg:py-6">
      {/* <Link href="/"> */}
      {/* <div className="w-8 md:w-8 p-2 box-content">
          <Image src={logo} className="cursor-pointer" />
        </div> */}
      {/* </Link> */}
      <Link href="/">
        <p className="font-semibold lg:text-xl text-white tracking-wide cursor-pointer transition ease-in-out">
          NOT SO KOPLO
        </p>
      </Link>

      <HiOutlineMenuAlt4 className="h-6 w-6 text-white block md:hidden box-content" />

      <div className="hidden md:flex">
        {NavbarItems.map((item, i) => {
          return (
            <Link href={item.url}>
              <p
                className={`px-4 font-semibold uppercase text-xs lg:text-base tracking-wider ${
                  router.pathname === item.url ? "text-white" : "text-gray-400"
                }  transition ease-in-out hover:text-white cursor-pointer`}
              >
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
