import useLoading from "@/store/useLoading";
import React from "react";
import { SquareLoader } from "react-spinners";

const HeroComponent = () => {
  const { handleIsLoading, isLoading } = useLoading();

  return (
    <div
      className="h-svh w-full relative z-10 flex items-center justify-center"
      id="home"
    >
      <SquareLoader loading={isLoading} color="white" />
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          onLoadedData={handleIsLoading}
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://res.cloudinary.com/dta5qasmt/video/upload/v1733882455/NSK_Bali_Countdown_2023_1_fhfgd4.mp4" />
        </video>
      </div>

      {!isLoading && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-[30%] via-transparent to-dark z-10"></div>
      )}
    </div>
  );
};

export default HeroComponent;
