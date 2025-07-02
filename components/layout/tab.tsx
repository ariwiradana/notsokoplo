import { montserrat } from "@/constants/fonts";
import { NavData } from "@/constants/navdata";
import { useRouter } from "next/router";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const TabNav = () => {
  const router = useRouter();

  return (
    <div
      className={`w-full sticky inset-x-0 top-0 bg-dark z-20 md:hidden px-4 py-3 ${montserrat.className}`}
    >
      <Swiper
        autoplay={{
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={20}
      >
        {NavData.map((nav) => (
          <SwiperSlide key={`tab-nav-${nav.path}`} style={{ width: "auto" }}>
            <button
              aria-label={`Navigate to ${nav.title}`}
              onClick={() => router.push(`/#${nav.path}`)}
              className="uppercase font-semibold text-sm text-white"
            >
              {nav.title}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TabNav;
