// components/YouTubeEmbed.js
import React from "react";

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed = ({ videoId = "" }: YouTubeEmbedProps) => {
  return (
    <div
      className="w-full"
      style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0&rel=0&cc_load_policy=0`}
        title={videoId}
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
