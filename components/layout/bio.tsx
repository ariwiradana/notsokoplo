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

const BioComponent = ({ data }: PageProps) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="relative" id="biography">
      <Swiper
        className="relative"
        speed={2000}
        effect="fade"
        autoplay
        modules={[Autoplay, EffectFade]}
      >
        <div className="absolute inset-0 lg:bg-gradient-to-r md:w-[90%] lg:w-[80%] from-transparent via-dark/30 to-[80%] to-dark z-20"></div>
        {data?.map((image, index) => (
          <SwiperSlide key={`bio-image-${index + 1}`}>
            <div className="relative h-[70svh] md:h-[60svh] lg:h-[130svh] lg:w-[80%]">
              <Image
                src={image.url}
                sizes="100vw"
                fill
                className="object-cover rounded-t md:rounded-r"
                alt={`image-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="lg:absolute inset-0 z-20 flex flex-col lg:flex-row items-end justify-end md:mb-6 md:mr-6 lg:mb-12 lg:mr-12">
        <div className="lg:w-[50%] w-full lg:mb-6">
          <Marquee
            direction="right"
            className="overflow-hidden bg-primary py-2 lg:py-0"
          >
            {numbers.map((item) => (
              <div key={`marquee-${item}`} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <h4
                  className={`stroke-2 font-bold text-4xl lg:text-6xl uppercase mx-6 ${montserrat.className}`}
                >
                  {item % 2 === 0 ? "Not So Koplo" : "Biography"}
                </h4>
              </div>
            ))}
          </Marquee>
          <Marquee className="overflow-hidden bg-primary py-2 lg:py-0">
            {numbers.map((item) => (
              <div className="flex items-center" key={`marquee-2-${item}`}>
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <h4
                  className={`stroke-2 font-bold text-4xl lg:text-6xl uppercase mx-6 ${montserrat.className}`}
                >
                  {item % 2 === 0 ? "Not So Koplo" : "Biography"}
                </h4>
              </div>
            ))}
          </Marquee>
        </div>
        <div className={`lg:max-w-[50%] ${montserrat.className}`}>
          <div className="px-6 py-10 md:px-12 md:py-16 lg:p-16 bg-white backdrop-blur-lg md:rounded relative z-20">
            <h2 className={`font-bold text-4xl md:text-5xl text-dark`}>
              Biography
            </h2>
            <div className="h-10 md:h-12 w-[1px] bg-dark/30 my-4"></div>
            <p className="text-dark font-medium leading-8 text-justify">
              Not So Koplo is an energetic music group hailing from Denpasar,
              Bali, formed on February 26, 2020. Known for their creative blend
              of genres, they center their sound around Koplo—a popular
              Indonesian dangdut subgenre—while adding a unique twist to every
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
              <br />
              <br />
              With their bold approach to remixing and electrifying stage
              presence, Not So Koplo has quickly gained a following, bringing a
              fresh sound to Bali&apos;s music scene and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioComponent;
