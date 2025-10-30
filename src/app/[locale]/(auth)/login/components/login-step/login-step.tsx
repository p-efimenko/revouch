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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export const LoginStep = (props: LoginStepProps) => {
  const { onNext } = props

  const t = useTranslations()

  const [isGooglePending, startGoogleTransition] = useTransition()
  const [isApplePending, startAppleTransition] = useTransition()

  const handleLoginWithGoogle = () => {
    startGoogleTransition(async () => {
      await signIn(
        'cognito',
        {
          callbackUrl: BASE_URL,
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
          callbackUrl: BASE_URL,
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
            {t('auth.login.button.facebook')}
          </Button>

          <Button
            startIcon={<Icon name="apple" />}
            variant="outlined"
            size="extra-large"
            onClick={() => handleLoginWithApple()}
            loading={isApplePending}
          >
            {t('auth.login.button.apple')}
          </Button>

          <Button
            startIcon={<Icon name="google" />}
            variant="outlined"
            size="extra-large"
            onClick={() => handleLoginWithGoogle()}
            loading={isGooglePending}
          >
            {t('auth.login.button.google')}
          </Button>
        </Stack>

        <Divider>
          <Typography px={14} variant="p3" color="black.600">
            {t('auth.login.or_continue_with_email')}
          </Typography>
        </Divider>

        <Button size="extra-large" component={NextLink} href="/sign_up">
          {t('auth.login.button.create_account')}
        </Button>
      </Stack>

      <Stack textAlign="center" spacing={34} mt={16}>
        <Typography variant="p4" color="text.secondary">
          <Stack spacing={2}>
            <Box component="span">{t('auth.login.agree_terms')}</Box>

            <Stack spacing={4} direction="row" justifyContent="center">
              <Link component={NextLink} href="/policy" color="text.secondary" underline="always">
                {t('shared.common.privacy_policy')}
              </Link>
              <Box component="span">{t('shared.common.and')}</Box>
              <Link component={NextLink} href="/terms" color="text.secondary" underline="always">
                {t('shared.common.terms_of_service')}
              </Link>
            </Stack>
          </Stack>
        </Typography>

        <Typography variant="p3" color="text.secondary">
          <Box component="span" mr={4}>
            {t('auth.have_an_account_already')}
          </Box>

          <Link component="button" onClick={onNext} sx={{ verticalAlign: 'top' }}>
            {t('shared.button.log_in')}
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}
