import { montserrat } from "@/constants/fonts";
import React from "react";

const InstagramFeedComponent = () => {
  return (
    <div
      id="photos"
      className={`relative bg-black ${montserrat.className} z-0`}
    >
      <div className="py-16 lg:py-28">
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 max-w-screen-xl mx-auto px-4 md:px-0 ${montserrat.className}`}
        >
          <h1
            className={`font-bold text-left text-4xl md:text-5xl lg:text-6xl text-white uppercase`}
          >
            Vibes Captured
          </h1>
          <p className="md:max-w-[50%] md:text-right text-white/80 text-sm lg:text-base">
            A showcase of the highlights and special experiences of our
            performances.
          </p>
          <div className="h-16 md:h-24 w-[1px] bg-white/20"></div>
        </div>
        <div
          className="elfsight-app-ab9ace17-1150-405a-bfd7-3df4abcc1b7a mb-16"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default InstagramFeedComponent;
