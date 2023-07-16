import fetcher from "@/lib/fetcher";
import { useEffect } from "react";
import useSWR from "swr";

const useGigs = () => {
  const { data: gigs, isLoading: isLoadingGigs } = useSWR(
    `/api/gigs?size=6&page=1`,
    fetcher
  );

  return { gigs, isLoadingGigs };
};

export default useGigs;
