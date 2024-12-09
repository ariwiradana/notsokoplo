import { montserrat } from "@/constants/fonts";
import { Event } from "@/types/event";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import Button from "../ui/button";
import { IoTicketSharp } from "react-icons/io5";

interface PageProps {
  data: Event[];
}

const EventComponent = ({ data }: PageProps) => {
  return (
    <div className="relative bg-dark" id="events">
      <div className="pt-16 lg:pt-28 max-w-screen-lg mx-auto">
        <div className="px-4 md:px-12 lg:px-0">
          <div
            className={`flex flex-col md:flex-row items-center justify-between mb-12 gap-4 ${montserrat.className}`}
          >
            <h2
              className={`font-semibold text-center text-3xl md:text-4xl lg:text-5xl text-white whitespace-nowrap`}
            >
              Events
            </h2>
            <p className="md:max-w-[50%] text-center md:text-right text-white/80 text-sm lg:text-base">
              Discover our upcoming events and join for an unforgettable
              experience. Don&apos;t miss the chance to vibe to the music live!
            </p>
            <div className="h-10 md:h-16 w-[1px] bg-white/30"></div>
          </div>
        </div>
        <table className="table table-auto w-full border-t border-t-white/5">
          <tbody>
            {data?.map((event: Event, index: number) => {
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
                    <td className="p-6 md:px-12 align-top hidden lg:inline">
                      <p className="text-white text-sm font-bold uppercase mt-1 whitespace-nowrap">
                        {moment(event.date, formats, true).format("MMM DD")}
                        <span className="ml-3">
                          {moment(event.date, formats, true).format("ddd")}
                        </span>
                      </p>
                    </td>
                    <td className="p-6 md:px-12 align-middle">
                      <p className="text-white text-sm font-bold uppercase whitespace-nowrap lg:hidden mb-2">
                        {moment(event.date, formats, true).format("MMM DD")}
                        <span className="ml-3">
                          {moment(event.date, formats, true).format("ddd")}
                        </span>
                      </p>
                      <div className="flex items-center gap-x-3">
                        <p className={`text-white text-xl`}>
                          <span>{event.event} </span>
                          {event.category === "private" && (
                            <span className="text-white/80 text-base font-light capitalize">
                              ({event.category})
                            </span>
                          )}
                        </p>
                        <GoArrowUpRight className="text-3xl text-white hidden lg:block" />
                      </div>
                      <p className="text-white/70 text-base mt-2">
                        {event.address}
                      </p>
                      {event.link && (
                        <div className="flex lg:hidden mt-3">
                          <Link target="_blank" href={event.link}>
                            <Button title="Tickets" icon={<IoTicketSharp />} />
                          </Link>
                        </div>
                      )}
                    </td>
                    <td className="p-6 md:px-12 align-middle hidden lg:inline">
                      {event.link && (
                        <div className="flex">
                          <Link target="_blank" href={event.link}>
                            <Button title="Tickets" icon={<IoTicketSharp />} />
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventComponent;
