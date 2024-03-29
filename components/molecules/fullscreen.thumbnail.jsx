import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
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
        {data?.slice(0, 4)?.map(({ image, _id }) => (
          <SwiperSlide className="overflow-hidden" key={_id}>
            <div
              style={{
                marginTop: position * -0.3,
                transform: `scale(${position * 0.0001 + 1})`,
              }}
              className="w-full h-[103vh] relative"
            >
              <Image
                alt={_id}
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
