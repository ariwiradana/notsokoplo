import NavbarToggle from "@/components/layout/navbar.toggle";
import Seo from "@/components/layout/seo";
import { NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Parallax,
  Pagination,
  Navigation,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/parallax";
import Image from "next/image";
import fetcher from "@/lib/axios";
import useSWR from "swr";
import { montserrat } from "@/constants/fonts";
import { Biography } from "@/types/Biography";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import TabNav from "@/components/layout/tab";
import Loading from "@/components/ui/loading";

const BiographyPage: NextPage = ({}) => {
  const { isLoading, data } = useSWR<Biography[]>("/api/biography", fetcher);

  if (isLoading) return <Loading />;

  return (
    <>
      <Seo
        url="https://notsokoplo.com/siapa-kita"
        title="Siapa Not So Koplo? | Duo DJ Remix Asal Bali"
        description="Kenalan lebih dekat dengan Not So Koplo, duo DJ asal Bali yang menghadirkan remix gokil dan penampilan panggung penuh energi. Dari Denpasar ke panggung festival, kami siap bikin semua orang joget tanpa henti. Temukan cerita, visi, dan musik kami di sini."
        image="https://www.dropbox.com/scl/fi/u82pe9o6qvtb814230p5m/image_seo_gvzx3b.webp?rlkey=rucjwg266qcspkaxp9k31iav6&raw=1"
        keywords="Not So Koplo, siapa Not So Koplo, duo DJ Bali, DJ remix Indonesia, profil DJ Bali, DJ panggung Bali, DJ live Bali, duo DJ Indonesia, DJ untuk event Bali, cerita DJ Bali, musik remix Bali, DJ terkenal Bali, bio DJ Bali, duo musik elektronik Indonesia, DJ Denpasar, EDM Bali, DJ untuk festival Bali, duo remix lokal, DJ acara Bali"
      />

      <NavbarToggle />
      <TabNav />
      <div className={`w-screen h-dvh relative ${montserrat.className}`}>
        <button className="text-white text-sm flex items-center gap-x-2 tracking-[1px] btn-prev fixed bottom-8 left-4 lg:left-8 z-20">
          <BiChevronLeft className="text-2xl" />
          Prev
        </button>
        <button className="text-white text-sm flex items-center gap-x-2 tracking-[1px] btn-next fixed bottom-8 right-4 lg:right-8 z-20">
          Next
          <BiChevronRight className="text-2xl" />
        </button>
        <Swiper
          loop
          keyboard={{
            enabled: true,
          }}
          mousewheel={true}
          navigation={{
            prevEl: ".btn-prev",
            nextEl: ".btn-next",
          }}
          style={
            {
              "--swiper-pagination-color": "#fff", // aktif
              "--swiper-pagination-bullet-inactive-color": "#ffff", // tidak aktif
              "--swiper-pagination-bullet-inactive-opacity": "0.2", // transparansi
              "--swiper-pagination-bottom": "32px",
            } as React.CSSProperties
          }
          speed={3000}
          parallax={true}
          pagination={{ clickable: true }}
          modules={[Parallax, Pagination, Mousewheel, Navigation, Keyboard]}
          className="w-full h-full"
        >
          {data?.map((bio, index) => (
            <SwiperSlide key={index}>
              <div
                className="absolute inset-0"
                data-swiper-parallax="0%"
                data-swiper-parallax-duration="2000"
              >
                <Image
                  fill
                  src={bio.image}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full grayscale"
                />
              </div>

              {/* Text overlay (optional, shows section) */}
              <div className="relative flex h-full justify-center items-center bg-dark/70 px-4 md:px-12 lg:px-0 z-30 -pt-20 lg:mt-0">
                <div data-swiper-parallax="-500" className="lg:max-w-[40vw]">
                  <h2 className="text-3xl md:text-4xl font-semibold text-white">
                    {bio.title}
                  </h2>
                  <p
                    className="text-white text-base lg:text-lg mt-4"
                    dangerouslySetInnerHTML={{
                      __html: bio.description,
                    }}
                  ></p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default BiographyPage;
