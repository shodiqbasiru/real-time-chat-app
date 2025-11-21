"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type User = {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
};

const users: User[] = [
  {
    id: 1,
    name: "Jonathan Smith",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
  },
  {
    id: 5,
    name: "David Kim",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
  },
  {
    id: 6,
    name: "Lisa Anderson",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
  },
  {
    id: 7,
    name: "James Wilson",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
  },
  {
    id: 8,
    name: "Maria Garcia",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
  },
  {
    id: 9,
    name: "Robert Taylor",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: false,
  },
  {
    id: 10,
    name: "Jennifer Lee",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    isOnline: true,
  },
];

type AppListuserProps = {
  onStartChat?: (userId: number) => void;
};

export default function AppListuser({ onStartChat }: AppListuserProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChatButtonClick = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleConfirmChat = () => {
    if (selectedUser && onStartChat) {
      onStartChat(selectedUser.id);
    }
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCancelChat = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Card className="w-full max-w-sm h-full flex flex-col pb-4">
        <CardHeader className="pt-4 pb-2 flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold">List User</h2>
          <Users size={24} />
        </CardHeader>
        <CardContent
          ref={scrollRef}
          className={`space-y-3 flex-1 pr-2 overflow-y-auto ${
            isScrolling ? "scrollbar-visible" : "scrollbar-hidden"
          }`}
        >
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-3 items-center p-3 rounded-lg transition-colors"
            >
              <div className="relative shrink-0">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-xl object-cover"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    user.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <Badge
                  variant={user.isOnline ? "default" : "secondary"}
                  className={`text-xs mt-1 ${
                    user.isOnline
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-1 ${
                      user.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {user.isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-9 w-9 cursor-pointer"
                onClick={() => handleChatButtonClick(user)}
              >
                <MessageCircle size={18} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start a conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to start a chat with{" "}
              <span className="font-semibold text-foreground">
                {selectedUser?.name}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelChat}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmChat}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
