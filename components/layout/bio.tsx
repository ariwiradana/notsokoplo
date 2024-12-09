import { montserrat } from "@/constants/fonts";
import { Image as ImageType } from "@/types/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageProps {
  data: ImageType[];
}

const BioComponent = ({ data }: PageProps) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="relative" id="biography">
      <Swiper
        speed={2000}
        effect="fade"
        autoplay
        modules={[Autoplay, EffectFade]}
      >
        {data?.map((image, index) => (
          <SwiperSlide key={`bio-image-${index + 1}`}>
            <div className="relative h-[50svh] md:h-[60svh] lg:h-[80svh] md:w-[90%] lg:w-[60%]">
              <Image
                src={image.url}
                sizes="60vw"
                fill
                className="object-cover rounded-t md:rounded-r"
                alt={`image-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="md:absolute inset-0 z-20 flex flex-col md:flex-row items-end justify-end md:mb-6 md:mr-6 lg:mb-12 lg:mr-12">
        <div className="md:w-[40%] lg:w-[50%] w-full md:mb-6 lg:mb-6">
          <Marquee direction="right" className="overflow-hidden bg-primary">
            {numbers.map((item) => (
              <div key={`marquee-${item}`} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <h4
                  className={`stroke-2 font-bold text-5xl lg:text-6xl uppercase mx-6 ${montserrat.className}`}
                >
                  {item % 2 === 0 ? "Not So Koplo" : "Biography"}
                </h4>
              </div>
            ))}
          </Marquee>
          <Marquee className="overflow-hidden bg-primary">
            {numbers.map((item) => (
              <div className="flex items-center" key={`marquee-2-${item}`}>
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <h4
                  className={`stroke-2 font-bold text-5xl lg:text-6xl uppercase mx-6 ${montserrat.className}`}
                >
                  {item % 2 === 0 ? "Not So Koplo" : "Biography"}
                </h4>
              </div>
            ))}
          </Marquee>
        </div>
        <div
          className={`md:max-w-[60%] lg:max-w-[50%] ${montserrat.className}`}
        >
          <div className="p-8 lg:p-16 bg-white md:rounded relative z-20">
            <h2 className={`font-bold text-4xl md:text-5xl text-dark`}>
              Biography
            </h2>
            <div className="h-10 md:h-12 w-[1px] bg-dark/30 my-4"></div>
            <p className="text-dark/70 font-medium">
              Not So Koplo is a music group from Denpasar, Bali, formed on
              February 26, 2020. The group plays music primarily based on Koplo,
              with a DJ format, but with unique elements added in each of their
              remixes. Not So Koplo consists of two members,{" "}
              <span className="font-bold text-dark">
                <Link
                  target="_blank"
                  href="https://instagram.com/dwikikrisnanda"
                >
                  Dwiki Krisnanda
                </Link>
              </span>{" "}
              (MC/Crowd Control) and{" "}
              <span className="font-bold text-dark">
                <Link target="_blank" href="https://instagram.com/ariwiradana">
                  Ari Wiradana
                </Link>
              </span>{" "}
              (DJ & Producer), who have been friends since college. The name
              &apos;Not So Koplo&apos; is derived from the words &apos;Not
              So&apos; and &apos;Koplo,&apos; which means &apos;Not That
              Koplo&apos; reflecting the group&apos;s style of remixing not just
              Koplo, but incorporating other music genres as well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioComponent;
