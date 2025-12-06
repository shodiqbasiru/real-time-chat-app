import { isAxiosError } from "axios";
import { Auth, AuthCredential } from "@/types/auth";
import api from "@/lib/api";

export const authService = {
  register: async (payload: Auth) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data?.message ?? "Request failed");
      }
      throw new Error("Unexpected error occurred");
    }
  },
  login: async (payload: AuthCredential) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data?.message ?? "Request failed");
      }
      throw new Error("Unexpected error occurred");
    }
  },
  getCurrentUser: async (token: string) => {
    try {
      const { data } = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data?.message ?? "Request failed");
      }
      throw new Error("Unexpected error occurred");
    }
  },
};
