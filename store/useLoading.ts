import { create } from "zustand";

interface StoreState {
  isLoading: boolean;
  handleIsLoading: () => void;
}

const useLoading = create<StoreState>((set) => ({
  isLoading: false,
  handleIsLoading: () => set((state) => ({ isLoading: state.isLoading })),
}));

export default useLoading;