import React from "react";
import Container from "../elements/container";
import moment from "moment";
import useGigs from "@/hooks/useGigs";
import { RotatingLines } from "react-loader-spinner";

const Gigs = () => {
  const { gigs, isLoadingGigs } = useGigs();

  return (
    <div
      className="py-16 md:py-20 lg:py-24 h-full"
      style={{ backgroundImage: `url('/images/paper.jpeg')` }}
    >
      <Container className="md:px-8 px-4">
        <div className="flex justify-center">
          <h2 className="text-gray-900 flex items-center gap-x-2 bg-white text-xl py-2 px-4 md:text-3xl text-center font-montserrat uppercase">
            Upcoming{" "}
            <span className="font-bold text-4xl md:text-5xl">Gigs</span>
          </h2>
        </div>
        {isLoadingGigs && (
          <div className="flex justify-center mt-14">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          </div>
        )}
        <div className="grid md:grid-cols-2 justify-center mt-16 w-full gap-8 lg:max-w-[60vw] mx-auto">
          {gigs?.data?.map((gig) => (
            <div className="p-4 border rounded bg-white" key={gig?._id}>
              <h5 className="text-sm font-montserrat bg-gray-900 px-2 py-1 text-white inline">
                {moment(gig?.date).format("YYYY/MM/DD")}
              </h5>
              <h2 className="text-gray-900 font-semibold font-montserrat text-2xl mb-2 mt-4 line-clamp-1">
                {gig?.event}
              </h2>
              <div className="flex items-center gap-x-2">
                <div className="border-b border-gray-200 w-full"></div>
                <h5 className="text-sm relative font-montserrat text-gray-500 font-medium flex justify-end whitespace-nowrap">
                  {gig?.place}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Gigs;
