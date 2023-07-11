import React, { useEffect, useState } from "react";
import Layout from "../molecules/layout";
import Seo from "./seo";
import Loading from "../molecules/loading";
import FullscreenThumbnail from "../molecules/fullscreen.thumbnail";

const HomePage = () => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(false);
    }, 1 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Seo title="Notsokoplo" />
      <Loading isLoading={load} />
      <Layout>
        <FullscreenThumbnail />
      </Layout>
    </>
  );
};

export default HomePage;
