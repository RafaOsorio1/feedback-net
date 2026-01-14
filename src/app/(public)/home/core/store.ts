// src/app/(public)/home/core/store.ts
import { create } from 'zustand';
import { RequestDetail } from '../../../core/types';

interface RequestStoreState {
  isModalOpen: boolean;
  requestData: RequestDetail | null;
  openModal: (data: RequestDetail) => void;
  closeModal: () => void;
}

export const useRequestStore = create<RequestStoreState>((set) => ({
  isModalOpen: false,
  requestData: null,
  openModal: (data) => set({ isModalOpen: true, requestData: data }),
  closeModal: () => set({ isModalOpen: false, requestData: null }),
}));
