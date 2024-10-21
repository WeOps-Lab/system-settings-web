import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    locale?: string;
    username?: string;
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    locale?: string;
    error?: string;
    username?: string;
    roles?: string[];
  }
}