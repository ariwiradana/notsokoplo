import useLoading from "@/store/useLoading";
import Image from "next/image";
import React from "react";
import { SquareLoader } from "react-spinners";

const HeroComponent = () => {
  const { handleIsLoading, isLoading } = useLoading();

  return (
    <div
      className="h-[90svh] md:h-svh w-full relative z-10 flex items-center justify-center"
      id="home"
    >
      {isLoading && <SquareLoader color="white" />}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          onLoadedData={handleIsLoading}
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/dta5qasmt/image/upload/v1733898698/hero_poster_quw6nz.png"
        >
          <source src="https://res.cloudinary.com/dta5qasmt/video/upload/v1734280593/NSK_Bali_Countdown_2023_qby1rn.mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-[30%] via-transparent to-dark z-10 flex items-end justify-center">
        <div className="relative w-20 aspect-square md:hidden mb-4">
          <Image
            sizes="200px"
            src="/logo.png"
            fill
            className="object-contain"
            alt="logo Mobile"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
