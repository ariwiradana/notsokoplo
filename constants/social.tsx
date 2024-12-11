import { Social } from "@/types/social";
import {
  FaInstagram,
  FaSoundcloud,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const Socials: Social[] = [
  {
    title: "Instagram",
    link: "https://www.instagram.com/notsokoplo__",
    icon: <FaInstagram />,
  },
  {
    title: "TikTok",
    link: "https://www.tiktok.com/@notsokoplo",
    icon: <FaTiktok />,
  },
  {
    title: "Twitter",
    link: "https://x.com/notsokoplo",
    icon: <FaTwitter />,
  },
  {
    title: "SoundCloud",
    link: "https://soundcloud.com/notsokoplo",
    icon: <FaSoundcloud />,
  },
  {
    title: "Youtube",
    link: "https://www.youtube.com/c/NotSoKoplo",
    icon: <FaYoutube />,
  },
];
