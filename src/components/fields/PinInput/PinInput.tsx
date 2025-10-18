import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '@/hooks/form'
import { MuiOtpInput, type MuiOtpInputProps } from 'mui-one-time-password-input'
import { Stack, Typography } from '@mui/material'
import type { ZodError } from 'zod'

type PinInputProps = {
  onComplete?: (value: string) => void
} & MuiOtpInputProps

// Helper to check if a value is a string
function matchIsString(value: unknown): value is string {
  return typeof value === 'string'
}

// Helper to check if a value is numeric
export function matchIsNumeric(text: unknown): boolean {
  const isNumber = typeof text === 'number'
  const isString = matchIsString(text)
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
}

// Validate each character entered into the OTP field
const validateChar = (value: string): boolean => {
  return matchIsNumeric(value)
}

export const PinInput = (props: PinInputProps) => {
  const { onComplete, ...rest } = props

  const field = useFieldContext<string>()

  const zodErrors = useStore(field.store, (state) => state.meta.errors)

  const errors = zodErrors.map((error: ZodError) => error.message)

  return (
    <Stack spacing={16}>
      <MuiOtpInput
        {...rest}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        onBlur={field.handleBlur}
        onComplete={(value) => {
          onComplete?.(value)
        }}
        gap={4}
        TextFieldsProps={{
          error: errors.length > 0,
          sx: {
            '& .MuiOutlinedInput-root': {
              width: '32px',
              padding: '0',
            },
          },
          ...rest.TextFieldsProps,
        }}
        validateChar={validateChar}
      />

      {errors.length > 0 && (
        <>
          {errors.map((error: string, index: number) => (
            <Stack spacing={4} ml={2} mt={4} key={index} textAlign="center">
              <Typography variant="p4" color="error">
                {error}
              </Typography>
            </Stack>
          ))}
        </>
      )}
    </Stack>
  )
}
