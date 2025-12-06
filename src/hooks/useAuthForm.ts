import { z } from "zod";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/stores/auth.store";
import { authService } from "@/services/authService";

export const formRegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters.",
      })
      .max(20, {
        message: "Username must not exceed 20 characters.",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),
    phoneNumber: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits.",
      })
      .regex(/^[0-9]+$/, {
        message: "Phone number can only contain numbers.",
      }),
    email: z.email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const formLoginSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must not exceed 20 characters.",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});

export function useAuthentication() {
  const [showPassword, setShowPassword] = useState<boolean>();
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>();

  const { registerMutation, loginMutation } = useAuth();
  const router = useRouter();

  const { setAccessToken, setCurrentUserId } = useAuthStore();

  const handleRegister = (values: z.infer<typeof formRegisterSchema>) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        router.push("/signin");
        console.log("Register Success");
      },
      onError: (err: Error) => console.error(err.message),
    });
  };

  const handleLogin = async (values: z.infer<typeof formLoginSchema>) => {
    loginMutation.mutate(values, {
      onSuccess: async (res) => {
        console.log(res);

        const token = res.data?.token;
        setAccessToken(token);

        try {
          const userData = await authService.getCurrentUser(token);
          setCurrentUserId(userData.data?.id || "");
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }

        router.push("/");
      },
      onError: (err: Error) => console.error(err.message),
    });
  };

  return {
    handleRegister,
    handleLogin,
    showPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    setShowPassword,
    registerMutation,
    formRegisterSchema,
    formLoginSchema,
  };
}
