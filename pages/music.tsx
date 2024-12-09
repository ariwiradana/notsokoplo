import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import fetcher from "@/lib/axios";
import { Music } from "@/types/music";
import Image from "next/image";
import React from "react";
import { IoMdPlay } from "react-icons/io";
import useSWR from "swr";

const MusicPage = () => {
  const { data, isLoading } = useSWR<Music[]>("/api/music", fetcher);
  if (isLoading) return <Loading show={isLoading} />;
  return (
    <section className="bg-dark">
      <Navbar fixed={false} />
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 px-6">
          {data?.map((music) => (
            <div key={music.title} className="text-center">
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
        <Footer />
      </div>
    </section>
  );
};

export default MusicPage;
