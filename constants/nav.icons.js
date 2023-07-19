import {
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoYoutube,
  BiLogoTwitter,
  BiLogoSoundcloud,
} from "react-icons/bi";

export const NAVICONS = [
  {
    label:"Instagram",
    icon: <BiLogoInstagram className="text-white" size={18} />,
    icon_dark: <BiLogoInstagram className="text-gray-600" size={16} />,
    path: "https://www.instagram.com/notsokoplo__",
  },
  {
    label:"TikTok",
    icon: <BiLogoTiktok className="text-white" size={18} />,
    icon_dark: <BiLogoTiktok className="text-gray-600" size={16} />,
    path: "https://www.tiktok.com/@notsokoplo",
  },
  {
    label:"Youtube",
    icon: <BiLogoYoutube className="text-white" size={18} />,
    icon_dark: <BiLogoYoutube className="text-gray-600" size={16} />,
    path: "https://www.youtube.com/@NotSoKoplo",
  },
  {
    label:"Twitter",
    icon: <BiLogoTwitter className="text-white" size={18} />,
    icon_dark: <BiLogoTwitter className="text-gray-600" size={16} />,
    path: "https://twitter.com/notsokoplo",
  },
  {
    label:"Soundcloud",
    icon: <BiLogoSoundcloud className="text-white" size={18} />,
    icon_dark: <BiLogoSoundcloud className="text-gray-600" size={16} />,
    path: "https://soundcloud.com/notsokoplo",
  },
];
