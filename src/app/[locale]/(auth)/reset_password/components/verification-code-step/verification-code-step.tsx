'use client'

import { useTransition } from 'react'
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
                  code: [{ message: 'Invalid verification code.' }],
                },
              },
            })
            break
          }
          case 'LimitExceededException': {
            toast.error('Attempt limit exceeded, please try after some time.')
            break
          }
          default: {
            toast.error('An unexpected error occurred. Please try again.')
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
          Verification code was sent
        </Typography>

        <Typography variant="p3" textAlign="center">
          We’ve sent you verification code to <br />
          {email}
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
            Back
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}

const Timer = ({ email }: { email: string }) => {
  const [isResendPending, startResendTransition] = useTransition()

  const timer = useTimer(TIMER_VALUE)
  const toast = useToast()

  const handleResendCode = () => {
    startResendTransition(async () => {
      try {
        await resetPassword({
          username: email,
        })

        toast.success('Verification code resent successfully!')
        timer.restart(TIMER_VALUE)
      } catch (e) {
        timer.clear()
        console.error(e)
        toast.error('An unexpected error occurred. Please try again.')
      }
    })
  }

  return (
    <>
      {timer.active ? (
        <Typography variant="p3" color="text.secondary" height={32}>
          Resend code in {timer.count} sec
        </Typography>
      ) : (
        <Button
          type="submit"
          size="medium"
          variant="outlined"
          onClick={() => handleResendCode()}
          loading={isResendPending}
        >
          Resend
        </Button>
      )}
    </>
  )
}
