import { create } from 'zustand';

export const useStore = create((set) => ({
  initialView: 'form',
  setInitialView: (view) => set({ initialView: view }),
}));
