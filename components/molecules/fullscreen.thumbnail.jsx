import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { THUMBNAIL_IMAGES } from "@/constants/thumbnail.images";
import useNavbar from "@/hooks/useNavbar";

const FullscreenThumbnail = () => {
  const { position } = useNavbar();
  return (
    <div className="fixed inset-0 z-0">
      <Swiper
        centeredSlides
        loop
        spaceBetween={0}
        autoplay={{
          delay: 10000,
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
        {THUMBNAIL_IMAGES?.slice(0, 4)?.map(({ src, alt }) => (
          <SwiperSlide className="overflow-hidden" key={alt}>
            <div
              style={{ marginTop: position * -0.3 }}
              className={`w-full h-screen relative transform transition-transform ease-in-out duration-700 delay-500 ${
                position > 10 ? "scale-110" : "scale-100"
              }`}
            >
              <Image alt={alt} src={src} className="object-cover w-full" fill />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullscreenThumbnail;
