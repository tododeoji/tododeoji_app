import { create } from 'zustand';

interface LoginStatus {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

export const useLoginStatus = create<LoginStatus>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => set(() => ({ isLoggedIn: status })),
}));
