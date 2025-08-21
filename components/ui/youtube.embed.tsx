// components/YouTubeEmbed.js
import { Video } from "@/types/video";
import React from "react";

interface YouTubeEmbedProps {
  videos: Video[];
}

const YouTubeEmbed = ({ videos = [] }: YouTubeEmbedProps) => {
  const videoIds = videos.map((video) => video.url);
  return (
    <div
      className="w-full"
      style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
    >
      <iframe
        src={`https://www.youtube.com/embed?playlist=${videoIds.join(
          ","
        )}&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0`}
        title="Video Not So Koplo"
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

export default YouTubeEmbed;
