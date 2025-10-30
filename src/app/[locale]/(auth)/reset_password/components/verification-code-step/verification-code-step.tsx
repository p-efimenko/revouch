'use client'

import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useAppForm } from '@/hooks/form'
import { useTimer } from '@/hooks/common'
import { useToast } from '@/hooks'

import { Box, Button, Link, Stack, Typography } from '@mui/material'

import { resetPassword, confirmResetPassword } from 'aws-amplify/auth'

import z from 'zod'

import { TEMPORARY_PASSWORD } from '../../constants'

const schema = z.object({
  code: z.string().min(1, { message: 'Verification code must be 6 digits' }),
})

const defaultValues: z.input<typeof schema> = {
  code: '',
}

type VerificationCodeStepProps = {
  email: string
  onNext: (code: string) => void
  onBack: () => void
}

const TIMER_VALUE = 59

export const VerificationCodeStep = (props: VerificationCodeStepProps) => {
  const { onNext, onBack, email } = props

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

  const onSubmit = async (value: z.input<typeof schema>) => {
    startTransition(async () => {
      try {
        await confirmResetPassword({
          confirmationCode: value.code,
          username: email,
          newPassword: TEMPORARY_PASSWORD,
        })

        onNext(value.code)
      } catch (e) {
        const error = e as Error

        switch (error.name) {
          case 'CodeMismatchException': {
            form.setErrorMap({
              onDynamic: {
                fields: {
                  code: [{ message: t('auth.reset_password.errors.invalid_verification_code') }],
                },
              },
            })
            break
          }
          case 'LimitExceededException': {
            toast.error(t('shared.errors.attempt_limit_exceeded'))
            break
          }
          default: {
            toast.error(t('shared.errors.unexpected_error'))
            console.error(error)
            break
          }
        }

        form.setFieldValue('code', '', { dontValidate: true })
        console.error(e)
      }
    })
  }

  return (
    <Box width="100%">
      <Stack alignItems="center" spacing={16}>
        <Typography variant="h3" textAlign="center">
          {t('auth.reset_password.verification_code_sent')}
        </Typography>

        <Typography variant="p3" textAlign="center">
          {t('auth.reset_password.verification_code_sent_message', { email })}
        </Typography>

        <form
          name="email-step"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Box py={24} maxWidth="212px">
            <form.AppField name="code">
              {(field) => (
                <field.PinInput
                  length={6}
                  onComplete={() => form.handleSubmit()}
                  TextFieldsProps={{ disabled: isPending }}
                />
              )}
            </form.AppField>
          </Box>
        </form>

        <Timer email={email} />

        <Typography variant="p3" color="text.secondary">
          <Link
            component="button"
            onClick={onBack}
            color="text.secondary"
            sx={{ verticalAlign: 'top' }}
          >
            {t('shared.button.back')}
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}

const Timer = ({ email }: { email: string }) => {
  const [isResendPending, startResendTransition] = useTransition()

  const t = useTranslations()
  const timer = useTimer(TIMER_VALUE)
  const toast = useToast()

  const handleResendCode = () => {
    startResendTransition(async () => {
      try {
        await resetPassword({
          username: email,
        })

        toast.success(t('auth.reset_password.verification_code_resent_successfully'))
        timer.restart(TIMER_VALUE)
      } catch (e) {
        timer.clear()
        console.error(e)
        toast.error(t('shared.errors.unexpected_error'))
      }
    })
  }

  return (
    <>
      {timer.active ? (
        <Typography variant="p3" color="text.secondary" height={32}>
          {t('auth.reset_password.resend_code_in', { count: timer.count })}
        </Typography>
      ) : (
        <Button
          type="submit"
          size="medium"
          variant="outlined"
          onClick={() => handleResendCode()}
          loading={isResendPending}
        >
          {t('auth.reset_password.button.resend_code')}
        </Button>
      )}
    </>
  )
}
