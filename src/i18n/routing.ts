import { defineRouting } from 'next-intl/routing'

const MAX_AGE = 60 * 60 * 24 * 365 // Expire in one year

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'never',
  localeCookie: {
    // Custom cookie name
    name: 'USER_LOCALE',
    maxAge: MAX_AGE,
  },
  alternateLinks: false,
})
