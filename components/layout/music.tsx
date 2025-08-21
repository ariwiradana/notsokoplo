import { montserrat } from "@/constants/fonts";
import Image from "next/image";
import React from "react";
import useAppStore from "@/store/useAppStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaApple, FaSoundcloud, FaSpotify, FaYoutube } from "react-icons/fa6";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";

const MusicComponent = () => {
  const store = useAppStore();
  // const { handleIsPlaying, handleIsOpenPlayer, handleAddMusic } =
  //   useMusicPlayer();

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
            speed={1000}
            autoplay={{
              delay: 8000,
              pauseOnMouseEnter: true,
              disableOnInteraction: true,
            }}
            navigation={{
              prevEl: ".action-prev",
              nextEl: ".action-next",
            }}
            slidesPerView={"auto"}
            spaceBetween={16}
            modules={[Navigation, Autoplay]}
          >
            {store.music.map((music) => (
              <SwiperSlide
                key={music.title}
                className="max-w-[80vw] md:max-w-[40vw] lg:max-w-96"
              >
                <div className="md:text-center">
                  <div className="w-full aspect-square relative shadow-lg mb-6 group/music overflow-hidden">
                    <Image
                      sizes="600px"
                      src={music.cover}
                      fill
                      className="object-cover bg-white/5 group-hover/music:scale-95 transition-all ease-in-out duration-300 delay-100"
                      alt={`Cover Image ${music.title} Notsokoplo`}
                    />
                    <div className="absolute inset-0 h-auto group-hover/music:visible group-hover/music:opacity-100 opacity-0 invisible z-10 bg-dark/70 backdrop-blur-sm flex flex-col justify-center items-center gap-2 transition-all ease-in-out duration-300">
                      <div className="flex items-center justify-center gap-2 translate-y-6 group-hover/music:translate-y-0 transition-all ease-in-out delay-200 opacity-0 group-hover/music:opacity-100">
                        {music.spotify && (
                          <Link
                            href={music.spotify}
                            target="_blank"
                            className="p-3 rounded-full text-white border border-white/30 hover:bg-white/20 flex items-center group transition-all ease-in-out"
                          >
                            <FaSpotify />
                            <span className="text-xs group-hover:ml-2 delay-75 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                              Spotify
                            </span>
                          </Link>
                        )}
                        {music.applemusic && (
                          <Link
                            href={music.applemusic}
                            target="_blank"
                            className="p-3 rounded-full text-white border border-white/30 hover:bg-white/20 flex items-center group transition-all ease-in-out"
                          >
                            <FaApple />
                            <span className="text-xs group-hover:ml-2 delay-75 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                              Apple Music
                            </span>
                          </Link>
                        )}
                        {music.soundcloud && (
                          <Link
                            href={music.soundcloud}
                            target="_blank"
                            className="p-3 rounded-full text-white border border-white/30 hover:bg-white/20 flex items-center group transition-all ease-in-out"
                          >
                            <FaSoundcloud />
                            <span className="text-xs group-hover:ml-2 delay-75 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                              Soundcloud
                            </span>
                          </Link>
                        )}
                        {music.youtube && (
                          <Link
                            href={music.youtube}
                            target="_blank"
                            className="p-3 rounded-full text-white border border-white/30 hover:bg-white/20 flex items-center group transition-all ease-in-out"
                          >
                            <FaYoutube />
                            <span className="text-xs group-hover:ml-2 delay-75 font-medium max-w-0 overflow-hidden group-hover:max-w-[80px] whitespace-nowrap group-hover:opacity-100 transition-all duration-300 ease-in-out">
                              Youtube
                            </span>
                          </Link>
                        )}
                      </div>
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
