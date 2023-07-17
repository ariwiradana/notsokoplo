import fetcher from "@/lib/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

const useGalleryPath = (params) => {
  const [size] = useState(18);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imageBase64, setImageBase64] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { data, isLoading } = useSWR(
    `/api/gallery/${params}?page=${page}&size=${size}`,
    fetcher
  );

  const handlePagination = () => {
    let newPage = page + 1;
    setLoadingBtn(true);
    setPage(newPage);
  };

  const handleGroupImages = (img) => {
    let newImg = img || [];
    const newBase64 = newImg?.map((img) => img?.image);
    setImages([...images, ...newImg]);
    setImageBase64([...imageBase64, ...newBase64]);
  };

  useEffect(() => {
    if (data?.total != 0) {
      handleGroupImages(data?.data);
      setLoadingBtn(false);
    }
  }, [data]);

  return {
    images,
    isLoading,
    page,
    handlePagination,
    loadingBtn,
    data,
    imageBase64,
  };
};

export default useGalleryPath;
