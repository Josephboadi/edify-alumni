import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  user_id: string;
  country: string;
  school: string;
  year: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
