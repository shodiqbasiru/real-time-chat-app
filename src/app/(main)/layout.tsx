import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ProtectedRoute } from "@/components/protected-route";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="relative flex w-full max-h-dvh overflow-hidden py-4">
          <AppSidebar />
          <main className="flex-1 max-h-dvh me-4">{children}</main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
