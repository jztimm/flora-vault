export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatarUrl?: string;
  joinedAt: Date;
}

export interface UserCredentials extends Pick<User, "id" | "username"> {
  password: string;
}
