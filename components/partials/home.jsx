import React from "react";
import Layout from "../molecules/layout";
import Seo from "./seo";
import Loading from "../molecules/loading";
import FullscreenThumbnail from "../molecules/fullscreen.thumbnail";
import useSlideshow from "@/hooks/useSlideshow";

const HomePage = () => {
  const { data, isLoading } = useSlideshow();

  return (
    <>
      <Seo title="Notsokoplo" />
      <Loading isLoading={isLoading} />
      <Layout>
        {data && <FullscreenThumbnail data={data} />}
        <div className="h-screen bg-white mt-[100vh] relative z-10 py-32">
          {/* <Gigs /> */}
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
