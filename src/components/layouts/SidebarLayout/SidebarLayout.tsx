'use client'

import Box from '@mui/material/Box'
import Stack, { StackProps } from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@/components/ui'
import NextLink from 'next/link'
import { useActiveRoute, useSession } from '@/hooks/common'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const SidebarLayout = ({ children }: Props) => {

  const { userProfilePath } = useSession()
  const { isActiveRoute } = useActiveRoute(userProfilePath)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      display="flex"
      minHeight="100dvh"
      sx={{
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <Sidebar isMobile={isMobile}>
        <IconButton size="extra-large">
          <Icon name="feed" size={16} />
        </IconButton>

        <IconButton size="extra-large">
          <Icon name="add-revouch" size={16} />
        </IconButton>

        <IconButton
          size="extra-large"
          component={NextLink}
          href={userProfilePath}
          sx={{
            backgroundColor: isActiveRoute ? 'black.100' : 'transparent',
          }}
        >
          <Icon name="profile" size={16} color={isActiveRoute ? 'primary' : 'inherit'} />
        </IconButton>
      </Sidebar>

      <Box
        component="main"
        width="100%"
        overflow="auto"
        height="100dvh"
        sx={{
          ml: isMobile ? 0 : '64px',
          mt: isMobile ? 0 : 0,
          pt: isMobile ? 0 : 0,
          pb: isMobile ? '64px' : 0,
          transition: 'margin 0.2s',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

type SidebarProps = StackProps & {
  isMobile: boolean
}

export const Sidebar = styled(Stack, {
  shouldForwardProp: prop => prop !== 'isMobile',
})<SidebarProps>(({ theme, isMobile }) => ({
  zIndex: 1200,
  alignItems: 'center',
  justifyContent: 'center',
  gap: isMobile ? 48 : 20,

  position: 'fixed',
  top: isMobile ? 'auto' : 0,
  left: isMobile ? 0 : 0,
  right: isMobile ? 0 : 'auto',
  bottom: isMobile ? 0 : 'auto',
  width: isMobile ? '100vw' : 64,
  minWidth: isMobile ? '100vw' : 64,
  height: isMobile ? 64 : '100dvh',
  minHeight: isMobile ? 64 : '100dvh',
  flexDirection: isMobile ? 'row' : 'column',
  ...(isMobile
    ? {
      borderTop: 1,
      borderTopStyle: 'solid',
      borderTopColor: theme.palette.divider,
      borderRight: 'none',
      backgroundColor: theme.palette.white[0],
    }
    : {
      borderRight: 1,
      borderRightStyle: 'solid',
      borderRightColor: theme.palette.divider,
      borderTop: 'none',
      backgroundColor: theme.palette.white[0],
    }),
}))