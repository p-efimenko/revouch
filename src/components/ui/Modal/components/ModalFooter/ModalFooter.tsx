import { DialogActions } from '@mui/material'

interface ModalFooterProps {
  children: React.ReactNode
}

export const ModalFooter = (props: ModalFooterProps) => {
  const { children } = props

  return (
    <DialogActions sx={{ p: 0, bgcolor: 'backgrounds.beige' }} disableSpacing>
      {children}
    </DialogActions>
  )
}
