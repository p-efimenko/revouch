import { Icon } from '@/components/ui'
import { IconButton, type IconButtonProps } from '@mui/material'

interface CloseButtonProps {
  IconButtonProps?: IconButtonProps
  onClose?: (id?: string | number) => void
}

export const CloseButton = (props: CloseButtonProps) => {
  const { onClose, IconButtonProps } = props

  return (
    <IconButton
      aria-label="close"
      onClick={() => onClose?.()}
      sx={(theme) => ({
        position: 'absolute',
        right: 26,
        top: 26,
        color: theme.palette.black[600],
      })}
      {...IconButtonProps}
    >
      <Icon size={16} name="close" sx={{ cursor: 'pointer' }} />
    </IconButton>
  )
}
