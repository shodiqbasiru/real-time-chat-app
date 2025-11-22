import { Message } from "./message";

export type User = {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  isPinned?: boolean;
  unreadCount: number;
  messages?: Message[];
};
