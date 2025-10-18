'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/common'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
  ExpiredLinkStep,
  VerificationCodeStep,
  NewPasswordStep,
  PasswordRecoveryStep,
} from './components'

export default function ResetPassword() {
  const locale = useLocale()
  const t = useTranslations('Login')
  const router = useRouter()

  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')

  const wizard = useWizard([
    {
      id: 'password-recovery-step',
      nodes: ['verification-code-step', 'expired-link-step'],
    },
    {
      id: 'verification-code-step',
      nodes: ['new-password-step', 'password-recovery-step'],
    },
    {
      id: 'expired-link-step',
      nodes: ['new-password-step'],
    },
    {
      id: 'new-password-step',
      nodes: ['verification-code-step', 'expired-link-step'],
    },
  ])

  return (
    <>
      {wizard.currentStepId === 'password-recovery-step' && (
        <PasswordRecoveryStep
          onNext={(email) => {
            setEmail(email)
            wizard.set('verification-code-step')
          }}
        />
      )}

      {wizard.currentStepId === 'verification-code-step' && (
        <VerificationCodeStep
          email={email}
          onNext={(code) => {
            setCode(code)
            wizard.set('new-password-step')
          }}
          onBack={() => wizard.set('password-recovery-step')}
        />
      )}

      {wizard.currentStepId === 'expired-link-step' && (
        <ExpiredLinkStep onBack={() => wizard.set('new-password-step')} />
      )}

      {wizard.currentStepId === 'new-password-step' && (
        <NewPasswordStep
          email={email}
          onBack={() => wizard.set('verification-code-step')}
          onNext={() => wizard.set('expired-link-step')}
        />
      )}
    </>
  )
}
