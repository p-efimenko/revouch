'use server'

import { getServerSession } from 'next-auth'
import auth from '@/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    return c.json()
  }

  if (contentType && contentType.includes('application/pdf')) {
    return c.blob() as Promise<T>
  }

  return c.text() as Promise<T>
}

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  const url = new URL(contextUrl)
  const pathname = url.pathname
  const search = url.search
  const baseUrl = BASE_URL

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`)

  return requestUrl.toString()
}

// NOTE: Add headers
const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  const session = await getServerSession(auth)
  // @ts-expect-error - fix type error
  const token = session?.tokens?.accessToken

  return {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  }
}

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url)
  const requestHeaders = await getHeaders(options.headers)

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  }

  const response = await fetch(requestUrl, requestInit)
  console.log('response', response)
  const data = await getBody<T>(response)

  if (!response.ok) {
    throw new Error(JSON.stringify(data))
  }

  return {
    status: response.status,
    data,
    headers: response.headers,
  } as T
}