import { montserrat } from "@/constants/fonts";
import Image from "next/image";
import React from "react";
import useAppStore from "@/store/useAppStore";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiPause,
  BiPlay,
} from "react-icons/bi";
import { Navigation } from "swiper/modules";
import useMusicPlayer from "@/store/useMusicPlayer";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import {
  SiAmazonmusic,
  SiApplemusic,
  SiSoundcloud,
  SiSpotify,
  SiTidal,
  SiYoutube,
  SiYoutubemusic,
} from "react-icons/si";
import { FaDeezer } from "react-icons/fa6";

const MusicComponent = () => {
  const store = useAppStore();
  const {
    handleIsPlaying,
    handleIsOpenPlayer,
    handleAddMusic,
    isPlaying,
    music: playedMusic,
    duration,
    currentTime,
    buffering,
  } = useMusicPlayer();

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  console.log(store.music);

  return (
    <div className={`relative ${montserrat.className} z-0 bg-black`} id="musik">
      <div className="max-w-screen-xl mx-auto py-16 md:py-20 lg:py-28 px-4 md:px-12 lg:px-4">
        <div
          className={`flex items-center justify-between mb-6 md:mb-12 gap-3 md:gap-12 ${montserrat.className}`}
        >
          <h1
            className={`text-left text-4xl md:text-5xl lg:text-6xl font-medium text-white`}
          >
            The Koplo Mix
            <span className="text-primary">.</span>
          </h1>
          <div className="flex items-center gap-x-2 lg:gap-x-3">
            <button className="text-white text-sm flex items-center action-prev border border-white/20 rounded-full p-3 lg:p-4">
              <BiChevronLeft className="text-2xl" />
            </button>
            <button className="text-white text-sm flex items-center action-next border border-white/20 rounded-full p-3 lg:p-4">
              <BiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
        <div>
          <Swiper
            speed={500}
            navigation={{
              prevEl: ".action-prev",
              nextEl: ".action-next",
            }}
            slidesPerView={"auto"}
            spaceBetween={16}
            modules={[Navigation]}
          >
            {store.music?.map((musics, index) => {
              const isMultiple = musics.musics.length > 1
              const music = musics.musics[0]
              return (
                <SwiperSlide
                  key={music.title}
                  className="max-w-[80vw] md:max-w-[40vw] lg:max-w-96"
                >
                  <div className="md:text-center">
                    <div
                      className={`w-full aspect-square relative shadow-lg mb-6 group/music transition-all ease-in-out duration-300`}
                    >
                      <Image
                        loading={index < 3 ? "eager" : "lazy"}
                        sizes="600px"
                        src={music.cover}
                        priority={index < 3}
                        fill
                        className={`object-cover z-30 transition-all rounded-2xl ease-in-out duration-200 shadow-lg ${
                          isMultiple &&
                          "scale-95 -translate-x-1.5 -translate-y-1.5"
                        }`}
                        alt={`Cover Image ${music.title} Notsokoplo`}
                      />
                      {isMultiple && (
                        <Image
                          sizes="600px"
                          src={music.cover}
                          fill
                          className={`object-cover z-20 opacity-95 transition-all rounded-2xl ease-in-out duration-200 scale-95 translate-x-1.5 translate-y-1.5`}
                          alt={`Cover Image ${music.title} Notsokoplo`}
                        />
                      )}
                      <div
                        className={`absolute inset-0 h-auto group-hover/music:visible group-hover/music:opacity-100 opacity-0 invisible z-30 flex flex-col justify-center items-center gap-2 transition-all ease-in-out duration-200 ${
                          isMultiple &&
                          "scale-95 -translate-y-1.5 -translate-x-1.5"
                        }`}
                      >
                        <button
                          disabled={
                            buffering && music.title === playedMusic?.title
                          }
                          onClick={() => {
                            handleAddMusic(music);
                            if (music.title === playedMusic?.title) {
                              handleIsPlaying(!isPlaying);
                            } else {
                              handleIsPlaying(true);
                              handleIsOpenPlayer(true);
                            }
                          }}
                          className="text-white text-sm flex items-center bg-primary rounded-full min-w-14 min-h-14 aspect-square justify-center relative z-10"
                        >
                          {buffering && music.title === playedMusic?.title ? (
                            <BeatLoader color="white" size={7} />
                          ) : (
                            <>
                              {music.title === playedMusic?.title &&
                              isPlaying ? (
                                <BiPause className="text-4xl" />
                              ) : (
                                <BiPlay className="text-4xl" />
                              )}
                            </>
                          )}
                        </button>
                        {music.title === playedMusic?.title &&
                        progressPercent > 0 &&
                        currentTime < duration ? (
                          <div
                            className="absolute rounded-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                            style={{
                              width: 62,
                              height: 62,
                              background: `conic-gradient(#ffff ${progressPercent}%, transparent 0)`,
                              WebkitMask: `radial-gradient(circle calc(50% - 2px), transparent 99%, black 100%)`,
                              mask: `radial-gradient(circle calc(50% - 2px), transparent 99%, black 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>

                    {music.kind && (
                      <div className="mb-2">
                        <p className="bg-primary/30 border border-primary/50 text-white inline px-3 py-[3px] rounded-full text-sm">
                          {music.kind}
                        </p>
                      </div>
                    )}
                    <h5 className="text-2xl font-semibold text-white">
                      {music.title}
                    </h5>
                    <h6 className="mt-2 text-white/70">{music.artist}</h6>
                    <div className="flex lg:justify-center gap-x-4 mt-4">
                      {music.applemusic && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.applemusic}
                          className="text-white/60 hover:text-white"
                        >
                          <SiApplemusic className="text-base" />
                        </Link>
                      )}
                      {music.spotify && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.spotify}
                          className="text-white/60 hover:text-white"
                        >
                          <SiSpotify />
                        </Link>
                      )}
                      {music.tidal && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.tidal}
                          className="text-white/60 hover:text-white"
                        >
                          <SiTidal />
                        </Link>
                      )}
                      {music.youtube && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.youtube}
                          className="text-white/60 hover:text-white"
                        >
                          <SiYoutube />
                        </Link>
                      )}
                      {music.youtubemusic && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.youtubemusic}
                          className="text-white/60 hover:text-white"
                        >
                          <SiYoutubemusic />
                        </Link>
                      )}
                      {music.soundcloud && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.soundcloud}
                          className="text-white/60 hover:text-white"
                        >
                          <SiSoundcloud />
                        </Link>
                      )}
                      {music.deezer && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.deezer}
                          className="text-white/60 hover:text-white"
                        >
                          <FaDeezer />
                        </Link>
                      )}
                      {music.amazonmusic && (
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={music.amazonmusic}
                          className="text-white/60 hover:text-white"
                        >
                          <SiAmazonmusic />
                        </Link>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MusicComponent;
