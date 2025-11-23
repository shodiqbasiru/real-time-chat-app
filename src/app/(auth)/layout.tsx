"use client";

import { useAuthStore } from "@/lib/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  return (
    <div className="relative bg-[url(/bg-auth.jpg)] ">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative min-h-screen flex items-center justify-center z-20">
        {children}
      </div>
    </div>
  );
}
