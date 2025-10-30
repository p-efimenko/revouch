'use client'

import NextLink from 'next/link'

import { signIn } from 'next-auth/react'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAppForm } from '@/hooks/form'
import { useToast } from '@/hooks'

import { Stack, Link, Button, Box, Typography } from '@mui/material'

import { z } from 'zod'

const schema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: 'This field is required' }),
})

const defaultValues: z.input<typeof schema> = {
  email: '',
  password: '',
}

type EmailStepProps = {
  onBack: () => void
}

export const EmailStep = (props: EmailStepProps) => {
  const { onBack } = props

  const [isPending, startTransition] = useTransition()

  const t = useTranslations()
  const navigate = useRouter()
  const toast = useToast()

  const form = useAppForm({
    defaultValues,
    validators: {
      onDynamic: schema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        try {
          const response = await signIn('credentials', {
            email: value.email,
            password: value.password,
            redirect: false,
            callbackUrl: '/',
          })

          if (response?.error) {
            // Handle authentication error
            toast.error(t('auth.login.error.invalid_email_or_password'))
          } else if (response?.ok) {
            // Authentication successful - redirect to home page
            navigate.replace('/')
          } else {
            // Handle other errors
            toast.error(t('shared.errors.unexpected_error'))
          }
        } catch (e) {
          const error = e as Error
          console.error('Sign in error:', error)
          toast.error(t('shared.errors.unexpected_error'))
        }
      })
    },
  })

  return (
    <Stack width="100%" spacing={16} alignItems="center">
      <Typography variant="h3" color="text.primary">
        {t('auth.login.sign_in')}
      </Typography>

      <Box
        component="form"
        width="100%"
        name="email-step"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >

        <Stack spacing={8}>

          <form.AppField name="email">
            {(field) => <field.TextField placeholder={t('shared.forms.email')} endIcon="email" />}
          </form.AppField>

          <form.AppField name="password">
            {(field) => {
              return <field.PasswordField placeholder={t('shared.forms.password')} />
            }}
          </form.AppField>
          
        </Stack>

      </Box>

      <Button
        fullWidth
        type="submit"
        size="extra-large"
        onClick={() => form.handleSubmit({ submitAction: 'login' })}
        loading={isPending}
      >
        {t('shared.button.log_in')}
      </Button>

      <Link component={NextLink} href="/reset_password" variant="p3" color="blue.500">
        {t('auth.login.forgot_password')}
      </Link>

      <Typography variant="p3" color="text.secondary">
        <Link
          onClick={onBack}
          component="button"
          color="text.secondary"
          sx={{ verticalAlign: 'top' }}
        >
          {t('shared.button.back')}
        </Link>
      </Typography>
    </Stack>
  )
}
