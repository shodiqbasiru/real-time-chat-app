import { AppInfobar } from "@/components/app-infobar";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full me-4 h-full">
      <div className="flex-1 px-8 pt-8 pb-4 rounded-4xl bg-card me-4 overflow-hidden">
        {children}
      </div>
      <AppInfobar className="w-1/5 overflow-hidden" />
    </div>
  );
}
