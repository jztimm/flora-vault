import { userCred, userData } from "@/mock/userData";
import { User, UserCredentials } from "@/types/users";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function loginUser({
  username,
  password,
}: UserCredentials): User | null {
  const matchedCred = userCred.find(
    (user) => user.username === username && user.password === password
  );

  if (!matchedCred) return null;

  const fullUser = userData.find((user) => user.id === matchedCred.id);

  return fullUser || null;
  // fetch("/api/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ username, password }),
  // })
  //   .then((res) => res.json())
  //   .catch((err) => console.error(err));
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}
