import React from "react";
import { SquareLoader } from "react-spinners";

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
      <SquareLoader color="white" />
    </div>
  );
};

export default Loading;
