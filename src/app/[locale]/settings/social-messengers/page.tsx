import {
  Typography,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { Icon } from '@/components/ui'
import { Fragment } from 'react'
import { ListItemData } from '@/types/settings'
import { MobileBackButton } from '../components'

const socialMessengers: ListItemData[] = [
  {
    id: 0,
    icon: 'facebook',
    title: 'Add facebook',
  },
]

export default function SocialMessengers() {
  return (
    <Stack pl={24} pt={24}>
      <MobileBackButton href="/settings" title="Settings" />

      <Typography pt={48} pb={32} variant="h2">
        Social & Messengers
      </Typography>
      <List sx={{ width: '100%' }}>
        {socialMessengers.map((setting, index) => (
          <Fragment key={index}>
            <ListItem>
              <ListItemAvatar>
                <Icon name={setting.icon} size={20} />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: {
                    variant: 'p2',
                  },
                }}
                primary={setting.title}
              />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Stack>
  )
}
