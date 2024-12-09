import { create } from "zustand";

interface StoreState {
  openSidebar: boolean;
  activeId: string;
  scrollPosition: number;
  handleToggleSidebar: () => void;
  handleActiveId: (id: string) => void;
  handleScrollPosition: (position: number) => void;
}

const useSidebar = create<StoreState>((set) => ({
  openSidebar: false,
  activeId: "",
  scrollPosition: 0,
  handleToggleSidebar: () =>
    set((state) => ({ openSidebar: !state.openSidebar })),
  handleActiveId: (id) => set(() => ({ activeId: id })),
  handleScrollPosition: (position) => set(() => ({ scrollPosition: position })),
}));

export default useSidebar;
