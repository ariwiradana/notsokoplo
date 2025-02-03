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

  useDisableInspect();

  return (
    <>
      <Seo
        url="https://notsokoplo.com/"
        title="No So Koplo | Official Website"
        description="Not So Koplo is a Bali-based DJ specializing in live music gigs, remixes, and electronic music performances. Check out our event schedule, music tracks, gallery of photos and videos from past gigs, and follow us on social media for updates on upcoming events and performances. Book Not So Koplo for your next event in Bali!"
        image="https://www.dropbox.com/scl/fi/u82pe9o6qvtb814230p5m/image_seo_gvzx3b.webp?rlkey=rucjwg266qcspkaxp9k31iav6&raw=1"
        keywords="DJ Not So Koplo, Not So Koplo music events, Not So Koplo gigs, DJ event schedule, DJ for hire Not So Koplo, Music remix DJ, Live DJ performances, DJ video gallery, DJ biography Not So Koplo, DJ gig gallery photos, Upcoming DJ events, Music event schedule, DJ Not So Koplo live schedule, DJ gig near me, Live DJ event booking, Event DJ schedule 2024, Electronic music gigs, DJ remix music, Not So Koplo remix tracks, DJ music downloads, Remix music artist, Best DJ remix tracks, DJ video performances, DJ photo gallery, Music event gallery, DJ event video highlights, Not So Koplo live event photos, Follow Not So Koplo on social media, DJ music updates, DJ event promotions, DJ behind the scenes videos, Connect with DJ Not So Koplo, Bali DJ gigs, DJ events in Bali, DJ based in Bali, Bali music events, Bali DJ remix, Live DJ performances Bali, DJ for hire Bali, Acara musik Not So Koplo, Gigs Not So Koplo, Jadwal acara DJ, DJ untuk acara Not So Koplo, Remix musik DJ, Penampilan DJ langsung, Galeri video DJ, Biografi DJ Not So Koplo, Galeri foto gig DJ, Acara DJ mendatang, Jadwal acara musik, Jadwal tampil DJ Not So Koplo, Gig DJ di dekat saya, Pemesanan acara DJ langsung, Jadwal DJ acara 2024, Gigs musik elektronik, Remix musik DJ, Lagu remix Not So Koplo, Unduhan musik DJ, Artis remix musik, Lagu remix DJ terbaik, Penampilan video DJ, Galeri foto DJ, Galeri acara musik, Sorotan video acara DJ, Foto acara langsung Not So Koplo, Ikuti Not So Koplo di media sosial, Pembaruan musik DJ, Promosi acara DJ, Video di balik layar DJ, Terhubung dengan DJ Not So Koplo, Gig DJ di Bali, Acara DJ di Bali, DJ berbasis di Bali, Acara musik di Bali, Remix DJ Bali, Penampilan DJ langsung di Bali, DJ untuk acara di Bali"
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
          <GalleryComponent videos={videos} />
          <MusicComponent data={music} />
          {/* <VideoComponent data={videos} /> */}
          <Footer />
        </section>
      )}
    </>
  );
};

export default HomePage;
