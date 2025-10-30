'use client'

import { Icon } from '@/components/ui'
import { IconButton, Stack, Typography } from '@mui/material'
import { Item } from '../Item'
import { mockUsers, User } from '@/mock'

export const Revouches = () => {
  const users: User[] = mockUsers

  return (
    <Stack width="100%" spacing={8}>
      <Stack direction="row" justifyContent="space-between" spacing={16}>
        <Typography variant="h2">Revouches</Typography>
        <IconButton>
          <Icon name="sort" size={16} />
        </IconButton>
      </Stack>

      {users.map((user, index) => (
        <Item key={index} user={user} />
      ))}
    </Stack>
  )
}
