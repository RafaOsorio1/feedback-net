// src/app/(public)/home/core/store.js
import { create } from 'zustand';

export const useRequestStore = create((set) => ({
  isModalOpen: false,
  requestData: null,
  openModal: (data) => set({ isModalOpen: true, requestData: data }),
  closeModal: () => set({ isModalOpen: false, requestData: null }),
}));
