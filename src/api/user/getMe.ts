'use server'

import { apiFetch } from '@/utils/fetch'

export async function getMe() {
  try {
    return await apiFetch('/users/me', {
      method: 'GET',
    })
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Failed to get me')
  }
}
