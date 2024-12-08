import fetcher from "@/lib/axios";
import { Show } from "@/types/show";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import useSWR from "swr";

const Shows = () => {
  const { data } = useSWR("/api/shows", fetcher);
  return (
    <table className="table table-auto w-full">
      <tbody>
        {data?.map((show: Show, index: number) => {
          const formats = ["YYYY-MM-DD", "DD/MM/YYYY"];
          const isExpired = moment(show.date, formats, true).isBefore(
            moment().subtract(1, "days")
          );

          if (!isExpired)
            return (
              <tr
                key={`${show.event}-${index}`}
                className={`border-b border-b-white/30 hover:border-b-white transition-all ease-in-out duration-500 hover:bg-white/5`}
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
                    <div className="flex mt-3 lg:hidden">
                      <Link
                        target="_blank"
                        href={show.link}
                        className="py-2 text-dark px-5 bg-white font-medium text-lg flex items-center gap-x-2 hover:bg-white/20 hover:backdrop-blur-sm hover:text-white hover:border-white border border-transparent transition-all ease-in-out duration-500"
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
                        className="py-3 ml-4 px-7 text-dark bg-white font-medium text-lg flex items-center gap-x-2 hover:bg-white/20 hover:backdrop-blur-sm hover:text-white hover:border-white border border-transparent transition-all ease-in-out duration-500"
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
  );
};

export default Shows;
