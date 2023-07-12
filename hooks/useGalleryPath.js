import { THUMBNAIL_IMAGES } from "@/constants/thumbnail.images";
import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const useGalleryPath = (params) => {
  const [size] = useState(7);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { data, isLoading } = useSWR(
    `/api/gallery/${params}?page=${page}&size=${size}`,
    fetcher
  );

  const handlePagination = () => {
    setLoadingBtn(true);
    client
      .get(`/api/gallery/${params}?page=${page + 1}&size=${size}`)
      .then((res) => {
        handleGroupImages(res?.data?.data);
      })
      .finally(() => {
        setLoadingBtn(false);
      });
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleGroupImages = (img) => {
    let groupImages = [];
    const chunkSize = 3;
    for (let i = 0; i < img?.length; i += chunkSize) {
      console.log({ img });
      const chunk = img?.slice(i, i + chunkSize);
      groupImages.push(chunk);
    }
    setImages([...groupImages, ...images]);
  };

  useEffect(() => {
    if (data?.total != 0) {
      handleGroupImages(data?.data);
    }
  }, [data]);

  return { images, isLoading, page, handlePagination, loadingBtn, data };
};

export default useGalleryPath;
