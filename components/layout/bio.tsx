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
    <div className="relative">
      <Swiper
        speed={2000}
        effect="fade"
        autoplay
        modules={[Autoplay, EffectFade]}
      >
        {data?.map((image, index) => (
          <SwiperSlide key={`bio-image-${index + 1}`}>
            <div className="relative h-[50svh] lg:h-[80svh] lg:w-[60%]">
              <Image
                src={image.url}
                sizes="60vw"
                fill
                className="object-cover"
                alt={`image-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="lg:absolute inset-0 z-20 flex flex-col md:flex-row items-end justify-end lg:mb-12 lg:mr-12">
        <div className="lg:w-[50%] w-full lg:mb-6">
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
        <div className="lg:max-w-[50%]">
          <div className="p-8 lg:p-16 bg-white relative z-20">
            <h2 className={`font-semibold text-3xl md:text-4xl text-dark`}>
              Biography
            </h2>
            <div className="h-10 md:h-14 w-[1px] bg-dark/30 my-4"></div>
            <p className="text-dark/70">
              Not So Koplo merupakan Grup musik dari Denpasar, Bali. Terbentuk
              pada tanggal 26 Februari 2020 yang sepenuhnya memainkan musik
              berbasis Koplo dengan format DJ namun dengan segala racikan
              tambahan disetiap remixnya. Not So Koplo terdiri dari 2 Orang
              Personil yang merupakan teman semasa Kuliah yaitu{" "}
              <span className="font-medium underline underline-offset-2 text-dark">
                <Link
                  target="_blank"
                  href="https://instagram.com/dwikikrisnanda"
                >
                  Dwiki Krisnanda
                </Link>
              </span>{" "}
              (MC/ Crowd Control) &{" "}
              <span className="font-medium underline underline-offset-2 text-dark">
                <Link target="_blank" href="https://instagram.com/ariwiradana">
                  Ari Wiradana
                </Link>
              </span>{" "}
              (DJ & Producer). Nama Not So Koplo sendiri diambil dari kata Not
              So dan Koplo yang berarti Tidak Begitu Koplo dimana remix yang
              diciptakan tidak hanya dari genre Koplo saja melainkan juga
              memasukan unsur genre musik lain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioComponent;
