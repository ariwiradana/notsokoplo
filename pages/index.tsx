import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroComponent from "@/components/layout/hero";
import Loading from "@/components/ui/loading";
import fetcher from "@/lib/axios";
import useSWR from "swr";
import BioComponent from "@/components/layout/bio";
import MusicComponent from "@/components/layout/music";
import ShowsComponent from "@/components/layout/shows";

const Home = () => {
  const { data: shows, isLoading: isLoadingShows } = useSWR(
    "/api/shows",
    fetcher
  );
  const { data: music, isLoading: isLoadingMusic } = useSWR(
    "/api/music",
    fetcher
  );

  // const { data: images, isLoading: isLoadingImages } = useSWR(
  //   "/api/images",
  //   fetcher
  // );

  if (isLoadingShows || isLoadingMusic) return <Loading />;

  return (
    <section className="bg-dark">
      <Navbar />
      <HeroComponent />
      <MusicComponent data={music} />
      <BioComponent />
      <ShowsComponent data={shows} />
      <Footer />
    </section>
  );
};

export default Home;
