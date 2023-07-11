import React, { useEffect, useState } from "react";
import Layout from "../molecules/layout";
import Seo from "./seo";
import Loading from "../molecules/loading";
import FullscreenThumbnail from "../molecules/fullscreen.thumbnail";
import useLoader from "@/hooks/useLoader";

const HomePage = () => {
  const { load } = useLoader();

  return (
    <>
      <Seo title="Notsokoplo" />
      <Loading isLoading={load} />
      <Layout>
        <FullscreenThumbnail />
        <div className="h-screen bg-white mt-[100vh] relative z-10"></div>
      </Layout>
    </>
  );
};

export default HomePage;
