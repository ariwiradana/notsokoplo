import { Social } from "@/types/social";
import {
  FaApple,
  FaDeezer,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiSpotify, SiYoutubemusic } from "react-icons/si";

export const Socials: Social[] = [
  {
    title: "Instagram",
    link: "https://www.instagram.com/notsokoplo__",
    icon: <FaInstagram />,
    color: "#E4405F", // Instagram
  },
  {
    title: "TikTok",
    link: "https://www.tiktok.com/@notsokoplo",
    icon: <FaTiktok />,
    color: "#010101", // TikTok
  },
  {
    title: "Twitter",
    link: "https://twitter.com/notsokoplo",
    icon: <FaTwitter />,
    color: "#1DA1F2", // Twitter
  },
  {
    title: "SoundCloud",
    link: "https://soundcloud.com/notsokoplo",
    icon: <FaSoundcloud />,
    color: "#FF5500", // SoundCloud
  },
  {
    title: "YouTube",
    link: "https://www.youtube.com/c/NotSoKoplo",
    icon: <FaYoutube />,
    color: "#FF0000", // YouTube
  },
  {
    title: "Apple Music",
    link: "https://music.apple.com/id/artist/not-so-koplo/1807480950",
    icon: <FaApple />,
    color: "#FA243C", // Apple Music
  },
  {
    title: "Spotify",
    link: "https://open.spotify.com/artist/5FcBJft0S96jU0lyHGMEsA?si=A3cPSOuCSk6eGBYu50Xlfg",
    icon: <FaSpotify />,
    color: "#1717", // Spotify
  },
];

