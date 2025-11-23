import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CurrentUser } from "@/types/user";

interface AuthState {
  accessToken: string | null;
  currentUser: CurrentUser | null;
  setAccessToken: (token: string) => void;
  setCurrentUser: (user: CurrentUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      currentUser: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setCurrentUser: (user) => set({ currentUser: user }),
      clearAuth: () => set({ accessToken: null, currentUser: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
