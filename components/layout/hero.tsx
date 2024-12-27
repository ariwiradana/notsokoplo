import useLoading from "@/store/useLoading";
import Image from "next/image";
import React from "react";
import { SquareLoader } from "react-spinners";

const HeroComponent = () => {
  const { handleIsLoading, isLoading } = useLoading();

  return (
    <div
      className="h-[90svh] md:h-svh w-full relative z-10 flex items-center justify-center overflow-hidden"
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
          poster="https://www.dropbox.com/scl/fi/eks05styky39t83lwue5w/hero-poster.webp?rlkey=3z9vqd260ldm8h70agv84cygb&raw=1"
        >
          <source src="https://www.dropbox.com/scl/fi/fq4sxzz45wpa1e2jn40au/NSK-Bali-Countdown-2023.mp4?rlkey=9fylcmsd4o0d5hok87zc32nk3&raw=1" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-[30%] via-transparent to-dark z-10 flex items-end justify-center">
        <div className="relative w-20 aspect-square md:hidden mb-4">
          <Image
            sizes="200px"
            src="/logo.png"
            fill
            className="object-contain"
            alt="Logo Notsokoplo Mobile"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
