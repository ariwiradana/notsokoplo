import Link from "next/link";
import React from "react";
import { SocialItems } from "./SocialItems";

const Social = () => {
  return (
    <div className="flex w-full items-center justify-center p-4 md:p-6">
      {SocialItems.map((item, i) => {
        return (
          <Link href={item.url} key={i}>
            <a target="_blank">{item.icon}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
