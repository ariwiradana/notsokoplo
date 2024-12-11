import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
// import Navbar from "@/components/layout/navbar";
// import Footer from "@/components/layout/footer";
// import HeroComponent from "@/components/layout/hero";
import Loading from "@/components/ui/loading";
import fetcher from "@/lib/axios";
import useSWR from "swr";
// import BioComponent from "@/components/layout/bio";
// import MusicComponent from "@/components/layout/music";
// import NavbarToggle from "@/components/layout/navbar.toggle";
// import EventComponent from "@/components/layout/events";
import Seo from "@/components/layout/seo";
import useDisableInspect from "@/hooks/useDisableInspect";
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

  console.log(events, music, images);

  if (isLoadingEvents || isLoadingMusic || isLoadingImages) return <Loading />;

  return (
    <>
      <Seo
        url="https://notsokoplo.com/home"
        title="Home | No So Koplo Official Website"
        description="Learn more about Not So Koplo's home."
        image="https://res.cloudinary.com/dta5qasmt/image/upload/v1733887530/image_seo_gvzx3b.jpg"
        keywords="notsokoplo, not so koplo, home"
      />
    </>
  );
};

export default HomePage;
