"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full max-w-md py-6 px-4 bg-background/70 shadow-xl shadow-primary/20">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-primary-foreground text-2xl font-bold">
              Create an account
            </CardTitle>
            <div className="ms-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="text-primary" size={24} />
            </div>
          </div>

          <CardDescription className="">
            Join our chat community and start connecting with friends
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="text-primary-foreground placeholder:text-muted-foreground">
                    <FormControl>
                      <Input
                        className="bg-transparent h-10 border border-border/50 rounded"
                        placeholder="Username"
                        {...field}
                        // disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="text-primary-foreground">
                    <FormControl>
                      <Input
                        className="bg-transparent h-10 border border-border/50 rounded"
                        placeholder="Phone Number"
                        type="tel"
                        {...field}
                        // disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="text-primary-foreground">
                    <FormControl>
                      <Input
                        className="bg-transparent h-10 border border-border/50 rounded"
                        placeholder="Email"
                        type="email"
                        {...field}
                        // disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-primary-foreground">
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-transparent h-10 border border-border/50 rounded"
                          placeholder="Password"
                          // type={showPassword ? "text" : "password"}
                          {...field}
                          // disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          // onClick={() => setShowPassword(!showPassword)}
                          // disabled={isLoading}
                        >
                          {/* {showPassword ? ( */}
                          <EyeOff size={18} className="text-muted-foreground" />
                          {/* // ) : ( */}
                          {/* //   <Eye size={18} className="text-muted-foreground" /> */}
                          {/* // )} */}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="text-primary-foreground">
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-transparent h-10 border border-border/50 rounded"
                          placeholder="Confirm Password"
                          // type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          // disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          // onClick={() =>
                          //   setShowConfirmPassword(!showConfirmPassword)
                          // }
                          // disabled={isLoading}
                        >
                          {/* {showConfirmPassword ? ( */}
                          <EyeOff size={18} className="text-muted-foreground" />
                          {/* // ) : ( */}
                          {/* // <Eye size={18} className="text-muted-foreground" /> */}
                          {/* // )} */}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-4"
                size="lg"
                // disabled={isLoading}
              >
                {/* {isLoading ? "Creating Account..." : "Create Account"} */}
                Create an account
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </div>
              <div className="text-center text-xs text-muted-foreground ">
                <p>By creating an account, you agree to our Terms & Services</p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
