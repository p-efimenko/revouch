'use client'

import { useEffect } from 'react'
import { Box, CircularProgress, Stack } from '@mui/material'

import { useInView } from 'react-intersection-observer'

type Props = {
  isLoadingIntial: boolean;
  isLoadingMore: boolean;
  children: React.ReactNode;
  loadMore: () => void;
  LoadingComponent?: React.ReactNode;
}

export const InfiniteScroll = (props: Props) => {
  const { isLoadingIntial, isLoadingMore, children, loadMore, LoadingComponent } = props

  const { ref, inView } = useInView({
    root: null,
    rootMargin: '100px',
    threshold: 0,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && !isLoadingMore && !isLoadingIntial) {
      loadMore()
    }
  }, [inView, isLoadingMore, isLoadingIntial, loadMore])

  return (
    <>
      {children}
      <Stack ref={ref}>
        {isLoadingMore && !isLoadingIntial && (
          <Box display="flex" justifyContent="center" alignItems="center" height={80}>
            {LoadingComponent || <CircularProgress />}
          </Box>
        )}
      </Stack>
    </>
  )
}
