import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const useNavbar = () => {
  const { pathname } = useRouter();
  const [position, setPosition] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setPosition(scrollPosition);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showSidebar]);

  return { position, showSidebar, setShowSidebar, pathname };
};

export default useNavbar;
