import { useTranslations } from 'next-intl'

import { Icon } from '@/components/ui'
import { Stack, Typography } from '@mui/material'

import { z } from 'zod'

type PasswordRequirementsProps = {
  password: string
}

export const PasswordRequirements = (props: PasswordRequirementsProps) => {
  const { password } = props

  const t = useTranslations()

  const PASSWORD_REQUIREMENTS = [
    {
      label: t('shared.errors.password.length'),
      schema: z.string().min(8).max(20),
    },
    {
      label: t('shared.errors.password.capital_letter'),
      schema: z.string().regex(/[A-Z]/),
    },
    {
      label: t('shared.errors.password.small_letter'),
      schema: z.string().regex(/[a-z]/),
    },
    {
      label: t('shared.errors.password.digit'),
      schema: z.string().regex(/[0-9]/),
    },
    {
      label: t('shared.errors.password.special_character'),
      schema: z.string().regex(/[!@#$%^&*(),.?":{}|<>]/),
    },
  ]

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
