import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  LogOut,
  LucideMessageCircleMore,
  MessageCircle,
} from "lucide-react";

export function AppSidebar() {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Chat",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Log Out",
      url: "#",
      icon: LogOut,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="mx-auto py-8 mb-16 text-2xl font-bold items-center ">
        <LucideMessageCircleMore size="54px" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="text-4xl mb-8">
                  <SidebarMenuButton asChild className="mx-auto px-4">
                    <a href={item.url}>
                      <item.icon style={{ width: "36px", height: "36px" }} />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
