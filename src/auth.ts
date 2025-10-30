import { type AuthOptions, type TokenSet } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import CognitoProvider, { type CognitoProfile } from 'next-auth/providers/cognito'

import {
  CognitoIdentityProvider,
  type InitiateAuthCommandInput,
  type InitiateAuthCommandOutput,
  type GetUserCommandOutput,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider'

import type { UserAttributesType } from '@/types/next-auth'
import { fetchUserData } from '@/utils/fetch-with-token'

const cognitoIdentityProvider = new CognitoIdentityProvider({
  region: process.env.COGNITO_REGION,
})

export const auth: AuthOptions = {
  pages: {
    error: '/login', // Redirect to login page on auth errors
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  logger: {
    error(code, metadata) {
      console.error('NextAuth error:', code, metadata)
    },
    warn(code) {
      console.warn('NextAuth warning:', code)
    },
    debug(code, metadata) {
      console.debug('NextAuth debug:', code, metadata)
    },
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, trigger }) {
      // Initial sign in - store token info
      if (user) {
        // @ts-expect-error - fix type error
        token.tokenId = user.tokenId
        // @ts-expect-error - fix type error
        token.accessToken = user.accessToken
        // @ts-expect-error - fix type error
        token.refreshToken = user.refreshToken
        // @ts-expect-error - fix type error
        token.accessTokenExpires = user.expiresIn
        token.user = null
        token.userFetchTime = null
      }

      // Fetch user data from backend if we have an access token
      // Only fetch if not already cached or on trigger (update)
      const accessToken = token.accessToken
      if (
        accessToken &&
        typeof accessToken === 'string' &&
        (!token.user || trigger === 'update')
      ) {
        const user = await fetchUserData(accessToken)

        if (user) {
          token.user = user
          // Store timestamp for cache invalidation
          token.userFetchTime = new Date().toISOString()
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          // @ts-expect-error - fix type error
          ...token.user,
        },
        tokens: {
          idToken: token.idToken,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpires: token.accessTokenExpires,
        },
      }
    },
  },

  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,
      clientSecret: '',
      issuer: process.env.COGNITO_ISSUER as string,
      client: {
        token_endpoint_auth_method: 'none',
      },

      checks: ['state', 'nonce'],

      profile(profile: CognitoProfile, tokens: TokenSet) {
        return {
          id: profile['cognito:username'], // provided id from cognito
          oauthId: profile.sub, // provided id from oauth
          email: profile.email,
          name: profile.name,
          idToken: tokens.id_token,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }
      },
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: (credentials) => {
        return new Promise((resolve, reject) => {
          if (!credentials) {
            return reject(null)
          }

          const params: InitiateAuthCommandInput = {
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,
            AuthParameters: {
              USERNAME: credentials.email,
              PASSWORD: credentials.password,
            },
          }

          /* eslint-disable  @typescript-eslint/no-explicit-any */
          cognitoIdentityProvider.initiateAuth(
            params,
            (error: any, session?: InitiateAuthCommandOutput) => {
              if (error) {
                // Return a more descriptive error message
                const errorMessage = error.message || 'Authentication failed'
                return reject(new Error(errorMessage))
              }

              if (!session) {
                return reject(null)
              }

              cognitoIdentityProvider.getUser(
                {
                  AccessToken: session.AuthenticationResult?.AccessToken,
                },
                (error: any, user?: GetUserCommandOutput) => {
                  if (error) {
                    const errorMessage = error.message || 'Failed to get user information'
                    return reject(new Error(errorMessage))
                  }

                  const UserAttributes: UserAttributesType = {
                    id: user?.Username as string,
                    idToken: session.AuthenticationResult?.IdToken,
                    accessToken: session.AuthenticationResult?.AccessToken,
                    refreshToken: session.AuthenticationResult?.RefreshToken,
                    expiresIn: session.AuthenticationResult?.ExpiresIn,
                  }

                  user?.UserAttributes?.forEach((attribute) => {
                    if (attribute.Name) {
                      UserAttributes[attribute.Name] = attribute.Value
                    }
                  })

                  resolve(UserAttributes)
                },
              )
            },
          )
        })
      },
    }),
  ],

  // NOTE: signIn event is for side effects like logging, analytics, etc.
  // It CANNOT modify the session. User data is fetched in the JWT callback above.
  // 
  // If you need to update the session after data changes, use the updateSession hook
  // or call update() from useSession to trigger 'update' trigger in JWT callback
}

export default auth
