'use client'

import { IconButton, Stack, Typography } from '@mui/material'
import { ListItems, MobileBackButton } from '../components'
import { useState, useCallback } from 'react'
import { ListItemData } from '@/types/settings'
import { Icon } from '@/components/ui'
import NextLink from 'next/link'

const mockInterests: ListItemData[] = [
  {
    id: 0,
    icon: 'place',
    title: 'Places',
    isCheckbox: true,
    checked: true,
  },
  {
    id: 1,
    icon: 'music',
    title: 'Music',
    isCheckbox: true,
    checked: true,
  },
  {
    id: 2,
    icon: 'tools',
    title: 'Digital Tools',
    isCheckbox: true,
    checked: true,
  },
  {
    id: 3,
    icon: 'services',
    title: 'Services',
    isCheckbox: true,
    checked: true,
  },
  {
    id: 4,
    icon: 'movies',
    title: 'Movies',
    isCheckbox: true,
    checked: true,
  },
  {
    id: 5,
    icon: 'education',
    title: 'Education',
    isCheckbox: true,
    checked: false,
  },
  {
    id: 6,
    icon: 'technology',
    title: 'Technology',
    isCheckbox: true,
    checked: false,
  },
  {
    id: 7,
    icon: 'clothing',
    title: 'Clothing',
    isCheckbox: true,
    checked: false,
  },
]

export default function Interests() {
  const [interests, setInterests] = useState<ListItemData[]>(mockInterests)

  const handleToggle = useCallback((id?: number) => {
    if (typeof id !== 'number') return
    setInterests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    )
  }, [])

  // Attach onChange to each interest item
  const interestsList = interests.map((item) => ({
    ...item,
    onChange: (id?: number) => handleToggle(id),
  }))

  return (
    <Stack pl={24} pt={24}>
      <MobileBackButton href="/settings" title="Settings" />

      <Typography pt={48} pb={32} variant="h2">
        Interests
      </Typography>
      <ListItems items={interestsList} />
    </Stack>
  )
}
