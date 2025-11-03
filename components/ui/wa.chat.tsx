import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiX } from "react-icons/hi";

const WAChat: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [isShown, setIsShown] = useState<boolean>(false);
  const [rows, setRows] = useState(1);

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
      setIsShown(currentScrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    const newLines = value.split("\n").length;
    setRows(newLines);
  };

  return (
    <div
      role="complementary"
      aria-label="WhatsApp chat widget"
      className={`fixed bottom-4 right-4 z-50 w-0 flex flex-col items-end gap-y-6 lg:gap-y-8 ${
        isShown
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 translate-y-4 invisible"
      } transition-all ease-in-out duration-300`}
    >
      {/* Chat Box */}
      <aside
        aria-live="polite"
        aria-label="Chat window"
        className={`bg-white min-w-72 lg:min-w-96 rounded-2xl overflow-hidden shadow ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-4 invisible"
        } transition-all ease-in-out duration-300`}
      >
        {/* Header */}
        <header className="flex justify-between gap-x-8 p-4 border-b border-b-dark/10 items-start">
          <div className="flex items-center gap-x-4">
            <figure
              className="relative"
              aria-label="Not So Koplo profile picture"
            >
              <Image
                sizes="100px"
                src="/wa.jpg"
                alt="Not So Koplo WhatsApp profile picture"
                width={50}
                height={50}
                loading="lazy"
                className="rounded-full overflow-hidden aspect-square"
              />
              <span
                aria-label="Online status"
                className="w-2.5 h-2.5 absolute bottom-0.5 right-0.5 bg-green-500 rounded-full border border-white"
              />
            </figure>
            <div>
              <h5 className="font-semibold text-dark" aria-label="Account name">
                Not So Koplo
              </h5>
              <p className="text-sm text-dark/70" aria-label="Online status">
                Online
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label={isOpen ? "Close chat window" : "Open chat window"}
            className="text-lg text-dark/50"
            onClick={() => {
              setIsOpen((state) => !state);
              setText("");
            }}
          >
            <HiX aria-hidden="true" />
          </button>
        </header>

        {/* Chat Content */}
        <section className="p-4" aria-label="Chat messages">
          <div className="flex justify-center">
            <p className="text-xs text-dark/40" aria-label="Message timestamp">
              12:45
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-dark/5 inline-flex mt-4">
            <div className="text-dark">
              <p>Halo👋</p>
              <p className="mt-3">Ada yang bisa dibantu?</p>
            </div>
          </div>
        </section>

        {/* Chat Input */}
        <form
          onSubmit={handleSubmit}
          aria-label="Send message form"
          className="border-t border-t-dark/10 relative py-4"
        >
          <label htmlFor="wa-message" className="sr-only">
            Type your message
          </label>
          <textarea
            id="wa-message"
            rows={rows}
            value={text}
            onChange={handleChange}
            className="w-full h-full pl-6 pr-12 outline-none text-dark max-h-28 md:max-h-40 overflow-y-auto"
            placeholder="Enter your message"
            aria-label="Message input area"
          />
          <div className="absolute bottom-4 right-4">
            <button
              disabled={text.length === 0}
              type="submit"
              aria-label="Send message on WhatsApp"
              className="p-1.5 aspect-square rounded-full disabled:bg-green-500/60 bg-green-500 flex justify-center items-center"
            >
              <Image
                sizes="20px"
                src="/images/send-button.png"
                alt="Send message icon"
                width={16}
                height={16}
                loading="lazy"
                className="rounded-full overflow-hidden ml-0.5"
              />
            </button>
          </div>
        </form>
      </aside>

      {/* Floating Button */}
      <div className="relative">
        <span
          className="w-2.5 h-2.5 absolute top-1 right-1 bg-red-500 rounded-full"
          aria-hidden="true"
        />
        <button
          type="button"
          aria-label="Open WhatsApp chat"
          className="p-3 rounded-full aspect-square bg-green-500 shadow-lg focus:ring-2 focus:ring-green-300 transition"
          onClick={() => {
            setIsOpen((state) => !state);
            setText("");
          }}
        >
          <FaWhatsapp
            className="text-3xl lg:text-4xl text-white"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default WAChat;
