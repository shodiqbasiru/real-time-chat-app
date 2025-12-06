/* eslint-disable @typescript-eslint/no-explicit-any */
import { OutgoingMessage } from "@/types/websocket";

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:7720";

export class WebSocketService {
  private ws: WebSocket | null = null;
  private userId: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private messageHandlers: ((data: any) => void)[] = [];
  private statusHandlers: ((isConnected: boolean) => void)[] = [];

  constructor() {
    if (typeof window === "undefined") {
      console.warn("WebSocketService: Running in server environment");
    }
  }

  /**
   * Create WebSocket connection
   */
  connect(userId: string): WebSocket | null {
    if (typeof window === "undefined") {
      console.warn("WebSocket can only be initialized on client side");
      return null;
    }

    if (!userId) {
      console.error("userId is required for WebSocket connection");
      return null;
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log("WebSocket already connected");
      return this.ws;
    }

    this.userId = userId;

    try {
      const params = new URLSearchParams({ userId });
      this.ws = new WebSocket(`${WS_BASE_URL}/ws?${params.toString()}`);

      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onclose = this.handleClose.bind(this);

      return this.ws;
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      return null;
    }
  }

  /**
   * Disconnect WebSocket
   */
  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.userId = null;
    this.reconnectAttempts = 0;
  }

  /**
   * Send message through WebSocket
   */
  send(message: OutgoingMessage): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return false;
    }

    try {
      this.ws.send(JSON.stringify(message));
      console.log("📤 WebSocket sent:", message);
      return true;
    } catch (error) {
      console.error("Error sending WebSocket message:", error);
      return false;
    }
  }

  /**
   * Join chat room
   */
  joinRoom(chatId: string, receiverId?: string): boolean {
    return this.send({
      type: "join_room",
      chatId,
      receiverId: receiverId || "",
    });
  }

  /**
   * Leave chat room
   */
  leaveRoom(chatId: string): boolean {
    return this.send({
      type: "leave_room",
      chatId,
    });
  }

  /**
   * Send chat message
   */
  sendMessage(
    userId: string,
    content: string,
    chatId?: string,
    receiverId?: string
  ): boolean {
    if (!content.trim()) {
      console.error("Message content cannot be empty");
      return false;
    }

    return this.send({
      type: "send_message",
      userId,
      chatId: chatId || "",
      content: content.trim(),
      receiverId: receiverId || "",
    });
  }

  /**
   * Send message delivered acknowledgment
   */
  messageDelivered(messageId: string, chatId: string): boolean {
    return this.send({
      type: "message_delivered",
      messageId,
      chatId,
    });
  }

  /**
   * Send message read acknowledgment
   */
  messageRead(messageId: string, chatId: string): boolean {
    return this.send({
      type: "message_read",
      messageId,
      chatId,
    });
  }

  /**
   * Send typing indicator
   */
  sendTyping(chatId: string, isTyping: boolean): boolean {
    return this.send({
      type: "typing",
      chatId,
      isTyping,
    });
  }

  /**
   * Register message handler
   */
  onMessage(handler: (data: any) => void): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  /**
   * Register status change handler
   */
  onStatusChange(handler: (isConnected: boolean) => void): () => void {
    this.statusHandlers.push(handler);
    return () => {
      this.statusHandlers = this.statusHandlers.filter((h) => h !== handler);
    };
  }

  /**
   * Get connection status
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Handle WebSocket open event
   */
  private handleOpen(): void {
    console.log(`✅ WebSocket connected (userId: ${this.userId})`);
    this.reconnectAttempts = 0;
    this.notifyStatusChange(true);
  }

  /**
   * Handle WebSocket message event
   */
  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      console.log("📨 WebSocket received:", data);
      this.notifyMessageHandlers(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  }

  /**
   * Handle WebSocket error event
   */
  private handleError(error: Event): void {
    console.log("⚠️ WebSocket error:", error);
  }

  /**
   * Handle WebSocket close event
   */
  private handleClose(): void {
    console.warn("🔌 WebSocket disconnected");
    this.ws = null;
    this.notifyStatusChange(false);

    // Attempt to reconnect
    if (this.userId && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

      console.log(
        `🔁 Reconnecting in ${delay}ms... (attempt ${this.reconnectAttempts})`
      );

      this.reconnectTimeout = setTimeout(() => {
        if (this.userId) {
          this.connect(this.userId);
        }
      }, delay);
    } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("❌ Max reconnection attempts reached");
    }
  }

  /**
   * Notify all message handlers
   */
  private notifyMessageHandlers(data: any): void {
    this.messageHandlers.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error("Error in message handler:", error);
      }
    });
  }

  /**
   * Notify all status change handlers
   */
  private notifyStatusChange(isConnected: boolean): void {
    this.statusHandlers.forEach((handler) => {
      try {
        handler(isConnected);
      } catch (error) {
        console.error("Error in status handler:", error);
      }
    });
  }
}

// Export singleton instance
export const wsService = new WebSocketService();
