import { Icon } from '@/components/ui'
import { IconName } from '@/components/ui/Icon/Icon'
import { IconButton, Stack, SxProps, Theme, Typography } from '@mui/material'

interface ActionButtonProps {
  iconName: IconName
  count?: number
  onClick?: () => void
  isColumn?: boolean
  title?: string
  sx?: SxProps<Theme>
}

export const ActionButton = (props: ActionButtonProps) => {
  const { iconName, count, onClick, title, sx, isColumn = false } = props

  const showCount = typeof count !== 'undefined' && count > 0
  const countText = showCount ? `${count}` : ''
  const titleText = title ? title : ''

  return (
    <IconButton onClick={onClick} sx={{ p: 1, ...sx }}>
      <Stack
        direction={{ xs: isColumn ? 'column' : 'row', sm: 'row' }}
        spacing={6}
        alignItems="center"
      >
        <Icon name={iconName} size={16} />
        <Typography variant="p4" ml={{ xs: 0, sm: 4 }} noWrap>
          {showCount ? `${countText} ${titleText}` : titleText}
        </Typography>
      </Stack>
    </IconButton>
  )
}
