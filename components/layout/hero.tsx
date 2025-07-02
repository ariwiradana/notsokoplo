import useLoading from "@/store/useLoading";
import React from "react";
import Button from "../ui/button";
import { montserrat } from "@/constants/fonts";
import Link from "next/link";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { Release } from "@/types/release";

const HeroComponent = (release: Release | null) => {
  const { handleIsLoading } = useLoading();

  console.log(release);

  return (
    <div
      className="h-[90svh] md:h-svh w-full relative z-10 flex items-center justify-center overflow-hidden"
      id="beranda"
    >
      {release && (
        <>
          <div
            className={`absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-b from-transparent via-dark/40 to-dark/60 px-4 md:px-12 py-16 lg:p-32 z-20 ${montserrat.className}`}
          >
            <h1
              style={{
                lineHeight: "0.8em",
              }}
              className="text-white font-semibold text-center text-5xl md:text-6xl lg:text-8xl uppercase mt-6 relative"
            >
              {release.title}{" "}
              <span className="text-xl md:text-2xl font-medium text-white/60">
                {release.caption}
              </span>
            </h1>
            <p className="text-white text-lg my-4 text-center lg:text-left">
              {release.artist}
            </p>
            <Link
              className="mt-4"
              target="_blank"
              aria-label="URL Stream New Release"
              href={(release.url as string) || ""}
            >
              <Button
                icon={<TbPlayerPlayFilled />}
                title="Stream di Mana Aja"
              />
            </Link>
          </div>
        </>
      )}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          onLoadedData={handleIsLoading}
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={release?.poster as string}
        >
          <source src={release?.video as string} />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-[30%] via-transparent to-dark z-10 flex items-end justify-center"></div>
    </div>
  );
};

export default HeroComponent;
