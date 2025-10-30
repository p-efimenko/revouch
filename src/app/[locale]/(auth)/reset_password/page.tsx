'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/common'

import { VerificationCodeStep, NewPasswordStep, PasswordRecoveryStep } from './components'

export default function ResetPassword() {
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
      id: 'new-password-step',
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
          onNext={() => wizard.set('new-password-step')}
          onBack={() => wizard.set('password-recovery-step')}
        />
      )}

      {wizard.currentStepId === 'new-password-step' && <NewPasswordStep email={email} />}
    </>
  )
}
