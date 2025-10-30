'use client'

import { Stack, Typography } from '@mui/material'
import { ListItems, MobileBackButton } from '../components'
import { useState, useCallback } from 'react'
import { ListItemData } from '@/types/settings'

const initialNotifications: ListItemData[] = [
  {
    id: 0,
    icon: 'add-revouch',
    title: 'New Revouchs',
    isToggle: true,
    checked: true,
  },
  {
    id: 1,
    icon: 'request',
    title: 'Friends Requests',
    isToggle: true,
    checked: false,
  },
  {
    id: 2,
    icon: 'friends-update',
    title: 'Friends Updates',
    isToggle: true,
    checked: true,
  },
  {
    id: 3,
    icon: 'comment',
    title: 'Comments',
    isToggle: true,
    checked: true,
  },
  {
    id: 4,
    icon: 'news',
    title: 'News and Updates',
    isToggle: true,
    checked: false,
  },
  {
    id: 5,
    icon: 'like',
    title: 'Likes',
    isToggle: true,
    checked: false,
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState<ListItemData[]>(initialNotifications)

  const handleToggle = useCallback((id?: number) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    )
  }, [])

  // Attach onChange to each notification item
  const notificationsList = notifications.map((item) => ({
    ...item,
    onChange: (id?: number) => handleToggle(id),
  }))

  return (
    <Stack pl={24} pt={24}>
      <MobileBackButton href="/settings" title="Settings" />

      <Typography pt={48} pb={32} variant="h2">
        Notifications
      </Typography>
      <ListItems items={notificationsList} />
    </Stack>
  )
}
