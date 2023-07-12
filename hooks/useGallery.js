import { THUMBNAIL_IMAGES } from "@/constants/thumbnail.images";
import client from "@/lib/axios";
import fetcher from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const useGallery = () => {
  const [size] = useState(9);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { data, isLoading } = useSWR(`/api/gallery`, fetcher);

  const handlePagination = () => {
    setLoadingBtn(true);
    client
      .get(`/api/gallery?page=${page + 1}&size=${size}`)
      .then((res) => {
        const newData = res?.data?.data?.map((item) => item?.data);
        handleGroupImages(newData);
      })
      .finally(() => {
        setLoadingBtn(false);
        setPage((prevPage) => prevPage + 1);
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
      const chunk = img?.slice(i, i + chunkSize);
      groupImages.push(chunk);
    }
    setImages(groupImages);
  };

  useEffect(() => {
    if (data?.total != 0) {
      const newData = data?.data?.map((item) => item?.data);
      handleGroupImages(newData);
    }
  }, [data]);

  return { images, isLoading, page, handlePagination, loadingBtn, data };
};

export default useGallery;
