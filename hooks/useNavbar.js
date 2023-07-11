import React, { useEffect, useState } from "react";

const useNavbar = () => {
  const [position, setPosition] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position
    setPosition(scrollPosition);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { position };
};

export default useNavbar;
