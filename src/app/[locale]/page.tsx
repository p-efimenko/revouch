import auth from '@/auth'

import { getServerSession } from 'next-auth'
import { getMe } from '@/api/user'

import Index from './Index'

export default async function IndexPage() {
  const session = await getServerSession(auth)

  if (session !== null) {
    await getMe()
  }

  return <Index session={session} />
}
