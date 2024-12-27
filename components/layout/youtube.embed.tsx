import React, { memo } from "react";

interface YouTubeEmbedProps {
  videoId: string | null;
}

const YoutubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div className="w-full relative pb-[56.25%] h-0 scale-110">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?playlist=${videoId}&modestbranding=1&rel=0&autohide=1&controls=0&cc_load_policy=0&vq=hd1080&autoplay=1&mute=1&playsinline=1&loop=1`}
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

export default memo(YoutubeEmbed);
