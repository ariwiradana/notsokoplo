import { montserrat } from "@/constants/fonts";
import { Music } from "@/types/music";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdPlay } from "react-icons/io";
import Button from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
interface PageProps {
  data: Music[];
}

const MusicComponent = ({ data }: PageProps) => {
  return (
    <div className={`relative bg-dark ${montserrat.className} z-10`} id="music">
      <div className="max-w-screen-xl mx-auto py-16 lg:py-28 px-4 md:px-12 lg:px-4">
        <div
          className={`flex flex-col md:flex-row items-center justify-between mb-12 gap-4 ${montserrat.className}`}
        >
          <h2
            className={`font-semibold text-center text-3xl md:text-4xl text-white whitespace-nowrap`}
          >
            Latest Music
          </h2>
          <p className="md:max-w-[50%] text-center md:text-right text-white/80 text-sm lg:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            ipsum dignissimos perspiciatis totam ducimus incidunt?
          </p>
          <div className="h-10 md:h-16 w-[1px] bg-white/30"></div>
        </div>
        <Swiper
          speed={2000}
          autoplay
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={24}
          modules={[Autoplay]}
        >
          {data?.slice(0, 3).map((music) => (
            <SwiperSlide key={music.title}>
              <div className="text-center">
                <div className="w-full aspect-square relative shadow-lg">
                  <Image
                    sizes="600px"
                    priority
                    src={music.cover}
                    fill
                    className="object-cover"
                    alt={music.title}
                  />
                </div>
                <h2 className="text-2xl font-semibold text-white mt-6">
                  {music.title}
                </h2>
                <h5 className="mt-2 text-white/70">{music.artist}</h5>
                <div className="flex justify-center mt-6">
                  <Button title="Listen" icon={<IoMdPlay />} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center mt-12 lg:mt-16">
          <Link
            className="text-base lg:text-lg font-semibold underline underline-offset-8 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-3"
            href="/music"
          >
            <span>View More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicComponent;
