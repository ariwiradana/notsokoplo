import { Client } from "@/types/clients";
import { Event } from "@/types/event";
import { Image } from "@/types/image";
import { MusicGrouped } from "@/types/music";
import { Release } from "@/types/release";
import { Video } from "@/types/video";
import { create } from "zustand";

interface Store {
  clients: Client[];
  release: Release[];
  events: Event[];
  images: Image[];
  music: MusicGrouped;
  videos: Video[];
  setClients: (clients: Client[]) => void;
  setRelease: (release: Release[]) => void;
  setEvents: (events: Event[]) => void;
  setImages: (images: Image[]) => void;
  setMusic: (music: MusicGrouped) => void;
  setVideos: (videos: Video[]) => void;
}

const useAppStore = create<Store>((set) => ({
  clients: [],
  release: [],
  events: [],
  images: [],
  music: [],
  videos: [],
  setClients: (clients: Client[]) => set(() => ({ clients })),
  setRelease: (release: Release[]) => set(() => ({ release })),
  setEvents: (events: Event[]) => set(() => ({ events })),
  setImages: (images: Image[]) => set(() => ({ images })),
  setMusic: (music: MusicGrouped) => set(() => ({ music })),
  setVideos: (videos: Video[]) => set(() => ({ videos })),
}));

export default useAppStore;
