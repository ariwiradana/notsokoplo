import React, { forwardRef, useRef } from "react";

const InputFile = ({ full, id, label, multiple, ...props }, ref) => {
  const inputRef = useRef(null);

  return (
    <div>
      <label
        className="text-xs font-montserrat uppercase text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <button
        onClick={() => (ref ? ref.current.click() : inputRef.current.click())}
        id={id}
        className={`text-gray-800 mt-1 h-10 focus:border-gray-300 text-start outline-none border font-medium border-gray-300 px-3 py-2 rounded-lg text-sm font-raleway ${
          full ? "w-full" : "w-auto"
        }`}
      >
        Filee
      </button>
      <input
        ref={ref || inputRef}
        {...props}
        multiple={multiple || false}
        type="file"
        id={`${id}-original`}
        className={`text-gray-800 mt-1 focus:border-gray-400 outline-none border font-medium border-gray-300 px-3 py-2 rounded-lg text-sm font-raleway ${
          full ? "w-full" : "w-auto"
        }`}
      />
    </div>
  );
};

export default forwardRef(InputFile);
