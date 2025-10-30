import { FollowButton } from '@/components/common'
import { Avatar, Divider, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'

export const Item = ({ user }: any) => {

  return (
    <>
      <Stack
        py={12}
        pr={24}
        direction="row"
        alignItems="center"
        justifyContent="space-between">
        <Stack
          component={NextLink}
          href={`/${user.slug}`}
          direction="row"
          alignItems="flex-start"
          spacing={12}
          sx={{ textDecoration: 'none' }}
        >
          <Avatar sx={{ width: 48, height: 48 }} src={user.avatar} alt={user.name} />
          <Stack pt={6}>
            <Typography variant="h5" maxWidth={200}>{user.fullName}</Typography>
            <Typography variant="p4" color="text.secondary" noWrap maxWidth={200}>{user.bio}</Typography>
          </Stack>
        </Stack>
        <FollowButton isFollowing={user.isFollowedByMe} userId={user.id} />
      </Stack>
      <Divider />
    </>
  )
}