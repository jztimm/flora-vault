"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { cn, loginUser } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(30, {
      message: "Username can not be more than 30 characters long",
    }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { setUser } = useUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    const unauthorized = searchParams.get("unauthorized");
    if (unauthorized === "true") {
      toast.error("Please login to access that page.");
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const user = loginUser(values);

    if (!user) {
      setIsLoading(false);
      form.setError("username", {
        type: "manual",
        message: "Invalid username or password",
      });
      return;
    }

    // Handle successful login here (e.g., redirect to Home page)
    toast.success(
      `Welcome back, ${user.firstName || user.username}! You are now logged in.`
    );

    setIsLoading(false);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    // Redirect to Home page
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <div className="flex h-[80vh] items-center justify-center">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome Back
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Login to access your Floral Vault account and manage your plant
            journey.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-8 space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 font-semibold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 font-semibold" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "group/btn relative block h-10 w-full rounded-md font-medium text-white transition",
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-br from-black to-neutral-600 hover:scale-[1.01]"
                )}
              >
                {isLoading ? "Logging in..." : "Login →"}
                <BottomGradient />
              </button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#81a308] hover:underline"
            >
              Create one here
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default Login;
