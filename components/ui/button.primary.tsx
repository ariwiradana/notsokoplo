import { montserrat } from "@/constants/fonts";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: JSX.Element;
}
const ButtonPrimary = ({ title, icon, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      aria-label={`Button ${title}`}
      className={`px-5 py-2 rounded-full border-2 border-primary text-white bg-primary flex items-center gap-x-3 hover:bg-primary hover:border-primary transition-all ease-in-out duration-500 font-medium ${montserrat.className}`}
    >
      {icon}
      <span className="whitespace-nowrap">{title}</span>
    </button>
  );
};

export default ButtonPrimary;
