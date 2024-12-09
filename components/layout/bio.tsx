// import { Image as ImageType } from "@/types/image";
import Image from "next/image";
import React from "react";

// interface PageProps {
//   data: ImageType[];
// }

const BioComponent = () => {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center relative">
      <div className="fixed inset-0">
        <Image src="/hero.png" fill className="object-cover" alt="bio-bg" />
      </div>
    </div>
  );
};

export default BioComponent;
