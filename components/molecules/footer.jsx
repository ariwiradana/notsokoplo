import React from "react";
import Container from "./container";
import { NAVICONS } from "@/constants/nav.icons";
import Link from "next/link";
import { FiChevronUp } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="bg-gray-100 relative z-10">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-y-4 py-4 px-8 md:px-0">
        <div className="order-2 md:order-1 flex items-center justify-center md:justify-start">
          <h5 className="text-gray-400 font-raleway font-light uppercase text-[10px]">
            @Notsokoplo <span> 2021</span>
          </h5>
        </div>
        <div className="flex justify-center gap-x-5 md:gap-x-8 order-1">
          {NAVICONS.map(({ icon_dark, path }) => (
            <Link target="_blank" key={path} href={path}>
              {icon_dark}
            </Link>
          ))}
        </div>
        <button
          className="hidden md:flex items-center gap-x-1 justify-end order-3"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <h5 className="text-gray-400 font-raleway font-light uppercase text-[10px]">
            Top
          </h5>
          <FiChevronUp className="text-gray-400" />
        </button>
      </Container>
    </div>
  );
};

export default Footer;
