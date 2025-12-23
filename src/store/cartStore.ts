import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  img: string;
  qty: number;
};

type CartState = {
  items: Item[];
  add: (item: Item) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) =>
    set((s) => ({ items: [...s.items, item] })),
}));
