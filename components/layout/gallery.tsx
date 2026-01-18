import { montserrat } from "@/constants/fonts";
import React from "react";
import YouTubeEmbed from "../ui/youtube.embed";
import useAppStore from "@/store/useAppStore";

const GalleryComponent = () => {
  const store = useAppStore();

  const youtubeVideos = store.videos.filter((v) => v.source === "youtube");

  return (
    <div
      id="galeri"
      className={`relative bg-gradient-to-b from-dark to-black overflow-x-hidden ${montserrat.className} z-0`}
    >
      <div className="pb-8 z-0 relative">
        {youtubeVideos.length > 0 && (
          <div className="mb-16 lg:mb-0">
            <YouTubeEmbed videos={youtubeVideos} />
          </div>
        )}
        <div
          style={{
            zIndex: 0,
            padding: 0,
          }}
          className="elfsight-app-dc7b977e-154a-4103-846e-63aa9d1d3613"
          data-elfsight-app-lazy
        ></div>
        <div className="w-full h-20 absolute bottom-0 lg:bottom-8 bg-black z-[999]"></div>
      </div>
    </div>
  );
};

export default GalleryComponent;
