import { THUMBNAIL_IMAGES } from "@/constants/thumbnail.images";
import fetcher from "@/lib/fetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const useGallery = () => {
  const [images, setImages] = useState(null);
  const { data, isLoading } = useSWR(`/api/gallery`, fetcher);

  useEffect(() => {
    if (data?.total != 0) {
      let groupImages = [];
      const chunkSize = 3;
      for (let i = 0; i < data?.data?.length; i += chunkSize) {
        const chunk = data?.data?.slice(i, i + chunkSize);
        groupImages.push(chunk);
      }
      setImages(groupImages);
    }
  }, [data]);

  return { images, isLoading };
};

export default useGallery;
