import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroComponent from "@/components/layout/hero";
import fetcher from "@/lib/axios";
import useSWR from "swr";
import MusicComponent from "@/components/layout/music";
import NavbarToggle from "@/components/layout/navbar.toggle";
import EventComponent from "@/components/layout/events";
import Seo from "@/components/layout/seo";
import useDisableInspect from "@/hooks/useDisableInspect";
import Loading from "@/components/ui/loading";
import MusicPlayer from "@/components/layout/music.player";
import GalleryComponent from "@/components/layout/gallery";
import useAppStore from "@/store/useAppStore";
import TabNav from "@/components/layout/tab";
import WAChat from "@/components/ui/wa.chat";

const HomePage = () => {
  const store = useAppStore();

  const { isLoading: isLoadingEvents } = useSWR("/api/events", fetcher, {
    onSuccess(data) {
      if (data.length > 0) {
        store.setEvents(data);
      }
    },
  });

  const { isLoading: isLoadingMusic } = useSWR("/api/music", fetcher, {
    onSuccess(data) {
      if (data.length > 0) {
        store.setMusic(data);
      }
    },
  });

  const { isLoading: isLoadingImages } = useSWR("/api/images", fetcher, {
    onSuccess(data) {
      if (data.length > 0) {
        store.setImages(data);
      }
    },
  });

  const { isLoading: isLoadingVideos } = useSWR("/api/videos", fetcher, {
    onSuccess(data) {
      if (data.length > 0) {
        store.setVideos(data);
      }
    },
  });

  useSWR("/api/release", fetcher, {
    onSuccess(data) {
      if (data.length > 0) {
        store.setRelease(data[0]);
      }
    },
  });
  useSWR("/api/clients", fetcher, {
    onSuccess(data) {
      if (data.length > 0) {
        store.setClients(data);
      }
    },
  });

  useDisableInspect();

  return (
    <>
      <Seo
        url="https://notsokoplo.com/"
        title="Not So Koplo | Koplo Prov Bali"
        description="Not So Koplo sobat panggung dari Denpasar, Bali yang siap bikin lo joget lewat remix gokil dan penampilan live penuh energi. Cek jadwal acara, dengerin musik kami, dan lihat momen seru dari gigs sebelumnya. Siap party bareng kami? Yuk follow dan booking sekarang!"
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
          <WAChat />
          <NavbarToggle />
          <Navbar />
          <MusicPlayer />
          <HeroComponent />
          <TabNav />
          <EventComponent />
          <MusicComponent />
          <GalleryComponent />
          {/* <ClientsComponent /> */}
          <Footer />
        </section>
      )}
    </>
  );
};

export default HomePage;
