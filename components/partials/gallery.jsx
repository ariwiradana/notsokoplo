import React from "react";
import Layout from "../molecules/layout";
import Image from "next/image";
import useLoader from "@/hooks/useLoader";
import Loading from "../molecules/loading";
import useGallery from "@/hooks/useGallery";
import Seo from "./seo";
import useNavbar from "@/hooks/useNavbar";
import Link from "next/link";

const GalleryComponent = () => {
  const { load } = useLoader();
  const { images } = useGallery();
  const { position } = useNavbar();

  console.log({ images });

  if (!images) return <></>;

  return (
    <>
      <Seo title="Notsokoplo | Gallery" />
      <Loading isLoading={load} />
      <Layout>
        {/* <div className="w-full h-[70vh] bg-cover overflow-hidden relative">
          <Image
            src={images[0][0]?.src}
            className="object-cover relative w-full h-full"
            fill
          />
          <div className="absolute inset-0 flex justify-center items-center flex-col bg-black bg-opacity-40">
            <h5 className="font-montserrat text-white font-medium capitalize text-3xl md:text-5xl tracking-wider mt-16">
              GetUp Bali
            </h5>
            <h5 className="font-montserrat text-white font-medium tracking-widest text-xs md:text-sm mt-1 md:mt-3 uppercase">
              16 Agustus 2020
            </h5>
          </div>
        </div> */}

        <div
          class={`grid grid-cols-2 md:grid-cols-3 gap-1 p-1 transition-all ease-in-out duration-500 ${
            position > 10 ? "md:mt-16 mt-12" : "md:mt-24 mt-16"
          }`}
        >
          {images?.map((image, index) => (
            <div class="grid gap-1" key={`row-${index}`}>
              {image?.map(({ src, alt, title, date, path }) => (
                <div
                  key={alt}
                  className="w-full bg-cover overflow-hidden relative group cursor-pointer"
                >
                  <Link href={`/gallery/${path}`}>
                    <img
                      class="h-full max-h-[30vh] md:max-h-full max-w-full group-hover:grayscale object-cover transform group-hover:scale-110 transition-all ease-in-out duration-500"
                      src={src}
                      alt={alt}
                    />
                    <div className="absolute max-h-[30vh] md:max-h-full px-4 group-hover:scale-110 inset-0 flex justify-center items-center flex-col bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 delay-300 transition-all ease-in-out duration-500">
                      <h5 className="font-montserrat text-white font-medium capitalize text-base leading-5 text-center md:text-2xl md:tracking-wider">
                        {title}
                      </h5>
                      <h5 className="font-raleway text-white font-medium mt-1 md:mt-0 tracking-widest text-xs uppercase">
                        {date}
                      </h5>
                    </div>
                  </Link>
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
