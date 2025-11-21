"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const users = [
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

export default function AppListuser() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <Card className="w-full max-w-sm h-full flex flex-col pb-4">
      <CardHeader className="pt-4 pb-2 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">List User</h2>
        <Users size={24} />
      </CardHeader>
      <CardContent
        ref={scrollRef}
        className={`space-y-3 overflow-y-auto flex-1 mr-2 ${
          isScrolling ? "scrollbar-visible" : "scrollbar-hidden"
        }`}
      >
        {users.map((user) => (
          <div key={user.id} className="flex gap-3 items-center">
            <div className="relative flex-shrink-0">
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
