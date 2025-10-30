'use client'

import { useAppForm } from '@/hooks/form'
import { Box, Button, Stack } from '@mui/material'
import { z } from 'zod'

import { UserDataResponseDto } from '@/api/models'
import { UpdateUserDto } from '@/api/models'
import { updateMe } from '@/api/user'

import { useTranslations } from 'next-intl'
import { useMutation } from '@tanstack/react-query'
import { useToast, useUpdateSession } from '@/hooks'
import { getQueryClient } from '@/utils/get-query-client'
import { ApiError } from '@/types/errors'

const ABOUT_MAX_LENGTH = 256

const schema = z.object({
  name: z.string()
    .min(1, { message: 'This field is required' })
    .max(64, { message: 'Name must be less than 64 characters' }),
  about: z.string().max(ABOUT_MAX_LENGTH, { message: '' }),
})

const defaultValues: z.input<typeof schema> = {
  name: '',
  about: '',
}

interface FormProps {
  user: UserDataResponseDto
}

export const Form = (props: FormProps) => {
  const { user } = props

  const queryClient = getQueryClient()
  //const t = useTranslations()
  const toast = useToast()
  const { updateSession } = useUpdateSession()

  const form = useAppForm({
    defaultValues: {
      name: user?.fullName || defaultValues.name,
      about: user?.bio || defaultValues.about,
    },
    validators: {
      onDynamic: schema,
    },
    onSubmit: ({ value }) => {
      mutateAsync({
        fullName: value.name,
        bio: value.about,
      })
    },
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateUserDto) => updateMe(data),
    onSuccess: ({ data }) => {
      toast.success('Bio updated successfully')
      queryClient.invalidateQueries({ queryKey: ['me'] })
      updateSession()
    },
    onError: (error) => {

      toast.error('Failed to update bio')
      console.log('error', JSON.parse(error.message))
    },
  })

  return (
    <>
      <Box
        component="form"
        name="bio"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <Stack spacing={8}>
          <form.AppField name="name">
            {(field) => (
              <field.TextField
                label="Name"
                placeholder="Rodrige Guzman"
                variant="standard"
              />
            )}
          </form.AppField>

          <form.AppField name="about">
            {(field) => {
              return (
                <field.TextField
                  label="About"
                  multiline
                  placeholder="About"
                  variant="standard"
                  maxLength={ABOUT_MAX_LENGTH}
                />
              )
            }}
          </form.AppField>
        </Stack>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={64}>
        <form.Subscribe selector={(state) => state}>
          {({ values }) => {
            const { about = '', name = '' } = values

            // Button should be enabled only if there's a new name,
            // and about (which can be empty) is within correct length limits.
            // isDisabled if:
            //  - name is empty (need new name)
            //  - about length exceeds maxLength
            const isDisabled = !name || about.length > ABOUT_MAX_LENGTH

            return (
              <Button
                type="submit"
                size="large"
                disabled={isDisabled || isPending}
                onClick={() => form.handleSubmit({ submitAction: 'save' })}
                loading={isPending}
              >
                Save
              </Button>
            )
          }}
        </form.Subscribe>
      </Box>
    </>
  )
}