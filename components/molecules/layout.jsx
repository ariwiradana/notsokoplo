import React from "react";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen flex justify-center text-6xl font-bold text-black font-raleway">ZONKKK!!!</div>
    </>
  );
};

export default Layout;
