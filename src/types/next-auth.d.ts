/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ISODateString, DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

import type { UserDataResponseDto } from '../api/models'

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserDataResponseDto,
    tokens: {
      idToken?: string;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number;
    }
    expires: ISODateString
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
    user?: UserDataResponseDto;
    userFetchTime?: ISODateString;
    tokenId?: string;
    accessTokenExpires?: number;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}