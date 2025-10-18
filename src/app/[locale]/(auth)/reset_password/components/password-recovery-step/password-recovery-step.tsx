'use client'

import NextLink from 'next/link'
import { useTransition } from 'react'
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
        await resetPassword(value.email)

        onNext(value.email)
      } catch (e) {
        const error = e as BackendError

        switch (error.code) {
          case 'USER_NOT_FOUND': {
            form.setErrorMap({
              onDynamic: {
                fields: {
                  email: [{ message: 'Email is wrong or not found.' }],
                },
              },
            })
            break
          }
          default: {
            toast.error('An unexpected error occurred. Please try again.')
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
          Password recovery
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
              {(field) => <field.TextField placeholder="Email" endIcon="email" />}
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
            Reset Password
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
              Back
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
