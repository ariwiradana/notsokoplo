import Image from "next/image";
import React, { useEffect, useState } from "react";

import img1 from "../../assets/img/youtube.png";
import img2 from "../../assets/img/tezos-3-88RFifBno-unsplash.jpg";
import img3 from "../../assets/img/modesta-zemgulyte-wMkqe4JCaAw-unsplash.jpg";

const Banner = () => {
  return (
    <div className="bg-gray-700 w-full bg-cover overflow-hidden relative banner">
      <div className="block">
        <Image src={img3} layout="fill" objectFit="cover" />
      </div>
      {/* <Image src={img2} layout="fill" objectFit="cover" /> */}
      {/* <Image src={img3} layout="fill" objectFit="cover" /> */}
    </div>
  );
};

export default Banner;
