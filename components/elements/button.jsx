import React, { forwardRef } from "react";
import { RotatingLines } from "react-loader-spinner";

const Button = ({ title, full, loading, disabled,...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={`bg-gray-900 rounded-lg text-white font-medium font-raleway flex justify-center items-center text-base h-10 px-4 ${
        full ? "w-full" : "w-auto"
      } ${disabled || loading ? "pointer-events-none bg-opacity-80": "pointer-events-auto bg-opacity-100"}`}
    >
      {loading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
      ) : (
        title
      )}
    </button>
  );
};

export default forwardRef(Button);
