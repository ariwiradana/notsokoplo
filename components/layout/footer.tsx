import { montserrat } from "@/constants/fonts";
import { Socials } from "@/constants/social";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className={`py-20 ${montserrat.className} relative bg-dark z-0`}>
      <p className="text-center mb-4 font-medium text-white text-sm md:text-base">
        Find Us On :
      </p>
      <div className="flex justify-center w-full">
        <div className="flex items-center border border-white/30 divide-white/30 divide-x transition-all ease-in-out duration-500">
          {Socials.map((social) => (
            <Link
              aria-label={`Social ${social.title}`}
              target="_blank"
              key={social.title}
              href={social.link}
              className="md:p-6 p-3 flex gap-x-2 justify-center items-center text-2xl lg:text-3xl group text-white hover:bg-white transition-all ease-in-out duration-500"
            >
              <div className="group-hover:text-dark">{social.icon}</div>
              <p className="text-sm font-medium mt-1 group-hover:text-dark hidden md:group-hover:block">
                {social.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
