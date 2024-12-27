import Seo from "@/components/layout/seo";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const hasDownloaded = useRef(false);

  useEffect(() => {
    if (!hasDownloaded.current) {
      const link = document.createElement("a");
      link.href = "/pdf/NOT SO KOPLO PROFILE.pdf";
      link.download = "NOT SO KOPLO PROFILE.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      hasDownloaded.current = true;
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Seo
        url="https://notsokoplo.com/profile"
        title="Profile | No So Koplo Official Website"
        description="Learn more about Not So Koplo, a Bali-based DJ known for electrifying live performances and unique remixes. Discover the background, experience, and musical journey of this talented DJ, and see how Not So Koplo became a standout in Bali's electronic music scene."
        image="https://www.dropbox.com/scl/fi/u82pe9o6qvtb814230p5m/image_seo_gvzx3b.webp?rlkey=rucjwg266qcspkaxp9k31iav6&raw=1"
        keywords="Not So Koplo DJ profile, DJ biography Bali, Bali DJ profile, About Not So Koplo, DJ background Bali, DJ experience Not So Koplo, DJ Not So Koplo bio, Bali electronic DJ, DJ music career Not So Koplo, DJ artist profile, Not So Koplo music journey, Bali DJ artist, DJ history Bali, Not So Koplo DJ gigs history, DJ Not So Koplo achievements, Not So Koplo remix artist"
      />
      <section className="bg-dark"></section>
    </>
  );
};

export default ProfilePage;
