import { Icon } from '@/components/ui'
import { IconButton } from '@mui/material'

interface CloseButtonProps {
  sx?: Record<string, any>
  onClose?: (id?: string | number) => void
}

export const CloseButton = (props: CloseButtonProps) => {
  const { onClose, sx } = props

  return (
    <IconButton
      aria-label="close"
      onClick={() => onClose?.()}
      size="small"
      sx={theme => ({
        position: 'absolute',
        right: 14,
        top: 14,
        color: {
          xs: theme.palette.grey[500],
          sm: theme.palette.text.primary,
        },
        ...sx,
      })}
    >
      <Icon size={24} name="close" sx={{ cursor: 'pointer' }} />
    </IconButton>
  )
}
