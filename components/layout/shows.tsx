import { montserrat } from "@/constants/fonts";
import { Show } from "@/types/show";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import Button from "../ui/button";
import { IoTicketSharp } from "react-icons/io5";

interface PageProps {
  data: Show[];
}

const ShowsComponent = ({ data }: PageProps) => {
  return (
    <div className="relative bg-dark">
      <div className="pt-16 lg:pt-28 max-w-screen-xl mx-auto">
        <h2
          className={`uppercase text-center font-semibold text-3xl lg:text-5xl text-white mb-8 lg:mb-16 ${montserrat.className}`}
        >
          Shows
        </h2>
        <table className="table table-auto w-full max-w-screen-md mx-auto">
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
                    className={`border-b border-b-white/5 transition-all ease-in-out duration-500 ${montserrat.className}`}
                  >
                    <td className="p-6 align-top hidden lg:inline">
                      <p className="text-white text-sm font-bold uppercase mt-1 whitespace-nowrap">
                        {moment(show.date, formats, true).format("MMM DD")}
                        <span className="ml-3">
                          {moment(show.date, formats, true).format("ddd")}
                        </span>
                      </p>
                    </td>
                    <td className="p-6 align-middle">
                      <p className="text-white text-sm font-bold uppercase whitespace-nowrap lg:hidden mb-2">
                        {moment(show.date, formats, true).format("MMM DD")}
                        <span className="ml-3">
                          {moment(show.date, formats, true).format("ddd")}
                        </span>
                      </p>
                      <div className="flex items-center gap-x-3">
                        <p className={`text-white text-xl`}>
                          <span>{show.event} </span>
                          {show.category === "private" && (
                            <span className="text-white/80 text-base font-light capitalize">
                              ({show.category})
                            </span>
                          )}
                        </p>
                        <GoArrowUpRight className="text-3xl text-white hidden lg:block" />
                      </div>
                      <p className="text-white/70 text-base mt-2">
                        {show.address}
                      </p>
                      {show.link && (
                        <div className="flex lg:hidden mt-3">
                          <Link target="_blank" href={show.link}>
                            <Button title="Info" icon={<IoTicketSharp />} />
                          </Link>
                        </div>
                      )}
                    </td>
                    <td className="p-6 align-middle hidden lg:inline">
                      {show.link && (
                        <div className="flex">
                          <Link target="_blank" href={show.link}>
                            <Button title="Info" icon={<IoTicketSharp />} />
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

export default ShowsComponent;
