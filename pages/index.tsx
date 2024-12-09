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
import NavbarToggle from "@/components/layout/navbar.toggle";
import EventComponent from "@/components/layout/events";
import Contact from "@/components/layout/contact";

const Home = () => {
  const { data: events, isLoading: isLoadingEvents } = useSWR(
    "/api/events",
    fetcher
  );
  const { data: music, isLoading: isLoadingMusic } = useSWR(
    "/api/music",
    fetcher
  );

  const { data: images, isLoading: isLoadingImages } = useSWR(
    "/api/images",
    fetcher
  );

  if (isLoadingEvents || isLoadingMusic || isLoadingImages) return <Loading />;

  return (
    <section className="bg-dark">
      <NavbarToggle />
      <Navbar />
      <HeroComponent />
      <MusicComponent data={music} />
      <BioComponent data={images} />
      <EventComponent data={events} />
      <Contact />
      <Footer />
    </section>
  );
};

export default Home;
