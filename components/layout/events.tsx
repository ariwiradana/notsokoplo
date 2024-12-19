import { montserrat } from "@/constants/fonts";
import { Event } from "@/types/event";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Button from "../ui/button";
import { IoTicketSharp } from "react-icons/io5";
import { Image as ImageType } from "@/types/image";
import Image from "next/image";

interface PageProps {
  data: Event[];
  images: ImageType[];
}

const EventComponent = ({ data, images }: PageProps) => {
  const [sliced] = useState<number>(4);
  const [imageSliced] = useState<number>(2);

  const filteredData = data?.filter((event) => {
    const isExpired = moment(
      event.date,
      ["YYYY-MM-DD", "DD/MM/YYYY"],
      true
    ).isBefore(moment().subtract(1, "days"));
    if (!isExpired) {
      return event;
    }
  });

  return (
    <div className="relative bg-dark" id="events">
      <div className="py-16 lg:py-28 max-w-screen-xl mx-auto">
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
              experience. Don&apos;t miss the chance to vibe to the music live!
            </p>
            <div className="h-16 md:h-24 w-[1px] bg-white/10"></div>
          </div>
        </div>
        <div className="flex items-stretch">
          <div className="min-w-4 w-4 md:w-[30%] md:min-w-[30%] relative flex flex-col gap-6 items-stretch">
            {images?.slice(0, imageSliced).map((image, index) => (
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
                  const isExpired = moment(event.date, formats, true).isBefore(
                    moment().subtract(1, "days")
                  );

                  if (!isExpired)
                    return (
                      <tr
                        key={`${event.event}-${index}`}
                        className={`border-b border-b-white/5 transition-all ease-in-out duration-500 ${montserrat.className}`}
                      >
                        <td className="p-6 md:px-12 align-middle">
                          <p className="text-white text-base font-bold uppercase whitespace-nowrap mb-2">
                            {moment(event.date, formats, true).format("MMM DD")}
                            <span className="ml-3">
                              {moment(event.date, formats, true).format("ddd")}
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
        <div
          className={`flex justify-center mt-12 lg:mt-16 ${montserrat.className}`}
        >
          <Link
            aria-label="Button Load More Event"
            href="/events"
            className="text-base lg:text-lg font-semibold underline underline-offset-8 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-3"
          >
            <span>Show All</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
