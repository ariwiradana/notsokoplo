import { useState, useEffect } from "react";
import { NextPage } from "next";
import { montserrat } from "@/constants/fonts";
import { HiXMark } from "react-icons/hi2";

interface Props {
  url: string;
}

const Popup: NextPage<Props> = ({ url = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsOpen(true);
    };

    if (document.readyState === "complete") {
      setIsOpen(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all ease-in-out duration-300 ${
        isOpen
          ? "visible opacity-100 translate-y-0"
          : "invisible opacity-0 translate-y-1"
      } ${montserrat.className}`}
    >
      <div className="relative shadow-xl w-full max-w-[90vw] lg:max-w-xl h-[70vh] lg:h-[80vh]">
        {isOpen && <iframe src={url} className="w-full h-full relative" />}
        <button
          className="w-full p-4 flex items-center gap-x-2 text-sm justify-center"
          onClick={() => setIsOpen(false)}
        >
          Close <HiXMark className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Popup;
