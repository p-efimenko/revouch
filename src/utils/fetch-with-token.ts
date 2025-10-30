import type { UserDataResponseDto } from '@/api/models'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

/**
 * Fetch user data from the getMe endpoint using a bearer token.
 * Used in auth callbacks where we have the token but not yet a session.
 */
export async function fetchUserData(
  accessToken: string,
): Promise<UserDataResponseDto | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch user data:', response.statusText)
      return null
    }

    const data = await response.json()
    return data as UserDataResponseDto
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}
