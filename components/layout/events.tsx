import { montserrat } from "@/constants/fonts";
import { Event } from "@/types/event";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../ui/button";
import { IoChevronDown, IoTicketSharp } from "react-icons/io5";
import "moment/locale/id";
import useAppStore from "@/store/useAppStore";
import { PuffLoader } from "react-spinners";

const SchedulesComponent = () => {
  const [sliced] = useState<number>(4);
  const [isAllShown, setIsAllShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const store = useAppStore();

  const filteredData = store.events?.filter((event) => {
    const isExpired = moment(
      event.date,
      ["YYYY-MM-DD", "DD/MM/YYYY"],
      true
    ).isBefore(moment().subtract(1, "days"));
    if (!isExpired) {
      return event;
    }
  });

  const handleShowMore = () => {
    setIsLoading(true);
    setInterval(() => {
      setIsAllShown(true);
      setIsLoading(false);
    }, 3000);
  };

  if (filteredData?.length > 0)
    return (
      <div className="relative bg-dark" id="cek-jadwal">
        <div className="py-16 md:py-20 lg:py-28 max-w-screen-xl mx-auto">
          <div className="px-4 md:px-12 lg:px-0">
            <div
              className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 ${montserrat.className}`}
            >
              <h1
                className={`text-left text-3xl md:text-4xl lg:text-5xl font-medium text-white`}
              >
                Mau Joget Dimana?
                <span className="text-primary">.</span>
              </h1>
              <p className="md:max-w-[50%] md:text-right text-white/80 text-sm lg:text-base font-light">
                Nggak sabar pengin joget bareng? Nih, intip jadwal acara kami
                untuk bulan {moment().format("MMMM YYYY")}
              </p>

              <div className="h-12 md:h-24 w-[1px] bg-white/20"></div>
            </div>
          </div>

          <div className="px-4 md:px-12 lg:px-0">
            <table className="table table-auto bg-dark z-10 border-t border-t-white/20 w-full">
              <tbody>
                {(isAllShown
                  ? filteredData
                  : filteredData.slice(0, sliced)
                )?.map((event: Event, index: number) => {
                  const formats = ["YYYY-MM-DD", "DD/MM/YYYY"];
                  const isExpired = moment(event.date, formats, true).isBefore(
                    moment().subtract(1, "days")
                  );

                  if (!isExpired)
                    return (
                      <tr
                        key={`${event.event}-${index}`}
                        className={`border-b border-b-white/20 transition-all ease-in-out duration-500 ${montserrat.className}`}
                      >
                        <td className="py-6 md:pr-12 md:pl-0 align-middle">
                          <p className="text-white text-base tracking-[1px] uppercase whitespace-nowrap mb-2">
                            {moment(event.date, formats, true).format(
                              "dddd - DD MMM YYYY"
                            )}
                          </p>
                          <div className="flex items-center gap-x-3">
                            <p
                              className={`text-white font-semibold text-2xl md:text-3xl`}
                            >
                              <span>{event.event} </span>
                              {event.category === "private" && (
                                <span className="text-white/80 text-base font-light capitalize font-italianno italic">
                                  ({event.category})
                                </span>
                              )}
                            </p>
                          </div>

                          <p className="text-white/70 text-base md:text-lg mt-2 flex lg:hidden">
                            <span>{event.address}</span>
                          </p>

                          {event.link && (
                            <div className="flex lg:hidden mt-3">
                              <Link
                                rel="noopener"
                                aria-label="Action Detail Mobile"
                                target="_blank"
                                href={event.link || ""}
                              >
                                <Button
                                  aria-label="Button Detail Mobile"
                                  title="Info"
                                  icon={<IoTicketSharp />}
                                />
                              </Link>
                            </div>
                          )}
                        </td>
                        <td className="align-middle py-6 md:pl-12 md:pr-0 hidden lg:table-cell">
                          <p className="text-white/70 text-base md:text-lg mt-2 flex">
                            <span>{event.address}</span>
                          </p>
                        </td>
                        <td className="align-middle py-6 md:pl-12 md:pr-0 hidden lg:table-cell">
                          <div className="flex gap-x-4">
                            {event.link && (
                              <Link
                                rel="noopener"
                                aria-label="Action Detail"
                                target="_blank"
                                href={event.link || ""}
                              >
                                <Button
                                  aria-label="Button Detail"
                                  title="Info"
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
          {filteredData.length > sliced && !isAllShown ? (
            <div
              className={`flex justify-center mt-8 lg:mt-12 ${montserrat.className}`}
            >
              {/* <button
                onClick={handleShowMore}
                className="rounded-full min-h-9 text-sm border px-4 border-white/20 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-2"
              >
                {isLoading ? (
                  <BarLoader color="white" />
                ) : (
                  <>
                    <span>Lihat Lebih Banyak</span>
                    <span>
                      <IoChevronDown />
                    </span>
                  </>
                )}
              </button> */}

              <button
                onClick={handleShowMore}
                className="text-sm px-4 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-2"
              >
                {isLoading ? "Lagi nyiapin panggung..." : "Lihat Semua Jadwal"}
                <div className="min-h-10 min-w-10 flex items-center justify-center rounded-full border border-white/20 aspect-square">
                  {!isLoading ? (
                    <IoChevronDown />
                  ) : (
                    <PuffLoader size={30} color="#ffffff" />
                  )}
                </div>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
};

export default SchedulesComponent;
