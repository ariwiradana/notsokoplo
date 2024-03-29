import React from "react";
import Container from "../elements/container";
import { NAVICONS } from "@/constants/nav.icons";
import Link from "next/link";
import { FiChevronUp } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="bg-gray-100 relative z-10">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-y-4 py-4 px-6 md:px-8 2xl:px-0">
        <div className="order-2 md:order-1 flex items-center justify-center md:justify-start">
          <p className="text-gray-600 font-raleway font-light text-xs uppercase">
            @notsokoplo <span> 2023</span>
          </p>
        </div>
        <div className="flex justify-center gap-x-5 md:gap-x-8 order-1">
          {NAVICONS.map(({ icon_dark, path, label }) => (
            <Link aria-label={label} target="_blank" key={path} href={path}>
              {icon_dark}
            </Link>
          ))}
        </div>
        <button
          className="hidden md:flex items-center gap-x-1 justify-end order-3"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <p className="text-gray-600 font-raleway font-light text-xs uppercase">
            Top
          </p>
          <FiChevronUp className="text-gray-600" />
        </button>
      </Container>
    </div>
  );
};

export default Footer;
