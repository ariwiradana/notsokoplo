import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { THUMBNAIL_IMAGES } from "@/constants/thumbnail.images";
import useNavbar from "@/hooks/useNavbar";

const FullscreenThumbnail = ({ data }) => {
  const { position } = useNavbar();

  return (
    <div className="fixed inset-0 z-0">
      <Swiper
        centeredSlides
        loop
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Autoplay, Navigation, Pagination]}
        className="thumbnail-slider"
      >
        {/* <SwiperSlide>
          <video
            preload="auto"
            autoPlay="autoplay"
            muted
            loop
            className="h-screen w-full object-cover transform"
          >
            <source src="/video/thumbnail.mp4" type="video/mp4" />
          </video>
        </SwiperSlide> */}
        {data?.slice(0, 4)?.map(({ image, slug }) => (
          <SwiperSlide className="overflow-hidden" key={slug}>
            <div
              style={{
                marginTop: position * -0.3,
                transform: `scale(${position * 0.0001 + 1})`,
              }}
              className="w-full h-screen relative"
            >
              <Image
                alt={slug}
                src={image}
                className="object-cover w-full"
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullscreenThumbnail;
