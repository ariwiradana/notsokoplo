import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Show } from "@/types/Show";
import { Socials } from "@/constants/Social";
import moment from "moment";
import { GoArrowUpRight } from "react-icons/go";
import useSWR from "swr";
import fetcher from "@/lib/axios";
import { Image as ImageType } from "@/types/Image";

const josefin = Josefin_Sans({ subsets: ["latin"] });

const Home = () => {
  const [translateY, setTranslateY] = useState(0);
  const { data } = useSWR("/api/shows", fetcher);
  const { data: images } = useSWR("/api/images", fetcher);
  console.log({ images });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTranslateY(scrollY * 0.2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`${josefin.className} bg-dark`}>
      <div
        className="fixed h-[60dvh] lg:h-dvh inset-0 transform w-full"
        style={{ transform: `translateY(-${translateY}px)` }}
      >
        <Swiper
          autoplay
          effect={"fade"}
          modules={[EffectFade, Autoplay]}
          className="relative"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-dark/0 via-transparent to-dark"></div>
          {images?.map((img: ImageType) => (
            <SwiperSlide className="w-full" key={img.url}>
              <div className="h-[60dvh] lg:h-dvh relative w-full">
                <Image
                  priority
                  fill
                  className="object-cover"
                  alt="hero"
                  src={img.url}
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-[60dvh] lg:mt-[100dvh] relative bg-gradient-to-b from-dark/95 to-dark backdrop-blur-sm">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap lg:justify-between lg:gap-24 py-16 lg:py-32 relative z-10 px-6">
            <h2 className="uppercase font-bold text-4xl lg:text-5xl lg:whitespace-nowrap text-white">
              Upcoming Shows
            </h2>
            <p className="text-white text-lg lg:text-right mt-2 lg:mt-0">
              Exciting performances ahead! Stay tuned for details on our
              upcoming shows!
            </p>
          </div>
          <table className="table table-auto w-full">
            <tbody>
              {data?.map((show: Show, index: number) => {
                const formats = ["YYYY-MM-DD", "DD/MM/YYYY"];
                const isExpired = moment(show.date, formats, true).isBefore(
                  moment().subtract(1, "days")
                );

                return (
                  <tr
                    key={`${show.event}-${index}`}
                    className={`border-b border-b-white/30 hover:border-b-white transition-all ease-in-out duration-500 hover:bg-white/5 ${
                      isExpired ? "pointer-events-none opacity-20" : ""
                    }`}
                  >
                    <td className="p-6">
                      <div className="flex gap-x-3 mb-1 md:hidden">
                        <p className="text-white text-2xl font-bold">
                          <span>{show.event} </span>
                          {show.category === "private" && (
                            <span className="text-white/80 text-base font-light capitalize">
                              ({show.category})
                            </span>
                          )}
                        </p>
                        <GoArrowUpRight className="text-3xl text-white" />
                      </div>
                      <div>
                        <p className="text-white text-xl">
                          {moment(show.date, formats, true).format(
                            "ddd, DD MMM YYYY"
                          )}
                        </p>
                      </div>
                      <p className="text-white/80 font-light text-lg mt-1">
                        {show.address}
                      </p>
                      {show.link && (
                        <div className="flex mt-3">
                          <Link
                            target="_blank"
                            href={show.link}
                            className="py-2 px-5 bg-white font-medium text-lg flex items-center gap-x-2 hover:bg-white/20 hover:backdrop-blur-sm hover:text-white hover:border-white border border-transparent transition-all ease-in-out duration-500"
                          >
                            <span>Tickets</span>
                          </Link>
                        </div>
                      )}
                    </td>
                    <td className="hidden md:inline">
                      <div className="flex justify-end items-center gap-x-3 p-6">
                        <p className="text-white text-2xl font-bold text-right whitespace-nowrap">
                          {show.event}
                        </p>
                        {show.category === "private" && (
                          <p className="text-white/80 text-base font-light capitalize">
                            ({show.category})
                          </p>
                        )}
                        <GoArrowUpRight className="text-3xl text-white" />

                        {show.link && (
                          <Link
                            target="_blank"
                            href={show.link}
                            className="py-3 ml-4 px-7 bg-white font-medium text-lg flex items-center gap-x-2 hover:bg-white/20 hover:backdrop-blur-sm hover:text-white hover:border-white border border-transparent transition-all ease-in-out duration-500"
                          >
                            <span>Tickets</span>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="py-20">
            <div className="flex justify-center w-full bg-dark">
              <div className="flex items-center border border-white/30 divide-white/30 divide-x transition-all ease-in-out duration-500">
                {Socials.map((social) => (
                  <Link
                    target="_blank"
                    key={social.title}
                    href={social.link}
                    className="lg:p-6 p-3 flex gap-x-2 justify-center items-center text-2xl lg:text-3xl group text-white hover:bg-white transition-all ease-in-out duration-500"
                  >
                    <div className="group-hover:text-dark">{social.icon}</div>
                    <p className="text-sm font-medium mt-1 group-hover:text-dark hidden lg:group-hover:block">
                      {social.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
