import { Stack, Typography } from '@mui/material'
import { ListItems, MobileBackButton } from '../components'
import { ListItemData } from '@/types/settings'

export default function Collections() {
  const collections: ListItemData[] = [
    {
      id: 0,
      icon: 'place',
      title: 'Places',
    },
    {
      id: 1,
      icon: 'gadgets',
      title: 'Gadgets',
    },
    {
      id: 2,
      icon: 'music',
      title: 'Music',
    },
  ]

  return (
    <Stack pl={24} pt={24}>
      <MobileBackButton href="/settings" title="Settings" />

      <Typography pt={48} pb={32} variant="h2">
        3 Collections
      </Typography>
      <ListItems items={collections} />
    </Stack>
  )
}
