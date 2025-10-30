import { getFollowingResponse } from '@/api/user/user'

export const LIMIT = 10

/**
 * Calculates the next offset for pagination
 */
export const getNextPageParam = (
  lastPage: getFollowingResponse | undefined,
): number | undefined => {
  if (lastPage?.status !== 200 || !lastPage?.data) {
    return undefined
  }

  const { offset = 0, limit = LIMIT, total } = lastPage.data
  const currentOffset = offset + limit
  return currentOffset < total ? currentOffset : undefined
}

