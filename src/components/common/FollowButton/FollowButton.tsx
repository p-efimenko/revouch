'use client'

import { followUser, unfollowUser } from '@/api/user'
import { useToast } from '@/hooks/custom'
import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from '@/hooks/common/useSession'
import { useModal } from '@/components/ui/Modal'
import type { UserDataResponseDto } from '@/api/models'

type FollowButtonProps = {
  user: UserDataResponseDto,
  isModal?: boolean
}

export const FollowButton = (props: FollowButtonProps) => {
  const { user, isModal = false } = props
  const { isFollowedByMe = false, id: userId } = user

  const { open } = useModal('UnfollowModal')

  // Initialize the custom toast hook for displaying notifications
  const toast = useToast()
  const queryClient = useQueryClient()
  const session = useSession()
  const currentUserId = session?.id
  const [isFollowing, setIsFollowing] = useState(isFollowedByMe)

  // Mutation for following a user
  const { mutateAsync: followAsync, isPending: isFollowPending } = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: () => {
      toast.success('Successfully followed user')
      setIsFollowing(true)
      // Invalidate all following queries for the current user to update counters
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: ['following', currentUserId],
        })
      }
    },
    onError: () => {
      toast.error('Failed to follow user')
    },
  })

  // Mutation for unfollowing a user
  const { mutateAsync: unfollowAsync, isPending: isUnfollowPending } = useMutation({
    mutationFn: (userId: string) => unfollowUser(userId),
    onSuccess: () => {
      toast.success('Successfully unfollowed user')
      setIsFollowing(false)
      // Invalidate all following queries for the current user to update counters
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: ['following', currentUserId],
        })
      }
    },
    onError: () => {
      toast.error('Failed to unfollow user')
    },
  })

  // Determine if either mutation is currently loading
  const isLoading = isFollowPending || isUnfollowPending

  // Handler when the follow/unfollow button is clicked
  const handleClick = () => {
    if (isFollowing) {
      if (isModal) {
        open({ user, onUnfollow: () => unfollowAsync(userId) })
      } else {
        unfollowAsync(userId)
      }
    } else {
      followAsync(userId)
    }
  }

  return (
    <Button
      size="small"
      variant={isFollowing ? 'outlined' : 'contained'}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}