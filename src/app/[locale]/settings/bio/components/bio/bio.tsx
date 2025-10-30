'use client'

import { Icon } from '@/components/ui'
import { Form } from '../form'

import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/api/user'
import { MobileBackButton } from '../../../components'

export const Bio = () => {

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
  })

  return (
    <Stack px={24} pt={24}>
      <MobileBackButton href="/settings" title="Settings" />

      <Typography pt={48} pb={32} variant="h2">
        Bio
      </Typography>

      <Stack
        py={16}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box sx={{ width: 36, height: 36 }}></Box>

        <Avatar sx={{ width: 124, height: 124 }}>
          <Icon name="profile" size={124} />
        </Avatar>

        <IconButton
          sx={{
            width: 36,
            height: 36,
            borderRadius: 100,
            bgcolor: 'black.200',
          }}
        >
          <Icon name="photo" size={16} sx={{ color: 'black.900' }} />
        </IconButton>

      </Stack>

      <Form user={data!.data} />
    </Stack>
  )
}