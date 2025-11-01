import auth from '@/auth'
import { getServerSession } from 'next-auth'


import Index from './Index'

export default async function IndexPage() {
  const session = await getServerSession(auth)

  return <Index session={session} />
}
