import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { loadI18nTranslations } from 'next-intl-split/load'

import { routing } from '@/i18n/routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  // The relative path to the messages folder
  let messages = (await import(`@/messages/${locale}.json`)).default

  if (process.env.NODE_ENV === 'development') {
    // The provided route should starts from the src folder with the Relative approach.
    messages = loadI18nTranslations('./src/messages', locale, true)
  }

  return {
    locale,
    messages,
    timeZone: 'Europe/Kiev',
    now: new Date(),
  }
})
