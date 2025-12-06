/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useCallback, useRef } from "react";
import { useAuthStore } from "@/lib/stores/auth.store";
import { wsService } from "@/services/websocketService";
import { IncomingMessage, Message, Chat } from "@/types/websocket";
import { toast } from "sonner";
import { useWebSocketStore } from "@/lib/stores/websokcet.store";

export function useWebSocket() {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const userId = currentUserId;

  const {
    isConnected,
    messages,
    currentChatId,
    newChat,
    chatUpdate,
    onlineUsers,
    typingUsers,
    setIsConnected,
    setWebSocket,
    addMessage,
    updateMessageStatus,
    setCurrentChatId,
    setNewChat,
    setChatUpdate,
    updateOnlineUser,
    setUserTyping,
    clearMessages,
    clearNewChatNotification,
  } = useWebSocketStore();

  const hasConnectedRef = useRef(false);

  /**
   * Handle incoming WebSocket messages
   */
  const handleMessage = useCallback(
    (data: IncomingMessage) => {
      switch (data.type) {
        case "connected":
          console.log("✅ Connection confirmed by server");
          toast.success("Terhubung ke server");
          break;

        case "joined_room":
          if (data.chatId) {
            console.log("✅ Joined room:", data.chatId);
            setCurrentChatId(data.chatId);
            toast.success("Bergabung ke chat");
          }
          break;

        case "new_message":
          if (data.messageId && data.content && data.chatId) {
            const newMessage: Message = {
              messageId: data.messageId,
              senderId: data.senderId!,
              senderName: data.senderName!,
              sender_avatar: data.senderAvatar || "",
              content: data.content,
              status: (data.status as any) || "sent",
              isRead: false,
              createdAt: data.createdAt!,
              chat_id: data.chatId,
            };

            console.log("💬 New message:", newMessage);
            addMessage(newMessage);

            // Show notification if message is from another user
            if (data.senderId !== userId) {
              toast.info(
                `${data.senderName}: ${data.content.substring(0, 50)}${
                  data.content.length > 50 ? "..." : ""
                }`
              );
            }
          }
          break;

        case "message_delivered":
          if (data.messageId) {
            console.log("✅ Message delivered:", data.messageId);
            updateMessageStatus(data.messageId, "delivered");
          }
          break;

        case "message_read":
          if (data.messageId) {
            console.log("👁️ Message read:", data.messageId);
            updateMessageStatus(data.messageId, "read");
          }
          break;

        case "user_status":
          if (data.userId && data.isOnline !== undefined) {
            console.log(
              `👤 User ${data.username} is ${
                data.isOnline ? "online" : "offline"
              }`
            );
            updateOnlineUser(data.userId, data.isOnline);

            if (data.isOnline) {
              toast.success(`${data.username} sedang online`);
            } else {
              toast.info(`${data.username} offline`);
            }
          }
          break;

        case "new_chat":
          if (data.chatId && data.chatUsername) {
            console.log("🆕 New chat received:", data.chatId);
            const chat: Chat = {
              chatId: data.chatId,
              chatUsername: data.chatUsername,
              avatar: data.chatAvatar,
              type: data.chatType || "direct",
              lastMessage: data.lastMessage || "",
              lastMessageTime: data.lastMessageTime,
              unreadCount: data.unreadCount || 0,
            };
            setNewChat(chat);
            toast.success(`Chat baru dari ${data.chatUsername}`);
          }
          break;

        case "chat_update":
          if (data.chatId) {
            console.log("🔄 Chat update received:", data.chatId);
            const chat: Chat = {
              chatId: data.chatId,
              chatUsername: data.chatUsername || "",
              avatar: data.chatAvatar,
              type: data.chatType || "direct",
              lastMessage: data.lastMessage || "",
              lastMessageTime: data.lastMessageTime,
              unreadCount: data.unreadCount || 0,
            };
            setChatUpdate(chat);
          }
          break;

        case "typing":
          if (data.userId && data.isTyping !== undefined) {
            console.log(
              `⌨️ ${data.userId} is ${
                data.isTyping ? "typing" : "stopped typing"
              }`
            );
            setUserTyping(data.userId, data.isTyping);
          }
          break;

        case "error":
          console.error("❌ WebSocket error:", data.error);
          toast.error(data.error || "Terjadi kesalahan");
          break;

        default:
          console.log("⚠️ Unknown message type:", data.type);
      }
    },
    [
      userId,
      addMessage,
      updateMessageStatus,
      setCurrentChatId,
      setNewChat,
      setChatUpdate,
      updateOnlineUser,
      setUserTyping,
    ]
  );

  /**
   * Handle WebSocket connection status
   */
  const handleStatusChange = useCallback(
    (connected: boolean) => {
      setIsConnected(connected);
      if (!connected) {
        toast.error("Koneksi terputus");
      }
    },
    [setIsConnected]
  );

  /**
   * Connect to WebSocket
   */
  useEffect(() => {
    console.log("🔌 Initializing WebSocket connection...");
    console.log("userId =>", userId);
    console.log("hasConnectedRef.current =>", hasConnectedRef.current);

    if (!userId || hasConnectedRef.current) {
      return;
    }

    const ws = wsService.connect(userId);

    if (ws) {
      setWebSocket(ws);
      hasConnectedRef.current = true;

      // Register handlers
      const unsubscribeMessage = wsService.onMessage(handleMessage);
      const unsubscribeStatus = wsService.onStatusChange(handleStatusChange);

      return () => {
        console.log("🔌 Cleaning up WebSocket connection...");
        unsubscribeMessage();
        unsubscribeStatus();
        wsService.disconnect();
        hasConnectedRef.current = false;
      };
    }
  }, [userId, handleMessage, handleStatusChange, setWebSocket]);

  /**
   * Join chat room
   */
  const joinRoom = useCallback(
    (chatId: string, receiverId?: string) => {
      if (!isConnected) {
        toast.error("WebSocket belum terhubung");
        return false;
      }

      return wsService.joinRoom(chatId, receiverId);
    },
    [isConnected]
  );

  /**
   * Leave chat room
   */
  const leaveRoom = useCallback(
    (chatId: string) => {
      if (!isConnected || !chatId) {
        return false;
      }

      return wsService.leaveRoom(chatId);
    },
    [isConnected]
  );

  /**
   * Send message
   */
  const sendMessage = useCallback(
    (content: string, chatId?: string, receiverId?: string) => {
      if (!isConnected) {
        toast.error("WebSocket belum terhubung");
        return false;
      }

      if (!userId) {
        toast.error("User ID tidak ditemukan");
        return false;
      }

      if (!content.trim()) {
        toast.error("Pesan tidak boleh kosong");
        return false;
      }

      const effectiveChatId = chatId || currentChatId || "";

      if (!effectiveChatId && !receiverId) {
        toast.error("Chat ID atau Receiver ID diperlukan");
        return false;
      }

      return wsService.sendMessage(
        userId,
        content,
        effectiveChatId,
        receiverId
      );
    },
    [isConnected, userId, currentChatId]
  );

  /**
   * Send message delivered acknowledgment
   */
  const messageDelivered = useCallback(
    (messageId: string, chatId: string) => {
      if (!isConnected) return false;
      return wsService.messageDelivered(messageId, chatId);
    },
    [isConnected]
  );

  /**
   * Send message read acknowledgment
   */
  const messageRead = useCallback(
    (messageId: string, chatId: string) => {
      if (!isConnected) return false;
      return wsService.messageRead(messageId, chatId);
    },
    [isConnected]
  );

  /**
   * Send typing indicator
   */
  const sendTyping = useCallback(
    (chatId: string, isTyping: boolean) => {
      if (!isConnected) return false;
      return wsService.sendTyping(chatId, isTyping);
    },
    [isConnected]
  );

  return {
    // State
    isConnected,
    messages,
    currentChatId,
    newChat,
    chatUpdate,
    onlineUsers,
    typingUsers,

    // Actions
    joinRoom,
    leaveRoom,
    sendMessage,
    messageDelivered,
    messageRead,
    sendTyping,
    clearMessages,
    clearNewChatNotification,
  };
}
