import React from "react";
import Head from "next/head";
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
import { Socials } from "@/constants/social";

const HomePage = () => {
  const store = useAppStore();

  // Fetching data (optimized with SWR deduping)
  const { isLoading: isLoadingEvents } = useSWR("/api/events", fetcher, {
    onSuccess: (data) => data?.length && store.setEvents(data),
    revalidateOnFocus: false,
  });

  const { isLoading: isLoadingMusic } = useSWR("/api/music", fetcher, {
    onSuccess: (data) => data && store.setMusic(data),
    revalidateOnFocus: false,
  });

  const { isLoading: isLoadingImages } = useSWR("/api/images", fetcher, {
    onSuccess: (data) => data?.length && store.setImages(data),
    revalidateOnFocus: false,
  });

  const { isLoading: isLoadingVideos } = useSWR("/api/videos", fetcher, {
    onSuccess: (data) => data?.length && store.setVideos(data),
    revalidateOnFocus: false,
  });

  useSWR("/api/release", fetcher, {
    onSuccess: (data) => data?.length && store.setRelease(data),
    revalidateOnFocus: false,
  });

  useSWR("/api/clients", fetcher, {
    onSuccess: (data) => data?.length && store.setClients(data),
    revalidateOnFocus: false,
  });

  useDisableInspect();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Not So Koplo",
    url: "https://notsokoplo.com",
    image:
      "https://www.dropbox.com/scl/fi/u82pe9o6qvtb814230p5m/image_seo_gvzx3b.webp?rlkey=rucjwg266qcspkaxp9k31iav6&raw=1",
    description:
      "Not So Koplo is a DJ duo from Denpasar, Bali bringing energetic live remix performances and party vibes across the island.",
    genre: "Electronic / Remix / Koplo",
    member: [
      { "@type": "Person", name: "Ari Wiradana" },
      { "@type": "Person", name: "Dwiki Krisnanda" },
    ],
    sameAs: Socials.map((social) => social.link),
  };

  return (
    <>
      <Seo
        url="https://notsokoplo.com/"
        title="Not So Koplo | Koplo Prov Bali"
        description="Not So Koplo sobat panggung dari Denpasar, Bali yang siap bikin lo joget lewat remix gokil dan penampilan live penuh energi. Cek jadwal acara, dengerin musik kami, dan lihat momen seru dari gigs sebelumnya. Siap party bareng kami? Yuk follow dan booking sekarang!"
        image="https://www.dropbox.com/scl/fi/u82pe9o6qvtb814230p5m/image_seo_gvzx3b.webp?rlkey=rucjwg266qcspkaxp9k31iav6&raw=1"
        keywords="Not So Koplo, DJ Bali, duo DJ Indonesia, remix DJ Bali, DJ gigs Bali, jadwal acara DJ, DJ for event in Bali, live DJ performance, DJ party, DJ untuk acara, DJ elektronik Indonesia, music remix, Bali DJ live, hire DJ Bali, musik remix Indonesia, electronic gigs Bali, remix artist, Bali event DJ, DJ lokal Bali, DJ event highlights, DJ photo gallery, remix show, DJ crowd Bali, panggung DJ, DJ terkenal Indonesia, DJ EDM Bali, DJ for weddings Bali, DJ party Bali, live gigs Bali"
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {isLoadingEvents ||
      isLoadingImages ||
      isLoadingMusic ||
      isLoadingVideos ? (
        <Loading aria-label="Loading website content..." />
      ) : (
        <main
          className="bg-dark relative"
          aria-label="Not So Koplo homepage main content"
        >
          <WAChat aria-label="Chat on WhatsApp" />
          <NavbarToggle aria-label="Open navigation menu" />
          <Navbar aria-label="Main site navigation" />
          <MusicPlayer aria-label="Music player section" />
          <HeroComponent aria-label="Hero banner section" />
          <TabNav aria-label="Tab navigation for content" />
          <EventComponent aria-label="Upcoming events and gigs" />
          <MusicComponent aria-label="Music releases and remixes" />
          <GalleryComponent aria-label="Photo and video gallery" />
          <Footer aria-label="Footer with links and social media" />
        </main>
      )}
    </>
  );
};

export default HomePage;
