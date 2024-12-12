import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { createId } from "@paralleldrive/cuid2";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

type CartState = {
  cartId: string | undefined;
  isCartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
}

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    return getCookie(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { expires: 7 }); // 7 days expiry
  },
  removeItem: (name: string) => {
    removeCookie(name);
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: createId(),
      isCartOpen: false,
      onCartOpen: () => set({ isCartOpen: true }),
      onCartClose: () => set({ isCartOpen: false })
    }),
    {
      name: 'cart-id', // cookie name
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({ cartId: state.cartId }) // Only persist cartId
    }
  )
);