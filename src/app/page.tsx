"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import "react-social-icons/instagram";
import "react-social-icons/github";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Page() {
  const currentUser = {
    name: "John Doe",
    avatar:
      "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    email: "john.doe@example.com",
    isOnline: true,
  };

  const recentActivity = [
    {
      name: "Sarah Johnson",
      action: "sent you a message",
      time: "2 minutes ago",
      avatar:
        "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    },
    {
      name: "Michael Chen",
      action: "started a new conversation",
      time: "15 minutes ago",
      avatar:
        "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    },
    {
      name: "Emily Rodriguez",
      action: "replied to your message",
      time: "1 hour ago",
      avatar:
        "https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg",
    },
  ];

  return (
    <div className="bg-card rounded-4xl h-full overflow-y-auto no-scrollbar p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {/* Profile Card */}
          <ProfileCard
            currentUser={currentUser}
            className="col-span-1 row-span-2"
          />
          {/* Recent Activity */}
          <Card className="col-span-1  row-span-2 p-4">
            <CardHeader>
              <h3 className="text-xl font-bold">Recent Activity</h3>
            </CardHeader>

            <CardContent>
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <Image
                    src={activity.avatar}
                    alt={activity.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      <span className="font-bold">{activity.name}</span>{" "}
                      {activity.action}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Welcome */}
          <div className="space-y-2 flex flex-col justify-center items-center col-span-1 row-span-1">
            <h1 className="text-3xl font-bold">
              Welcome back, {currentUser.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your conversations today.
            </p>
          </div>
        </div>
        {/* Quick Actions */}
        <Card className=" items-center justify-center py-4">
          <CardContent>
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Start a New Conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with your friends and colleagues instantly
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/chat">
                  <MessageCircle size={18} className="mr-2" />
                  Open Chat
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <footer className="text-center flex-1 flex flex-col justify-end">
          make by masbas
        </footer>
      </div>
    </div>
  );
}
