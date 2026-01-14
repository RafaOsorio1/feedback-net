import { create } from 'zustand';

interface NotificationData {
  title?: string;
  message?: string;
  referenceNumber?: string;
}

interface StoreState {
  initialView: 'form' | 'tracker';
  setInitialView: (view: 'form' | 'tracker') => void;
  notificationModal: {
    isOpen: boolean;
    data: NotificationData | null;
  };
  openNotificationModal: (data: NotificationData) => void;
  closeNotificationModal: () => void;
}

export const useStore = create<StoreState>((set) => ({
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
