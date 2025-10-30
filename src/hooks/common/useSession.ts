import { UserDataResponseDto } from '@/api/models/userDataResponseDto'
import { useSession as useNextAuthSession } from 'next-auth/react'
import { useActiveRoute } from './useActiveRoute'

export function useSession() {
  const { data } = useNextAuthSession()
  const user = data?.user as UserDataResponseDto | undefined
  const userProfilePath = user?.slug ? `/${user.slug}` : ''

  const { isActiveRoute: isUser } = useActiveRoute(userProfilePath)

  return {
    isUser,
    userProfilePath,
    ...user,
  }
}
