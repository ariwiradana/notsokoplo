import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import Navbar from "@/components/layout/navbar";
import Shows from "@/components/layout/shows";
import Footer from "@/components/layout/footer";
import Hero from "@/components/layout/hero";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="relative bg-gradient-to-b from-dark/95 to-dark backdrop-blur-sm">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap lg:justify-between lg:gap-24 py-16 lg:py-32 relative z-10 px-6">
            <h2 className="uppercase font-bold text-4xl lg:text-5xl lg:whitespace-nowrap text-white">
              Upcoming Shows
            </h2>
            <p className="text-white text-lg lg:text-right mt-2 lg:mt-0">
              Exciting performances ahead! Stay tuned for details on our
              upcoming shows!
            </p>
          </div>
          <Shows />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
