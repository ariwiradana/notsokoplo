import { montserrat } from "@/constants/fonts";
import { Music } from "@/types/music";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdPlay } from "react-icons/io";
import Button from "../ui/button";

interface PageProps {
  data: Music[];
}

const MusicComponent = ({ data }: PageProps) => {
  return (
    <div className={`relative bg-dark ${montserrat.className} z-10`}>
      <div className="max-w-screen-xl mx-auto py-16 lg:py-28 px-6">
        <h2
          className={`uppercase text-center font-semibold text-3xl lg:text-5xl text-white mb-16 ${montserrat.className}`}
        >
          Music
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {data?.slice(0, 3).map((music) => (
            <div className="text-center" key={music.title}>
              <div className="w-full aspect-square relative shadow-lg">
                <Image
                  src={music.cover}
                  fill
                  className="object-cover"
                  alt={music.title}
                />
              </div>
              <h2 className="text-2xl font-semibold text-white mt-6">
                {music.title}
              </h2>
              <h5 className="mt-2 text-white/70">{music.artist}</h5>
              <div className="flex justify-center mt-6">
                <Button title="Listen" icon={<IoMdPlay />} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 flex justify-center">
          <Link
            className="text-xl font-semibold text-white relative hover:opacity-70 transition-all ease-in-out duration-300"
            href="/music"
          >
            <span>View More</span>
            <div className="w-full mt-1 h-[1px] bg-white"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicComponent;
