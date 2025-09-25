import useLoading from "@/store/useLoading";
import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/button";
import { montserrat } from "@/constants/fonts";
import Link from "next/link";
import { TbLink, TbPlayerPlayFilled } from "react-icons/tb";
import useAppStore from "@/store/useAppStore";
import { VideoStatus } from "@/types/VideoStatus";
import { BarLoader } from "react-spinners";

const HeroComponent = () => {
  const { handleIsLoading } = useLoading();
  const store = useAppStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<VideoStatus>("idle");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaying = () => setStatus("playing");
    const handlePause = () => setStatus("paused");
    const handleWaiting = () => setStatus("buffering");
    const handleEnded = () => setStatus("ended");

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  console.log({ status });

  return (
    <div
      className="h-svh w-full relative z-10 flex items-center justify-center overflow-hidden"
      id="beranda"
    >
      {store.release && (
        <>
          <div
            className={`absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-b from-transparent via-dark/40 to-dark/60 px-4 md:px-12 py-16 lg:p-32 z-20 ${montserrat.className}`}
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-end mt-6 gap-2">
              <h1
                style={{
                  lineHeight: "0.9em",
                }}
                className="text-white font-semibold text-center text-5xl md:text-6xl lg:text-8xl uppercase relative"
              >
                {store.release.title}{" "}
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/60">
                {store.release.caption}
              </p>
            </div>
            <p className="text-white text-lg my-4 text-center lg:text-left">
              {store.release.artist}
            </p>
            <Link
              className="mt-4"
              target="_blank"
              aria-label="URL Stream New Release"
              href={(store.release.url as string) || ""}
            >
              <Button
                icon={
                  store.release.action_title ? (
                    <TbLink />
                  ) : (
                    <TbPlayerPlayFilled />
                  )
                }
                title={store.release.action_title || "Stream Sekarang"}
              />
            </Link>
          </div>
        </>
      )}
      {["idle", "buffering"].includes(status) && (
        <div className="absolute z-20 inset-0 flex justify-center items-center">
          <BarLoader className="scale-75" color="white" />
        </div>
      )}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          onLoadedData={handleIsLoading}
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={store.release?.video as string} />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-[30%] via-transparent to-dark z-10 flex items-end justify-center"></div>
    </div>
  );
};

export default HeroComponent;
