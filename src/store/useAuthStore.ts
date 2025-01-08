import { create } from 'zustand';

interface state {
  isLoggedIn: boolean;
}

interface action {
  setIsLoggedIn: (isLoggedIn: state['isLoggedIn']) => void;
}
export const useAuthStore = create<state & action>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: isLoggedIn => set(() => ({ isLoggedIn })),
}));
