import Seo from "@/components/layout/seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("fileDownloaded")) {
      const link = document.createElement("a");
      link.href = "/pdf/NOT SO KOPLO PROFILE.pdf";
      link.download = "NOT SO KOPLO PROFILE.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      localStorage.setItem("fileDownloaded", "true");
      router.push("/");
    }
  }, [router]);

  return (
    <Seo
      url="https://notsokoplo.com"
      title="No So Koplo Official Website"
      description=" Not So Koplo is an energetic music group hailing from Denpasar,
              Bali, formed on February 26, 2020. Known for their creative blend
              of genres, they center their sound around Koplo—a popular
              Indonesian dangdut subgenre—while adding a unique twist to every
              remix they produce. The duo is made up of long-time friends Dwiki
              Krisnanda (MC/Crowd Control) and Ari Wiradana (DJ & Producer), who
              first met during their college years."
      image="https://res.cloudinary.com/dta5qasmt/image/upload/v1733887530/image_seo_gvzx3b.jpg"
      keywords="notsokoplo, not so koplo, koplo bali, dj, feel koplo, bagus wirata"
    />
  );
};

export default ProfilePage;
