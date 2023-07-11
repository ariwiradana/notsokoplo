import { THUMBNAIL_IMAGES } from "@/constants/thumbnail.images";
import React, { useEffect, useState } from "react";

const useGallery = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    let groupImages = [];
    const chunkSize = 3;
    for (let i = 0; i < THUMBNAIL_IMAGES.length; i += chunkSize) {
      const chunk = THUMBNAIL_IMAGES.slice(i, i + chunkSize);
      groupImages.push(chunk);
    }
    setImages(groupImages);
  }, []);
  return { images };
};

export default useGallery;
