import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CurrentUser } from "@/types/user";

interface AuthState {
  accessToken: string | null;
  currentUser: CurrentUser | null;
  currentUserId: string | "";
  setAccessToken: (token: string) => void;
  // setCurrentUser: (user: CurrentUser) => void;
  setCurrentUserId: (userId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      currentUser: null,
      currentUserId: "",
      setAccessToken: (token) => set({ accessToken: token }),
      // setCurrentUser: (user) => set({ currentUser: user }),
      setCurrentUserId: (userId: string) => set({ currentUserId: userId }),
      clearAuth: () => set({ accessToken: null, currentUser: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
