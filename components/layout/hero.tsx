import useLoading from "@/store/useLoading";
import React from "react";
import { SquareLoader } from "react-spinners";
import Button from "../ui/button";
import { montserrat } from "@/constants/fonts";
import Link from "next/link";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { Release } from "@/types/release";

const HeroComponent = (release: Release | null) => {
  const { handleIsLoading, isLoading } = useLoading();

  console.log(release);

  return (
    <div
      className="h-[90svh] md:h-svh w-full relative z-10 flex items-center justify-center overflow-hidden"
      id="home"
    >
      {release && (
        <>
          <div
            className={`absolute inset-0 flex flex-col justify-end items-center bg-dark/50 px-4 md:px-12 py-24 lg:p-32 z-20 ${montserrat.className}`}
          >
            <h1
              style={{
                lineHeight: "0.8em",
              }}
              className="text-white font-bold text-center text-5xl md:text-6xl lg:text-8xl uppercase mt-6 relative"
            >
              {release.title}{" "}
              <span className="text-xl md:text-2xl font-semibold text-white/50">
                {release.caption}
              </span>
            </h1>
            <p className="text-white text-lg my-4 text-center lg:text-left">
              <span className="text-white/50 text-base">By</span>{" "}
              {release.artist}
            </p>
            <Link
              className="mt-4"
              target="_blank"
              aria-label="URL Stream New Release"
              href={release.url as string}
            >
              <Button icon={<TbPlayerPlayFilled />} title="Stream Now" />
            </Link>
          </div>
        </>
      )}
      {isLoading && <SquareLoader color="white" />}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          onLoadedData={handleIsLoading}
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={
            release?.poster ||
            "https://www.dropbox.com/scl/fi/eks05styky39t83lwue5w/hero-poster.webp?rlkey=3z9vqd260ldm8h70agv84cygb&raw=1"
          }
        >
          <source
            src={
              release?.video ||
              "https://www.dropbox.com/scl/fi/fq4sxzz45wpa1e2jn40au/NSK-Bali-Countdown-2023.mp4?rlkey=9fylcmsd4o0d5hok87zc32nk3&raw=1"
            }
          />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-[30%] via-transparent to-dark z-10 flex items-end justify-center"></div>
    </div>
  );
};

export default HeroComponent;
