'use client'

import { Amplify } from 'aws-amplify'

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
        loginWith: {
          email: true,
        },
      },
    },
  },
  {
    ssr: true,
  },
)

export const AmplifyConfig = () => {
  return null
}
