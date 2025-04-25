import { montserrat } from "@/constants/fonts";
import useMusicPlayer from "@/store/useMusicPlayer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaLink, FaSoundcloud, FaYoutube } from "react-icons/fa6";
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

  console.log(music);

  return (
    <div
      className={`fixed inset-x-0 p-6 md:px-12 bg-dark/90 backdrop-blur-sm flex flex-col md:flex-row justify-between gap-y-6 gap-x-24 md:items-center transition-all ease-in-out duration-500 z-50 ${
        isOpenPlayer ? "bottom-0 visible" : "-bottom-full invisible"
      }`}
    >
      {music?.preview && (
        <audio
          loop={false}
          ref={audioRef}
          src={music?.preview}
          onEnded={() => {
            handleIsPlaying(false);
          }}
        />
      )}
      <div className="flex justify-center md:justify-start items-center gap-x-4 md:gap-x-8 text-white text-2xl">
        <div className="flex">
          <button
            aria-label="Action Close Music"
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
          <button
            aria-label="Action Play Pause Music"
            onClick={() => handleIsPlaying(!isPlaying)}
          >
            {isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
          </button>
        </div>
        <div className="flex md:items-center gap-x-4 md:gap-x-6">
          {music?.cover && (
            <div className="relative min-w-12 w-12 h-12 min-h-12 md:min-w-14 md:w-14 md:h-14 md:min-h-14 aspect-square">
              <Image
                src={music?.cover}
                fill
                className="object-cover bg-white/5"
                alt={`Cover Image Small ${music?.title} Notsokoplo`}
              />
            </div>
          )}
          <div>
            <h4
              className={`${montserrat.className} font-semibold text-lg md:text-xl whitespace-nowrap text-white line-clamp-1`}
            >
              {music?.title}{" "}
              <span className="text-base md:text-lg font-normal text-white/80 whitespace-nowrap mt-[2px] hidden md:inline">
                - {music?.artist}
              </span>{" "}
            </h4>
            <p className="text-sm font-normal text-white/80 md:hidden line-clamp-1">
              {music?.artist}
            </p>
          </div>
        </div>
      </div>

      {music?.soundcloud || music?.youtube || music?.url ? (
        <div
          className={`${montserrat.className} text-sm font-medium flex items-center gap-x-3`}
        >
          <p className="whitespace-nowrap font-medium text-white hidden md:block">
            {music?.url ? "Full Version :" : "Listen on :"}
          </p>
          {music?.soundcloud && (
            <Link
              target="_blank"
              href={music.soundcloud || ""}
              aria-label="Action SoundCloud Music"
              onClick={() => {
                handleIsPlaying(false);
              }}
              className="border px-4 py-2 rounded-full border-white flex items-center gap-x-2 hover:bg-primary text-white hover:border-primary w-full justify-center"
            >
              <FaSoundcloud className="text-lg" />
              <span>SoundCloud</span>
            </Link>
          )}
          {music?.youtube && (
            <Link
              aria-label="Action Youtube Music"
              target="_blank"
              href={music.youtube || ""}
              onClick={() => {
                handleIsPlaying(false);
              }}
              className="border px-4 py-2 rounded-full border-white flex items-center gap-x-2 hover:bg-primary text-white hover:border-primary w-full justify-center"
            >
              <FaYoutube className="text-lg" />
              <span>Youtube</span>
            </Link>
          )}
          {music?.url && (
            <Link
              target="_blank"
              href={music.url || ""}
              aria-label="Action URL Music"
              onClick={() => {
                handleIsPlaying(false);
              }}
              className="border px-4 py-2 rounded-full border-white flex items-center gap-x-2 hover:bg-primary text-white hover:border-primary w-full justify-center"
            >
              <FaLink className="text-lg" />
              <span>Stream Now</span>
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
