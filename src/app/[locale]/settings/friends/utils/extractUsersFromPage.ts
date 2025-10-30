import { getFollowingResponse } from '@/api/user/user'

/**
 * Extracts users array from a page response
 */
export const extractUsersFromPage = (
  page: getFollowingResponse | undefined,
) => {
  if (page?.status === 200 && page?.data?.data) {
    return page.data.data
  }
  return []
}

