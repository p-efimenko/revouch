'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'
import { getFollowingResponse } from '@/api/user/user'
import { getFollowing } from '@/api/user'
import { LIMIT, getNextPageParam } from '../../utils'

export const Header = ({ userId }: { userId: string }) => {

  const { data } = useInfiniteQuery<getFollowingResponse>({
    queryKey: ['following', userId],
    queryFn: ({ pageParam = 0 }) => {
      return getFollowing(userId, {
        offset: pageParam as number,
        limit: LIMIT,
      })
    },
    initialPageParam: 0,
    getNextPageParam,
  })

  // Extract total from the first page
  const totalCount =
    data?.pages?.[0]?.status === 200 && data?.pages?.[0]?.data?.total
      ? data.pages[0].data.total
      : 0

  return (
    <Typography pt={48} pb={32} variant="h2">
      {totalCount > 0 && `${totalCount}`} Friends
    </Typography>
  )
}

