import { montserrat } from "@/constants/fonts";
import React from "react";
import YouTubeEmbed from "../ui/youtube.embed";
import YouTubeEmbedPotrait from "../ui/youtube.embed.potrait";
import useAppStore from "@/store/useAppStore";

const GalleryComponent = () => {
  const store = useAppStore();
  const landscapeVideoYoutube =
    store.videos?.filter(
      (video) => video.orientation === "landscape" && video.type === "youtube"
    ) || [];
  const potraitVideoYoutube =
    store.videos?.filter(
      (video) => video.orientation === "potrait" && video.type === "youtube"
    ) || [];
  const landscapeVideoCloudinary =
    store.videos?.filter(
      (video) =>
        video.orientation === "landscape" && video.type === "cloudinary"
    ) || [];
  const potraitVideoCloudinary =
    store.videos?.filter(
      (video) => video.orientation === "potrait" && video.type === "cloudinary"
    ) || [];

  return (
    <div
      id="momen-seru"
      className={`relative bg-gradient-to-b from-dark to-black overflow-x-hidden ${montserrat.className} z-0`}
    >
      <div className="pb-8 z-0 relative">
        {landscapeVideoYoutube || landscapeVideoCloudinary ? (
          <div className="mb-16 lg:mb-0">
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
        <div className="w-full h-20 absolute bottom-0 lg:bottom-8 bg-black z-[999]"></div>
      </div>
    </div>
  );
};

export default GalleryComponent;
