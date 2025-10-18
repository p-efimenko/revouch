import { useState } from 'react'
import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '@/hooks/form'

import { Icon, TextField, type TextFieldProps } from '@/components/ui'
import { IconButton, InputAdornment, Tooltip } from '@mui/material'

import { type ZodError } from 'zod'

type PasswordFieldProps = TextFieldProps

export const PasswordField = (props: PasswordFieldProps) => {
  const { label, placeholder, size } = props

  const [visible, setVisible] = useState(false)

  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <TextField
      size={size}
      label={label}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      placeholder={placeholder}
      type={visible ? 'text' : 'password'}
      error={errors.length > 0}
      errors={errors.map((error: ZodError) => error.message)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={visible ? 'Hide password' : 'Show password'} arrow placement="top">
                <IconButton onClick={() => setVisible((state) => !state)}>
                  <Icon
                    size={16}
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    name={visible ? 'eye-off' : 'eye'}
                  />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
