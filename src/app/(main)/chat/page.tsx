"use client";

import { useState } from "react";
import { User } from "@/types/user";
import AppChatbar from "@/components/app-chatbar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Phone, Video, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/message";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const usersData: User[] = [
  {
    id: 1,
    name: "Jonathan Smith",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
    lastMessage: "Hey! How are you doing?",
    lastMessageTime: "2m ago",
    unreadCount: 3,
    messages: [
      {
        id: 1,
        senderId: 1,
        text: "Hey! How are you?",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: 2,
        senderId: 0, // current user
        text: "I'm good! How about you?",
        timestamp: "10:32 AM",
        isRead: true,
      },
      {
        id: 3,
        senderId: 1,
        text: "Doing great! Want to grab coffee later?",
        timestamp: "10:35 AM",
        isRead: true,
      },
      {
        id: 4,
        senderId: 0,
        text: "Sure! What time works for you?",
        timestamp: "10:37 AM",
        isRead: true,
      },
      {
        id: 5,
        senderId: 1,
        text: "How about 3pm?",
        timestamp: "10:40 AM",
        isRead: false,
      },
      {
        id: 21,
        senderId: 1,
        text: "Hey! How are you?",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: 22,
        senderId: 0, // current user
        text: "I'm good! How about you?",
        timestamp: "10:32 AM",
        isRead: true,
      },
      {
        id: 23,
        senderId: 1,
        text: "Doing great! Want to grab coffee later?",
        timestamp: "10:35 AM",
        isRead: true,
      },
      {
        id: 24,
        senderId: 0,
        text: "Sure! What time works for you?",
        timestamp: "10:37 AM",
        isRead: true,
      },
      {
        id: 25,
        senderId: 1,
        text: "How about 3pm?",
        timestamp: "10:40 AM",
        isRead: false,
      },
      {
        id: 31,
        senderId: 1,
        text: "Hey! How are you?",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: 32,
        senderId: 0, // current user
        text: "I'm good! How about you?",
        timestamp: "10:32 AM",
        isRead: true,
      },
      {
        id: 33,
        senderId: 1,
        text: "Doing great! Want to grab coffee later?",
        timestamp: "10:35 AM",
        isRead: true,
      },
      {
        id: 34,
        senderId: 0,
        text: "Sure! What time works for you?",
        timestamp: "10:37 AM",
        isRead: true,
      },
      {
        id: 35,
        senderId: 1,
        text: "How about 3pm?",
        timestamp: "10:40 AM",
        isRead: false,
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
    lastMessage: "Thanks for your help!",
    lastMessageTime: "1h ago",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        senderId: 2,
        text: "Can you help me with this project?",
        timestamp: "09:15 AM",
        isRead: true,
      },
      {
        id: 2,
        senderId: 0,
        text: "Of course! What do you need?",
        timestamp: "09:20 AM",
        isRead: true,
      },
      {
        id: 3,
        senderId: 2,
        text: "Thanks for your help!",
        timestamp: "11:30 AM",
        isRead: true,
      },
    ],
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
    lastMessage: "See you tomorrow",
    lastMessageTime: "3h ago",
    unreadCount: 7,
    messages: [
      {
        id: 1,
        senderId: 3,
        text: "Don't forget about tomorrow's meeting",
        timestamp: "08:45 AM",
        isRead: true,
      },
      {
        id: 2,
        senderId: 0,
        text: "Thanks for the reminder!",
        timestamp: "08:50 AM",
        isRead: true,
      },
      {
        id: 3,
        senderId: 3,
        text: "See you tomorrow",
        timestamp: "09:00 AM",
        isRead: false,
      },
    ],
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
    lastMessage: "Got it, working on it now",
    lastMessageTime: "5h ago",
    unreadCount: 1,
    messages: [],
  },
  {
    id: 5,
    name: "David Kim",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
    lastMessage: "Let me check and get back",
    lastMessageTime: "1d ago",
    unreadCount: 0,
    messages: [],
  },
  {
    id: 6,
    name: "Lisa Anderson",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
    lastMessage: "Perfect! 👍",
    lastMessageTime: "2d ago",
    unreadCount: 12,
    messages: [],
  },
  {
    id: 7,
    name: "James Wilson",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
    lastMessage: "Can we reschedule?",
    lastMessageTime: "3d ago",
    unreadCount: 0,
    messages: [],
  },
  {
    id: 8,
    name: "Maria Garcia",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
    lastMessage: "Sounds good to me",
    lastMessageTime: "4d ago",
    unreadCount: 2,
    messages: [],
  },
  {
    id: 9,
    name: "Robert Taylor",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
    lastMessage: "I'll send the files soon",
    lastMessageTime: "5d ago",
    unreadCount: 0,
    messages: [],
  },
  {
    id: 10,
    name: "Jennifer Lee",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
    lastMessage: "Meeting at 3pm?",
    lastMessageTime: "1w ago",
    unreadCount: 5,
    messages: [],
  },
];

export default function Page() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
  };

  const handlePin = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isPinned: !user.isPinned } : user
      )
    );
  };

  const handleChatClick = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, unreadCount: 0 } : u))
      );
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;

    const newMessage: Message = {
      id: (selectedUser.messages?.length || 0) + 1,
      senderId: 0, // current user
      text: messageInput,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      isRead: true,
    };

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              messages: [...(user.messages || []), newMessage],
              lastMessage: messageInput,
              lastMessageTime: "Just now",
            }
          : user
      )
    );

    setSelectedUser({
      ...selectedUser,
      messages: [...(selectedUser.messages || []), newMessage],
    });

    setMessageInput("");
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  //   const handleStartChatFromList = (userId: number) => {
  //     const user = users.find((u) => u.id === userId);
  //     if (user) {
  //       setSelectedUser(user);
  //       setUsers(
  //         users.map((u) => (u.id === userId ? { ...u, unreadCount: 0 } : u))
  //       );
  //     }
  //   };
  return (
    <>
      <div className="flex gap-6 h-full">
        <AppChatbar
          sortedUsers={sortedUsers}
          handlePin={handlePin}
          handleDelete={handleDelete}
          handleChatClick={handleChatClick}
        />

        <div className="flex-1 w-full flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      width={45}
                      height={45}
                      className="rounded-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        selectedUser.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">{selectedUser.name}</h1>
                    <Badge
                      variant={selectedUser.isOnline ? "default" : "secondary"}
                      className={`text-xs ${
                        selectedUser.isOnline
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          selectedUser.isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {selectedUser.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={20} />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {selectedUser.messages && selectedUser.messages.length > 0 ? (
                  selectedUser.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 0 ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.senderId === 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="pt-4 border-t">
                <InputGroup className="h-12 px-4">
                  <InputGroupInput
                    className="flex-1"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <InputGroupButton>
                    <Send size={30} />
                  </InputGroupButton>
                </InputGroup>
                {/* </div> */}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-lg">
                Select a chat to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
