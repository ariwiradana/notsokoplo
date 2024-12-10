import { montserrat } from "@/constants/fonts";
import { Music } from "@/types/music";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../ui/button";
import { ScaleLoader } from "react-spinners";
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
          className={`flex flex-col md:flex-row items-center justify-between mb-12 gap-4 ${montserrat.className}`}
        >
          <h2
            className={`font-semibold text-center text-3xl md:text-4xl lg:text-5xl text-white whitespace-nowrap`}
          >
            Music/Remixes
          </h2>
          <p className="md:max-w-[50%] text-center md:text-right text-white/80 text-sm lg:text-base">
            Dive into our newest tracks, created to bring joy to your day.
            Listen now and let the music elevate your mood!
          </p>
          <div className="h-10 md:h-16 w-[1px] bg-white/30"></div>
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
                    title="Listen"
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
              <ScaleLoader color="white" height={24} width={8} />
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
