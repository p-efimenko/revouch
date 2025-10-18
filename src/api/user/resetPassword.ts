'use server'

import { apiFetch } from '@/utils/fetch'

export async function resetPassword(email: string) {
  try {
    await apiFetch('/users/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
    })
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Failed to reset password')
  }
}
