import { create } from "zustand";

interface FloatingCardState {
  isCreating: boolean;
  progress: number;
  title: string;
  setIsCreating: (value: boolean) => void;
  setProgress: (value: number) => void;
  setTitle: (value: string) => void;
}

export const floatingCardStore = create<FloatingCardState>((set) => ({
  isCreating: false,
  progress: 0,
  title: "",
  setIsCreating: (value) => set({ isCreating: value }),
  setProgress: (value) =>
    set({ progress: typeof value === "number" ? value : 0 }),
  setTitle: (value) => set({ title: value }),
}));
