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
import { Release } from "@/types/release";

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

  const { data: release } = useSWR("/api/release", fetcher);

  const releaseData: Release | null = release?.length > 0 ? release[0] : null;

  useDisableInspect();

  return (
    <>
      <Seo
        url="https://notsokoplo.com/"
        title="Not So Koplo | Musik Serius Buat Joget Gak Serius"
        description="Not So Koplo adalah duo DJ asal Bali yang siap bikin lo joget lewat remix gokil dan penampilan live penuh energi. Cek jadwal acara, dengerin musik kami, dan lihat momen seru dari gigs sebelumnya. Siap party bareng kami? Yuk follow dan booking sekarang!"
        image="https://www.dropbox.com/scl/fi/u82pe9o6qvtb814230p5m/image_seo_gvzx3b.webp?rlkey=rucjwg266qcspkaxp9k31iav6&raw=1"
        keywords="Not So Koplo, DJ Bali, duo DJ Indonesia, remix DJ Bali, DJ gigs Bali, jadwal acara DJ, DJ for event in Bali, live DJ performance, DJ party, DJ untuk acara, DJ elektronik Indonesia, music remix, Bali DJ live, hire DJ Bali, musik remix Indonesia, electronic gigs Bali, remix artist, Bali event DJ, DJ lokal Bali, DJ event highlights, DJ photo gallery, remix show, DJ crowd Bali, panggung DJ, DJ terkenal Indonesia, DJ EDM Bali, DJ for weddings Bali, DJ party Bali, live gigs Bali"
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
          <HeroComponent
            artist={releaseData?.artist as string}
            caption={releaseData?.caption as string}
            cover={releaseData?.cover as string}
            title={releaseData?.title as string}
            url={releaseData?.url as string}
            video={releaseData?.video as string}
            poster={releaseData?.poster as string}
          />
          <TabNav />
          <EventComponent images={images} data={events} />
          <BioComponent data={images} />
          <GalleryComponent videos={videos} />
          <MusicComponent data={music} />
          <Footer />
        </section>
      )}
    </>
  );
};

export default HomePage;
