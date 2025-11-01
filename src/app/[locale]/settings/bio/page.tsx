'use client'

import { Stack, Typography, Skeleton, Box } from '@mui/material'
import { MobileBackButton } from '../components'
import { BioForm, UserAvatar } from './components'

import { useSession } from 'next-auth/react'

export default function BioPage() {
  const { data: session } = useSession()

  const isLoading = !session

  return (
    <Stack px={24} pt={24}>

      <MobileBackButton href="/settings" title="Settings" />

      <Typography pt={48} pb={32} variant="h2">
        Bio
      </Typography>

      {isLoading ? (
        <BioSkeleton />
      ) : (
        <>
          <UserAvatar />
          <BioForm />
        </>
      )}
    </Stack>
  )
}

const BioSkeleton = () => {
  return (
    <Stack spacing={10}>
      <Stack
        py={16}
        direction="row"
        justifyContent="center"
      >
        <Skeleton variant="circular" width={124} height={124} />
      </Stack>

      <Stack spacing={16} alignItems="end">
        <Skeleton variant="rounded" width="100%" height={70} />
        <Skeleton variant="rounded" width="100%" height={95} />
        <Box>
          <Skeleton variant="rounded" width={100} height={48} sx={{ mt: 26 }} />
        </Box>
      </Stack>
    </Stack>
  )
}