import { Event } from "@/types/event";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const EventItem = ({ event }: { event: Event }) => {
  const formats = ["YYYY-MM-DD", "DD/MM/YYYY"];
  const isExpired = moment(event.date, formats, true).isBefore(
    moment().subtract(1, "days")
  );

  return (
    <div
      className={`flex items-center justify-between py-8 gap-24 group border-b border-b-white/30 hover:border-b-white ${
        isExpired
          ? "line-through opacity-15 cursor-not-allowed pointer-events-none"
          : ""
      }`}
    >
      <div className="flex items-center gap-24">
        <h2
          className={`text-lg transition-all ease-in-out duration-500 text-white ${
            !isExpired ? "" : ""
          }`}
        >
          {moment(event.date, formats, true).format("YYYY")}
        </h2>
        <h2
          className={`text-lg transition-all ease-in-out duration-500 text-white whitespace-nowrap ${
            !isExpired ? "" : ""
          }`}
        >
          {moment(event.date, formats, true).format("DD MMM")}
        </h2>
        <h2
          className={`text-lg transition-all text-white ease-in-out duration-500 ${
            !isExpired ? "" : ""
          }`}
        >
          {event.address}
        </h2>
      </div>
      <div className="flex justify-end">
        <h2
          className={`text-lg flex items-center gap-x-3 transition-all ease-in-out duration-500 ${
            !isExpired ? "" : ""
          }`}
        >
          <span className="font-bold text-white text-right whitespace-nowrap">
            {event.event}{" "}
          </span>
          {event.category === "private" && (
            <span className="text-sm font-light text-gray-400">(Private) </span>
          )}
          <GoArrowUpRight className="text-3xl" />
        </h2>
        {event.link && (
          <Link
            className="py-3 px-4 bg-white text-dark relative z-40"
            href={event.link}
            target="_blank"
          >
            Tickets
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventItem;
