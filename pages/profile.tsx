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

  return <></>;
};

export default ProfilePage;
