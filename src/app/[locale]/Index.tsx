'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import { SidebarLayout } from '@/components/layouts'
import { useModal } from '@/components/ui/Modal'

type Props = {
  session: Session | null
}

export default function Index({ session }: Props) {
  function onLogoutClick() {
    signOut()
  }

  const { open } = useModal('TestModal')

  return (
    <>
      {/* {session?.user?.email ? (
        <>
          <p>Logged in as {session.user.email}</p>
          <p>
            <Link href={'/secret'}>Secret page</Link>
          </p>
          <button onClick={onLogoutClick} type="button">
            Logout
          </button>
        </>
      ) : ( */}
      <>
        <SidebarLayout>
          {/* <Profile /> */}
          <p>You are logged out</p>
          <Link href={'/login'}>Login</Link>

          <button onClick={() => open()} type="button">
            Open Test Modal
          </button>
        </SidebarLayout>
      </>
      {/* )} */}
    </>
  )
}
