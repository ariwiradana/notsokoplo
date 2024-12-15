import { montserrat } from "@/constants/fonts";
import { Video } from "@/types/video";
import React from "react";
import YouTubeEmbed from "../ui/youtube.embed";

interface GalleryComponentProps {
  videos: Video[];
}

const GalleryComponent = ({ videos }: GalleryComponentProps) => {
  return (
    <div
      id="gallery"
      className={`relative bg-black overflow-x-hidden ${montserrat.className} z-0`}
    >
      <div className="pt-16 lg:pb-8 lg:pt-28 z-0 relative">
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 ${montserrat.className}`}
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

        {videos.length > 0 && (
          <div className="max-w-screen-xl mx-auto lg:mb-28">
            <YouTubeEmbed videos={videos} />
          </div>
        )}

        <div
          style={{
            zIndex: 0,
          }}
          className="elfsight-app-dc7b977e-154a-4103-846e-63aa9d1d3613 mb-16 relative"
          data-elfsight-app-lazy
        ></div>
        <div className="w-full h-16 lg:h-28 absolute bottom-0 bg-black z-[999]"></div>
      </div>
    </div>
  );
};

export default GalleryComponent;
