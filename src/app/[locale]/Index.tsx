'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SidebarLayout } from '@/components/layouts'
import { Center } from '@/components/ui'

import { Typography, Stack, Button } from '@mui/material'
import { Session } from 'next-auth'

export default function Index({ session }: { session: Session | null }) {

  const router = useRouter()

  const isLoggedIn = session !== null

  return (
    <>
      <SidebarLayout>
        <Center>
          <Stack spacing={16} textAlign="center">

            <Typography variant="h1">Welcome to Revouch</Typography>

            <Typography variant="p1">
              {isLoggedIn ? 'You are logged in' : 'You are not logged in'}
            </Typography>

            {isLoggedIn ? (
              <Button variant="contained" color="primary" onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
                Login
              </Button>
            )}
          </Stack>
        </Center>
      </SidebarLayout>
    </>
  )
}
