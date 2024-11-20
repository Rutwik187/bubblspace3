import { User } from "next-auth";

// Extended types
interface ExtendedUser extends User {
  id: string;
  username?: string;
}

interface ExtendedSession {
  user: ExtendedUser;
  accessToken?: string;
  userId: string;
  username?: string;
  provider?: string;
}

declare module "next-auth" {
  interface Session extends ExtendedSession {}
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username?: string;
    accessToken?: string;
  }
}
