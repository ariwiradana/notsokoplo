import { montserrat } from "@/constants/fonts";
import { WAText } from "@/constants/whatsapp.text";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const Fab = () => {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsShown(true);
      } else {
        setIsShown(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed right-6 md:right-8 flex justify-center transition-all ease-in-out duration-500 z-40 ${
        isShown ? "bottom-6 md:bottom-8" : "-bottom-full"
      }`}
    >
      <div className={montserrat.className}>
        <Link
          href={`https://api.whatsapp.com/send?phone=6285792851799&text=${encodeURIComponent(
            WAText
          )}`}
          rel="noopener"
          target="_blank"
          className="rounded-full bg-primary text-sm font-medium text-white flex justify-center px-4 py-2 shadow items-center gap-x-2 hover:bg-opacity-90 transition-all ease-in-out duration-500"
        >
          <IoLogoWhatsapp className="text-lg" />
          <span>Mau Booking?</span>
        </Link>
      </div>
    </div>
  );
};

export default Fab;
