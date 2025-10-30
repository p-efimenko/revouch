'use client'

import NextLink from 'next/link'

import { signUp } from 'aws-amplify/auth'
import { signIn } from 'next-auth/react'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useAppForm } from '@/hooks/form'
import { useToast } from '@/hooks'

import { Box, Button, Stack, Typography, Link } from '@mui/material'
import { PasswordRequirements } from '@/components/common'

import { z } from 'zod'
import { PASSWORD_SCHEMA } from '@/validation/password'

import { Amplify } from 'aws-amplify'

const schema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  email: z.email(),
  password: PASSWORD_SCHEMA,
})

const defaultValues: z.input<typeof schema> = {
  name: '',
  email: '',
  password: '',
}

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition()

  const config = Amplify.getConfig()

  console.log('Amplify:', config)

  const t = useTranslations()
  const toast = useToast()

  const form = useAppForm({
    defaultValues,
    validators: {
      onDynamic: schema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value)
    },
  })

  const onSubmit = (value: z.input<typeof schema>) => {
    startTransition(async () => {
      try {
        // sign up with email and password
        await signUp({
          username: value.email,
          password: value.password,
          options: {
            userAttributes: {
              name: value.name,
            },
          },
        })

        await signIn('credentials', {
          email: value.email,
          password: value.password,
          redirect: true,
          callbackUrl: '/',
        })

        toast.success(t('auth.sign_up.success.account_created'))
      } catch (e) {
        const error = e as Error
        // handle error from cognito to form
        if (error.message === 'User already exists') {
          form.setErrorMap({
            onDynamic: {
              fields: {
                email: [{ message: t('auth.sign_up.errors.username_already_exists') }],
              },
            },
          })
        } else {
          console.error(error)
          toast.error(t('shared.errors.unexpected_error'))
        }
      }
    })
  }

  return (
    <Box width="100%">
      <Stack spacing={16}>
        <Typography variant="h3" color="text.primary" textAlign="center">
          {t('auth.sign_up.button.create_account')}
        </Typography>

        <form
          name="sign-up-form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Stack spacing={8}>
            <form.AppField name="name">
              {(field) => (
                <field.TextField placeholder={t('shared.forms.name')} endIcon="profile" />
              )}
            </form.AppField>

            <form.AppField name="email">
              {(field) => <field.TextField placeholder={t('shared.forms.email')} endIcon="email" />}
            </form.AppField>

            <form.AppField name="password">
              {(field) => <field.PasswordField placeholder={t('shared.forms.password')} />}
            </form.AppField>
          </Stack>
        </form>

        <form.Subscribe selector={(state) => state.values.password}>
          {(password) => <PasswordRequirements password={password} />}
        </form.Subscribe>

        <Button
          type="submit"
          size="extra-large"
          fullWidth
          onClick={() => form.handleSubmit({ submitAction: 'create-account' })}
          loading={isPending}
        >
          {t('auth.sign_up.button.create_account')}
        </Button>

        <Stack textAlign="center">
          <Typography variant="p3" color="text.secondary">
            <Box component="span" mr={4}>
              {t('auth.have_an_account_already')}
            </Box>

            <Link component={NextLink} href="/login" sx={{ verticalAlign: 'top' }}>
              {t('shared.button.log_in')}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
