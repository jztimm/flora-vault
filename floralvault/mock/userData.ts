import { User, UserCredentials } from "@/types/users";

export const userData: User[] = [
  {
    id: "user-101",
    username: "greenwitch",
    firstName: "Rowan",
    lastName: "Sage",
    bio: "Herbalist and garden witch specializing in culinary and healing herbs.",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    joinedAt: new Date("2024-08-14"),
  },
  {
    id: "user-204",
    username: "fungifolk",
    firstName: "Theo",
    lastName: "Myco",
    bio: "Mushroom forager and eastern herbal medicine enthusiast.",
    avatarUrl: "https://i.pravatar.cc/150?img=22",
    joinedAt: new Date("2024-10-01"),
  },
  {
    id: "user-302",
    username: "aromaleaf",
    firstName: "Selena",
    lastName: "Hart",
    bio: "Tea grower and wildflower collector with a love for aromatic species.",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    joinedAt: new Date("2025-01-02"),
  },
  {
    id: "user-888",
    username: "medicinalroots",
    firstName: "Diego",
    lastName: "Ramos",
    bio: "Preserving indigenous plant medicine across Latin America.",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
    joinedAt: new Date("2025-01-18"),
  },
  {
    id: "user-999",
    username: "emptyroots",
    firstName: "Nova",
    lastName: "Lin",
    bio: "Just getting started with plant journaling 🌱",
    avatarUrl: "https://i.pravatar.cc/150?img=30",
    joinedAt: new Date("2025-03-01"),
  },
];

export const userCred: UserCredentials[] = [
  {
    id: "user-101",
    username: "greenwitch",
    password: "herbal123",
  },
  {
    id: "user-204",
    username: "fungifolk",
    password: "mushlove",
  },
  {
    id: "user-302",
    username: "aromaleaf",
    password: "teabloom",
  },
  {
    id: "user-888",
    username: "medicinalroots",
    password: "rootedHealing",
  },
  {
    id: "user-999",
    username: "emptyroots",
    password: "plantbeginner",
  },
];
