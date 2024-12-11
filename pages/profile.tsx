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
        description="Learn more about Not So Koplo's profile."
        image="https://res.cloudinary.com/dta5qasmt/image/upload/v1733890373/image_profile_wz9y4s.jpg"
        keywords="notsokoplo, not so koplo, profile"
      />
    </>
  );
};

export default ProfilePage;
