import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import moment from "moment";
import "moment/locale/id";
import { SWRConfig } from "swr";
moment.locale("id");
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
