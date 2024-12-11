import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroComponent from "@/components/layout/hero";
import fetcher from "@/lib/axios";
import useSWR from "swr";
import BioComponent from "@/components/layout/bio";
import MusicComponent from "@/components/layout/music";
import NavbarToggle from "@/components/layout/navbar.toggle";
import EventComponent from "@/components/layout/events";
import Seo from "@/components/layout/seo";
import useDisableInspect from "@/hooks/useDisableInspect";
import Loading from "@/components/ui/loading";
// import Contact from "@/components/layout/contact";

const HomePage = () => {
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

  useDisableInspect();

  return (
    <>
      <Seo
        url="https://notsokoplo.com/"
        title="Home | No So Koplo Official Website"
        description="Learn more about Not So Koplo's home."
        image="https://res.cloudinary.com/dta5qasmt/image/upload/v1733891027/image_home_xmgpr1.jpg"
        keywords="notsokoplo, not so koplo, home"
      />
      {isLoadingEvents || isLoadingImages || isLoadingMusic ? (
        <Loading />
      ) : (
        <section className="bg-dark">
          <NavbarToggle />
          <Navbar />
          <HeroComponent />
          <EventComponent images={images} data={events} />
          <BioComponent data={images} />
          <MusicComponent data={music} />
          {/* <Contact /> */}
          <Footer />
        </section>
      )}
    </>
  );
};

export default HomePage;
