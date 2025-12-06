import api from "@/lib/api";
import { Chat } from "@/types/chat";
import { isAxiosError } from "axios";

export const chatService = {
  getChats: async (token: string) => {
    try {
      const { data } = await api.get("/chats", {
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

  getHistoryMessages: async (chatId: string, token: string) => {
    try {
      const { data } = await api.get(`/chats/${chatId}/messages`, {
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

  markMessagesAsRead: async (chatId: string, token: string) => {
    try {
      const { data } = await api.put(`/chats/${chatId}/read`, {
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
