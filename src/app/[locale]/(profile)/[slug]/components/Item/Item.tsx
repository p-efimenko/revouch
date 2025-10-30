import React from 'react'
import { Card, ActionButton } from '@/components/common'
import { Icon } from '@/components/ui'
import { Stack, Avatar, Typography, Chip } from '@mui/material'

import type { User } from '@/mock'

interface ItemProps {
  user: User
}

export const Item = ({ user }: ItemProps) => {
  const handleCommentClick = () => {
    console.log(`Comment clicked for post: ${user.post.title}`)
  }

  const handleLikeClick = () => {
    console.log(`Like clicked for post: ${user.post.title}`)
  }

  const handleFavoriteClick = () => {
    console.log(`Favorite clicked for post: ${user.post.title}`)
  }

  const handleShareClick = () => {
    console.log(`Share clicked for post: ${user.post.title}`)
  }

  const handleMenuClick = () => {
    console.log(`Menu clicked for user: ${user.name}`)
  }

  return (
    <Card spacing={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack spacing={10} direction="row" alignItems="center" height={40}>
          <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }}>
            {user.name.charAt(0)}
          </Avatar>
          <Stack>
            <Typography variant="h5">
              {user.name}
              <Typography component="span" variant="p4" color="black.500" ml={8}>
                {user.date}
              </Typography>
            </Typography>
            <Typography
              variant="p4"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              maxWidth={240}
              color="black.500"
              title={user.title}
            >
              {user.title}
            </Typography>
          </Stack>
        </Stack>

        <Icon name="3-dots" size={16} sx={{ cursor: 'pointer' }} onClick={handleMenuClick} />
      </Stack>

      <Stack spacing={8}>
        <Typography variant="h3">{user.post.title}</Typography>
        <Typography variant="p2">{user.post.content}</Typography>
      </Stack>

      <Stack pt={12} direction="row" spacing={8} alignItems="center" justifyContent="space-between">
        <Chip
          variant="filled"
          label={user.post.category}
          icon={<Icon name={user.post.categoryIcon} size={16} />}
        />
        <Stack direction="row" spacing={16}>
          <ActionButton
            iconName="comment"
            count={user.post.stats.comments}
            onClick={handleCommentClick}
          />
          <ActionButton iconName="like" count={user.post.stats.likes} onClick={handleLikeClick} />
          <ActionButton
            iconName="favorites"
            count={user.post.stats.favorites}
            onClick={handleFavoriteClick}
          />
          <ActionButton
            iconName="share"
            count={user.post.stats.shares}
            onClick={handleShareClick}
          />
        </Stack>
      </Stack>
    </Card>
  )
}
