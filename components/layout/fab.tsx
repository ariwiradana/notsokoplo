import { montserrat } from "@/constants/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const Fab = () => {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsShown(true);
      } else {
        setIsShown(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const text = `Halo Not So Koplo!\nSaya (Nama kamu) dari EO/Instansi/Agency/Perusahaan (nama Brand). Kami tertarik untuk kerja sama dengan Not So Koplo. Bisa diinfokan rate card dengan detail sebagai berikut:\n\nNama Acara:\nScope Acara: Internal/Konser/Festival\nWaktu: (tanggal)\nLokasi:\n\nTerima Kasih!`;

  return (
    <div
      className={`fixed right-6 md:right-8 flex justify-center z-50 transition-all ease-in-out duration-500 ${
        isShown ? "bottom-6 md:bottom-8" : "-bottom-full"
      }`}
    >
      <div className={montserrat.className}>
        <Link
          href={`https://api.whatsapp.com/send?phone=6285792851799&text=${encodeURIComponent(
            text
          )}`}
          rel="noopener"
          target="_blank"
          className="rounded-full bg-primary text-sm font-medium text-white flex justify-center px-4 py-2 shadow items-center gap-x-2 hover:bg-opacity-90 transition-all ease-in-out duration-500"
        >
          <IoLogoWhatsapp className="text-lg" />
          <span>Need Help?</span>
        </Link>
      </div>
    </div>
  );
};

export default Fab;
