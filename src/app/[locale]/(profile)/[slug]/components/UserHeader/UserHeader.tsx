import type { UserDataResponseDto } from '@/api/models'
import { ActionButton, FollowButton, Followers } from '@/components/common'
import { Icon } from '@/components/ui'
import { IconName } from '@/components/ui/Icon/Icon'
import { Avatar, Box, Chip, IconButton, Stack, Typography } from '@mui/material'

import NextLink from 'next/link'

type UserHeaderProps = {
  isUser: boolean
  user: UserDataResponseDto | undefined
}

export const UserHeader = (props: UserHeaderProps) => {

  const { isUser, user } = props

  return (
    <Stack alignItems="flex-start" pb={12} pt={48} width="100%">
      <Stack spacing={12} width="100%" alignItems="center">
        <Stack spacing={8} alignItems="center" width="100%">
          <Stack
            position="relative"
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Avatar sx={{ width: 88, height: 88 }} src={user?.avatar || ''} alt={user?.fullName || ''} />
            {isUser && <SettingsButton />}
          </Stack>
          <Stack spacing={4} alignItems="center">
            <Typography variant="h1">{user?.fullName}</Typography>
            <Typography variant="p2" textAlign="center">{user?.bio}</Typography>
          </Stack>
        </Stack>
        {isUser && <MyUserSubHeader />}
        {!isUser && <OtherUserSubHeader user={user} />}
      </Stack>
    </Stack>
  )
}

export const MyUserSubHeader = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      height={{ xs: 64, sm: 48, md: 48 }}
      spacing={16}
      width="100%"
      bgcolor="white.0"
      borderRadius={4}
      px={{ xs: 6, sm: 6, md: 96 }}
    >
      <ActionButton iconName="add-revouch" title="Rvchs" count={25} sx={{ flex: 1 }} isColumn={true} />
      <ActionButton iconName="collections" title="Collections" count={84} sx={{ flex: 1 }} isColumn={true} />
      <ActionButton iconName="friends" title="Friends" count={462} sx={{ flex: 1 }} isColumn={true} />
    </Stack>
  )
}

export const OtherUserSubHeader = ({ user }: { user: UserDataResponseDto }) => {
  const chipStats: { icon: IconName; label: string }[] = [
    { icon: 'add-revouch', label: '25' },
    { icon: 'friends', label: '84' },
    { icon: 'linkedin', label: '462' },
    { icon: 'telegram', label: '' },
    { icon: 'facebook-dark', label: '637' },
    { icon: 'whatsapp', label: '' },
    { icon: 'youtube', label: '989' },
  ]

  const followers = [
    {
      name: 'Alex Johnson',
      image: '',
    },
    {
      name: 'Maria Gonzalez',
      image: '',
    },
    {
      name: 'Chen Wei',
      image: '',
    },
    {
      name: 'Fatima Alvi',
      image: '',
    },
    {
      name: 'John Smith',
      image: '',
    },
    {
      name: 'Sophie Dubois',
      image: '',
    },
    {
      name: 'Liam O\'Connor',
      image: '',
    },
    {
      name: 'Priya Patel',
      image: '',
    },
    {
      name: 'Lucas Silva',
      image: '',
    },
    {
      name: 'Elena Petrova',
      image: '',
    },
  ]

  return (
    <>
      <FollowButton userId={user?.id} />

      <Stack direction="row" spacing={8}>
        {chipStats.map(({ icon, label }, idx) => (
          <Chip
            variant="clean"
            key={icon}
            icon={<Icon name={icon} size={16} />}
            label={
              <Typography variant="p3" color="black.900" sx={{ marginLeft: !!label ? 8 : 0 }}>
                {label}
              </Typography>
            }
          />
        ))}
      </Stack>
      <Followers users={followers} />
    </>
  )
}

export const SettingsButton = () => {
  return (
    <Box position="absolute" right={0} top={28}>
      <IconButton component={NextLink} href="/settings">
        <Icon name="settings" size={16} />
      </IconButton>
    </Box>
  )
}
