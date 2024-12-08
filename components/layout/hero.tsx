import fetcher from "@/lib/axios";
import { Image as ImageType } from "@/types/image";
import Image from "next/image";
import React from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";

const Hero = () => {
  const { data: images } = useSWR("/api/images", fetcher);

  return (
    <div className="h-[80svh] lg:h-dvh w-full">
      <Swiper
        autoplay
        effect={"fade"}
        modules={[EffectFade, Autoplay]}
        className="relative"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-dark/0 via-transparent to-dark"></div>
        {images?.map((img: ImageType) => (
          <SwiperSlide className="w-full" key={img.url}>
            <div className="h-[80svh] lg:h-dvh relative w-full">
              <Image
                priority
                fill
                className="object-cover"
                alt="hero"
                src={img.url}
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
