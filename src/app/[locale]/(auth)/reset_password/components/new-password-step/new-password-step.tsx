'use client'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useAppForm } from '@/hooks/form'
import { useToast } from '@/hooks'

import { Box, Stack, Typography, Button, Link } from '@mui/material'
import { PasswordRequirements } from '@/components/common'

import { signIn, signOut, updatePassword } from 'aws-amplify/auth'

import z from 'zod'
import { PASSWORD_SCHEMA } from '@/validation/password'

import { TEMPORARY_PASSWORD } from '../../constants'

const schema = z.object({
  password: PASSWORD_SCHEMA,
})

const defaultValues: z.input<typeof schema> = {
  password: '',
}

type NewPasswordStepProps = {
  email: string
}

export const NewPasswordStep = (props: NewPasswordStepProps) => {
  const { email } = props

  const [isPending, startTransition] = useTransition()

  const t = useTranslations()
  const toast = useToast()
  const router = useRouter()

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
        await signIn({
          username: email,
          password: TEMPORARY_PASSWORD,
        })

        await updatePassword({
          oldPassword: TEMPORARY_PASSWORD,
          newPassword: value.password,
        })

        await signOut()

        toast.success(t('auth.reset_password.success.password_updated'))
        router.replace('/login')
      } catch (e) {
        toast.error(t('shared.errors.unexpected_error'))
        console.error(e)
      }
    })
  }

  return (
    <Box width="100%">
      <Stack spacing={16}>
        <Typography variant="h3" color="text.primary" textAlign="center">
          {t('auth.reset_password.new_password_title')}
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
          onClick={() => form.handleSubmit({ submitAction: 'new-password' })}
          loading={isPending}
        >
          {t('auth.reset_password.button.update_password')}
        </Button>
      </Stack>
    </Box>
  )
}
