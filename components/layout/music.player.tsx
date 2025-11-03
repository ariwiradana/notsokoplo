import { montserrat } from "@/constants/fonts";
import { formatTime } from "@/helper/formatTime";
import useAppStore from "@/store/useAppStore";
import useMusicPlayer from "@/store/useMusicPlayer";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { LuChevronDown, LuChevronUp, LuX } from "react-icons/lu";
import {
  PiCaretLineLeftFill,
  PiCaretLineRightFill,
  PiPauseFill,
  PiPlayFill,
} from "react-icons/pi";
import { BeatLoader } from "react-spinners";

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
      const allMusic = [...store.music].flatMap((m) => m.musics);
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
    const allMusic = [...store.music].flatMap((m) => m.musics);
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

  useEffect(() => {
    if (isOpenPlayer) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpenPlayer]);

  const [dragTime, setDragTime] = React.useState<number | null>(null);

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
        onClick={() => {
          handleIsOpenPlayer(false);
        }}
        className={`fixed overflow-hidden inset-0 select-none ignore-click bg-dark/60 md:bg-dark/90 backdrop-blur-sm flex flex-col justify-end md:justify-center items-center transition-all ease-in-out duration-300 z-50 ${
          isOpenPlayer ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative overflow-hidden bg-dark/90 backdrop-blur-md rounded-t-2xl md:rounded-3xl px-6 py-8 md:px-10 md:py-10 transition-all ease-in-out duration-300 ${
            isOpenPlayer ? "translate-y-0" : "translate-y-5"
          }`}
        >
          {music?.cover && (
            <Image
              src={music?.cover}
              fill
              className="object-cover opacity-15 blur-3xl"
              alt={`Cover Backdrop ${music?.title} Notsokoplo`}
              quality={30}
              priority={false}
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 20vw"
            />
          )}
          <div className="grid grid-cols-3 relative z-10 mb-4 md:mb-6">
            <button
              className="text-xl xl:text-2xl flex items-start"
              aria-label="Action Minimize Music"
              onClick={() => {
                handleIsOpenPlayer(false);
              }}
            >
              <LuChevronDown />
            </button>
            <div className="flex flex-col items-center">
              <h4
                className={`${montserrat.className} font-semibold text-lg md:text-xl whitespace-nowrap text-white line-clamp-1`}
              >
                Not So Koplo
              </h4>
              <p className="text-base line-clamp-1 md:text-lg font-normal text-white/80 whitespace-nowrap">
                {music?.caption}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                className="text-xl xl:text-2xl flex items-start"
                aria-label="Action Close Music"
                onClick={() => {
                  handleIsOpenPlayer(false);
                  handleIsPlaying(false);
                  handleAddMusic(null);
                }}
              >
                <LuX />
              </button>
            </div>
          </div>

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
          <div>
            {music?.cover && (
              <div className="flex justify-center">
                <div className="relative w-[80vw] md:w-[40vw] lg:w-[30vw] xl:w-[20vw] aspect-square">
                  <Image
                    src={music?.cover}
                    fill
                    className="object-cover bg-white/[0.03] shadow-2xl shadow-dark/30 rounded-2xl"
                    alt={`Cover Image Small ${music?.title} Notsokoplo`}
                    quality={60}
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 20vw"
                    priority={false}
                  />
                </div>
              </div>
            )}
            <div className="mt-6">
              <h4
                className={`${montserrat.className} font-semibold text-xl md:text-2xl whitespace-nowrap text-white line-clamp-1`}
              >
                {music?.title}{" "}
              </h4>
              <p className="text-lg line-clamp-1 md:text-lg font-normal text-white/80 whitespace-nowrap">
                {music?.artist}
              </p>
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={dragTime ?? currentTime}
              onChange={(e) => setDragTime(parseFloat(e.target.value))}
              onMouseUp={() => {
                if (!audioRef.current || dragTime === null) return;
                audioRef.current.currentTime = dragTime; // apply ke audio
                setCurrentTime(dragTime); // update store
                setDragTime(null); // reset drag state
              }}
              className="w-full h-1 rounded-full accent-primary cursor-pointer relative z-10"
            />

            <div className="flex justify-between items-center gap-x-6 w-full mt-3">
              <p className="text-sm text-white">
                {formatTime(
                  !buffering && currentTime < duration && progressPercent > 0
                    ? currentTime
                    : 0
                )}
              </p>

              <p className="text-sm text-white">{formatTime(duration)}</p>
            </div>

            <div className="flex items-center justify-center gap-x-8 relative z-10">
              <button
                className="text-3xl"
                aria-label="Action Back Music"
                onClick={() => handleNextPrevMusic("prev")}
              >
                <PiCaretLineLeftFill />
              </button>
              <button
                disabled={buffering}
                className="text-2xl bg-white text-dark rounded-full aspect-square transition-all ease-in-out duration-300 h-12 w-12 flex justify-center items-center disabled:opacity-70"
                aria-label="Action Play Pause Music"
                onClick={() => handleIsPlaying(!isPlaying)}
              >
                {buffering ? (
                  <BeatLoader color="#0f0f0f" size={5} />
                ) : (
                  <>{isPlaying ? <PiPauseFill /> : <PiPlayFill />}</>
                )}
              </button>
              <button
                className="text-3xl"
                aria-label="Action Next Music"
                onClick={() => handleNextPrevMusic("next")}
              >
                <PiCaretLineRightFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
