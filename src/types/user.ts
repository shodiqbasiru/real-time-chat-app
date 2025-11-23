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

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};
