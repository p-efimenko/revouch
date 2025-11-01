'use client'

import { useMemo, useCallback, useState, useEffect } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getFollowingResponse } from '@/api/user/user'
import { getFollowing } from '@/api/user'

import { Box, CircularProgress } from '@mui/material'
import { Item } from '../Item'
import { EmptyState } from '../EmptyState'
import { InfiniteScroll } from '@/components/common'

import { LIMIT, getNextPageParam, extractUsersFromPage } from '../../utils'
import { SkeletonList } from '../Skeleton'

type ListProps = {
  userId: string
  search?: string
}

export const List = (props: ListProps) => {
  const { userId, search } = props

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    fetchNextPage,
    error,
  } = useInfiniteQuery<getFollowingResponse>({
    queryKey: ['following', userId, { search }],
    queryFn: ({ pageParam = 0 }) => {
      return getFollowing(userId, {
        offset: pageParam as number,
        limit: LIMIT,
        search: search || undefined,
      })
    },
    initialPageParam: 0,
    getNextPageParam,
  })

  // Flatten all users from all pages
  const users = useMemo(() => {
    return data?.pages?.flatMap(extractUsersFromPage) ?? []
  }, [data?.pages])

  const isNoUsers = !users || users.length === 0
  const isFetch = isFetchingNextPage || isFetching
  const isLoadingFinal = isLoading || isFetch

  // Memoize loadMore callback to prevent unnecessary re-renders
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (error) {
    return (
      <Box>{error instanceof Error ? error.message : 'An error occurred'}</Box>
    )
  }

  // Show skeleton only on very first load when component mounts, not on later refetches or pagination
  if (isLoadingFinal) {
    return <SkeletonList />
  }

  if (isNoUsers) {
    return <EmptyState
      title="No friends found"
      description="You don't have any friends yet."
      icon="friends"
    />
  }

  return (
    <Box width="100%">
      <InfiniteScroll
        isLoadingIntial={isLoading}
        isLoadingMore={isFetchingNextPage}
        loadMore={loadMore}
      >
        {users.map((user) => (
          <Item key={user.id} user={user} />
        ))}
      </InfiniteScroll>
    </Box>
  )
}

