import { User, UserCredentials } from "@/types/users";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const baseUrl = process.env.NEXT_PUBLIC_FLORAL_VAULT_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function loginUser({
  username,
  password,
}: UserCredentials): Promise<User | null> {
  try {
    const response = await fetch(baseUrl + "/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Login failed:", data.message || "Unknown error");
      return null;
    }

    const { token, user } = data;

    localStorage.setItem("token", token);
    console.log("JWT Token stored:", token);

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}
