import fetcher from "@/lib/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

const useGallery = () => {
  const [size] = useState(18);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { data, isLoading } = useSWR(
    `/api/gallery/thumbnail?page=${page}&size=${size}`,
    fetcher
  );

  const handlePagination = () => {
    let newPage = page + 1;
    setLoadingBtn(true);
    setPage(newPage);
  };

  useEffect(() => {
    if (data && data?.total != 0) {
      const newImages = data?.data;
      setImages([...images, ...newImages]);
    }
  }, [data]);

  return { images, isLoading, page, handlePagination, loadingBtn, data };
};

export default useGallery;
