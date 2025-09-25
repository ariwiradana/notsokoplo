import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiX } from "react-icons/hi";

const WAChat: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `https://api.whatsapp.com/send?phone=6285792851799&text=${encodeURIComponent(
        text
      )}`
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 300) {
        setIsShown(true);
      } else {
        setIsShown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-y-6 lg:gap-y-8 ${
        isShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transition-all ease-in-out duration-300`}
    >
      <div
        className={`bg-white min-w-72 lg:min-w-96 rounded-2xl overflow-hidden shadow ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } transition-all ease-in-out duration-300`}
      >
        <div className="flex justify-between gap-x-8 p-4 border-b border-b-dark/10 items-start">
          <div className="flex items-center gap-x-4">
            <div className="relative">
              <Image
                sizes="100px"
                src="/wa.jpg"
                alt="WhatsApp Profile Picture"
                width={50}
                height={50}
                className="rounded-full overflow-hidden aspect-square"
              />
              <div className="w-2.5 h-2.5 absolute bottom-0.5 right-0.5 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div>
              <h5 className="font-semibold text-dark">Not So Koplo</h5>
              <p className="text-sm text-dark/70">Online</p>
            </div>
          </div>
          <button
            className="text-lg text-dark/50"
            onClick={() => {
              setIsOpen((state) => !state);
              setText("");
            }}
          >
            <HiX />
          </button>
        </div>
        <div className="p-4">
          <div className="flex justify-center">
            <p className="text-xs text-dark/40">12:45</p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-dark/5 inline-flex mt-4">
            <div className="text-dark">
              <p>Hai👋</p>
              <p className="mt-3">Mau booking?</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border-t border-t-dark/10 relative py-4"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full pl-6 pr-12 outline-none text-dark"
            placeholder="Enter Your Message"
          />
          <div className="absolute bottom-4 right-4">
            <button
              type="submit"
              className="p-1.5 aspect-square rounded-full bg-green-500 flex justify-center items-center"
            >
              <Image
                sizes="20px"
                src="/images/send-button.png"
                alt="WhatsApp Send Button"
                width={16}
                height={16}
                className="rounded-full overflow-hidden ml-0.5"
              />
            </button>
          </div>
        </form>
      </div>
      <div className="relative">
        <div className="w-2.5 h-2.5 absolute top-1 right-1 bg-red-500 rounded-full"></div>
        <button
          className="p-3 rounded-full aspect-square bg-green-500"
          onClick={() => {
            setIsOpen((state) => !state);
            setText("");
          }}
        >
          <FaWhatsapp className="text-3xl lg:text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default WAChat;
