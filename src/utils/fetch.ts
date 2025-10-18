import { getServerSession } from 'next-auth'
import auth from '@/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const session = await getServerSession(auth)
  // @ts-expect-error - fix type error
  const token = session?.tokens?.accessToken
  const url = getBaseUrl(BASE_URL, endpoint)

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  // if error
  if (!res.ok) {
    throw new Error(await res.text())
  }

  return await res.json()
}

function getBaseUrl(base: string, endpoint: string) {
  return new URL(endpoint.replace(/^\//, ''), base.endsWith('/') ? base : base + '/').toString()
}
