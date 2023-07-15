import React from "react";
import Layout from "../molecules/layout";
import Seo from "./seo";
import Loading from "../elements/loading";
import FullscreenThumbnail from "../molecules/fullscreen.thumbnail";
import useSlideshow from "@/hooks/useSlideshow";
import Gigs from "../molecules/gigs";

const HomePage = () => {
  const { data, isLoading } = useSlideshow();

  return (
    <>
      <Seo title="Notsokoplo" />
      <Loading isLoading={isLoading} />
      <Layout>
        {data && <FullscreenThumbnail data={data} />}
        <div className="min-h-screen bg-white relative z-10 mt-[100vh]">
          <Gigs />
        </div>
        {/* <Player /> */}
      </Layout>
    </>
  );
};

export default HomePage;
