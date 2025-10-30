'use client'

import { useAnchorScroll } from '@/hooks/common'
import { Box, StackProps, styled } from '@mui/material'
import { SmallUserHeader } from '../SmallUserHeader'
import { UserHeader } from '../UserHeader'
import { breakpoints } from '@/theme/breakpoints'
import { getUserBySlug } from '@/api/user'
import { useQuery } from '@tanstack/react-query'
import type { UserDataResponseDto } from '@/api/models'

type HeaderProps = {
  isUser: boolean
  slug: string
}

export const Header = (props: HeaderProps) => {
  const { isUser, slug } = props

  const { anchorRef, show } = useAnchorScroll()

  const { data } = useQuery({
    queryKey: ['user', slug],
    queryFn: () => getUserBySlug(slug!),
  })

  const user = data?.data as UserDataResponseDto | undefined

  return (
    <>
      <UserHeader isUser={isUser} user={user} />
      <Box ref={anchorRef} />
      <AnimatedHeaderBox show={show}>
        <SmallUserHeader isUser={isUser} user={user} />
      </AnimatedHeaderBox>
    </>
  )
}

type AnimatedHeaderBoxProps = StackProps & {
  show: boolean
}

export const AnimatedHeaderBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'show',
})<AnimatedHeaderBoxProps>(({ show = false }) => ({
  position: 'fixed',
  top: 0,

  zIndex: 10,

  opacity: show ? 1 : 0,
  pointerEvents: show ? 'auto' : 'none',
  transform: show ? 'translate(0, 0)' : 'translate(0, -100%)',

  transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',

  width: '100%',

  [`@media(max-width: ${breakpoints.values.xs}px)`]: {
    maxWidth: '100%',
    left: 64,
  },

  [`@media (min-width: ${breakpoints.values.sm}px) and (max-width: ${breakpoints.values.md - 1}px)`]: {
    maxWidth: 'calc(100% - 168px)',
    left: 116,
  },

  [`@media(min-width: ${breakpoints.values.md}px)`]: {
    maxWidth: 600,
  },
}))