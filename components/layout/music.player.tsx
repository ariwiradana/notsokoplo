import { montserrat } from "@/constants/fonts";
import useMusicPlayer from "@/store/useMusicPlayer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaSoundcloud, FaYoutube } from "react-icons/fa6";
import { TbPlayerPauseFilled, TbPlayerPlayFilled, TbX } from "react-icons/tb";

const MusicPlayer = () => {
  const {
    handleIsPlaying,
    handleIsOpenPlayer,
    handleAddMusic,
    isOpenPlayer,
    isPlaying,
    music,
  } = useMusicPlayer();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && music) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, music]);

  return (
    <div
      className={`fixed inset-x-0 py-6 px-4 md:px-12 bg-dark/80 backdrop-blur-sm flex flex-col md:flex-row justify-between gap-y-6 gap-x-24 md:items-center transition-all ease-in-out duration-500 z-50 ${
        isOpenPlayer ? "bottom-0 visible" : "-bottom-full invisible"
      }`}
    >
      {music?.preview && <audio ref={audioRef} src={music?.preview} />}
      <div className="flex justify-center md:justify-start items-center gap-x-4 md:gap-x-8 text-white text-2xl">
        <div className="flex">
          <button
            onClick={() => {
              handleIsOpenPlayer(false);
              handleIsPlaying(false);
              handleAddMusic(null);
            }}
          >
            <TbX className="text-[26px]" />
          </button>
        </div>
        <div className="flex">
          <button onClick={() => handleIsPlaying(!isPlaying)}>
            {isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
          </button>
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
              className={`${montserrat.className} font-semibold text-lg whitespace-nowrap text-white`}
            >
              {music?.title}{" "}
              <span className="text-base font-normal text-white/80 whitespace-nowrap mt-[2px] hidden md:inline">
                - {music?.artist}
              </span>{" "}
            </h4>
            <p className="text-sm md:text-base font-normal text-white/80 md:hidden line-clamp-1">
              {music?.artist}
            </p>
          </div>
        </div>
      </div>

      {music?.soundcloud || music?.youtube ? (
        <div
          className={`${montserrat.className} text-sm font-medium flex gap-x-4`}
        >
          {music?.soundcloud && (
            <Link
              href={music.soundcloud}
              target="_blank"
              className="border px-4 py-2 rounded-full border-white flex items-center gap-x-2 hover:bg-primary text-white hover:border-primary w-full justify-center"
            >
              <FaSoundcloud className="text-lg" />
              <span>SoundCloud</span>
            </Link>
          )}
          {music?.youtube && (
            <Link
              href={music.youtube}
              target="_blank"
              className="border px-4 py-2 rounded-full border-white flex items-center gap-x-2 hover:bg-primary text-white hover:border-primary w-full justify-center"
            >
              <FaYoutube className="text-lg" />
              <span>Youtube</span>
            </Link>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
