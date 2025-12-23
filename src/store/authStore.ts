import { create } from "zustand";

type AuthState = {
  digits: number[];
  addDigit: (d: number) => void;
  reset: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  digits: [],
  addDigit: (d) =>
    set((s) => ({
      digits: [...s.digits, d].slice(0, 10),
    })),
  reset: () => set({ digits: [] }),
}));
