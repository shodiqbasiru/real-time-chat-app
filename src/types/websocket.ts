export interface Message {
  messageId: string;
  senderId: string;
  senderName: string;
  sender_avatar: string;
  content: string;
  status: "sent" | "delivered" | "read";
  isRead: boolean;
  createdAt: string;
  chat_id: string;
}

export type WebSocketMessageType =
  | "new_message"
  | "joined_room"
  | "connected"
  | "error"
  | "typing"
  | "new_chat"
  | "chat_update"
  | "message_delivered"
  | "message_read"
  | "user_status";

export interface IncomingMessage {
  type: WebSocketMessageType;
  messageId?: string;
  chatId?: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  content?: string;
  status?: string;
  createdAt?: string;
  userId?: string;
  error?: string;
  isTyping?: boolean;
  // New chat fields
  chatUsername?: string;
  chatAvatar?: string;
  chatType?: "direct" | "group" | "channel";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  // User status
  username?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface OutgoingMessage {
  type:
    | "join_room"
    | "leave_room"
    | "send_message"
    | "message_delivered"
    | "message_read"
    | "typing";
  userId?: string;
  chatId?: string;
  content?: string;
  receiverId?: string;
  messageId?: string;
  isTyping?: boolean;
}
