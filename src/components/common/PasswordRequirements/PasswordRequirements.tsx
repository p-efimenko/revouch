import { Icon } from '@/components/ui'
import { Stack, Typography } from '@mui/material'

import { z } from 'zod'

export const PASSWORD_REQUIREMENTS = [
  {
    label: 'Length: 8-20 characters',
    schema: z.string().min(8).max(20),
  },
  {
    label: 'At least one capital letter (A-Z)',
    schema: z.string().regex(/[A-Z]/),
  },
  {
    label: 'At least one small letter (a-z)',
    schema: z.string().regex(/[a-z]/),
  },
  {
    label: 'At least one digit (0-9)',
    schema: z.string().regex(/[0-9]/),
  },
  {
    label: 'At least one special character (e.g.,!@#$%^&*)',
    schema: z.string().regex(/[!@#$%^&*(),.?":{}|<>]/),
  },
]

type PasswordRequirementsProps = {
  password: string
}

export const PasswordRequirements = (props: PasswordRequirementsProps) => {
  const { password } = props

  if (password.length === 0) return null

  return (
    <Stack spacing={4}>
      {PASSWORD_REQUIREMENTS.map(({ label, schema }, index) => {
        const isValid = password ? schema.safeParse(password).success : false
        const color = isValid ? 'success.main' : 'error.main'
        const icon = isValid ? 'checkbox' : 'error'

        return (
          <Stack key={index} direction="row" alignItems="center" spacing={8}>
            <Icon name={icon} size={12} sx={{ color }} />

            <Typography variant="p4" color={color}>
              {label}
            </Typography>
          </Stack>
        )
      })}
    </Stack>
  )
}
