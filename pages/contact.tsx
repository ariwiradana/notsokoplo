import Seo from "@/components/layout/seo";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

const ContactPage = () => {
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
        url="https://notsokoplo.com/contact"
        title="Contact | No So Koplo Official Website"
        description="Learn more about Not So Koplo's contact."
        image="https://res.cloudinary.com/dta5qasmt/image/upload/v1733891027/image_home_xmgpr1.jpg"
        keywords="notsokoplo, not so koplo, contact"
      />
    </>
  );
};

export default ContactPage;
