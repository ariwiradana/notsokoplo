import { montserrat } from "@/constants/fonts";
import useAppStore from "@/store/useAppStore";
import { NextPage } from "next";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const ClientsComponent: NextPage = ({}) => {
  const store = useAppStore();
  return (
    <div className={`pt-12 bg-dark ${montserrat.className}`}>
      <h2
        className={`text-lg md:text-xl lg:text-2xl text-white font-medium whitespace-nowrap text-center`}
      >
        Kami{" "}
        <span className="italic font-italianno tracking-wide text-[20px] md:text-[24px] lg:text-[28px]">
          Telah Dipercaya
        </span>{" "}
        oleh<span className="text-primary">.</span>
      </h2>
      <div className="bg-white mt-4 lg:mt-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-0 relative py-4 lg:py-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            <Marquee className="overflow-hidden">
              {store.clients.map((client) => (
                <div className="px-4 lg:px-6" key={`Client ${client.name}`}>
                  <div className="relative">
                    <Image
                      sizes="720px"
                      src={client.image || ""}
                      alt={client.name}
                      width={720}
                      height={720}
                      className="object-contain object-center h-12 lg:h-16 w-auto"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsComponent;
