import { useAuthStore } from "@/lib/stores/auth.store";
import { chatService } from "@/services/chatService";
import { useQuery } from "@tanstack/react-query";

export function useChat() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const getChatsQuery = useQuery({
    queryKey: ["chats", accessToken],
    queryFn: () => {
      if (!accessToken) {
        throw new Error("No access Token");
      }
      return chatService.getChats(accessToken);
    },
  });
  return {
    getChatsQuery,
  };
}
