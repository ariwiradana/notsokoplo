import React from "react";
import Layout from "../molecules/layout";
import Loading from "../molecules/loading";
import useGallery from "@/hooks/useGallery";
import Seo from "./seo";
import useNavbar from "@/hooks/useNavbar";
import Link from "next/link";
import moment from "moment";

const GalleryComponent = () => {
  const { images, isLoading, handlePagination, loadingBtn, data } =
    useGallery();
  const { position } = useNavbar();

  if (!images) return <></>;

  return (
    <>
      <Seo title="Notsokoplo | Gallery" />
      <Loading isLoading={isLoading} />
      <Layout>
        <div
          class={`grid grid-cols-2 md:grid-cols-3 gap-1 p-1 transition-all ease-in-out duration-500 min-h-screen ${
            position > 10 ? "md:mt-16 mt-12" : "md:mt-24 mt-16"
          }`}
        >
          {images?.map((image, index) => (
            <div class="grid gap-1" key={`row-${index}`}>
              {image?.map(({ image, alt, title, date, path }) => (
                <div
                  key={alt}
                  className="w-full bg-cover max-h-[30vh] md:max-h-full overflow-hidden relative group cursor-pointer"
                >
                  <Link href={`/gallery/${path}`}>
                    <img
                      class="h-full max-h-[30vh] md:max-h-full max-w-full group-hover:grayscale object-cover transform group-hover:scale-110 transition-all ease-in-out duration-500"
                      src={image}
                      alt={alt}
                    />
                    <div className="absolute max-h-[30vh] md:max-h-full bottom-0 inset-x-0 p-3 md:px-4 md:py-3 lg:py-6 lg:px-8 items-center flex-col bg-black bg-opacity-70 delay-100 transition-all ease-in-out duration-500">
                      <h5 className="font-montserrat text-white font-medium text-sm leading-5 md:text-lg lg:text-xl md:tracking-wide capitalize">
                        {title}
                      </h5>
                      <h5 className="font-raleway text-white font-light md:mt-0 lg:tracking-widest text-[10px] md:text-xs uppercase">
                        {moment(date).format("dddd, D MMMM YYYY")}
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
