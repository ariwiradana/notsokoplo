import React from "react";
import Layout from "../molecules/layout";
import Loading from "../elements/loading";
import useGallery from "@/hooks/useGallery";
import Seo from "./seo";
import useNavbar from "@/hooks/useNavbar";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";

const GalleryComponent = () => {
  const { isLoading, data, handlePagination, images, loadingBtn } =
    useGallery();
  const { position } = useNavbar();

  return (
    <>
      <Seo title="Notsokoplo | Gallery" />
      <Layout>
        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-1 p-1 transition-all ease-in-out duration-500 ${
            position > 10 ? "md:mt-16 mt-12" : "md:mt-24 mt-16"
          }`}
        >
          {images?.map((el) => (
            <Link
              href={`/gallery/${el?.path}`}
              className="w-full bg-cover group overflow-hidden relative group border h-full min-h-[35vh] md:min-h-[40vh] lg:min-h-[40vh]"
              key={`${el?._id}-${el?.path}`}
            >
              <Image
                fill
                className="h-full w-full max-w-full group-hover:grayscale object-cover transform group-hover:scale-110 transition-all ease-in-out duration-500"
                src={el?.image}
                alt={el?.alt}
              />
              <div className="absolute max-h-[30vh] md:max-h-full bottom-0 inset-x-0 p-3 md:px-4 md:py-3 lg:py-6 lg:px-8 items-center flex-col bg-black bg-opacity-70 delay-100 transition-all ease-in-out duration-500">
                <h5 className="font-montserrat text-white font-medium text-sm leading-5 md:text-lg lg:text-xl md:tracking-wide capitalize">
                  {el?.title}
                </h5>
                <h5 className="font-raleway text-white font-light md:mt-0 lg:tracking-widest text-[10px] md:text-xs uppercase">
                  {moment(el?.date).format("dddd, D MMMM YYYY")}
                </h5>
              </div>
            </Link>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center py-4">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={isLoading}
            />
          </div>
        )}

        {data?.total > images?.length ? (
          <div className="flex justify-center py-4">
            <button
              onClick={handlePagination}
              className="px-4 h-8 rounded-sm font-raleway font-medium text-black border border-gray-400 text-[10px] tracking-wider uppercase"
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
                "Load More"
              )}
            </button>
          </div>
        ) : (
          <></>
        )}
      </Layout>
    </>
  );
};

export default GalleryComponent;
