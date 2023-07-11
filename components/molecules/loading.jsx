import React, { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  if (!isLoading) return <></>;
  return (
    <div className="min-h-screen fixed w-full bg-black inset-0 z-[999] flex justify-center items-center">
      <div>
        <InfinitySpin width="200" color="#ffff" />
      </div>
    </div>
  );
};

export default Loading;
