// components/YouTubeEmbedPotrait.js
import { Video } from "@/types/video";
import React from "react";

interface YouTubeEmbedPotraitProps {
  videos: Video[];
}

const YouTubeEmbedPotrait = ({ videos }: YouTubeEmbedPotraitProps) => {
  const videoIds = videos.map((video) => video.url);
  return (
    <div
      className="w-full"
      style={{ position: "relative", paddingBottom: "177.78%", height: 0 }} // 9:16 aspect ratio
    >
      <iframe
        src={`https://www.youtube.com/embed?playlist=${videoIds.join(
          ","
        )}&modestbranding=1&showinfo=0&rel=0&cc_load_policy=0&vq=hd1080&mute=1&autoplay=1`}
        title="Video Potrait Not So Koplo"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </div>
  );
};

export default YouTubeEmbedPotrait;
