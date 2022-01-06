import React from "react";
import { Banner, Navbar, Social } from "../components";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Banner />
      <Social />
    </div>
  );
}
