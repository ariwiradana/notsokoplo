import { Music } from "@/types/music";
import { create } from "zustand";

interface StoreState {
  isPlaying: boolean;
  isOpenPlayer: boolean;
  music: Music | null;
  duration: number;
  currentTime: number;
  handleIsPlaying: (isPlaying: boolean) => void;
  handleIsOpenPlayer: (isOpen: boolean) => void;
  handleAddMusic: (music: Music | null) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
}

const useMusicPlayer = create<StoreState>((set) => ({
  isPlaying: false,
  isOpenPlayer: false,
  music: null,
  duration: 0,
  currentTime: 0,
  handleIsOpenPlayer: (isOpen) =>
    set(() => ({
      isOpenPlayer: isOpen,
    })),
  handleIsPlaying: (isPlaying) =>
    set(() => ({
      isPlaying,
    })),
  handleAddMusic: (music) => set(() => ({ music })),
  setDuration: (duration) => set(() => ({ duration })),
  setCurrentTime: (currentTime) => set(() => ({ currentTime })),
}));

export default useMusicPlayer;
