import React from "react";
import Layout from "../molecules/layout";
import Loading from "../molecules/loading";
import useGallery from "@/hooks/useGallery";
import Seo from "./seo";
import useNavbar from "@/hooks/useNavbar";
import Link from "next/link";
import moment from "moment";
import { RotatingLines } from "react-loader-spinner";
import useGalleryPath from "@/hooks/useGalleryPath";
import { titleCase } from "@/lib/titleCase";

const GalleryPathComponent = ({ params }) => {
  const { images, isLoading, handlePagination, loadingBtn, data } =
    useGalleryPath(params);
  const { position } = useNavbar();

  if (!images) return <></>;

  const title = data ? titleCase(data?.data[0]?.title) : "";

  return (
    <>
      <Seo title={`${title} | Gallery`} />
      <Loading isLoading={isLoading} />
      <Layout>
        <h1
          className={`text-gray-800 relative z-20 py-8 lg:py-24 transition-all ease-in-out duration-500 text-center font-semibold text-xl md:text-2xl lg:text-3xl font-montserrat ${
            position > 10 ? "md:mt-16 mt-12" : "md:mt-24 mt-16"
          }`}
        >
          {title}
        </h1>
        <div
          class={`grid grid-cols-2 md:grid-cols-3 gap-1 p-1 transition-all ease-in-out duration-500 min-h-screen`}
        >
          {images?.map((image, index) => (
            <div class="grid grid-cols-1 gap-1" key={`row-${index}`}>
              {image?.map(({ image, alt, title, date, path }) => (
                <div
                  key={alt}
                  className="w-full bg-cover md:max-h-full overflow-hidden relative group"
                >
                  <img
                    class="h-full md:max-h-full max-w-full group-hover:grayscale object-cover transform group-hover:scale-110 transition-all ease-in-out duration-500"
                    src={image}
                    alt={alt}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        {data?.total > images?.flat()?.length && (
          <div className="flex justify-center py-4">
            <button
              onClick={handlePagination}
              className="px-4 h-8 rounded font-raleway font-medium text-black border border-gray-400 text-[10px] tracking-wider uppercase"
            >
              {loadingBtn ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
              ) : (
                "Show more"
              )}
            </button>
          </div>
        )}
      </Layout>
    </>
  );
};

export default GalleryPathComponent;
