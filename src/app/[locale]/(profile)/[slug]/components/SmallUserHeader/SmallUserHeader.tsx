import type { UserDataResponseDto } from '@/api/models'
import { FollowButton } from '@/components/common'
import { Icon } from '@/components/ui'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'

type SmallUserHeaderProps = {
  isUser: boolean
  user: UserDataResponseDto | undefined
}

export const SmallUserHeader = (props: SmallUserHeaderProps) => {
  const { isUser, user } = props

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" height={56} width="100%" bgcolor="background.default">
      <Stack direction="row" alignItems="center" spacing={16}>
        {/* <IconButton>
          <Icon name="arrow-left" size={16} />
        </IconButton> */}
        {/* <Box width={32} height={32}></Box> */}
        {!isUser && <Stack direction="row" alignItems="center" spacing={8}>
          <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar || ''} alt={user?.fullName || ''} />
          <Stack>
            <Typography variant="h5">{user?.fullName}</Typography>
            <Typography variant="p4" noWrap maxWidth={240}>{user?.bio}</Typography>
          </Stack>
        </Stack>}
      </Stack>
      {isUser && <Typography variant="h3">Revouches</Typography>}
      <Stack spacing={16} direction="row" alignItems="center">
        {!isUser && <FollowButton user={user!} />}
        <IconButton>
          <Icon name="sort" size={16} />
        </IconButton>
      </Stack>
    </Stack>
  )
}
