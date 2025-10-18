import { z } from 'zod'

export const PASSWORD_SCHEMA = z
  .string()
  .refine(
    (value) =>
      value.length >= 8 &&
      value.length <= 20 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value),
    {
      message: 'The password does not meet the criteria',
    },
  )
