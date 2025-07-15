import { montserrat } from "@/constants/fonts";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../ui/button";
import { SquareLoader } from "react-spinners";
import useMusicPlayer from "@/store/useMusicPlayer";
import { TbPlayerPlayFilled } from "react-icons/tb";
import useAppStore from "@/store/useAppStore";

const MusicComponent = () => {
  const store = useAppStore();
  const [sliced, setSliced] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleIsPlaying, handleIsOpenPlayer, handleAddMusic } =
    useMusicPlayer();

  const handleMoreMusic = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSliced((prevState) => prevState + 6);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`relative bg-dark ${montserrat.className} z-0`} id="musik">
      <div className="max-w-screen-xl mx-auto py-16 lg:py-28 px-4 md:px-12 lg:px-4">
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-12 gap-4 md:gap-12 ${montserrat.className}`}
        >
          <h1
            className={`text-left text-3xl md:text-4xl lg:text-5xl font-medium text-white`}
          >
            Musik{" "}
            <span className="italic font-italianno tracking-wide text-[32px] md:text-[38px] lg:text-[54px]">
              Buatan
            </span>{" "}
            kami
            <span className="text-primary">.</span>
          </h1>
          <p className="md:max-w-[50%] md:text-right text-white/80 text-sm lg:text-base">
            Kadang remix, kadang bikin dari nol. Tapi tujuannya sama: kasih
            musik yang enak buat didengarkan!.
          </p>
          <div className="h-16 md:h-24 w-[1px] bg-white/10"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-x-6 gap-y-12">
          {store.music?.slice(0, sliced).map((music) => (
            <div key={music.title} className="text-center">
              <div className="w-full aspect-square relative shadow-lg mb-6">
                <Image
                  sizes="600px"
                  src={music.cover}
                  fill
                  className="object-cover bg-white/5"
                  alt={`Cover Image ${music.title} Notsokoplo`}
                />
              </div>
              {music.caption && (
                <div className="mb-3">
                  <p className="bg-primary text-white inline px-3 py-[3px] rounded-full text-sm">
                    {music.caption}
                  </p>
                </div>
              )}
              <h5 className="text-2xl font-semibold text-white">
                {music.title}
              </h5>
              <h6 className="mt-2 text-white/70">{music.artist}</h6>
              {music.preview && (
                <div className="flex justify-center mt-6">
                  <Button
                    aria-label={`Button Preview ${music.title}`}
                    onClick={() => {
                      handleIsOpenPlayer(true);
                      handleIsPlaying(true);
                      handleAddMusic(music);
                    }}
                    title="Putar"
                    icon={<TbPlayerPlayFilled />}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {store.music?.length > sliced && (
          <div className="flex justify-center mt-12 lg:mt-16">
            {isLoading ? (
              <SquareLoader color="white" size={30} />
            ) : (
              <button
                aria-label="Button Load More"
                onClick={handleMoreMusic}
                className="text-base lg:text-lg underline underline-offset-8 text-white relative hover:opacity-70 transition-all ease-in-out duration-300 flex items-center gap-x-3"
              >
                <span>Lebih Banyak</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicComponent;
