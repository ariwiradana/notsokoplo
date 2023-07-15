import React from "react";

const Container = ({ children, className, style }) => {
  return (
    <div style={style} className={`max-w-screen-xl mx-auto ${className || ""}`}>
      {children}
    </div>
  );
};

export default Container;
