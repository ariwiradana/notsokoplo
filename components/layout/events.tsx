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
import "moment/locale/id";
import useAppStore from "@/store/useAppStore";

const SchedulesComponent = () => {
  const [sliced] = useState<number>(4);
  const [isAllShown, setIsAllShown] = useState(false);
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

  const sectionImages: ImageType[] = store.images?.filter(
    (img) => img.section === "schedule"
  );

  if (filteredData?.length > 0)
    return (
      <div className="relative bg-dark" id="jadwal">
        <div className="py-16 lg:py-28 max-w-screen-xl mx-auto">
          <div className="px-4 md:px-12 lg:px-0">
            <div
              className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 ${montserrat.className}`}
            >
              <h1
                className={`text-left text-3xl md:text-4xl lg:text-5xl text-white font-medium`}
              >
                Mau{" "}
                <span className="italic font-italianno tracking-wide text-[32px] md:text-[38px] lg:text-[54px]">
                  Joget
                </span>{" "}
                di mana<span className="text-primary">?</span>{" "}
              </h1>
              <p className="md:max-w-[50%] md:text-right text-white/80 text-sm lg:text-base">
                Nggak sabar pengin joget bareng? Nih, intip jadwal acara kami
                dan tandai tanggalnya. Kita ketemu di lantai dansa!
              </p>
              <div className="h-16 md:h-24 w-[1px] bg-white/10"></div>
            </div>
          </div>
          <div className="flex items-stretch">
            <div className="min-w-4 w-4 md:w-[30%] md:min-w-[30%] relative flex flex-col items-stretch gap-2">
              {sectionImages.map((image, index) => (
                <div
                  className="w-full h-full relative"
                  key={`event-image-${index}`}
                >
                  <Image
                    sizes="60vw"
                    src={image.url}
                    fill
                    className="object-cover bg-white/5"
                    alt={`Notsokoplo Event Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <table className="table table-auto bg-dark z-10 border-t border-t-white/5">
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
                        className={`border-b border-b-white/5 transition-all ease-in-out duration-500 ${montserrat.className}`}
                      >
                        <td className="p-6 md:px-12 align-middle">
                          <p className="text-white text-base tracking-[1px] uppercase whitespace-nowrap mb-2">
                            {moment(event.date, formats, true).format(
                              "dddd - DD MMM YYYY"
                            )}
                          </p>
                          <div className="flex items-center gap-x-3">
                            <p className={`text-white text-xl md:text-2xl`}>
                              <span>{event.event} </span>
                              {event.category === "private" && (
                                <span className="text-white/80 text-base font-light capitalize font-italianno italic">
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
                        <td className="align-middle p-6 md:px-12 hidden lg:table-cell">
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
              className={`flex justify-center mt-12 lg:mt-16 ${montserrat.className}`}
            >
              <button
                onClick={() => setIsAllShown(true)}
                className="text-base lg:text-lg underline underline-offset-8 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-3"
              >
                <span>Lihat Lebih Banyak</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
};

export default SchedulesComponent;
