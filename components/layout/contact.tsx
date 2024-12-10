import { montserrat } from "@/constants/fonts";
// import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <div
      className={`relative bg-white ${montserrat.className} z-0`}
      id="contact"
    >
      <div className="max-w-screen-lg mx-auto py-16 lg:py-28 px-4 md:px-12 lg:px-0">
        <div
          className={`flex flex-col md:flex-row items-center justify-between mb-12 gap-4 ${montserrat.className}`}
        >
          <h2
            className={`font-semibold text-center text-3xl md:text-4xl lg:text-5xl text-dark whitespace-nowrap`}
          >
            Contact
          </h2>
          <p className="md:max-w-[50%] text-center md:text-right text-dark/80 text-sm lg:text-base">
            Dive into our newest tracks, created to bring joy to your day.
            Listen now and let the music elevate your mood!
          </p>
          <div className="h-10 md:h-16 w-[1px] bg-dark/30"></div>
        </div>
        {/* <div className="relative w-full aspect-video">
          <Image
            src="/contact.jpeg"
            fill
            alt="contact-image"
            className="object-cover"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
