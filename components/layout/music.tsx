import { montserrat } from "@/constants/fonts";
import { Music } from "@/types/music";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../ui/button";
import { SquareLoader } from "react-spinners";
import MusicPlayer from "./music.player";
import useMusicPlayer from "@/store/useMusicPlayer";
import { TbPlayerPlayFilled } from "react-icons/tb";
interface PageProps {
  data: Music[];
}

const MusicComponent = ({ data }: PageProps) => {
  const [sliced, setSliced] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleIsPlaying, handleIsOpenPlayer, handleAddMusic } =
    useMusicPlayer();

  const handleMoreMusic = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSliced((prevState) => prevState + 3);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`relative bg-dark ${montserrat.className} z-10`} id="music">
      <MusicPlayer />
      <div className="max-w-screen-xl mx-auto py-16 lg:py-28 px-4 md:px-12 lg:px-4">
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 ${montserrat.className}`}
        >
          <h2
            className={`font-bold text-left text-4xl md:text-5xl lg:text-6xl text-white uppercase`}
          >
            Music/Remixes
          </h2>
          <p className="md:max-w-[50%] md:text-right text-white/80 text-sm lg:text-base">
            Dive into our newest tracks, created to bring joy to your day.
            Listen now!
          </p>
          <div className="h-16 md:h-24 w-[1px] bg-white/10"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-x-6 gap-y-12">
          {data?.slice(0, sliced).map((music) => (
            <div key={music.title} className="text-center">
              <div className="w-full aspect-square relative shadow-lg">
                <Image
                  sizes="600px"
                  src={music.cover}
                  fill
                  className="object-cover rounded"
                  alt={music.title}
                />
              </div>
              <h2 className="text-2xl font-semibold text-white mt-6">
                {music.title}
              </h2>
              <h5 className="mt-2 text-white/70">{music.artist}</h5>
              {music.preview && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() => {
                      handleIsOpenPlayer(true);
                      handleIsPlaying(true);
                      handleAddMusic(music);
                    }}
                    title="Preview"
                    icon={<TbPlayerPlayFilled />}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {data.length > sliced && (
          <div className="flex justify-center mt-12 lg:mt-16">
            {isLoading ? (
              <SquareLoader color="white" size={30} />
            ) : (
              <button
                onClick={handleMoreMusic}
                className="text-base lg:text-lg font-semibold underline underline-offset-8 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-3"
              >
                <span>View More</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicComponent;
