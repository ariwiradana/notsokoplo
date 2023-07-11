import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { THUMBNAIL_IMAGES } from "@/constants/thumbnail.images";

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
        modules={[Autoplay, Navigation, Pagination]}
        className="thumbnail-slider"
      >
        {THUMBNAIL_IMAGES?.map(({ src, alt }) => (
          <SwiperSlide key={alt}>
            <div className="w-full h-screen relative">
              <Image alt={alt} src={src} className="object-cover w-full" fill />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullscreenThumbnail;
