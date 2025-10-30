'use client'

import { List, Divider } from '@mui/material'
import { Fragment } from 'react'
import { Item } from '../Item'
import { ListItemData } from '@/types/settings'

type ListItemsProps = {
  items: ListItemData[]
}

export const ListItems = (props: ListItemsProps) => {
  const { items } = props

  return (
    <List sx={{ width: '100%' }}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <Item {...item} />
          <Divider />
        </Fragment>
      ))}
    </List>
  )
}
