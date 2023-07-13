import React from "react";
import Layout from "../molecules/layout";
import Seo from "./seo";
import Loading from "../elements/loading";
import FullscreenThumbnail from "../molecules/fullscreen.thumbnail";
import useSlideshow from "@/hooks/useSlideshow";
import LinearProgressBar from "../elements/line.loading";
import Player from "../molecules/player";

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
          <LinearProgressBar progress={50} />
        </div>
        {/* <Player /> */}
      </Layout>
    </>
  );
};

export default HomePage;
