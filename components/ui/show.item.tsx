import { Show } from "@/types/show";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const ShowItem = ({ show }: { show: Show }) => {
  const formats = ["YYYY-MM-DD", "DD/MM/YYYY"];
  const isExpired = moment(show.date, formats, true).isBefore(
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
          {moment(show.date, formats, true).format("YYYY")}
        </h2>
        <h2
          className={`text-lg transition-all ease-in-out duration-500 text-white whitespace-nowrap ${
            !isExpired ? "" : ""
          }`}
        >
          {moment(show.date, formats, true).format("DD MMM")}
        </h2>
        <h2
          className={`text-lg transition-all text-white ease-in-out duration-500 ${
            !isExpired ? "" : ""
          }`}
        >
          {show.address}
        </h2>
      </div>
      <div className="flex justify-end">
        <h2
          className={`text-lg flex items-center gap-x-3 transition-all ease-in-out duration-500 ${
            !isExpired ? "" : ""
          }`}
        >
          <span className="font-bold text-white text-right whitespace-nowrap">
            {show.event}{" "}
          </span>
          {show.category === "private" && (
            <span className="text-sm font-light text-gray-400">(Private) </span>
          )}
          <GoArrowUpRight className="text-3xl" />
        </h2>
        {show.link && (
          <Link
            className="py-3 px-6 bg-white text-dark relative z-40"
            href={show.link}
            target="_blank"
          >
            Tickets
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShowItem;
