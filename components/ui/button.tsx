import React from "react";

interface ButtonProps {
  title: string;
  icon?: JSX.Element;
}
const Button = ({ title, icon }: ButtonProps) => {
  return (
    <button className="px-5 py-2 rounded-full border-2 border-white flex items-center gap-x-3 hover:bg-white hover:text-dark transition-all ease-in-out duration-500 font-medium">
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default Button;
