import { useTranslations } from 'next-intl'

import { SignUpForm } from './components'

export default function SignUp() {
  const t = useTranslations('SignUp')

  return <SignUpForm />
}
