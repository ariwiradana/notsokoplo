import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const disableShortcuts = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.keyCode === 123) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
      }
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("keydown", disableShortcuts);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  return <Component {...pageProps} />;
}
