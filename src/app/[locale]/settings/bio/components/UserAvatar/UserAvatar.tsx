import { Box, Stack, IconButton, Avatar } from '@mui/material'
import { Icon } from '@/components/ui'

import { useModal } from '@/hooks'

import { useSession } from 'next-auth/react'
import { UserDataResponseDto } from '@/api/models'


export const UserAvatar = () => {

  const { data: session } = useSession()
  const user = session?.user as UserDataResponseDto

  const { open } = useModal('EditAvatarModal')

  return (
    <Stack
      py={16}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box sx={{ width: 36, height: 36 }}></Box>

      <Avatar src={user.avatar as string} sx={{ width: 124, height: 124 }}>
        <Icon name="profile" size={124} />
      </Avatar>

      <IconButton
        sx={{
          width: 36,
          height: 36,
          borderRadius: 100,
          bgcolor: 'black.200',
        }}
        onClick={() => open()}
      >
        <Icon name="photo" size={16} sx={{ color: 'black.900' }} />
      </IconButton>
    </Stack>
  )
}