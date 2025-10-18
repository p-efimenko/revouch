'use client'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import { useWizard } from '@/hooks/common'
import { EmailStep, LoginStep } from './components'

export default function Login() {
  const locale = useLocale()
  const t = useTranslations('Login')
  const router = useRouter()

  // const searchParams = useSearchParams()
  // const type = searchParams.get('type')

  // useEffect(() => {
  //   if (type === 'email') {
  //     wizard.set("email-step")
  //   }
  // }, [type])

  const wizard = useWizard([
    {
      id: 'login-step',
      nodes: ['email-step'],
    },
    {
      id: 'email-step',
      nodes: ['login-step'],
    },
  ])

  // const handleSignInWithEmail = () => {
  //   router.push('/login?type=email')
  // }

  return (
    <>
      {wizard.currentStepId === 'login-step' && (
        <LoginStep onNext={() => wizard.set('email-step')} />
      )}

      {wizard.currentStepId === 'email-step' && (
        <EmailStep onBack={() => wizard.set('login-step')} />
      )}
    </>
  )
}
