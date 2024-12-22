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
import TabNav from "@/components/layout/tab";
import Fab from "@/components/ui/fab";
import MusicPlayer from "@/components/layout/music.player";
import GalleryComponent from "@/components/layout/gallery";

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

  const { data: videos, isLoading: isLoadingVideos } = useSWR(
    "/api/videos",
    fetcher
  );

  // useDisableInspect();

  return (
    <>
      <Seo
        url="https://notsokoplo.com/"
        title="No So Koplo | Official Website"
        description="Not So Koplo is a Bali-based DJ specializing in live music gigs, remixes, and electronic music performances. Check out our event schedule, music tracks, gallery of photos and videos from past gigs, and follow us on social media for updates on upcoming events and performances. Book Not So Koplo for your next event in Bali!"
        image="https://drive.google.com/uc?export=view&id=1ZnByq6GE4ng7845hqaVgt3NvXfcfZlMs"
        keywords="DJ Not So Koplo, Not So Koplo music events, Not So Koplo gigs, DJ event schedule, DJ for hire Not So Koplo, Music remix DJ, Live DJ performances, DJ video gallery, DJ biography Not So Koplo, DJ gig gallery photos, Upcoming DJ events, Music event schedule, DJ Not So Koplo live schedule, DJ gig near me, Live DJ event booking, Event DJ schedule 2024, Electronic music gigs, DJ remix music, Not So Koplo remix tracks, DJ music downloads, Remix music artist, Best DJ remix tracks, DJ video performances, DJ photo gallery, Music event gallery, DJ event video highlights, Not So Koplo live event photos, Follow Not So Koplo on social media, DJ music updates, DJ event promotions, DJ behind the scenes videos, Connect with DJ Not So Koplo, Bali DJ gigs, DJ events in Bali, DJ based in Bali, Bali music events, Bali DJ remix, Live DJ performances Bali, DJ for hire Bali"
      />
      {isLoadingEvents ||
      isLoadingImages ||
      isLoadingMusic ||
      isLoadingVideos ? (
        <Loading />
      ) : (
        <section className="bg-dark relative">
          <Fab />
          <NavbarToggle />
          <Navbar />
          <MusicPlayer />
          <HeroComponent />
          <TabNav />
          <EventComponent images={images} data={events} />
          <BioComponent data={images} />
          <MusicComponent data={music} />
          <GalleryComponent videos={videos} />
          {/* <VideoComponent data={videos} /> */}
          <Footer />
        </section>
      )}
    </>
  );
};

export default HomePage;
