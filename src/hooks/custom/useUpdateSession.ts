'use client'

import { useSession as useNextAuthSession } from 'next-auth/react'

/**
 * Hook to update the NextAuth session with fresh user data from the backend.
 * Call this after making changes to user data (like updating bio, avatar, etc.)
 * 
 * @example
 * ```tsx
 * const { updateSession } = useUpdateSession()
 * 
 * // After updating user data
 * await updateSession()
 * ```
 */
export function useUpdateSession() {
  const { update } = useNextAuthSession()

  const updateSession = async () => {
    // Trigger the jwt callback with trigger='update' to re-fetch user data
    await update()
  }

  return { updateSession }
}
