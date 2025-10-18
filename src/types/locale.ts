import { routing } from '@/i18n/routing'
import messages from '@/messages/en.json'

export type Locale = (typeof routing.locales)[number]

export type Messages = typeof messages
