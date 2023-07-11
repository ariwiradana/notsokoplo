import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const FullscreenThumbnail = () => {
  return (
    <div>
      <Swiper
        centeredSlides
        loop
        spaceBetween={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Autoplay, Pagination]}
        className="thumbnail-slider"
      >
        <SwiperSlide>
          <div className="bg-[url('/images/thumbnail.jpg')] bg-cover bg-center overflow-hidden w-full h-screen"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/images/thumbnail-2.jpg')] bg-cover bg-center overflow-hidden w-full h-screen"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/images/thumbnail-3.jpg')] bg-cover bg-center overflow-hidden w-full h-screen"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/images/thumbnail-4.jpg')] bg-cover bg-center overflow-hidden w-full h-screen"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FullscreenThumbnail;
