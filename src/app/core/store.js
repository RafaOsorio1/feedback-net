import { create } from 'zustand';

export const useStore = create((set) => ({
  initialView: 'form',
  setInitialView: (view) => set({ initialView: view }),
  notificationModal: {
    isOpen: false,
    data: null,
  },
  openNotificationModal: (data) =>
    set({
      notificationModal: {
        isOpen: true,
        data,
      },
    }),
  closeNotificationModal: () =>
    set({
      notificationModal: {
        isOpen: false,
        data: null,
      },
    }),
}));
