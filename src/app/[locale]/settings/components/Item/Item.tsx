'use client'

import {
  Box,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material'
import { Icon } from '@/components/ui'
import NextLink from 'next/link'
import { ListItemData } from '@/types/settings'
import { useActiveRoute } from '@/hooks/common'

export const Item = (props: ListItemData) => {
  const { icon, title, href = '', checked, onChange, onClick, isToggle, isCheckbox, id } = props

  const { isActiveRoute } = useActiveRoute(href)

  const handleChange = () => {
    onChange?.(id)
    onClick?.()
  }

  const isShowIcon = isToggle || isCheckbox
  const isActiveCheckbox = isCheckbox && checked
  const isActive = isActiveRoute || isActiveCheckbox

  return (
    <ListItem alignItems="flex-start" component={href ? NextLink : Box} href={href || undefined}>
      <ListItemButton onClick={handleChange}>
        <ListItemIcon>
          <Icon name={icon} size={20} color={isActive ? 'primary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText
          slotProps={{
            primary: {
              variant: isActiveCheckbox ? 'h4' : 'p2',
              color: isActiveRoute ? 'primary' : 'text.primary',
            },
          }}
          primary={title}
        />
        {isShowIcon && (
          <ListItemIcon>
            <>
              {isCheckbox && (
                <Checkbox
                  edge="end"
                  checked={checked}
                  icon={<Icon name="checkbox" size={0} />}
                  checkedIcon={<Icon name="checkbox" size={20} color="primary" />}
                />
              )}
              {isToggle && <Switch edge="end" checked={checked} />}
            </>
          </ListItemIcon>
        )}
      </ListItemButton>
    </ListItem>
  )
}
