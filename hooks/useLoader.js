import React, { useEffect, useState } from "react";

const useLoader = () => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(false);
    }, 1 * 1000);
    return () => clearInterval(interval);
  }, []);
  return { load };
};

export default useLoader;
