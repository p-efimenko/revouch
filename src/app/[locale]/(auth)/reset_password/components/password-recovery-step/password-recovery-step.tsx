'use client'

import NextLink from 'next/link'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useAppForm } from '@/hooks/form'
import { useToast } from '@/hooks'

import { Stack, Button, Typography, Link, Box } from '@mui/material'

import { resetPassword } from '@/api/user'

import z from 'zod'
import type { BackendError } from '@/types/errors'

const schema = z.object({
  email: z.email(),
})

const defaultValues: z.input<typeof schema> = {
  email: '',
}

type PasswordRecoveryStepProps = {
  onNext: (email: string) => void
}

export const PasswordRecoveryStep = (props: PasswordRecoveryStepProps) => {
  const { onNext } = props

  const [isPending, startTransition] = useTransition()

  const t = useTranslations()
  const toast = useToast()

  const form = useAppForm({
    defaultValues,
    validators: {
      onDynamic: schema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  })

  const onSubmit = (value: z.input<typeof schema>) => {
    startTransition(async () => {
      try {
        await resetPassword({ email: value.email })

        onNext(value.email)
      } catch (e) {
        const err = e as Error
        const error = JSON.parse(err.message || '{}') as BackendError

        switch (error.code) {
          case 'USER_NOT_FOUND': {
            form.setErrorMap({
              onDynamic: {
                fields: {
                  email: [{ message: t('auth.reset_password.errors.user_not_found') }],
                },
              },
            })
            break
          }
          default: {
            toast.error(t('shared.errors.unexpected_error'))
            console.error(error)
            break
          }
        }
      }
    })
  }

  return (
    <Box width="100%">
      <Stack spacing={16}>
        <Typography variant="h3" color="text.primary" textAlign="center">
          {t('auth.reset_password.title')}
        </Typography>

        <form
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
          </Stack>

          <Button
            fullWidth
            type="submit"
            size="extra-large"
            sx={{ mt: 16 }}
            onClick={() => form.handleSubmit({ submitAction: 'reset-password' })}
            loading={isPending}
          >
            {t('auth.reset_password.button.reset_password')}
          </Button>
        </form>

        <Stack textAlign="center">
          <Typography variant="p3" color="text.secondary">
            <Link
              component={NextLink}
              href="/login"
              color="text.secondary"
              sx={{ verticalAlign: 'top' }}
            >
              {t('shared.button.back')}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
