import {
  BsInstagram,
  BsYoutube,
  BsFacebook,
  BsTwitter,
  BsSpotify,
  BsApple,
} from "react-icons/bs";

const className =
  "w-6 md:w-7 h-6 md:h-7 px-4 md:px-6 lg:w-9 lg:h-9 box-content text-gray-400 cursor-pointer hover:text-gray-500 transition ease-in-out hover:scale-110";

export const SocialItems = [
  {
    icon: <BsYoutube className={className} />,
    url: "https://youtube.com/notsokoplo",
  },
  {
    icon: <BsSpotify className={className} />,
    url: "https://spotify.com/notsokoplo",
  },
  {
    icon: <BsApple className={className} />,
    url: "https://applemusic.com/notsokoplo",
  },
  {
    icon: <BsInstagram className={className} />,
    url: "https://instagram.com/notsokoplo_",
  },
  {
    icon: <BsFacebook className={className} />,
    url: "https://facebook.com/notsokoplo",
  },
  {
    icon: <BsTwitter className={className} />,
    url: "https://twitter.com/notsokoplo",
  },
];
