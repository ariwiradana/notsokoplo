import React, { forwardRef } from "react";

const InputText = ({ full, id, label, value, ...props }, ref) => {
  return (
    <div>
      <label
        className="text-xs font-montserrat uppercase text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        value={value}
        ref={ref}
        {...props}
        id={id}
        className={`text-gray-800 mt-1 focus:border-gray-400 outline-none border font-medium border-gray-300 px-3 py-2 rounded-lg text-sm font-raleway ${
          full ? "w-full" : "w-auto"
        }`}
      />
    </div>
  );
};

export default forwardRef(InputText);
