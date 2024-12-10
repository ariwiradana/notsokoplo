import { montserrat } from "@/constants/fonts";
import useMusicPlayer from "@/store/useMusicPlayer";
import Image from "next/image";
import React from "react";
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerTrackNextFilled,
  TbX,
} from "react-icons/tb";

const MusicPlayer = () => {
  const {
    handleIsPlaying,
    handleIsOpenPlayer,
    isPlaying,
    isOpenPlayer,
    music,
  } = useMusicPlayer();

  return (
    <div
      className={`fixed inset-x-0 py-6 px-4 md:px-12 bg-gradient-to-b from-dark/60 via-dark/80 to-dark backdrop-blur-sm flex flex-col-reverse md:flex-row justify-between gap-y-6 gap-x-24 md:items-center transition-all ease-in-out duration-500 z-50 ${
        isOpenPlayer ? "bottom-0 visible" : "-bottom-full invisible"
      }`}
    >
      <div className="flex justify-center md:justify-start items-center gap-x-8 text-white text-2xl">
        <button
          onClick={() => {
            handleIsOpenPlayer(false);
            handleIsPlaying(false);
          }}
        >
          <TbX className="text-[26px]" />
        </button>
        <button onClick={() => handleIsPlaying(!isPlaying)}>
          {isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
        </button>
        <button>
          <TbPlayerTrackNextFilled />
        </button>
      </div>
      <div className="w-full h-[3px] bg-white/50 rounded-full relative">
        <div className="absolute inset-0 bg-white rounded-full w-[40%]"></div>
      </div>
      <div className="flex md:items-center gap-x-4 md:gap-x-6">
        <div className="relative min-w-10 w-10 h-10 min-h-10 aspect-square mt-1">
          <Image
            src={music?.cover || ""}
            fill
            className="object-cover rounded"
            alt={`player-${music?.title}`}
          />
        </div>
        <div>
          <h4
            className={`${montserrat.className} font-semibold text-lg whitespace-nowrap`}
          >
            {music?.title}{" "}
            <span className="text-base font-normal text-white/80 whitespace-nowrap mt-[2px] hidden md:inline">
              - {music?.artist}
            </span>
          </h4>
          <p className="text-sm md:text-base font-normal text-white/80 mt-[2px] md:hidden">
            - {music?.artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
