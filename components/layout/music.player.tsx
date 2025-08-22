import { montserrat } from "@/constants/fonts";
import { formatTime } from "@/helper/formatTime";
import useAppStore from "@/store/useAppStore";
import useMusicPlayer from "@/store/useMusicPlayer";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { BiLoaderAlt } from "react-icons/bi";
import { FaApple, FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa6";
import { LuChevronUp, LuMinimize, LuX } from "react-icons/lu";
import {
  PiCaretLineLeftFill,
  PiCaretLineRightFill,
  PiPauseFill,
  PiPlayFill,
} from "react-icons/pi";

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
    setBuffering,
    buffering,
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
    const handleWaiting = () => setBuffering(true);
    const handlePlaying = () => setBuffering(false);

    const handleEnded = () => {
      console.log("is ended");
      const allMusic = [...store.music];
      const newIndex =
        (allMusic.findIndex((m) => m.title === music.title) + 1) %
        allMusic.length;

      handleAddMusic(allMusic[newIndex]);
      handleIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("ended", handleEnded);

    if (audioRef.current.ended) {
      handleEnded();
    }

    if (isPlaying) audio.play();
    else audio.pause();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("ended", handleEnded);
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
      if (audioRef.current && audioRef.current.currentTime > 1.5) {
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

  const handlePlayFullVersion = (url: string) => {
    setTimeout(() => {
      window.open(url, "_blank");
    }, 1000);
  };

  return (
    <>
      <div
        className={`fixed transition-all ease-in-out duration-300 delay-200 ${
          !isOpenPlayer && music ? "-bottom-1" : "-bottom-full"
        } left-4 md:left-6 xl:left-8 z-[55]`}
      >
        <button
          className="text-white px-3 py-1 rounded-t-2xl text-2xl bg-dark/90 backdrop-blur-md border-x border-t border-white/10"
          onClick={() => {
            handleIsOpenPlayer(!isOpenPlayer);
          }}
        >
          <LuChevronUp />
        </button>
      </div>
      <div
        className={`fixed inset-x-0 px-6 py-8 md:px-12 bg-dark/90 backdrop-blur-md border-x border-t border-white/10 rounded-t-2xl xl:rounded-t-3xl flex flex-col xl:flex-row justify-between gap-y-4 gap-x-16 xl:items-center transition-all ease-in-out duration-500 z-50 ${
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
          <button
            className="text-2xl hidden xl:block"
            aria-label="Action Close Music"
            onClick={() => {
              handleIsOpenPlayer(false);
              handleIsPlaying(false);
              handleAddMusic(null);
            }}
          >
            <LuX />
          </button>
          <button
            className="hidden text-2xl xl:block"
            aria-label="Action Minimize Music"
            onClick={() => {
              handleIsOpenPlayer(false);
            }}
          >
            <LuMinimize />
          </button>
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
              <div>
                <h4
                  className={`${montserrat.className} font-semibold text-lg md:text-xl whitespace-nowrap text-white line-clamp-1`}
                >
                  {music?.title}{" "}
                </h4>
                <p className="text-base md:text-lg font-normal text-white/80 whitespace-nowrap hidden md:inline">
                  {music?.artist}
                </p>
              </div>
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
              !buffering && currentTime < duration && progressPercent > 0
                ? currentTime
                : 0
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

        <div className="flex justify-between gap-x-4 md:gap-x-6">
          <button
            className="text-xl xl:hidden"
            aria-label="Action Close Music"
            onClick={() => {
              handleIsOpenPlayer(false);
              handleIsPlaying(false);
              handleAddMusic(null);
            }}
          >
            <LuX />
          </button>

          <div className="flex items-center justify-center gap-x-4">
            <button
              className="text-2xl"
              aria-label="Action Back Music"
              onClick={() => handleNextPrevMusic("prev")}
            >
              <PiCaretLineLeftFill />
            </button>
            <button
              disabled={buffering}
              className="text-2xl bg-white text-dark rounded-full p-2 aspect-square disabled:opacity-50 transition-all ease-in-out duration-300"
              aria-label="Action Play Pause Music"
              onClick={() => handleIsPlaying(!isPlaying)}
            >
              {buffering ? (
                <BiLoaderAlt className="animate-spin" />
              ) : (
                <>{isPlaying ? <PiPauseFill /> : <PiPlayFill />}</>
              )}
            </button>
            <button
              className="text-2xl"
              aria-label="Action Next Music"
              onClick={() => handleNextPrevMusic("next")}
            >
              <PiCaretLineRightFill />
            </button>
          </div>
          <button
            className="text-xl xl:hidden"
            aria-label="Action Minimize Music"
            onClick={() => {
              handleIsOpenPlayer(false);
            }}
          >
            <LuMinimize />
          </button>
        </div>

        <div className="flex justify-between items-center border-t xl:border-t-0 border-white/10 pt-4 xl:pt-0 gap-x-4">
          <p
            className={`${montserrat.className} text-sm text-white whitespace-nowrap`}
          >
            Tersedia di :
          </p>
          {music?.soundcloud ||
          music?.youtube ||
          music?.spotify ||
          music?.applemusic ||
          music?.url ? (
            <div
              className={`${montserrat.className} text-sm font-medium flex items-center gap-x-2`}
            >
              {music.spotify && (
                <button
                  onClick={() => handlePlayFullVersion(music.spotify)}
                  className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
                >
                  <FaSpotify />
                  <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    Spotify
                  </span>
                </button>
              )}
              {music.applemusic && (
                <button
                  onClick={() => handlePlayFullVersion(music.applemusic)}
                  className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
                >
                  <FaApple />
                  <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    Apple Music
                  </span>
                </button>
              )}
              {music.soundcloud && (
                <button
                  onClick={() => handlePlayFullVersion(music.soundcloud)}
                  className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
                >
                  <FaSoundcloud />
                  <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    SoundCloud
                  </span>
                </button>
              )}
              {music.youtube && (
                <button
                  onClick={() => handlePlayFullVersion(music.youtube)}
                  className="p-3 rounded-full text-white border border-white/30 hover:bg-white/10 flex items-center group transition-all ease-in-out"
                >
                  <FaYoutube />
                  <span className="text-xs group-hover:ml-2 delay-500 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    Youtube
                  </span>
                </button>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
