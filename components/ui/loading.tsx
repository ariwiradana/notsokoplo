import React from "react";
import { PropagateLoader } from "react-spinners";

interface LoadingProps {
  show?: boolean;
}

const Loading = ({ show = true }: LoadingProps) => {
  return (
    <div
      className={`h-dvh w-full bg-dark flex justify-center items-center fixed inset-0 z-30 transition-all ease-in-out duration-500 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <PropagateLoader color="white" size={15} />
    </div>
  );
};

export default Loading;
