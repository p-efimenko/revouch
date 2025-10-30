import { Stack, Typography } from '@mui/material'
import { ListItems, MobileBackButton } from '../components'
import { ListItemData } from '@/types/settings'

export default function Activities() {
  const activities: ListItemData[] = [
    {
      id: 0,
      icon: 'friends',
      title: 'New friends',
    },
    {
      id: 1,
      icon: 'comment',
      title: 'Comments',
    },
    {
      id: 2,
      icon: 'like',
      title: 'Likes',
    },
  ]

  return (
    <Stack pl={24} pt={24}>
      <MobileBackButton href="/settings" title="Settings" />

      <Typography pt={48} pb={32} variant="h2">
        Activities
      </Typography>
      <ListItems items={activities} />
    </Stack>
  )
}
