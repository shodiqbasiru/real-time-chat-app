"use client";

import { useAuthStore } from "@/lib/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/signin");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}
