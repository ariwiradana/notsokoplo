import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("fileDownloaded")) {
      const link = document.createElement("a");
      link.href = "/pdf/profile.pdf";
      link.download = "NOT SO KOPLO PROFILE.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      localStorage.setItem("fileDownloaded", "true");
      router.push("/");
    }
  }, [router]);

  return <></>;
};

export default ProfilePage;
