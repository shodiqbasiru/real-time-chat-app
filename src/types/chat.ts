export type ChatType = "direct" | "group" | "channel";

export interface Chat {
  chatId: string;
  chatUsername: string;
  type: ChatType;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}
