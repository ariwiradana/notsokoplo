import useLoading from "@/store/useLoading";
import React from "react";

const HeroComponent = () => {
  const { handleIsLoading } = useLoading();
  return (
    <div
      className="h-svh w-full relative z-10 flex items-center justify-center"
      id="home"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          onCanPlay={handleIsLoading}
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
          src="https://res.cloudinary.com/dta5qasmt/video/upload/v1733733277/videos/gyglwq60isxvfs0hwnf4.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-[30%] via-transparent to-dark z-10"></div>
    </div>
  );
};

export default HeroComponent;
