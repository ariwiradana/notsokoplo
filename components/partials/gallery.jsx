import React from "react";
import Layout from "../molecules/layout";
import Image from "next/image";
import useLoader from "@/hooks/useLoader";
import Loading from "../molecules/loading";
import useGallery from "@/hooks/useGallery";
import Seo from "./seo";

const GalleryComponent = () => {
  const { load } = useLoader();
  const { images } = useGallery();

  if (!images) return <></>;

  return (
    <>
      <Seo title="Notsokoplo | Gallery"/>
      <Loading isLoading={load} />
      <Layout>
        <div className="w-full h-[70vh] bg-cover overflow-hidden relative">
          <Image
            src="/images/thumbnail-2.jpg"
            className="object-cover relative w-full h-full"
            fill
          />
          <div className="absolute inset-0 flex justify-center items-center flex-col bg-black bg-opacity-40">
            <h5 className="font-montserrat text-white font-medium capitalize text-3xl md:text-5xl tracking-wider mt-16">
              Cozzy Bali
            </h5>
            <h5 className="font-montserrat text-white font-medium tracking-widest text-xs md:text-sm mt-1 md:mt-3 uppercase">
              16 Agustus 2020
            </h5>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-1 p-1">
          {images?.map((image, index) => (
            <div class="grid gap-1" key={`row-${index}`}>
              {image?.map(({ src, alt }) => (
                <div className="w-full bg-cover overflow-hidden" key={alt}>
                  <img
                    class="h-full max-h-[50vh] max-w-full object-cover transform hover:scale-110 transition-transform ease-in-out duration-500"
                    src={src}
                    alt={alt}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default GalleryComponent;
