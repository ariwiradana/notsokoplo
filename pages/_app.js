import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
