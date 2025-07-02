import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: JSX.Element;
}
const Button = ({ title, icon, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      aria-label={`Button ${title}`}
      className="px-5 py-2 rounded-full border-2 text-white text-sm md:text-base border-white flex items-center gap-x-3 hover:bg-primary hover:border-primary transition-all ease-in-out duration-500 font-medium"
    >
      {icon}
      <span className="whitespace-nowrap">{title}</span>
    </button>
  );
};

export default Button;
