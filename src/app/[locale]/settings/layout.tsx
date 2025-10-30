'use client'

import { SidebarLayout } from '@/components/layouts'
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box, Stack } from '@mui/material'
import { ListItems } from './components/ListItems'
import { ListItemData } from '@/types/settings'
import { signOut } from 'next-auth/react'

export const settings: ListItemData[] = [
  {
    id: 0,
    icon: 'bio',
    title: 'Bio',
    href: '/settings/bio',
  },
  {
    id: 1,
    icon: 'friends',
    title: 'Friends',
    href: '/settings/friends',
  },
  {
    id: 2,
    icon: 'interests',
    title: 'Interests',
    href: '/settings/interests',
  },
  {
    id: 3,
    icon: 'notifications',
    title: 'Notifications',
    href: '/settings/notifications',
  },
  {
    id: 4,
    icon: 'collections',
    title: 'Collections',
    href: '/settings/collections',
  },
  {
    id: 5,
    icon: 'activities',
    title: 'Activities',
    href: '/settings/activities',
  },
  {
    id: 6,
    icon: 'share',
    title: 'Social & Messengers',
    href: '/settings/social-messengers',
  },
]

import { usePathname } from 'next/navigation'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const pathname = usePathname()

  const isSettingsPage = pathname?.endsWith('/settings')
  const showSidebar = !isMobile || isSettingsPage

  const onLogoutClick = async () => {
    await signOut({ callbackUrl: '/', redirect: true })
  }

  return (
    <SidebarLayout>
      <Stack direction="row" minHeight="100%">
        {showSidebar && (
          <Stack
            width={{ xs: '100%', sm: 300, md: 340 }}
            maxWidth={{ xs: '100%', sm: 300, md: 340 }}
            minWidth={{ xs: '100%', sm: 300, md: 340 }}
            borderRight={1}
            alignItems="flex-start"
            borderColor="divider"
            bgcolor="white.0"
            px={24}
          >
            <Typography pt={104} pb={32} variant="h2">
              Settings
            </Typography>
            <ListItems items={settings} />
            <Button
              variant="text"
              size="large"
              onClick={onLogoutClick}
              sx={{ color: 'text.secondary' }}>
              Log out
            </Button>
          </Stack>
        )}
        {!isSettingsPage && (
          <Box
            bgcolor="white.0"
            width="100%"

            maxWidth={{ xs: '100%', sm: '100%', md: 400 }}
            minHeight="100%"
          >
            {children}
          </Box>
        )}
      </Stack>
    </SidebarLayout >
  )
}
