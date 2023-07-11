import React, { useEffect } from "react";
import { LineWave } from "react-loader-spinner";

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
    <div className="min-h-screen w-full flex justify-center items-center bg-black inset-0 z-[999] fixed">
      <LineWave
        height="150"
        width="150"
        color="#ffff"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
};

export default Loading;
