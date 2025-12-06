import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/lib/stores/auth.store";

export function useAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const registerMutation = useMutation({
    mutationFn: authService.register,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
  });

  const getCurrentUserQuery = useQuery({
    queryKey: ["currentUser", accessToken],
    queryFn: () => {
      if (!accessToken) {
        throw new Error("No access token");
      }
      return authService.getCurrentUser(accessToken);
    },
    enabled: !!accessToken,
    retry: false,
  });

  return {
    getCurrentUserQuery,
    registerMutation,
    loginMutation,
  };
}
