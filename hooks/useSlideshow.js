import fetcher from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";

const useSlideshow = () => {
  const { data, isLoading, mutate } = useSWR("/api/slideshow", fetcher);
  return { data, isLoading, mutate };
};

export default useSlideshow;
