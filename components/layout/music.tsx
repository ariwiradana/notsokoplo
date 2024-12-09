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
    <div className={`relative bg-dark ${montserrat.className} z-10`}>
      <div className="max-w-screen-xl mx-auto py-16 lg:py-28 px-6 md:px-12 lg:px-4">
        <div className="flex justify-between items-center mb-8 lg:mb-16">
          <h2
            className={`uppercase text-center font-semibold text-3xl lg:text-5xl text-white ${montserrat.className}`}
          >
            Music
          </h2>
          <Link
            className="text-base underline underline-offset-8 font-semibold text-white relative hover:opacity-70 transition-all ease-in-out duration-300"
            href="/music"
          >
            View More
          </Link>
        </div>
        <Swiper
          speed={2000}
          autoplay
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 48,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 64,
            },
          }}
          modules={[Autoplay]}
        >
          {data?.slice(0, 4).map((music) => (
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
      </div>
    </div>
  );
};

export default MusicComponent;
