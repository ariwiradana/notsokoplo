import { montserrat } from "@/constants/fonts";
import { Video } from "@/types/video";
import React from "react";
import YouTubeEmbed from "../ui/youtube.embed";
import YouTubeEmbedPotrait from "../ui/youtube.embed.potrait";

interface GalleryComponentProps {
  videos: Video[];
}

const GalleryComponent = ({ videos }: GalleryComponentProps) => {
  const landscapeVideoYoutube =
    videos?.filter(
      (video) => video.orientation === "landscape" && video.type === "youtube"
    ) || [];
  const potraitVideoYoutube =
    videos?.filter(
      (video) => video.orientation === "potrait" && video.type === "youtube"
    ) || [];
  const landscapeVideoCloudinary =
    videos?.filter(
      (video) =>
        video.orientation === "landscape" && video.type === "cloudinary"
    ) || [];
  const potraitVideoCloudinary =
    videos?.filter(
      (video) => video.orientation === "potrait" && video.type === "cloudinary"
    ) || [];

  return (
    <div
      id="galeri"
      className={`relative bg-black overflow-x-hidden ${montserrat.className} z-0`}
    >
      <div className="pt-16 lg:pb-8 lg:pt-28 z-0 relative">
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 ${montserrat.className}`}
        >
          <h1
            className={`text-left text-3xl md:text-4xl lg:text-5xl text-white font-medium`}
          >
            Yang{" "}
            <span className="italic font-italianno tracking-wide text-[32px] md:text-[38px] lg:text-[50px]">
              Seru-Seru
            </span>{" "}
            bareng kami<span className="text-primary">.</span>
          </h1>
          <p className="md:max-w-[50%] md:text-right text-white/80 text-sm lg:text-base">
            Intip cuplikan seru dan momen gokil dari penampilan kami. Kameranya
            aja ikut joget.
          </p>
          <div className="h-16 md:h-24 w-[1px] bg-white/20"></div>
        </div>

        {landscapeVideoYoutube || landscapeVideoCloudinary ? (
          <div className="max-w-screen-xl mx-auto mb-16 lg:mb-0">
            {landscapeVideoYoutube.length > 0 && (
              <YouTubeEmbed videos={landscapeVideoYoutube} />
            )}
          </div>
        ) : (
          <></>
        )}

        {potraitVideoYoutube || potraitVideoCloudinary ? (
          <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 lg:mb-28 gap-6">
            {potraitVideoYoutube.length > 0 && (
              <YouTubeEmbedPotrait videos={landscapeVideoYoutube} />
            )}
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            zIndex: 0,
            padding: 0,
          }}
          className="elfsight-app-9b1d0fb8-a916-4fe6-942f-e2a0d4714b0e"
          data-elfsight-app-lazy
        ></div>
        <div className="w-full h-16 lg:h-28 absolute bottom-0 lg:bottom-8 bg-black z-[999]"></div>
      </div>
    </div>
  );
};

export default GalleryComponent;
