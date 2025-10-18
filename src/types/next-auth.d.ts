/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      sub: string;
      id?: string;
      email_verified?: string;
      locale?: string;
    },
    tokens: {
      idToken?: string;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sub?: string;
    id?: string;
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    email_verified?: string;
    locale?: string;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}