import { create } from "zustand";
import { Message, Chat } from "@/types/websocket";

interface WebSocketState {
  // Connection state
  isConnected: boolean;
  ws: WebSocket | null;

  // Messages state
  messages: Message[];
  currentChatId: string | null;

  // Chat state
  newChat: Chat | null;
  chatUpdate: Chat | null;

  // Online users
  onlineUsers: Map<string, boolean>;

  // Typing indicators
  typingUsers: Map<string, boolean>;

  // Actions
  setIsConnected: (isConnected: boolean) => void;
  setWebSocket: (ws: WebSocket | null) => void;

  addMessage: (message: Message) => void;
  updateMessageStatus: (
    messageId: string,
    status: "sent" | "delivered" | "read"
  ) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;

  setCurrentChatId: (chatId: string | null) => void;

  setNewChat: (chat: Chat | null) => void;
  setChatUpdate: (chat: Chat | null) => void;
  clearNewChatNotification: () => void;

  updateOnlineUser: (userId: string, isOnline: boolean) => void;
  setOnlineUsers: (users: Map<string, boolean>) => void;

  setUserTyping: (userId: string, isTyping: boolean) => void;

  // Reset all state
  reset: () => void;
}

const initialState = {
  isConnected: false,
  ws: null,
  messages: [],
  currentChatId: null,
  newChat: null,
  chatUpdate: null,
  onlineUsers: new Map(),
  typingUsers: new Map(),
};

export const useWebSocketStore = create<WebSocketState>((set) => ({
  ...initialState,

  setIsConnected: (isConnected) => set({ isConnected }),

  setWebSocket: (ws) => set({ ws }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateMessageStatus: (messageId, status) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.messageId === messageId
          ? { ...msg, status, isRead: status === "read" }
          : msg
      ),
    })),

  setMessages: (messages) => set({ messages }),

  clearMessages: () => set({ messages: [], currentChatId: null }),

  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),

  setNewChat: (chat) => set({ newChat: chat }),

  setChatUpdate: (chat) => set({ chatUpdate: chat }),

  clearNewChatNotification: () => set({ newChat: null, chatUpdate: null }),

  updateOnlineUser: (userId, isOnline) =>
    set((state) => {
      const newOnlineUsers = new Map(state.onlineUsers);
      newOnlineUsers.set(userId, isOnline);
      return { onlineUsers: newOnlineUsers };
    }),

  setOnlineUsers: (users) => set({ onlineUsers: users }),

  setUserTyping: (userId, isTyping) =>
    set((state) => {
      const newTypingUsers = new Map(state.typingUsers);
      if (isTyping) {
        newTypingUsers.set(userId, true);
      } else {
        newTypingUsers.delete(userId);
      }
      return { typingUsers: newTypingUsers };
    }),

  reset: () => set(initialState),
}));
