import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  name: string;
  xp: number;
  setName: (name: string) => void;
  addXp: (amount: number) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "Guest",
      xp: 0,
      setName: (name: string) => set({ name: name.trim() || "Guest" }),
      addXp: (amount: number) =>
        set((state) => ({ xp: Math.max(0, state.xp + Math.floor(amount)) })),
    }),
    { name: "cwai-user" }
  )
);
