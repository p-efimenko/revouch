import { Skeleton, Stack } from '@mui/material'
import { Revouches } from './components'
import { getUserBySlug } from '@/api/user'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Header } from './components'
import { getQueryClient } from '@/utils/get-query-client'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import auth from '@/auth'

export default async function Profile({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const session = await getServerSession(auth)
  const isUser = session?.user?.slug === slug

  const queryClient = getQueryClient()

  // TODO: Remove this try/catch and research why the query prefetch ignoring the retry option
  try {
    await queryClient.prefetchQuery({
      queryKey: ['user', slug],
      queryFn: () => getUserBySlug(slug!),
    })

    // Check if there was an error in the prefetch
    const queryState = queryClient.getQueryState(['user', slug])

    if (queryState?.error) {
      throw queryState.error
    }
  } catch (error) {
    throw error
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack
        position="relative"
        maxWidth={{ xs: '100%', sm: '100%', md: 600 }}
        alignItems="center" px={{ xs: 16, sm: 52, md: 0 }}
      >
        <Suspense fallback={<SkeletonHeader />}>
          <Header isUser={isUser} slug={slug!} />
        </Suspense>

        <Revouches />
      </Stack>
    </HydrationBoundary>
  )
}

const SkeletonHeader = () => {
  return (
    <Stack alignItems="flex-start" pb={12} pt={48} width="100%">
      <Stack spacing={12} width="100%">
        <Stack spacing={8} alignItems="center" width="100%">
          <Skeleton variant="circular" width={88} height={88} />
          <Stack spacing={4} alignItems="center" width="100%">
            <Skeleton variant="text" width={160} height={32} />
            <Skeleton variant="text" width={220} height={24} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          px={{ xs: 6, sm: 6, md: 96 }}
          height={{ xs: 64, sm: 48, md: 48 }}
          borderRadius={4}
          bgcolor="white.0"
        >
          <Skeleton variant="circular" height={32} width={32} sx={{ bgcolor: 'white.0' }} />
          <Skeleton variant="circular" height={32} width={32} sx={{ bgcolor: 'white.0' }} />
          <Skeleton variant="circular" height={32} width={32} sx={{ bgcolor: 'white.0' }} />
        </Stack>
      </Stack>
    </Stack>
  )
}

