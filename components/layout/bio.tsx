import { montserrat } from "@/constants/fonts";
import { Image as ImageType } from "@/types/image";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageProps {
  data: ImageType[];
}

const AboutComponent = ({ data }: PageProps) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  const images = data.filter((img) => img.section === "profile");

  return (
    <div className="relative z-0" id="about">
      <Swiper
        className="relative"
        speed={2000}
        effect="fade"
        autoplay
        modules={[Autoplay, EffectFade]}
      >
        <div className="absolute inset-0 lg:bg-gradient-to-r md:w-[90%] lg:w-[80%] from-transparent via-dark/10 via-[55%] to-[90%] to-dark z-10"></div>
        {images.map((image, index) => (
          <SwiperSlide key={`bio-image-${index + 1}`}>
            <div className="relative h-[70svh] md:h-[60svh] lg:h-[110svh] lg:w-[80%]">
              <Image
                src={image.url}
                sizes="100vw"
                fill
                className="object-cover lg:object-right bg-white/5"
                alt={`Notsokoplo About Image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="lg:absolute inset-0 z-10 flex flex-col lg:flex-row items-end justify-end md:mb-6 md:mr-6 lg:mb-12 lg:mr-12">
        <div className="lg:w-[55%] w-full lg:mb-6">
          <Marquee
            direction="right"
            className="overflow-hidden bg-primary py-2 lg:py-0"
          >
            {numbers.map((item) => (
              <div key={`marquee-${item}`} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <h4
                  className={`stroke-2 text-3xl lg:text-4xl uppercase mx-6 text-white font-semibold ${montserrat.className}`}
                >
                  {item % 2 === 0 ? "Not So Koplo" : "About"}
                </h4>
              </div>
            ))}
          </Marquee>
          <Marquee className="overflow-hidden bg-primary py-2 lg:py-0">
            {numbers.map((item) => (
              <div className="flex items-center" key={`marquee-2-${item}`}>
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <h4
                  className={`stroke-2 text-3xl lg:text-4xl uppercase mx-6 text-white font-semibold ${montserrat.className}`}
                >
                  {item % 2 === 0 ? "Not So Koplo" : "About"}
                </h4>
              </div>
            ))}
          </Marquee>
        </div>
        <div className={`lg:max-w-[45%] ${montserrat.className}`}>
          <div className="px-6 py-10 md:px-12 md:py-16 lg:p-16 bg-white backdrop-blur-lg relative z-20">
            <div className="flex justify-between items-center mb-4 gap-x-6">
              <h1
                className={`font-bold text-4xl md:text-5xl lg:text-6xl text-dark uppercase`}
              >
                Not So Koplo
              </h1>
              <div className="h-8 md:h-12 w-[1px] bg-dark/10 my-4"></div>
            </div>
            <p className="text-dark leading-7 text-justify text-xs lg:text-sm">
              Not So Koplo is an energetic music group hailing from Denpasar,
              Bali, formed on February 26, 2020. Known for their creative blend
              of genres, they center their sound around Koplo, a popular
              Indonesian dangdut subgenre while adding a unique twist to every
              remix they produce. The duo is made up of long-time friends Dwiki
              Krisnanda (MC/Crowd Control) and Ari Wiradana (DJ & Producer), who
              first met during their college years.
              <br />
              <br />
              The group&apos;s name, &quot;Not So Koplo,&quot; cleverly reflects
              their musical identity. It plays on the idea that while their
              foundation is Koplo, they are &quot;not just&quot; about that one
              style. By skillfully incorporating various elements from EDM, hip
              hop, and pop, they create fresh, exciting sounds that set them
              apart from typical Koplo acts. Their DJ sets captivate audiences
              by seamlessly blending genres, turning every performance into a
              high-energy, genre-bending experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
