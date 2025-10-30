import { Skeleton, Stack } from '@mui/material'
import { MobileBackButton } from '../components'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/utils/get-query-client'
import { getFollowing } from '@/api/user'
import { Header } from './components'
import { auth } from '@/auth'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { LIMIT, getNextPageParam } from './utils'
import { FriendsClient } from './components'

export default async function Friends() {
  const session = await getServerSession(auth)
  const userId = (session?.user as { id?: string } | undefined)?.id

  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['following', userId],
    queryFn: ({ pageParam = 0 }) =>
      getFollowing(userId!, { offset: pageParam as number, limit: LIMIT }),
    initialPageParam: 0,
    getNextPageParam,
  })

  return (
    <Stack pl={24} pt={24} minHeight="100%">
      <MobileBackButton href="/settings" title="Settings" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SkeletonHeader />}>
          <Header userId={userId!} />
        </Suspense>

        <FriendsClient userId={userId!} />

      </HydrationBoundary>
    </Stack>
  )
}

const SkeletonHeader = () => {
  return (
    <Stack pt={48} pb={32}>
      <Skeleton variant="text" width={200} height={48} />
    </Stack>
  )
}