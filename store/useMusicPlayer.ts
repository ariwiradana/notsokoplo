import { Music } from "@/types/music";
import { create } from "zustand";

interface StoreState {
  isPlaying: boolean;
  isOpenPlayer: boolean;
  music: Music | null;
  handleIsPlaying: (isPlaying: boolean) => void;
  handleIsOpenPlayer: (isOpen: boolean) => void;
  handleAddMusic: (music: Music | null) => void;
}

const useMusicPlayer = create<StoreState>((set) => ({
  isPlaying: false,
  isOpenPlayer: false,
  music: null,
  handleIsOpenPlayer: (isOpen) =>
    set(() => ({
      isOpenPlayer: isOpen,
    })),
  handleIsPlaying: (isPlaying) =>
    set(() => ({
      isPlaying: isPlaying,
    })),
  handleAddMusic: (music) => set(() => ({ music })),
}));

export default useMusicPlayer;
