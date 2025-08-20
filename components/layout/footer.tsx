import { montserrat } from "@/constants/fonts";
import { Socials } from "@/constants/social";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className=" bg-black">
      <div
        className={`py-6 px-4 md:px-12 lg:px-0 ${montserrat.className} relative z-0 grid md:grid-cols-2 max-w-screen-xl mx-auto gap-6 md:gap-12`}
      >
        <div className="flex justify-center md:justify-start items-center">
          {Socials.map((social) => (
            <Link
              rel="noopener"
              aria-label={`Social ${social.title}`}
              target="_blank"
              key={social.title}
              href={social.link}
            >
              <div className="flex items-center gap-x-2 group py-2 hover:md:px-3.5 hover:px-2.5 px-2 md:px-3 transition-all ease-in-out duration-300 hover:scale-105 hover:bg-white/10 hover:backdrop-blur-md rounded-full">
                <div className="text-white md:text-lg">{social.icon}</div>
                <span
                  className={`text-[11px] md:text-[12px] whitespace-nowrap text-white hidden group-hover:block capitalize font-medium`}
                >
                  {social.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center md:justify-end items-center">
        <p className="text-xs md:text-sm text-white uppercase">© 2025 Not So Koplo</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
