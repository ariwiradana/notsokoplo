import React from "react";
import Layout from "../molecules/layout";
import Seo from "./seo";
import useNavbar from "@/hooks/useNavbar";
import moment from "moment";
import { RotatingLines } from "react-loader-spinner";
import useGalleryPath from "@/hooks/useGalleryPath";
import { titleCase } from "@/lib/titleCase";
import useLightbox from "@/hooks/useLightbox";
import Image from "next/image";
import LightboxComponent from "../elements/lightbox";

const GalleryPathComponent = ({ params }) => {
  const { images, isLoading, handlePagination, loadingBtn, data, imageBase64 } =
    useGalleryPath(params);
  const { position } = useNavbar();
  const {
    open: openLightbox,
    setOpen: setOpenLightbox,
    indexImg,
    setIndexImg,
  } = useLightbox();

  const title = data ? titleCase(data?.data[0]?.title) : "";
  const dates = data
    ? moment(data?.data[0]?.date).format("dddd, D MMMM YYYY")
    : "";

  return (
    <>
      <Seo title={`${title || "Gallery"}`} />
      <Layout>
        <div className="min-h-screen">
          <div
            className={`py-8 lg:py-24 ${
              position > 10 ? "md:mt-16 mt-12" : "md:mt-24 mt-16"
            }`}
          >
            <h1
              className={`text-gray-800 relative z-20 transition-all ease-in-out duration-500 text-center font-semibold text-xl md:text-2xl lg:text-4xl font-montserrat`}
            >
              {title}
            </h1>
            <h6 className="text-center font-montserrat uppercase text-sm lg:text-base lg:mt-1">
              {dates}
            </h6>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-1 p-1 transition-all ease-in-out duration-500`}
          >
            {images?.length != 0 &&
              images?.map((el, index) => (
                <div
                  onClick={() => {
                    setOpenLightbox(!openLightbox);
                    setIndexImg(index + 1);
                  }}
                  className="w-full bg-cover overflow-hidden relative group border h-full min-h-[35vh] md:min-h-[40vh] lg:min-h-[40vh]"
                  key={`${el?._id}-${el?.path}`}
                >
                  <Image
                    fill
                    className="h-full w-full max-w-full group-hover:grayscale object-cover transform group-hover:scale-110 transition-all ease-in-out duration-500"
                    src={el?.image}
                    alt={el?.alt}
                  />
                </div>
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

          {data?.total > images?.flat()?.length && !isLoading ? (
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
        </div>
      </Layout>

      <LightboxComponent
        slide={indexImg}
        open={openLightbox}
        sources={imageBase64}
      />
    </>
  );
};

export default GalleryPathComponent;
