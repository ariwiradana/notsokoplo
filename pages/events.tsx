import Footer from "@/components/layout/footer";
import MobileNav from "@/components/layout/mobile.nav";
import Navbar from "@/components/layout/navbar";
import NavbarToggle from "@/components/layout/navbar.toggle";
import Seo from "@/components/layout/seo";
import Button from "@/components/ui/button";
import Fab from "@/components/ui/fab";
import Loading from "@/components/ui/loading";
import { montserrat } from "@/constants/fonts";
import fetcher from "@/lib/axios";
import { Event } from "@/types/event";
import { Image as ImageType } from "@/types/image";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { IoTicketSharp } from "react-icons/io5";
import { SquareLoader } from "react-spinners";
import useSWR from "swr";

const Events = () => {
  const { data: events, isLoading: isLoadingEvents } = useSWR(
    "/api/events",
    fetcher
  );
  const { data: images, isLoading: isLoadingImages } = useSWR(
    "/api/images",
    fetcher
  );

  const [sliced, setSliced] = useState<number>(6);
  const [imageSliced, setImageSliced] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredData = events?.filter((event: Event) => {
    const isExpired = moment(
      event.date,
      ["YYYY-MM-DD", "DD/MM/YYYY"],
      true
    ).isBefore(moment().subtract(1, "days"));
    if (!isExpired) {
      return event;
    }
  });

  const handleMoreEvent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSliced((prevState) => prevState + 6);

      console.log(filteredData.length - sliced);

      if (filteredData.length - sliced > 1) {
        setImageSliced((prevState) => prevState + 1);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Seo
        url="https://notsokoplo.com/events"
        title="Events | No So Koplo Official Website"
        description=""
        image="https://res.cloudinary.com/dta5qasmt/image/upload/v1733887530/image_seo_gvzx3b.jpg"
        keywords="notsokoplo, not so koplo, event, jadwal"
      />
      <NavbarToggle />
      <MobileNav />
      {isLoadingEvents || isLoadingImages ? (
        <Loading />
      ) : (
        <section className="bg-dark relative">
          <Fab />
          <Navbar fixed={false} />

          <div className="pb-16 lg:pb-28 pt-16 md:pt-2 max-w-screen-xl mx-auto">
            <Link
              href="/"
              className={`flex items-center gap-x-3 text-lg max-w-screen-xl mx-auto py-4 px-4 md:px-12 lg:px-0 ${montserrat.className}`}
            >
              <BsArrowLeft />
              <span className="text-base">Back</span>
            </Link>
            <div className="px-4 md:px-12 lg:px-0">
              <div
                className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 ${montserrat.className}`}
              >
                <h1
                  className={`font-bold text-left text-4xl md:text-5xl lg:text-6xl text-white uppercase`}
                >
                  Upcoming Events
                </h1>
                <p className="md:max-w-[50%] md:text-right text-white/80 text-sm lg:text-base">
                  Discover our upcoming events and join for an unforgettable
                  experience. Don&apos;t miss the chance to vibe to the music
                  live!
                </p>
              </div>
            </div>
            <div className="flex items-stretch">
              <div className="min-w-4 w-4 md:w-[30%] md:min-w-[30%] relative flex flex-col gap-6 items-stretch">
                {images
                  ?.slice(0, imageSliced)
                  .map((image: ImageType, index: number) => (
                    <div
                      className="w-full h-full relative"
                      key={`event-image-${index}`}
                    >
                      <Image
                        sizes="60vw"
                        src={image.url}
                        fill
                        className="object-cover bg-white/5"
                        alt={`event-image-${index}`}
                      />
                    </div>
                  ))}
              </div>
              <table className="table table-auto bg-dark z-10 border-t border-t-white/5">
                <tbody>
                  {filteredData
                    ?.slice(0, sliced)
                    .map((event: Event, index: number) => {
                      const formats = ["YYYY-MM-DD", "DD/MM/YYYY"];
                      const isExpired = moment(
                        event.date,
                        formats,
                        true
                      ).isBefore(moment().subtract(1, "days"));

                      if (!isExpired)
                        return (
                          <tr
                            key={`${event.event}-${index}`}
                            className={`border-b border-b-white/5 transition-all ease-in-out duration-500 ${montserrat.className}`}
                          >
                            <td className="p-6 md:px-12 align-middle">
                              <p className="text-white text-base font-bold uppercase whitespace-nowrap mb-2">
                                {moment(event.date, formats, true).format(
                                  "MMM DD"
                                )}
                                <span className="ml-3">
                                  {moment(event.date, formats, true).format(
                                    "ddd"
                                  )}
                                </span>
                              </p>
                              <div className="flex items-center gap-x-3">
                                <p
                                  className={`text-white text-xl md:text-2xl font-medium`}
                                >
                                  <span>{event.event} </span>
                                  {event.category === "private" && (
                                    <span className="text-white/80 text-base font-light capitalize">
                                      ({event.category})
                                    </span>
                                  )}
                                </p>
                                <GoArrowUpRight className="text-3xl text-white hidden lg:block" />
                              </div>
                              <p className="text-white/70 text-base md:text-lg mt-2 flex">
                                <span>{event.address}</span>
                              </p>
                              {event.link && (
                                <div className="flex lg:hidden mt-3">
                                  <Link
                                    rel="noopener"
                                    aria-label="Action Detail Mobile"
                                    target="_blank"
                                    href={event.link}
                                  >
                                    <Button
                                      aria-label="Button Detail Mobile"
                                      title="Detail"
                                      icon={<IoTicketSharp />}
                                    />
                                  </Link>
                                </div>
                              )}
                            </td>
                            <td className="align-middle p-6 md:px-12 hidden lg:table-cell">
                              <div className="flex gap-x-4">
                                {event.link && (
                                  <Link
                                    rel="noopener"
                                    aria-label="Action Detail"
                                    target="_blank"
                                    href={event.link}
                                  >
                                    <Button
                                      aria-label="Button Detail"
                                      title="Detail"
                                      icon={<IoTicketSharp />}
                                    />
                                  </Link>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                    })}
                </tbody>
              </table>
            </div>
            {filteredData?.length > sliced && (
              <div
                className={`flex justify-center mt-12 lg:mt-16 ${montserrat.className}`}
              >
                {isLoading ? (
                  <SquareLoader color="white" size={30} />
                ) : (
                  <button
                    aria-label="Button Load More Event"
                    onClick={handleMoreEvent}
                    className="text-base lg:text-lg font-semibold underline underline-offset-8 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-3"
                  >
                    <span>Load More</span>
                  </button>
                )}
              </div>
            )}
          </div>
          <Footer />
        </section>
      )}
    </>
  );
};

export default Events;