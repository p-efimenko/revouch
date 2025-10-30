'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/common'

import { EmailStep, LoginStep } from '../../components'

type WizardProps = {
  type?: string
}

export const Wizard = (props: WizardProps) => {
  const { type } = props

  const router = useRouter()

  const wizard = useWizard(
    [
      {
        id: 'login-step',
        nodes: ['email-step'],
      },
      {
        id: 'email-step',
        nodes: ['login-step'],
      },
    ],
    type === 'email' ? 'email-step' : 'login-step',
  )

  const handleSignInWithEmail = () => {
    router.replace('/login?type=email')
    wizard.set('email-step')
  }

  const handleBackToLogin = () => {
    router.replace('/login')
    wizard.set('login-step')
  }

  return (
    <>
      {wizard.currentStepId === 'login-step' && (
        <LoginStep onNext={() => handleSignInWithEmail()} />
      )}

      {wizard.currentStepId === 'email-step' && <EmailStep onBack={() => handleBackToLogin()} />}
    </>
  )
}
