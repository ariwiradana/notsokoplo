import { montserrat } from "@/constants/fonts";
import Image from "next/image";
import React from "react";
import useAppStore from "@/store/useAppStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiChevronLeft, BiChevronRight, BiPause, BiPlay } from "react-icons/bi";
import { Navigation } from "swiper/modules";
import useMusicPlayer from "@/store/useMusicPlayer";

const MusicComponent = () => {
  const store = useAppStore();
  const {
    handleIsPlaying,
    handleIsOpenPlayer,
    handleAddMusic,
    isPlaying,
    music: playedMusic,
  } = useMusicPlayer();

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
            {store.music.map((music) => (
              <SwiperSlide
                key={music.title}
                className="max-w-[80vw] md:max-w-[40vw] lg:max-w-96"
              >
                <div className="md:text-center">
                  <div
                    className={`w-full aspect-square relative shadow-lg mb-6 group/music transition-all ease-in-out duration-300 ${
                      playedMusic?.title === music.title ? "scale-[0.85]" : ""
                    }`}
                  >
                    {playedMusic?.title === music.title && (
                      <div
                        className={`absolute inset-0 z-10 transition-all ease-in-out duration-200 delay-200 ${
                          playedMusic.title === music.title
                            ? "translate-x-10"
                            : "group-hover/music:translate-x-10"
                        }`}
                      >
                        <Image
                          sizes="600px"
                          src="/images/disc.png"
                          fill
                          className={`object-contain transition-all ease-in-out duration-300 delay-100 ${
                            isPlaying && "animate-spin-slow"
                          }`}
                          alt={`Disc Image ${music.title} Notsokoplo`}
                        />
                      </div>
                    )}
                    <Image
                      sizes="600px"
                      src={music.cover}
                      fill
                      className={`object-cover z-30 transition-all ease-in-out duration-200 ${
                        playedMusic?.title === music.title
                          ? "-translate-x-6"
                          : ""
                      }`}
                      alt={`Cover Image ${music.title} Notsokoplo`}
                    />
                    <div
                      className={`absolute inset-0 h-auto group-hover/music:visible group-hover/music:opacity-100 opacity-0 invisible z-30 bg-dark/20 flex flex-col justify-center items-center gap-2 transition-all ease-in-out duration-200 ${
                        playedMusic?.title === music.title
                          ? "-translate-x-6"
                          : ""
                      }
                      `}
                    >
                      <button
                        onClick={() => {
                          handleAddMusic(music);
                          if (!playedMusic) {
                            handleIsOpenPlayer(true);
                          }
                          if (music.title === playedMusic?.title) {
                            handleIsPlaying(!isPlaying);
                          } else {
                            handleIsPlaying(true);
                          }
                        }}
                        className="text-white text-sm flex items-center bg-primary rounded-full p-2 lg:p-3"
                      >
                        {music.title === playedMusic?.title && isPlaying ? (
                          <BiPause className="text-4xl" />
                        ) : (
                          <BiPlay className="text-4xl" />
                        )}
                      </button>
                    </div>
                  </div>

                  {music.caption && (
                    <div className="mb-3">
                      <p className="bg-primary/30 border border-primary/50 text-white inline px-3 py-[3px] rounded-full text-sm">
                        {music.caption}
                      </p>
                    </div>
                  )}
                  <h5 className="text-2xl font-semibold text-white">
                    {music.title}
                  </h5>
                  <h6 className="mt-2 text-white/70">{music.artist}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MusicComponent;
