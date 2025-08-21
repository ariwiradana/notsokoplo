import { montserrat } from "@/constants/fonts";
import { formatTime } from "@/helper/formatTime";
import useAppStore from "@/store/useAppStore";
import useMusicPlayer from "@/store/useMusicPlayer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { FaApple, FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa6";
import {
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoPause,
  IoPlay,
} from "react-icons/io5";

const MusicPlayer = () => {
  const {
    handleIsPlaying,
    handleIsOpenPlayer,
    handleAddMusic,
    isOpenPlayer,
    isPlaying,
    music,
    setCurrentTime,
    setDuration,
    duration,
    currentTime,
  } = useMusicPlayer();

  const store = useAppStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (!audioRef.current || !music) return;
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    if (isPlaying) audio.play();
    else audio.pause();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isPlaying, music]);

  const handleNextPrevMusic = (flag: "next" | "prev") => {
    const allMusic = [...store.music];
    if (!music || allMusic.length === 0) return;

    const currentIndexPlayed = allMusic.findIndex(
      (m) => m.title === music.title
    );
    let newIndex = currentIndexPlayed;

    if (flag === "next") {
      newIndex = currentIndexPlayed + 1;
      if (newIndex >= allMusic.length) {
        newIndex = 0; // wrap ke lagu pertama
      }
      handleAddMusic(allMusic[newIndex]);
      handleIsPlaying(true);
    } else {
      // flag === "prev"
      if (audioRef.current && audioRef.current.currentTime > 1) {
        audioRef.current.currentTime = 0;
        handleIsPlaying(true);
      } else {
        newIndex = currentIndexPlayed - 1;
        if (newIndex < 0) {
          newIndex = allMusic.length - 1; // wrap ke lagu terakhir
        }
        handleAddMusic(allMusic[newIndex]);
        handleIsPlaying(true);
      }
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed inset-x-0 p-6 md:px-12 bg-dark/90 backdrop-blur-sm flex flex-col md:flex-row justify-between gap-y-4 gap-x-16 md:items-center transition-all ease-in-out duration-500 z-50 ${
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
            <IoClose className="text-[26px]" />
          </button>
        </div>
        <div className="flex">
          <button
            aria-label="Action Back Music"
            onClick={() => handleNextPrevMusic("prev")}
          >
            <IoChevronBack className="text-[26px]" />
          </button>
        </div>
        <div className="flex">
          <button
            aria-label="Action Play Pause Music"
            onClick={() => handleIsPlaying(!isPlaying)}
          >
            {isPlaying ? <IoPause /> : <IoPlay />}
          </button>
        </div>
        <div className="flex">
          <button
            aria-label="Action Next Music"
            onClick={() => handleNextPrevMusic("next")}
          >
            <IoChevronForward className="text-[26px]" />
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
            <Marquee direction="left" speed={10}>
              <div className="mr-2">
                <p className="text-sm font-normal text-white/80 md:hidden line-clamp-1">
                  {music?.artist}
                </p>
              </div>
            </Marquee>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-6 w-full">
        <p className="text-sm text-white">
          {formatTime(
            currentTime < duration && progressPercent > 0 ? currentTime : 0
          )}
        </p>
        <div className="w-full h-1 bg-white/5 relative rounded-full">
          {progressPercent > 0 && currentTime < duration ? (
            <div
              className="h-1 bg-primary absolute inset-0"
              style={{ width: `${progressPercent}%` }}
            ></div>
          ) : null}
        </div>
        <p className="text-sm text-white">{formatTime(duration)}</p>
      </div>

      {music?.soundcloud ||
      music?.youtube ||
      music?.spotify ||
      music?.applemusic ||
      music?.url ? (
        <div
          className={`${montserrat.className} text-sm font-medium flex items-center gap-x-2`}
        >
          <p className="whitespace-nowrap font-medium text-white hidden md:block">
            {music?.url ? "Versi fullnya :" : "Dengarkan di :"}
          </p>
          {music.spotify && (
            <Link
              href={music.spotify}
              target="_blank"
              className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
            >
              <FaSpotify />
              <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                Spotify
              </span>
            </Link>
          )}
          {music.applemusic && (
            <Link
              href={music.applemusic}
              target="_blank"
              className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
            >
              <FaApple />
              <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                Apple Music
              </span>
            </Link>
          )}
          {music.soundcloud && (
            <Link
              href={music.soundcloud}
              target="_blank"
              className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
            >
              <FaSoundcloud />
              <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                SoundCloud
              </span>
            </Link>
          )}
          {music.youtube && (
            <Link
              href={music.youtube}
              target="_blank"
              className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
            >
              <FaYoutube />
              <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                Youtube
              </span>
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
