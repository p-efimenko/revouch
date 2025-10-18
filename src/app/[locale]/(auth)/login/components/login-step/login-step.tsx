'use client'

import NextLink from 'next/link'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'

import { signIn } from 'next-auth/react'

import { Button, Divider, Stack, Typography, Link, Box } from '@mui/material'

import { Icon } from '@/components/ui'

type LoginStepProps = {
  onNext: () => void
}

export const LoginStep = (props: LoginStepProps) => {
  const { onNext } = props

  const [isGooglePending, startGoogleTransition] = useTransition()
  const [isApplePending, startAppleTransition] = useTransition()

  const t = useTranslations('Login')

  const handleLoginWithGoogle = () => {
    startGoogleTransition(async () => {
      await signIn(
        'cognito',
        {
          callbackUrl: 'http://localhost:3000',
        },
        {
          identity_provider: 'Google',
        },
      )
    })
  }

  const handleLoginWithApple = async () => {
    startAppleTransition(async () => {
      await signIn(
        'cognito',
        {
          callbackUrl: 'http://localhost:3000',
        },
        {
          identity_provider: 'SignInWithApple',
          prompt: 'login',
        },
      )
    })
  }

  const handleLoginWithFacebook = () => {
    signIn('cognito')
  }

  return (
    <Box width="100%">
      <Stack spacing={12}>
        <Stack spacing={8}>
          <Button
            startIcon={<Icon name="facebook" />}
            variant="outlined"
            size="extra-large"
            onClick={() => handleLoginWithFacebook()}
            disabled
          >
            Continue with Facebook
          </Button>

          <Button
            startIcon={<Icon name="apple" />}
            variant="outlined"
            size="extra-large"
            onClick={() => handleLoginWithApple()}
            loading={isApplePending}
          >
            Continue with Apple
          </Button>

          <Button
            startIcon={<Icon name="google" />}
            variant="outlined"
            size="extra-large"
            onClick={() => handleLoginWithGoogle()}
            loading={isGooglePending}
          >
            Continue with Google
          </Button>
        </Stack>

        <Divider>
          <Typography px={14} variant="p3" color="black.600">
            or Continue wit Email
          </Typography>
        </Divider>

        <Button size="extra-large" component={NextLink} href="/sign_up">
          Create account
        </Button>
      </Stack>

      <Stack textAlign="center" spacing={34} mt={16}>
        <Typography variant="p4" color="text.secondary">
          <Stack spacing={2}>
            <Box component="span">By creating an account, you agree to our</Box>

            <Stack spacing={4} direction="row" justifyContent="center">
              <Link component={NextLink} href="/policy" color="text.secondary" underline="always">
                Privacy Policy
              </Link>
              <Box component="span">and</Box>
              <Link component={NextLink} href="/terms" color="text.secondary" underline="always">
                Terms of Service
              </Link>
            </Stack>
          </Stack>
        </Typography>

        <Typography variant="p3" color="text.secondary">
          <Box component="span" mr={4}>
            Have an account already?
          </Box>

          <Link component="button" onClick={onNext} sx={{ verticalAlign: 'top' }}>
            Log in
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}
