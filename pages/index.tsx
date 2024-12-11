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

  if (isLoadingEvents || isLoadingMusic || isLoadingImages) return <Loading />;

  return (
    <>
      <Seo
        title="No So Koplo Official Website"
        description=" Not So Koplo is an energetic music group hailing from Denpasar,
              Bali, formed on February 26, 2020. Known for their creative blend
              of genres, they center their sound around Koplo—a popular
              Indonesian dangdut subgenre—while adding a unique twist to every
              remix they produce. The duo is made up of long-time friends Dwiki
              Krisnanda (MC/Crowd Control) and Ari Wiradana (DJ & Producer), who
              first met during their college years."
        image="https://res.cloudinary.com/dta5qasmt/image/upload/v1733887530/image_seo_gvzx3b.jpg"
        keywords="notsokoplo, not so koplo, biography, music, bali, remix, denpasar, events, notsokoplo, koplo bali, dj, feel koplo, bagus wirata"
      />
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
    </>
  );
};

export default HomePage;
