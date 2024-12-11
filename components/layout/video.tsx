import { montserrat } from "@/constants/fonts";
import { Socials } from "@/constants/social";
import Link from "next/link";
import React from "react";
import YouTubeEmbed from "../ui/youtube.embed";
import { Video } from "@/types/video";

interface PageProps {
  data: Video[];
}

const VideoComponent = ({ data }: PageProps) => {
  return (
    <div className={`${montserrat.className} bg-black px-4`} id="contact">
      <div className={`flex justify-center`}>
        <div className="flex items-center transition-all ease-in-out duration-500">
          {Socials.map((social) => (
            <Link
              rel="noopener"
              aria-label={`Social ${social.title}`}
              target="_blank"
              key={social.title}
              href={social.link}
              className="md:p-6 p-4 flex gap-x-2 justify-center items-center text-2xl md:text-3xl group text-white hover:bg-white transition-all ease-in-out duration-500"
            >
              <div className="group-hover:text-dark">{social.icon}</div>
              <p className="text-sm font-medium mt-1 group-hover:text-dark hidden md:group-hover:block">
                {social.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto grid gap-4">
        {data?.map((video) => (
          <YouTubeEmbed key={video.url} videoId={video.url} />
        ))}
      </div>
    </div>
  );
};

export default VideoComponent;
