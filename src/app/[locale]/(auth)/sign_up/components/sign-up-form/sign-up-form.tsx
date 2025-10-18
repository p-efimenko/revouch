'use client'

import NextLink from 'next/link'

import { signUp } from 'aws-amplify/auth'
import { signIn } from 'next-auth/react'

import { useTransition } from 'react'
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
  console.log('NEXT_PUBLIC_COGNITO_CLIENT_ID:', process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID)
  console.log('NEXT_PUBLIC_COGNITO_USER_POOL_ID:', process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID)

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

        toast.success('Account created successfully')
      } catch (e) {
        const error = e as Error
        // handle error from cognito to form
        if (error.message === 'User already exists') {
          form.setErrorMap({
            onDynamic: {
              fields: {
                email: [{ message: 'Username already exists' }],
              },
            },
          })
        } else {
          console.error(error)
          toast.error(error.message)
        }
      }
    })
  }

  return (
    <Box width="100%">
      <Stack spacing={16}>
        <Typography variant="h3" color="text.primary" textAlign="center">
          Create an account
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
              {(field) => <field.TextField placeholder="Name" endIcon="profile" />}
            </form.AppField>

            <form.AppField name="email">
              {(field) => <field.TextField placeholder="Email" endIcon="email" />}
            </form.AppField>

            <form.AppField name="password">
              {(field) => <field.PasswordField placeholder="Password" />}
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
          Create account
        </Button>

        <Stack textAlign="center">
          <Typography variant="p3" color="text.secondary">
            <Box component="span" mr={4}>
              Have an account already?
            </Box>

            <Link component={NextLink} href="/login" sx={{ verticalAlign: 'top' }}>
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
